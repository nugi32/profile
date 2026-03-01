'use client'

import FadeInSection from '@/components/FadeInSection';
import { useEffect, useState } from 'react';
import { getAbout, AboutData, Skill } from '../../lib/api';

export function AboutUs() {
  const [aboutData, setAboutData] = useState<AboutData>({
    subTitle: '',
    whoIam: '',
    experience: '',
    projects: '',
    skills: []
  });

  useEffect(() => {
    getAbout().then(setAboutData);
  }, []);

  const skills = aboutData.skills;

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
            {aboutData.subTitle}
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
              {aboutData.whoIam}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-2xl font-bold text-[var(--primary)]">{aboutData.experience.split(' ')[0]}</h4>
                <p className="text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] text-sm">
                  {aboutData.experience.split(' ').slice(1).join(' ')}
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-[var(--primary)]">{aboutData.projects.split(' ')[0]}</h4>
                <p className="text-[var(--text-dark-secondary)] dark:text-[var(--text-dark-secondary)] text-sm">
                  {aboutData.projects.split(' ').slice(1).join(' ')}
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