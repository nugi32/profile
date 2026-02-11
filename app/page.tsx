'use client';

import Image from 'next/image';
import ProfileImage from '@/public/Image.jpeg';
import './page.css';

export default function Home() {
  return (
    <main className="main">

      {/* ================= HERO ================= */}
      <section className="heroSection">

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
            I build secure, scalable, and user-focused decentralized applications
            using modern blockchain technologies. Specialized in smart contracts,
            DeFi, and Web3 integrations.
          </p>

          <div className="btnGroup">
            <button className="btnWave">Contact</button>
            <button className="btnWave">Projects</button>
            <button className="btnWave">Resume</button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ME ================= */}
      <section className="aboutMeSection">
        <h2 className="sectionTitle">About Me</h2>
        <p className="sectionDescription">
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
      <section className="skillsSection">

        <div className="skillBox">
          <h2 className="skillTitle">What I Do</h2>
          <ul className="skillList">
            <li>Web Development</li>
            <li>UI/UX Design</li>
            <li>Open Source Contribution</li>
          </ul>
        </div>

        <div className="skillBox">
          <h2 className="skillTitle">Frontend Skills</h2>
          <ul className="skillList">
            <li>React.js</li>
            <li>Next.js</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        <div className="skillBox">
          <h2 className="skillTitle">Backend & Tools</h2>
          <ul className="skillList">
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
          </ul>
        </div>

      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="experienceSection">
        <h2 className="sectionTitle">Experience</h2>
        <p className="sectionDescription">
          3+ years of experience in web development, specializing in building
          responsive and user-friendly applications. Proven track record of
          delivering high-quality projects on time and within budget.
        </p>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="projectsSection">
        <h2 className="sectionTitle">Projects</h2>

        <div className="projectCardSection">

          <div className="projectCard">
            <h3 className="projectTitle">Project Title 1</h3>
            <p className="projectDescription">
              Brief description of Project 1 highlighting key features and technologies used.
            </p>
            <div className="projectLinks">
              <a href="#">View Project</a>
              <a href="#">View Code</a>
            </div>
          </div>

          <div className="projectCard">
            <h3 className="projectTitle">Project Title 2</h3>
            <p className="projectDescription">
              Brief description of Project 2 highlighting key features and technologies used.
            </p>
            <div className="projectLinks">
              <a href="#">View Project</a>
              <a href="#">View Code</a>
            </div>
          </div>

          <div className="projectCard">
            <h3 className="projectTitle">Project Title 3</h3>
            <p className="projectDescription">
              Brief description of Project 3 highlighting key features and technologies used.
            </p>
            <div className="projectLinks">
              <a href="#">View Project</a>
              <a href="#">View Code</a>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
