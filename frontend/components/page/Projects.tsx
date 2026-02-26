'use client'

import { useState } from 'react'

const projects = [
  {
    title: 'DeFi Lending Protocol',
    description:
      'Decentralized lending and borrowing protocol with secure collateral logic.',
  },
  {
    title: 'NFT Marketplace',
    description:
      'Gas-optimized NFT minting and trading platform with royalty support.',
  },
  {
    title: 'DAO Governance',
    description:
      'On-chain governance with proposal creation and voting mechanisms.',
  },
  {
    title: 'Web3 Wallet Dashboard',
    description:
      'Multi-chain wallet analytics and portfolio tracking system.',
  },
]

export function Projects() {
  const [current, setCurrent] = useState(0)

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

  return (
    <section
      id="projects"
      className="py-24 px-6 lg:px-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Projects
        </h2>

        {/* Slider Wrapper */}
        <div className="mt-16 relative overflow-hidden">

          {/* Sliding Container */}
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
                                bg-indigo-600 text-white 
                                p-10 rounded-2xl shadow-2xl">

                  <h3 className="text-2xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-indigo-100 leading-relaxed">
                    {project.description}
                  </p>

                  <button className="mt-6 px-6 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-200 transition">
                    View Details
                  </button>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={prevProject}
            className="px-6 py-2 border border-indigo-600 text-indigo-600 
                       dark:text-indigo-400 dark:border-indigo-400 
                       rounded-lg hover:bg-indigo-600 hover:text-white transition"
          >
            ← Prev
          </button>

          <button
            onClick={nextProject}
            className="px-6 py-2 border border-indigo-600 text-indigo-600 
                       dark:text-indigo-400 dark:border-indigo-400 
                       rounded-lg hover:bg-indigo-600 hover:text-white transition"
          >
            Next →
          </button>
        </div>

        {/* Indicator */}
        <div className="flex justify-center gap-3 mt-6">
          {projects.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                current === index
                  ? 'bg-indigo-600 scale-125'
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}