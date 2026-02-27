'use client'

import FadeInSection from '@/components/FadeInSection';

export function AboutUs() {
  const skills = [
    { name: 'Solidity', level: 80 },
    { name: 'Ethers.js / Wagmi', level: 85 },
    { name: 'Next.js & React', level: 88 },
    { name: 'Smart Contract Security', level: 80 },
    { name: 'DeFi Architecture', level: 85 },
    { name: 'Node.js', level: 75 },
  ]

  return (
    <FadeInSection>
      <section
        id="about"
        className="py-12 px-6 lg:px-20 bg-[var(--bg-light)] dark:bg-[var(--background)] transition-colors duration-300"
      >
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--text-dark)] dark:text-[var(--text-dark)]">
            About Me
          </h2>
          <p className="mt-4 text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] max-w-2xl mx-auto">
            Web3 Developer focused on building secure, scalable, and efficient
            decentralized applications.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Bio Section */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--text-dark)] dark:text-[var(--text-dark)]">
              Who I Am
            </h3>

            <p className="mt-6 text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] leading-relaxed">
              I specialize in smart contract engineering and decentralized
              system architecture. My development philosophy emphasizes
              security-first design, gas optimization, and seamless Web3 UX.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-2xl font-bold text-[var(--primary)]">3+</h4>
                <p className="text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] text-sm">
                  Years Experience
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-[var(--primary)]">20+</h4>
                <p className="text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] text-sm">
                  Projects Completed
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-semibold text-[var(--text-dark)] dark:text-[var(--text-dark)]">
              Skills
            </h3>

            <div className="mt-8 space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-[var(--text-dark)] dark:text-[var(--text-dark)] font-medium">
                      {skill.name}
                    </span>
                    <span className="text-sm text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)]">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[var(--bg-subtle)] dark:bg-[var(--bg-subtle)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  </FadeInSection>
  )
}