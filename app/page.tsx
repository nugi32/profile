'use client';

import Image from 'next/image';
import ProfileImage from '@/public/Image.jpeg';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="profileImages">
      <Image
        src={ProfileImage}
        alt="Profile Image"
        width={120}
        height={120}
        priority
        className="
          w-[120px]
          h-[120px]
          mx-auto
          mb-4
          rounded-full
          object-cover
          border-4
          border-indigo-500
        "
      />
      </div>

      <div className="aboutSection">
        <h3>Hi, I’m Nugi</h3>
        <h2 className="text-2xl font-semibold mb-2">Web3 Developer & Blockchain Engineer</h2>
        <p className="text-center max-w-md">
          I build secure, scalable, and user-focused decentralized applications using modern blockchain technologies.
Specialized in smart contracts, DeFi, and Web3 integrations.
        </p>
        <div className="flex gap-6 mt-4">
  <button className="btn-wave">Button 1</button>
  <button className="btn-wave">Button 2</button>
  <button className="btn-wave">Button 3</button>
</div>


      </div>

      <div className="aboutMeSection">
        <h2 className="text-2xl font-semibold mb-2">About Me</h2>
        <p className="text-center max-w-md">
          I am a Web3 Developer with a strong focus on blockchain architecture, smart contract development, and decentralized applications (dApps). I enjoy solving complex problems, optimizing on-chain performance, and building trustless systems that deliver real-world value.

With hands-on experience across multiple blockchain ecosystems, I aim to create transparent, efficient, and secure solutions for the next generation of the internet.
        </p>
      </div>

      <div className="skilsSection">

        <div className="web3Section">
        <h2 className="text-2xl font-semibold mb-2">What I do</h2>
        <ul className="list-disc list-inside">
          <li>Web Development</li>
          <li>UI/UX Design</li>
          <li>Open Source Contribution</li>
        </ul>
        </div>

        <div className="frontendSection">
        <h2 className="text-2xl font-semibold mb-2">Frontend Skills</h2>
        <ul className="list-disc list-inside">
          <li>React.js</li>
          <li>Next.js</li>
          <li>Tailwind CSS</li>
        </ul>
        </div>

        <div className="backendToolsSection">
        <h2 className="text-2xl font-semibold mb-2">Backend & Tools</h2>
        <ul className="list-disc list-inside">
          <li>Node.js</li>
          <li>Express.js</li>
          <li>MongoDB</li>
        </ul> 
        </div>
      </div>

      <div className="experienceSectio">
        <h2 className="text-2xl font-semibold mb-2">Experience</h2>
        <p className="text-center max-w-md">
          3+ years of experience in web development, specializing in building responsive and user-friendly applications. Proven track record of delivering high-quality projects on time and within budget.
        </p>
      </div>

      <div className="projectsSection">
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>

        <div className="projectCardSection">
          <div className="projectCard">
            <h3 className="text-xl font-semibold mb-1">Project Title 1</h3>
            <p className="text-sm">
              Brief description of Project 1 highlighting key features and technologies used.
            </p>
            <a href="#" className="text-indigo-500 hover:underline">View Project</a>
            <a href="#" className="ml-2 text-indigo-500 hover:underline">View Code</a>
          </div>

          <div className="projectCard">
            <h3 className="text-xl font-semibold mb-1">Project Title 2</h3>
            <p className="text-sm">
              Brief description of Project 2 highlighting key features and technologies used.
            </p>
            <a href="#" className="text-indigo-500 hover:underline">View Project</a>
            <a href="#" className="ml-2 text-indigo-500 hover:underline">View Code</a>
          </div>

          <div className="projectCard">
            <h3 className="text-xl font-semibold mb-1">Project Title 3</h3>
            <p className="text-sm">
              Brief description of Project 3 highlighting key features and technologies used.
            </p>
            <a href="#" className="text-indigo-500 hover:underline">View Project</a>
            <a href="#" className="ml-2 text-indigo-500 hover:underline">View Code</a>
          </div>
        </div>
      </div>
    </div>
  );
}
