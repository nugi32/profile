'use client';

import Image from 'next/image';
import ProfileImage from '@/public/Image.jpeg';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">

      {/* ================= HERO SECTION ================= */}
      <section className="heroSection">
        {/* Profile Image */}
        <div className="profileImages">
          <Image
            src={ProfileImage}
            alt="Profile Image"
            width={140}
            height={140}
            priority
            className="
              w-[140px]
              h-[140px]
              rounded-full
              object-cover
              border-4
              border-indigo-500
            "
          />
        </div>

        {/* Hero Content */}
        <div className="aboutSection">
          <h3>Hi, I’m Nugi</h3>
          <h2 className="text-2xl font-semibold">
            Web3 Developer & Blockchain Engineer
          </h2>

          <p>
            I build secure, scalable, and user-focused decentralized applications
            using modern blockchain technologies. Specialized in smart contracts,
            DeFi, and Web3 integrations.
          </p>

          <div className="btn-group">
            <button className="btn-wave">Contact</button>
            <button className="btn-wave">Projects</button>
            <button className="btn-wave">Resume</button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ME ================= */}
      <section className="aboutMeSection">
        <h2 className="text-2xl font-semibold mb-2">About Me</h2>
        <p className="text-center max-w-md mx-auto">
          I am a Web3 Developer with a strong focus on blockchain architecture,
          smart contract development, and decentralized applications (dApps).
          I enjoy solving complex problems, optimizing on-chain performance,
          and building trustless systems that deliver real-world value.
          <br /><br />
          With hands-on experience across multiple blockchain ecosystems,
          I aim to create transparent, efficient, and secure solutions for
          the next generation of the internet.
        </p>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="skilsSection">
        <div className="web3Section">
          <h2 className="text-xl font-semibold mb-2">What I Do</h2>
          <ul className="list-disc list-inside">
            <li>Web Development</li>
            <li>UI/UX Design</li>
            <li>Open Source Contribution</li>
          </ul>
        </div>

        <div className="frontendSection">
          <h2 className="text-xl font-semibold mb-2">Frontend Skills</h2>
          <ul className="list-disc list-inside">
            <li>React.js</li>
            <li>Next.js</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        <div className="backendToolsSection">
          <h2 className="text-xl font-semibold mb-2">Backend & Tools</h2>
          <ul className="list-disc list-inside">
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
          </ul>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="experienceSectio">
        <h2 className="text-2xl font-semibold mb-2">Experience</h2>
        <p className="text-center max-w-md mx-auto">
          3+ years of experience in web development, specializing in building
          responsive and user-friendly applications. Proven track record of
          delivering high-quality projects on time and within budget.
        </p>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="projectsSection">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>

        <div className="projectCardSection">
          <div className="projectCard">
            <h3 className="text-xl font-semibold mb-1">Project Title 1</h3>
            <p className="text-sm mb-2">
              Brief description of Project 1 highlighting key features and technologies used.
            </p>
            <a href="#" className="text-indigo-500 hover:underline">View Project</a>
            <a href="#" className="ml-3 text-indigo-500 hover:underline">View Code</a>
          </div>

          <div className="projectCard">
            <h3 className="text-xl font-semibold mb-1">Project Title 2</h3>
            <p className="text-sm mb-2">
              Brief description of Project 2 highlighting key features and technologies used.
            </p>
            <a href="#" className="text-indigo-500 hover:underline">View Project</a>
            <a href="#" className="ml-3 text-indigo-500 hover:underline">View Code</a>
          </div>

          <div className="projectCard">
            <h3 className="text-xl font-semibold mb-1">Project Title 3</h3>
            <p className="text-sm mb-2">
              Brief description of Project 3 highlighting key features and technologies used.
            </p>
            <a href="#" className="text-indigo-500 hover:underline">View Project</a>
            <a href="#" className="ml-3 text-indigo-500 hover:underline">View Code</a>
          </div>
        </div>
      </section>

    </main>
  );
}
