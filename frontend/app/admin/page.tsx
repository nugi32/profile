'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SaveIcon, PlusIcon, TrashIcon, CheckCircle , RefreshCwIcon } from "lucide-react"
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react"
import {
  // Functions
  getLandingPage,
  getProjects,
  getAbout,
  getFooter,
  savePortfolio,
} from '@/lib/api'

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ModeToggle } from '@/components/modeTogggle';

export default function AdminPage() {
  const router = useRouter();
  
  // Ref terpisah untuk masing-masing section
  const landingFileInputRef = useRef<HTMLInputElement | null>(null);
  const projectFileInputRef = useRef<HTMLInputElement | null>(null);

  // State untuk menyimpan index project yang aktif
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  const handleLandingButtonClick = () => {
    if (landingFileInputRef.current) {
      landingFileInputRef.current.click();
    }
  };

  const handleProjectButtonClick = (index: number) => {
    if (projectFileInputRef.current) {
      setActiveProjectIndex(index);
      projectFileInputRef.current.click();
    }
  };

  const [portfolioData, setPortfolioData] = useState<any>({
    Landingdata: {
      section: "LandingPage",
      data: {
        greeting: "",
        role: "",
        description: "",
        profilePicture: "",
        profilePictureFile: null,
        preview: ""
      }
    },

    ProjectsData: {
      section: "ProjectsPage",
      data: []
    },

    AboutMeData: {
      subTitle: "",
      whoIam: "",
      experience: "",
      projects: "",
      skills: []
    },

    FooterData: {
      title: "",
      socialLinks: []
    }
  })

  // State untuk melacak field mana yang sudah diubah (dirty)
  const [dirtyFields, setDirtyFields] = useState<{
    landing: { [key: string]: boolean };
    projects: { [key: number]: { [key: string]: boolean } };
    about: { [key: string]: boolean };
    aboutSkills: { [key: number]: { [key: string]: boolean } };
    footer: { [key: string]: boolean };
    footerSocials: { [key: number]: { [key: string]: boolean } };
  }>({
    landing: {},
    projects: {},
    about: {},
    aboutSkills: {},
    footer: {},
    footerSocials: {}
  });

  const [alert, setAlert] = useState<any>(null)
  const [updatingSection, setUpdatingSection] = useState<string | null>(null)

  /* ================= LOAD ALL DATA ================= */
  useEffect(() => {
    const loadAllData = async () => {
      try {
        // Load Landing Data
        const landingData = await getLandingPage();
        const landingImageUrl = landingData?.profilePicture
          ? `${process.env.NEXT_PUBLIC_API_URL}/${landingData.profilePicture}`
          : "";

        // Load Projects Data
        const projectsData = await getProjects();
        
        // Process projects images
        const processedProjects = projectsData?.map((project: any) => ({
          ...project,
          preview: project.image ? `${process.env.NEXT_PUBLIC_API_URL}/${project.image}` : "",
          imageFile: null
        })) || [];

        // Load About Data
        const aboutData = await getAbout();

        // Load Footer Data
        const footerData = await getFooter();

        setPortfolioData((prev: any) => ({
          ...prev,
          Landingdata: {
            ...prev.Landingdata,
            data: {
              ...prev.Landingdata.data,
              greeting: landingData?.greeting || "",
              role: landingData?.role || "",
              description: landingData?.description || "",
              profilePicture: landingData?.profilePicture || "",
              preview: landingImageUrl
            }
          },
          ProjectsData: {
            ...prev.ProjectsData,
            data: processedProjects
          },
          AboutMeData: {
            subTitle: aboutData?.subTitle || "",
            whoIam: aboutData?.whoIam || "",
            experience: aboutData?.experience || "",
            projects: aboutData?.projects || "",
            skills: aboutData?.skills || []
          },
          FooterData: {
            title: footerData?.title || "",
            socialLinks: footerData?.socialLinks || []
          }
        }));

        // Reset dirty fields after loading
        setDirtyFields({
          landing: {},
          projects: {},
          about: {},
          aboutSkills: {},
          footer: {},
          footerSocials: {}
        });
      } catch (err) {
        console.error("Failed to load portfolio data", err);
      }
    };

    loadAllData();
  }, []);

  /* ================= DIRTY FIELD HANDLERS ================= */
  const markLandingDirty = (field: string) => {
    setDirtyFields(prev => ({
      ...prev,
      landing: {
        ...prev.landing,
        [field]: true
      }
    }));
  };

  const markProjectDirty = (index: number, field: string) => {
    setDirtyFields(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        [index]: {
          ...(prev.projects[index] || {}),
          [field]: true
        }
      }
    }));
  };

  const markAboutDirty = (field: string) => {
    setDirtyFields(prev => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: true
      }
    }));
  };

  const markAboutSkillDirty = (index: number, field: string) => {
    setDirtyFields(prev => ({
      ...prev,
      aboutSkills: {
        ...prev.aboutSkills,
        [index]: {
          ...(prev.aboutSkills[index] || {}),
          [field]: true
        }
      }
    }));
  };

  const markFooterDirty = (field: string) => {
    setDirtyFields(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        [field]: true
      }
    }));
  };

  const markFooterSocialDirty = (index: number, field: string) => {
    setDirtyFields(prev => ({
      ...prev,
      footerSocials: {
        ...prev.footerSocials,
        [index]: {
          ...(prev.footerSocials[index] || {}),
          [field]: true
        }
      }
    }));
  };

  const clearSectionDirty = (section: string) => {
    if (section === 'landing') {
      setDirtyFields(prev => ({ ...prev, landing: {} }));
    } else if (section === 'projects') {
      setDirtyFields(prev => ({ ...prev, projects: {} }));
    } else if (section === 'about') {
      setDirtyFields(prev => ({ ...prev, about: {}, aboutSkills: {} }));
    } else if (section === 'footer') {
      setDirtyFields(prev => ({ ...prev, footer: {}, footerSocials: {} }));
    }
  };

  /* ================= LANDING ================= */

  const handleLandingChange = (field: string, value: string) => {
    markLandingDirty(field);
    setPortfolioData({
      ...portfolioData,
      Landingdata: {
        ...portfolioData.Landingdata,
        data: {
          ...portfolioData.Landingdata.data,
          [field]: value
        }
      }
    })
  }

  const handleLandingImage = (file: File | null) => {
    markLandingDirty('profilePicture');
    const preview = file ? URL.createObjectURL(file) : ""
    setPortfolioData({
      ...portfolioData,
      Landingdata: {
        ...portfolioData.Landingdata,
        data: {
          ...portfolioData.Landingdata.data,
          profilePictureFile: file,
          preview
        }
      }
    })
  }
  /* ================= PROJECTS ================= */

  const addProject = () => {
    setPortfolioData({
      ...portfolioData,
      ProjectsData: {
        ...portfolioData.ProjectsData,
        data: [
          ...portfolioData.ProjectsData.data,
          {
            title: "",
            short: "",
            details: "",
            image: "",
            imageFile: null,
            preview: "",
            link: ""
          }
        ]
      }
    })
  }

  const handleProjectChange = (index: number, field: string, value: string) => {
    markProjectDirty(index, field);
    const updated = [...portfolioData.ProjectsData.data]
    updated[index][field] = value

    setPortfolioData({
      ...portfolioData,
      ProjectsData: {
        ...portfolioData.ProjectsData,
        data: updated
      }
    })
  }

  const handleProjectImage = (index: number, file: File | null) => {
    markProjectDirty(index, 'image');
    const updated = [...portfolioData.ProjectsData.data]
    updated[index].imageFile = file
    updated[index].preview = file ? URL.createObjectURL(file) : ""

    setPortfolioData({
      ...portfolioData,
      ProjectsData: {
        ...portfolioData.ProjectsData,
        data: updated
      }
    })
  }

  const removeProject = (index: number) => {
    const filtered = portfolioData.ProjectsData.data.filter(
      (_: any, i: number) => i !== index
    )

    setPortfolioData({
      ...portfolioData,
      ProjectsData: {
        ...portfolioData.ProjectsData,
        data: filtered
      }
    })
  }

  /* ================= ABOUT ================= */

  const handleAboutChange = (field: string, value: string) => {
    markAboutDirty(field);
    setPortfolioData({
      ...portfolioData,
      AboutMeData: {
        ...portfolioData.AboutMeData,
        [field]: value
      }
    })
  }

  const addSkill = () => {
    setPortfolioData({
      ...portfolioData,
      AboutMeData: {
        ...portfolioData.AboutMeData,
        skills: [
          ...portfolioData.AboutMeData.skills,
          { name: "", level: 0 }
        ]
      }
    })
  }

  const handleSkillChange = (index: number, field: string, value: any) => {
    markAboutSkillDirty(index, field);
    const updated = [...portfolioData.AboutMeData.skills]
    updated[index][field] = value

    setPortfolioData({
      ...portfolioData,
      AboutMeData: {
        ...portfolioData.AboutMeData,
        skills: updated
      }
    })
  }

  const removeSkill = (index: number) => {
    const filtered = portfolioData.AboutMeData.skills.filter(
      (_: any, i: number) => i !== index
    )

    setPortfolioData({
      ...portfolioData,
      AboutMeData: {
        ...portfolioData.AboutMeData,
        skills: filtered
      }
    })
  }

  /* ================= FOOTER ================= */

  const addSocial = () => {
    setPortfolioData({
      ...portfolioData,
      FooterData: {
        ...portfolioData.FooterData,
        socialLinks: [
          ...portfolioData.FooterData.socialLinks,
          { name: "", url: "" }
        ]
      }
    })
  }

  const handleSocialChange = (index: number, field: string, value: string) => {
    markFooterSocialDirty(index, field);
    const updated = [...portfolioData.FooterData.socialLinks]
    updated[index][field] = value

    setPortfolioData({
      ...portfolioData,
      FooterData: {
        ...portfolioData.FooterData,
        socialLinks: updated
      }
    })
  }

  const removeSocial = (index: number) => {
    const filtered = portfolioData.FooterData.socialLinks.filter(
      (_: any, i: number) => i !== index
    )

    setPortfolioData({
      ...portfolioData,
      FooterData: {
        ...portfolioData.FooterData,
        socialLinks: filtered
      }
    })
  }
  /* ================= SAVE ALL ================= */

  const saveAllData = async () => {
    setUpdatingSection('all')
    try {
      // debug payload before sending
      console.log("SAVE PAYLOAD (frontend):", JSON.stringify(portfolioData, null, 2))

      await savePortfolio(portfolioData)
      clearSectionDirty('landing');
      clearSectionDirty('projects');
      clearSectionDirty('about');
      clearSectionDirty('footer');
      setAlert({ type: "success", message: "All portfolio data saved successfully!" })
    } catch (err) {
      console.error("Failed to save portfolio data", err)
      setAlert({ type: "error", message: "Failed to save all portfolio data." })
    } finally {
      setUpdatingSection(null)
    }
  }

  const closeAlert = () => {
    setAlert(null)
    // Auto refresh page after alert is closed
    router.refresh()
  }

  return (
    <div className="min-h-screen p-8 bg-[var(--bg-light)] dark:bg-[var(--background)] transition-colors duration-300">
      {/* OVERLAY ALERT */}
      {alert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop blur */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeAlert}
          />
          
          {/* Alert Card */}
          <div className="relative bg-[var(--card)] dark:bg-[var(--card)] rounded-lg shadow-xl max-w-md w-full mx-4 border border-[var(--border)]">
            {alert.type === "success" ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2Icon className="w-8 h-8 text-green-500" />
                    <h3 className="text-lg font-semibold text-[var(--card-foreground)] dark:text-[var(--card-foreground)]">
                      Success
                    </h3>
                  </div>
                </div>
                <p className="text-[var(--muted-foreground)] dark:text-[var(--muted-foreground)] mb-6">
                  {alert.message || "Portfolio has been successfully saved."}
                </p>
                <Button 
                  onClick={closeAlert}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  Close
                </Button>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertCircleIcon className="w-8 h-8 text-red-500" />
                    <h3 className="text-lg font-semibold text-[var(--card-foreground)] dark:text-[var(--card-foreground)]">
                      Error
                    </h3>
                  </div>
                </div>
                <p className="text-[var(--muted-foreground)] dark:text-[var(--muted-foreground)] mb-6">
                  {alert.message || "Failed to save portfolio. Please try again."}
                </p>
                <Button 
                  onClick={closeAlert}
                  variant="destructive"
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header Section */}
<div className="flex items-center justify-between mb-8">
  <h1 className="text-3xl font-bold text-[var(--foreground)]">
    Admin Dashboard
  </h1>

  <div className="flex items-center gap-3">
    <Button
      onClick={saveAllData}
      disabled={updatingSection === 'all'}
      size="lg"
      className="px-6 py-2"
    >
      {updatingSection === 'all' ? (
        <>
          <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
          Saving All...
        </>
      ) : (
        <>
          <SaveIcon className="w-4 h-4 mr-2" />
          Save All Portfolio
        </>
      )}
    </Button>

    <ModeToggle />
  </div>
</div>

      {/* LANDING SECTION */}
      <div className="mb-8 p-6 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--card-foreground)] dark:text-[var(--card-foreground)]">Landing Page</h2>
        <Button 
          onClick={saveAllData} 
          disabled={updatingSection === 'all'}
          size="lg"
          className="px-6 py-2"
        >
          {updatingSection === 'all' ? (
            <>
              <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
              Saving All...
            </>
          ) : (
            <>
              <CheckCircle/>
            </>
          )}
        </Button>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Greeting"
            value={portfolioData.Landingdata.data.greeting}
            onChange={(e) =>
              handleLandingChange("greeting", e.target.value)
            }
            className={`w-full ${dirtyFields.landing.greeting ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
          />

          <Input
            className={`w-full ${dirtyFields.landing.role ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
            placeholder="Role"
            value={portfolioData.Landingdata.data.role}
            onChange={(e) =>
              handleLandingChange("role", e.target.value)
            }
          />

          <Input
            className={`w-full ${dirtyFields.landing.description ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
            placeholder="Description"
            value={portfolioData.Landingdata.data.description}
            onChange={(e) =>
              handleLandingChange("description", e.target.value)
            }
          />

          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleLandingButtonClick} 
              variant="outline" 
              className="w-fit" 
              disabled={updatingSection === 'landing'}
            >
              Select Picture
            </Button>

            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              ref={landingFileInputRef}
              className="hidden"
              onChange={(e) =>
                handleLandingImage(e.target.files?.[0] || null)
              }
            />

            {portfolioData.Landingdata.data.preview && (
              <div className={`inline-block p-1 rounded ${dirtyFields.landing.profilePicture ? "border-2 border-amber-300" : ""}`}>
                <img
                  src={portfolioData.Landingdata.data.preview}
                  className="h-24 w-auto rounded border border-[var(--border)]"
                  alt="Profile preview"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PROJECTS SECTION */}
      <div className="mb-8 p-6 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--card-foreground)] dark:text-[var(--card-foreground)]">Projects</h2>
          <div className="flex gap-3">
        <Button 
          onClick={saveAllData} 
          disabled={updatingSection === 'all'}
          size="lg"
          className="px-6 py-2"
        >
          {updatingSection === 'all' ? (
            <>
              <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
              Saving All...
            </>
          ) : (
            <>
              <CheckCircle/>
            </>
          )}
        </Button>
          </div>
        </div>

        <div className="space-y-6">
          {portfolioData.ProjectsData.data.map((project: any, index: number) => (
            <div key={index} className="border border-[var(--border)] p-6 rounded-lg bg-[var(--bg-light-secondary)] dark:bg-[var(--bg-subtle)]">
              <div className="space-y-4">
                <Input
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) =>
                    handleProjectChange(index, "title", e.target.value)
                  }
                  className={`w-full ${dirtyFields.projects[index]?.title ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
                />

                <Input
                  className={`w-full ${dirtyFields.projects[index]?.short ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
                  placeholder="Short Description"
                  value={project.short}
                  onChange={(e) =>
                    handleProjectChange(index, "short", e.target.value)
                  }
                />

                <Input
                  className={`w-full ${dirtyFields.projects[index]?.details ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
                  placeholder="Details"
                  value={project.details}
                  onChange={(e) =>
                    handleProjectChange(index, "details", e.target.value)
                  }
                />

                <Input
                  className={`w-full ${dirtyFields.projects[index]?.link ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
                  placeholder="Project Link"
                  value={project.link}
                  onChange={(e) =>
                    handleProjectChange(index, "link", e.target.value)
                  }
                />

                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={() => handleProjectButtonClick(index)} 
                    variant="outline" 
                    className="w-fit" 
                    disabled={updatingSection === 'projects'}
                  >
                    Select Picture
                  </Button>

                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    ref={projectFileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      if (activeProjectIndex !== null) {
                        handleProjectImage(activeProjectIndex, e.target.files?.[0] || null);
                        setActiveProjectIndex(null);
                      }
                    }}
                  />

                  {project.preview && (
                    <div className={`inline-block p-1 rounded ${dirtyFields.projects[index]?.image ? "border-2 border-amber-300" : ""}`}>
                      <img src={project.preview} className="h-20 w-auto rounded border border-[var(--border)]" alt="Project preview" />
                    </div>
                  )}
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeProject(index)}
                  disabled={updatingSection === 'projects'}
                  className="mt-2"
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Remove Project
                </Button>
              </div>
            </div>
          ))}

          {portfolioData.ProjectsData.data.length === 0 && (
            <p className="text-center text-[var(--muted-foreground)] py-8">
              No projects added yet. Click "Add Project" to get started.
            </p>
          )}
        </div>
            <Button onClick={addProject} size="sm" variant="outline" disabled={updatingSection === 'projects'} className="mt-4">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Project
            </Button>
      </div>

      {/* ABOUT SECTION */}
      <div className="mb-8 p-6 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--card-foreground)] dark:text-[var(--card-foreground)]">About Me</h2>
        <Button 
          onClick={saveAllData} 
          disabled={updatingSection === 'all'}
          size="lg"
          className="px-6 py-2"
        >
          {updatingSection === 'all' ? (
            <>
              <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
              Saving All...
            </>
          ) : (
            <>
              <CheckCircle/>
            </>
          )}
        </Button>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Subtitle"
            value={portfolioData.AboutMeData.subTitle}
            onChange={(e) =>
              handleAboutChange("subTitle", e.target.value)
            }
            className={`w-full ${dirtyFields.about.subTitle ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
          />

          <Input
            className={`w-full ${dirtyFields.about.whoIam ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
            placeholder="Who I Am"
            value={portfolioData.AboutMeData.whoIam}
            onChange={(e) =>
              handleAboutChange("whoIam", e.target.value)
            }
          />

          <Input
            className={`w-full ${dirtyFields.about.experience ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
            placeholder="Years of Experience"
            value={portfolioData.AboutMeData.experience}
            onChange={(e) =>
              handleAboutChange("experience", e.target.value)
            }
          />

          <Input
            className={`w-full ${dirtyFields.about.projects ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
            placeholder="Projects Completed"
            value={portfolioData.AboutMeData.projects}
            onChange={(e) =>
              handleAboutChange("projects", e.target.value)
            }
          />

          <div className="flex justify-between items-center pt-4">
            <h3 className="text-lg font-medium text-[var(--card-foreground)] dark:text-[var(--card-foreground)]">Skills</h3>
          </div>

          <div className="space-y-3">
            {portfolioData.AboutMeData.skills.map((skill: any, index: number) => (
              <div key={index} className="flex gap-3 items-start">
                <Input
                  placeholder="Skill name"
                  value={skill.name}
                  onChange={(e) =>
                    handleSkillChange(index, "name", e.target.value)
                  }
                  className={`flex-1 ${dirtyFields.aboutSkills[index]?.name ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
                />
                <Input
                  type="number"
                  placeholder="Level (0-100)"
                  min={0}
                  max={100}
                  step={5}
                  value={skill.level}
                  onChange={(e) =>
                    handleSkillChange(
                      index,
                      "level",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className={`w-32 ${dirtyFields.aboutSkills[index]?.level ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(index)}
                  disabled={updatingSection === 'about'}
                  className="px-3"
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}

            {portfolioData.AboutMeData.skills.length === 0 && (
              <p className="text-center text-[var(--muted-foreground)] py-4">
                No skills added yet. Click "Add Skill" to get started.
              </p>
            )}
          </div>
        </div>

            <Button onClick={addSkill} size="sm" variant="outline" disabled={updatingSection === 'about'} className="mt-4">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
      </div>

      {/* FOOTER SECTION */}
      <div className="mb-8 p-6 bg-[var(--card)] dark:bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--card-foreground)] dark:text-[var(--card-foreground)]">Footer</h2>
        <Button 
          onClick={saveAllData} 
          disabled={updatingSection === 'all'}
          size="lg"
          className="px-6 py-2"
        >
          {updatingSection === 'all' ? (
            <>
              <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
              Saving All...
            </>
          ) : (
            <>
              <CheckCircle/>
            </>
          )}
        </Button>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Footer Title"
            value={portfolioData.FooterData.title}
            onChange={(e) => {
              markFooterDirty('title');
              setPortfolioData({
                ...portfolioData,
                FooterData: {
                  ...portfolioData.FooterData,
                  title: e.target.value
                }
              })
            }}
            className={`w-full ${dirtyFields.footer.title ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
          />

          <div className="flex justify-between items-center pt-4">
            <h3 className="text-lg font-medium text-[var(--card-foreground)] dark:text-[var(--card-foreground)]">Social Links</h3>
          </div>

          <div className="space-y-3">
            {portfolioData.FooterData.socialLinks.map((social: any, index: number) => (
              <div key={index} className="flex gap-3 items-start">
                <Input
                  placeholder="Platform name (e.g., GitHub)"
                  value={social.name}
                  onChange={(e) =>
                    handleSocialChange(index, "name", e.target.value)
                  }
                  className={`flex-1 ${dirtyFields.footerSocials[index]?.name ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
                />
                <Input
                  placeholder="URL"
                  value={social.url}
                  onChange={(e) =>
                    handleSocialChange(index, "url", e.target.value)
                  }
                  className={`flex-1 ${dirtyFields.footerSocials[index]?.url ? "border-amber-300 dark:border-amber-700 focus-visible:ring-amber-300" : ""}`}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSocial(index)}
                  disabled={updatingSection === 'footer'}
                  className="px-3"
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}

            {portfolioData.FooterData.socialLinks.length === 0 && (
              <p className="text-center text-[var(--muted-foreground)] py-4">
                No social links added yet. Click "Add Social Link" to get started.
              </p>
            )}
          </div>
        </div>

            <Button onClick={addSocial} size="sm" variant="outline" disabled={updatingSection === 'footer'} className="mt-4">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Social Link
            </Button>
      </div>
    </div>
  )
}