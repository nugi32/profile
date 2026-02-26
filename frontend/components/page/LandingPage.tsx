'use client'

import Image from 'next/image'
import ProfileImage from '@/public/Image.jpeg'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </a>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-900 dark:text-white hover:text-indigo-500 transition"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row items-center justify-center 
                   gap-12 px-6 lg:px-20 pt-32 pb-20"
      >
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <Image
            src={ProfileImage}
            alt="Profile Image"
            priority
            className="rounded-2xl shadow-lg 
                       w-64 h-64 object-cover 
                       border-4 border-indigo-500"
          />
        </div>

        {/* Text Content */}
        <div className="max-w-xl text-center md:text-left">
          <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
            Hi, I’m Nugi
          </h3>

          <h2 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Web3 Developer & Blockchain Engineer
          </h2>

          <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
            I design and build decentralized applications (dApps) and secure smart contracts
            with a strong focus on scalability, security, and on-chain efficiency.
            My expertise spans DeFi protocols, blockchain architecture, and seamless
            Web3 integrations that bridge user experience with trustless systems.
          </p>

          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white 
                         hover:bg-indigo-700 transition duration-300"
            >
              Contact
            </a>

            <a
              href="#projects"
              className="px-6 py-3 rounded-lg border border-indigo-600 
                         text-indigo-600 dark:text-indigo-400 
                         hover:bg-indigo-600 hover:text-white transition duration-300"
            >
              Projects
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}