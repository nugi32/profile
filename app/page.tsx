'use client';

import Image from 'next/image';
import ProfileImage from '@/public/Image.jpeg';
import './page.css';

export default function Home() {
  return (
    <main className="main">

      {/* ================= HERO ================= */}
      <section id="home" className="heroSection">

<div className="profileImages">
  <Image
    src={ProfileImage}
    alt="Profile Image"
    priority
    className="profileImage"
  />
</div>


        <div className="aboutSection">
          <h3 className="heroGreeting">Hi, I’m Nugi</h3>
          <h2 className="heroTitle">
            Web3 Developer & Blockchain Engineer
          </h2>

          <p className="heroDescription">
            I design and build decentralized applications (dApps) and secure smart contracts 
            with a strong focus on scalability, security, and on-chain efficiency. 
            My expertise spans DeFi protocols, blockchain architecture, and seamless 
            Web3 integrations that bridge user experience with trustless systems..
          </p>

          <div className="btnGroup">
            <a href="#contact" className="btnWave">Contact</a>
            <a href="#projects" className="btnWave">Projects</a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ME ================= */}
      <section id="about" className="aboutMeSection">
        <h2 className="sectionTitle">About Me</h2>
        <p className="sectionDescription">
          I am a blockchain-focused software engineer specializing in decentralized 
          systems and smart contract development. My work centers on building secure, 
          gas-optimized, and production-ready applications across modern blockchain ecosystems.
          <br /><br />
          I have hands-on experience developing DeFi protocols, token standards (ERC-20, ERC-721),
          wallet integrations, and full-stack Web3 applications using React, Next.js, and 
          Node.js. I prioritize clean architecture, smart contract security best practices, 
          and scalable backend design.
          <br /><br />
          My goal is to contribute to the next generation of decentralized infrastructure 
          by building transparent, efficient, and trust-minimized systems.
        </p>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="skillsSection">

        <div className="skillBox">
          <h2 className="skillTitle">What I Do</h2>
          <ul className="skillList">
          <li>Smart Contract Development (Solidity)</li>
          <br />
          <li>DeFi Protocol Development</li>
          <br />
          <li>Full-Stack Web3 Applications</li>
          <br />
          <li>Blockchain Architecture Design</li>
        </ul>
        </div>

        <div className="skillBox">
          <h2 className="skillTitle">Programing Language</h2>
          <ul className="skillList">
          <li>Solidity</li>
          <li>JavaScript</li>
          <li>TypeScript</li>
          <li>Html</li>
          <li>Css</li>
        </ul>
        </div>

        <div className="skillBox">
          <h2 className="skillTitle">Tools & Frameworks</h2>
        <ul className="skillList">
          <li>Node.js</li>
          <li>Hardhat</li>
          <li>Git & CI/CD</li>
          <li>Web3.js / Ethers.js</li>
          <li>Next.js</li>
        </ul>
        </div>

      </section>

      {/* ================= EXPERIENCE ================= */}
      <section id="experience" className="experienceSection">
        <h2 className="sectionTitle">Experience</h2>
        <p className="sectionDescription">
          3+ years of experience in web development with a specialization in blockchain 
          engineering and decentralized systems. I have built and deployed smart contracts, 
          integrated wallet authentication, and developed scalable dApps with optimized 
          on-chain interactions.
          <br /><br />
          Experienced in writing secure Solidity contracts, implementing access control 
          patterns, preventing common vulnerabilities (reentrancy, overflow, front-running), 
          and conducting contract testing using Hardhat and Foundry.
        </p>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="projectsSection">
        <h2 className="sectionTitle">Projects</h2>

        <div className="projectCardSection">

          <div className="projectCard">
            <h3 className="projectTitle">Team Chain</h3>
            <p className="projectDescription">
              Team Chain is a decentralized project management platform built on Ethereum. It allows teams to create and manage projects, assign tasks, and track progress using smart contracts. The platform integrates with popular tools like GitHub for seamless workflow management.
            </p>
            <div className="projectLinks">
              <a href="https://team-chain-4gja9d255-nugis-projects-ae8c46c7.vercel.app/home">View Project</a>
              <a href="https://github.com/nugi32/Team-Chain">View Code</a>
            </div>
          </div>

          <div className="projectCard">
            <h3 className="projectTitle">Simple Bank</h3>
            <p className="projectDescription">
              Simple Bank is a basic decentralized banking application built on Ethereum. It allows users to deposit, withdraw, and transfer funds using smart contracts. The application demonstrates core blockchain concepts like account management and transaction handling.
            </p>
            <div className="projectLinks">
              <a href="https://github.com/nugi32/Simple-Bank">View Code</a>
            </div>
          </div>

          <div className="projectCard">
            <h3 className="projectTitle">Vanilla Website</h3>
            <p className="projectDescription">
              A simple vanilla JavaScript website project that showcases fundamental web development skills including HTML, CSS, and JavaScript. The project features responsive design and interactive elements.
            </p>
            <div className="projectLinks">
              <a href="https://spmb2026-g0wnruyyp-nugis-projects-ae8c46c7.vercel.app/">View Project</a>
              <a href="https://github.com/nugi32/spmb-2026">View Code</a>
            </div>
          </div>

          <div className="projectCard">
            <h3 className="projectTitle">Profile Page</h3>
            <p className="projectDescription">
              A personal profile webpage built using Next.js and React. This project highlights my skills, experience, and projects in a clean and modern design.
            </p>
            <div className="projectLinks">
              <a href="#">View Project</a>
              <a href="https://github.com/nugi32/profile">View Code</a>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
