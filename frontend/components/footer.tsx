export default function Footer() {
  return (
    <footer
      id="contact"
      className="
        relative z-[1001] overflow-hidden
        bg-[#030916] text-white
        pt-16 pb-8
        [clip-path:polygon(0_15%,12%_8%,25%_14%,37%_6%,50%_12%,63%_7%,75%_14%,88%_8%,100%_15%,100%_100%,0_100%)]
      "
    >
      <h2 className="text-center text-2xl mb-12 mt-2 relative z-10">
        Connect with me
      </h2>

      <ul className="flex justify-center items-center gap-6 list-none">
        
        {/* GitHub */}
        <li
          className="
            relative group
            w-[60px] h-[60px]
            hover:w-[180px]
            transition-all duration-500 ease-in-out
            rounded-full
            bg-[#111827]
            shadow-lg hover:shadow-2xl
            flex items-center justify-center
            overflow-hidden
          "
        >
          {/* Glow Background */}
          <span
            className="
              absolute inset-0 rounded-full
              bg-gradient-to-r from-[#1877f2] to-[#0f5bd8]
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
              z-0
            "
          />
          <span
            className="
              absolute -inset-2 rounded-full
              bg-gradient-to-r from-[#1877f2] to-[#0f5bd8]
              blur-xl
              opacity-0 group-hover:opacity-80
              transition-opacity duration-500
              -z-10
            "
          />

          <a
            href="https://github.com/nugi32"
            className="
              relative z-10
              w-full h-full
              flex items-center
              pl-4
              text-gray-200 text-xl
              transition-transform duration-500
              group-hover:translate-x-2
            "
          >
            <i className="fa fa-github"></i>
            <span
              className="
                absolute left-[70px]
                text-sm font-semibold uppercase tracking-widest
                opacity-0 scale-90
                transition-all duration-400
                group-hover:opacity-100 group-hover:scale-100
              "
            >
              GitHub
            </span>
          </a>
        </li>

        {/* Repeat same structure for Gmail + LinkedIn with different gradients */}
        
      </ul>
    </footer>
  );
}