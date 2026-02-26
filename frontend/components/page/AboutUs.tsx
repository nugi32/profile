'use client'

export function AboutUs() {
  const skills = [
    { name: 'Solidity', level: 90 },
    { name: 'Ethers.js / Wagmi', level: 85 },
    { name: 'Next.js & React', level: 88 },
    { name: 'Smart Contract Security', level: 80 },
    { name: 'DeFi Architecture', level: 85 },
    { name: 'Node.js', level: 75 },
  ]

  return (
    <section
      id="about"
      className="py-24 px-6 lg:px-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Web3 Developer focused on building secure, scalable, and efficient
            decentralized applications.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Bio Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Who I Am
            </h3>

            <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              I specialize in smart contract engineering and decentralized
              system architecture. My development philosophy emphasizes
              security-first design, gas optimization, and seamless Web3 UX.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-2xl font-bold text-indigo-600">3+</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Years Experience
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-indigo-600">20+</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Projects Completed
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Skills
            </h3>

            <div className="mt-8 space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
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
  )
}