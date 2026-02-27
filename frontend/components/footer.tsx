'use client'

import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function Footer() {
  return (
    <footer
      id="contact"
      className="
        relative z-[1001] overflow-hidden
        bg-[var(--footer-bg)] text-[var(--text-dark)]
        pt-12 pb-8
        [clip-path:polygon(0_15%,12%_8%,25%_14%,37%_6%,50%_12%,63%_7%,75%_14%,88%_8%,100%_15%,100%_100%,0_100%)]
      "
    >
      <h2 className="text-center text-2xl mb-10 mt-2 relative z-10">
        Connect with me
      </h2>

      <ul className="flex justify-center items-center gap-8 list-none">

        {/* GitHub */}
        <SocialItem
          href="https://github.com/nugi32"
          icon={<FaGithub size={22} />}
          label="GitHub"
          gradient="from-gray-700 to-gray-900"
        />

        {/* Gmail */}
        <SocialItem
          href="mailto:your@email.com"
          icon={<MdEmail size={22} />}
          label="Email"
          gradient="from-red-500 to-pink-500"
        />

        {/* LinkedIn */}
        <SocialItem
          href="https://linkedin.com/in/yourprofile"
          icon={<FaLinkedinIn size={22} />}
          label="LinkedIn"
          gradient="from-blue-500 to-blue-700"
        />

      </ul>
    </footer>
  )
}

function SocialItem({
  href,
  icon,
  label,
  gradient,
}: {
  href: string
  icon: React.ReactNode
  label: string
  gradient: string
}) {
  return (
    <li
      className="
        relative group
        w-[60px] h-[60px]
        hover:w-[180px]
        transition-all duration-500 ease-in-out
        rounded-full
        bg-[var(--bg-light-secondary)]
        shadow-lg hover:shadow-2xl
        flex items-center justify-center
        overflow-hidden
      "
    >
      {/* Gradient Background */}
      <span
        className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r ${gradient}
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          z-0
        `}
      />
      <span
        className={`
          absolute -inset-2 rounded-full
          bg-gradient-to-r ${gradient}
          blur-xl
          opacity-0 group-hover:opacity-80
          transition-opacity duration-500
          -z-10
        `}
      />

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="
          relative z-10
          w-full h-full
          flex items-center
          pl-5
          text-[var(--text-dark-secondary)]
          transition-transform duration-500
          group-hover:translate-x-2
        "
      >
        {icon}

        <span
          className="
            absolute left-[70px]
            text-sm font-semibold uppercase tracking-widest
            opacity-0 scale-90
            transition-all duration-400
            group-hover:opacity-100 group-hover:scale-100
          "
        >
          {label}
        </span>
      </a>
    </li>
  )
}