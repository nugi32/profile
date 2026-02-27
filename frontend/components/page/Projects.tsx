'use client'

import { useState } from 'react'
import FadeInSection from '@/components/FadeInSection'

const projects = [
  {
    title: 'DeFi Lending Protocol',
    image:
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop',
    short:
      'Decentralized lending and borrowing protocol.',
    details:
      'Built with Solidity and Hardhat. Includes collateral logic, liquidation engine, and Chainlink oracle integration for real-time pricing.',
  },
  {
    title: 'NFT Marketplace',
    image:
      'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1200&auto=format&fit=crop',
    short:
      'Gas-optimized NFT minting and trading platform.',
    details:
      'ERC-721 + ERC-2981 royalty support. Integrated IPFS metadata storage and wallet-based authentication (MetaMask & WalletConnect).',
  },
  {
    title: 'DAO Governance',
    image:
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop',
    short:
      'On-chain governance with proposal & voting.',
    details:
      'Token-weighted voting, quorum validation, proposal lifecycle management, and timelock contract execution.',
  },
  {
    title: 'Web3 Wallet Dashboard',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    short:
      'Multi-chain wallet analytics dashboard.',
    details:
      'Aggregates EVM chains, tracks token balances, DeFi positions, and transaction history with indexed RPC infrastructure.',
  },
]

export function Projects() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const nextProject = () => {
    setCurrent((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    )
  }

  const prevProject = () => {
    setCurrent((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    )
  }




  const [touchStart, setTouchStart] = useState<number | null>(null)
const [touchEnd, setTouchEnd] = useState<number | null>(null)

const minSwipeDistance = 50

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

  const isLeftSwipe = distance > minSwipeDistance
  const isRightSwipe = distance < -minSwipeDistance

  if (isLeftSwipe) {
    nextProject()
  }

  if (isRightSwipe) {
    prevProject()
  }
}





  return (
    <>
      <FadeInSection>
        <section
          id="projects"
          className="py-20 px-6 lg:px-20 bg-[var(--bg-light)] dark:bg-[var(--background)] transition-colors duration-300"
        >
          <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[var(--text-dark)] dark:text-[var(--text-dark)]">
            Projects
          </h2>

          {/* Slider */}
          <div
  className="mt-12 relative overflow-hidden"
  onTouchStart={onTouchStart}
  onTouchMove={onTouchMove}
  onTouchEnd={onTouchEnd}
>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="min-w-full flex justify-center px-6"
                >
                  <div className="w-full max-w-2xl 
                                  bg-[var(--card)] dark:bg-[var(--card)] 
                                  p-6 rounded-2xl shadow-2xl">

                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 object-cover rounded-xl"
                    />

                    <h3 className="mt-6 text-2xl font-semibold text-[var(--text-dark)] dark:text-[var(--text-dark)]">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)]">
                      {project.short}
                    </p>

                    <button
                      onClick={() => setSelected(index)}
                      className="mt-6 px-6 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg font-semibold hover:bg-opacity-90 transition"
                    >
                      View Details
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-6 mt-8">
            <button
              onClick={prevProject}
              className="px-6 py-2 border border-[var(--primary)] text-[var(--primary)] 
                         dark:text-[var(--primary)] dark:border-[var(--primary)] 
                         rounded-lg hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition"
            >
              ← Prev
            </button>

            <button
              onClick={nextProject}
              className="px-6 py-2 border border-[var(--primary)] text-[var(--primary)] 
                         dark:text-[var(--primary)] dark:border-[var(--primary)] 
                         rounded-lg hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition"
            >
              Next →
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {projects.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  current === index
                    ? 'bg-[var(--primary)] scale-125'
                    : 'bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      </FadeInSection>
        {selected !== null && (
        <div
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/60 backdrop-blur-sm px-6"
        >
            <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--card)] dark:bg-[var(--card)] max-w-xl w-full p-8 rounded-2xl shadow-2xl relative"
            >

            <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-[var(--text-dark-secondary)] hover:text-red-500 text-xl"
            >
                ✕
            </button>

            <img
                src={projects[selected].image}
                alt={projects[selected].title}
                className="w-full h-64 object-cover rounded-xl"
            />

            <h3 className="mt-6 text-2xl font-bold text-[var(--text-dark)] dark:text-[var(--text-dark)]">
                {projects[selected].title}
            </h3>

            <p className="mt-4 text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] leading-relaxed">
                {projects[selected].details}
            </p>

            </div>
        </div>
        )}
    </>
  )
}