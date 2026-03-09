'use client'

import { useState, useEffect, useRef } from 'react'
import FadeInSection from '@/components/FadeInSection'
import { getProjects, ProjectData } from '@/lib/api'
import { getImageUrl } from '@/lib/imageUtils'

export function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const dragStart = useRef<number | null>(null)
  const dragEnd = useRef<number | null>(null)
  const isDragging = useRef(false)

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minDrag = 80
  const minSwipe = 50

  /* FETCH PROJECTS */
  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data)
      setCurrent(0)
    })
  }, [])

  const total = projects.length

  /* NEXT / PREV */
  const next = () => {
    setCurrent((prev) => {
      if (!total) return 0
      return (prev + 1) % total
    })
  }

  const prev = () => {
    setCurrent((prev) => {
      if (!total) return 0
      return (prev - 1 + total) % total
    })
  }

  /* KEYBOARD NAVIGATION */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return

      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [total])

  /* TOUCH EVENTS */
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd

    if (distance > minSwipe) next()
    if (distance < -minSwipe) prev()
  }

  if (!total) return null

  return (
    <>
      <FadeInSection>
        <section
          id="projects"
          className="relative py-28 px-6 lg:px-20
          bg-[var(--bg-light-secondary)]
          border-t border-[var(--border)] overflow-hidden"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[var(--text-dark)] mb-16">
              Projects
            </h2>

            {/* CAROUSEL */}
            <div
              ref={containerRef}
              className="relative h-[440px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => {
                if (window.innerWidth < 768) return
                isDragging.current = true
                dragStart.current = e.clientX
              }}
              onPointerMove={(e) => {
                if (!isDragging.current) return
                dragEnd.current = e.clientX
              }}
              onPointerUp={() => {
                if (
                  !isDragging.current ||
                  dragStart.current === null ||
                  dragEnd.current === null
                ) {
                  isDragging.current = false
                  return
                }

                const distance = dragStart.current - dragEnd.current

                if (distance > minDrag) next()
                if (distance < -minDrag) prev()

                isDragging.current = false
                dragStart.current = null
                dragEnd.current = null
              }}
              onPointerLeave={() => {
                isDragging.current = false
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {projects.map((project, index) => {
                const prevIndex = (current - 1 + total) % total
                const nextIndex = (current + 1) % total

                let position = ''

                if (index === current) {
                  position = 'translate-x-0 scale-100 opacity-100 z-30'
                } else if (index === prevIndex) {
                  position =
                    '-translate-x-[65%] scale-90 opacity-40 blur-sm z-20'
                } else if (index === nextIndex) {
                  position =
                    'translate-x-[65%] scale-90 opacity-40 blur-sm z-20'
                } else {
                  return null
                }

                return (
                  <div
                    key={index}
                    className={`absolute transform-gpu transition-all duration-500 ease-in-out w-full max-w-xl ${position}`}
                  >
                    <div
                      className="bg-[var(--card)] p-8 rounded-2xl
                      shadow-xl border border-[var(--border)]
                      hover:shadow-2xl transition"
                    >
                      <img
                        src={getImageUrl(project.image)}
                        alt={project.title}
                        className="w-full h-56 object-cover rounded-xl"
                      />

                      <h3 className="mt-6 text-2xl font-semibold text-[var(--text-dark)]">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-[var(--text-dark-secondary)]">
                        {project.short}
                      </p>

                      <button
                        onClick={() => setSelected(index)}
                        className="mt-6 px-6 py-2
                        bg-[var(--primary)]
                        text-[var(--primary-foreground)]
                        rounded-lg font-semibold
                        hover:scale-105 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* INDICATORS */}
            <div className="flex justify-center gap-3 mt-10">
              {projects.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition ${
                    current === index
                      ? 'bg-[var(--primary)] scale-125'
                      : 'bg-[var(--border)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* MODAL */}
      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center
          bg-black/60 backdrop-blur-sm px-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--card)] max-w-xl w-full
            p-8 rounded-2xl shadow-2xl relative"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3
              w-10 h-10 flex items-center justify-center
              rounded-full
              bg-white/90 dark:bg-black/70
              backdrop-blur-md
              border border-[var(--border)]
              shadow-md
              text-lg font-semibold
              hover:bg-red-500 hover:text-white
              transition"
            >
              ✕
            </button>

            <img
              src={getImageUrl(projects[selected].image)}
              alt={projects[selected].title}
              className="w-full h-64 object-cover rounded-xl"
            />

            <h3 className="mt-6 text-2xl font-bold text-[var(--text-dark)]">
              {projects[selected].title}
            </h3>

            <p className="mt-4 text-[var(--text-dark-secondary)] leading-relaxed">
              {projects[selected].details}
            </p>

            <a
              href={projects[selected].link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-6 py-3
              bg-[var(--primary)]
              text-[var(--primary-foreground)]
              rounded-lg font-semibold
              hover:scale-105 transition"
            >
              Visit Project →
            </a>
          </div>
        </div>
      )}
    </>
  )
}