'use client'

import Image from 'next/image'
import ProfileImage from '@/public/Image.jpeg'
import { ModeToggle } from '@/components/modeTogggle'

const navigation = [
  { name: 'Projects', href: '#projects' },
  { name: 'About Me', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

import FadeInSection from "@/components/FadeInSection";

export default function LandingPage() {
  return (
    <div id="home" className="bg-[var(--bg-light)] dark:bg-[var(--background)] transition-colors duration-300">
      
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <ModeToggle />
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-[var(--text-dark)] dark:text-[var(--text-dark)] hover:text-[var(--primary)] transition"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <FadeInSection>
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
              className="rounded-full shadow-lg 
                          w-64 h-64 object-cover 
                          border-4 border-[var(--primary)]"
              />
          </div>

          {/* Text Content */}
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)]">
              Hi, I’m Nugi
            </h3>

            <h2 className="mt-2 text-4xl font-bold text-[var(--text-dark)] dark:text-[var(--text-dark)] leading-tight">
              Web3 Developer & Blockchain Engineer
            </h2>

            <p className="mt-6 text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] leading-relaxed">
              I design and build decentralized applications (dApps) and secure smart contracts
              with a strong focus on scalability, security, and on-chain efficiency.
              My expertise spans DeFi protocols, blockchain architecture, and seamless
              Web3 integrations that bridge user experience with trustless systems.
            </p>

            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] 
                           hover:bg-opacity-90 transition duration-300"
              >
                Contact
              </a>

              <a
                href="#projects"
                className="px-6 py-3 rounded-lg border border-[var(--primary)] 
                           text-[var(--primary)] dark:text-[var(--primary)] 
                           hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition duration-300"
              >
                Projects
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>
    </div>
  )
}