'use client'

import { useState } from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SaveIcon, PlusIcon, TrashIcon } from "lucide-react"
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react"
import { savePortfolio } from "@/lib/api"

export default function AdminPage() {

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

  const [alert, setAlert] = useState<any>(null)

  /* ================= LANDING ================= */

  const handleLandingChange = (field: string, value: string) => {
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

  /* ================= SAVE ================= */

  const saveData = async () => {
    try {
      await savePortfolio(portfolioData)
      setAlert({ type: "success" })
      setTimeout(() => setAlert(null), 3000)
    } catch (err) {
      setAlert({ type: "error" })
      setTimeout(() => setAlert(null), 3000)
    }
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">

      {alert?.type === "success" && (
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Portfolio saved.</AlertDescription>
        </Alert>
      )}

      {alert?.type === "error" && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to save.</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <Button onClick={saveData}>
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Portfolio
        </Button>
      </div>

      {/* LANDING */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded">
        <h2 className="font-semibold mb-4">Landing</h2>

        <Input
          placeholder="Greeting"
          value={portfolioData.Landingdata.data.greeting}
          onChange={(e) =>
            handleLandingChange("greeting", e.target.value)
          }
        />

        <Input
          className="mt-2"
          placeholder="Role"
          value={portfolioData.Landingdata.data.role}
          onChange={(e) =>
            handleLandingChange("role", e.target.value)
          }
        />

        <Input
          className="mt-2"
          placeholder="Description"
          value={portfolioData.Landingdata.data.description}
          onChange={(e) =>
            handleLandingChange("description", e.target.value)
          }
        />

        <input
          type="file"
          className="mt-4"
          onChange={(e) =>
            handleLandingImage(e.target.files?.[0] || null)
          }
        />

        {portfolioData.Landingdata.data.preview && (
          <img
            src={portfolioData.Landingdata.data.preview}
            className="mt-3 h-24 rounded"
          />
        )}
      </div>

      {/* PROJECTS */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Projects</h2>
          <Button onClick={addProject}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>

        {portfolioData.ProjectsData.data.map((project: any, index: number) => (
          <div key={index} className="border p-4 rounded mb-4">

            <Input
              placeholder="Title"
              value={project.title}
              onChange={(e) =>
                handleProjectChange(index, "title", e.target.value)
              }
            />

            <Input
              className="mt-2"
              placeholder="Short"
              value={project.short}
              onChange={(e) =>
                handleProjectChange(index, "short", e.target.value)
              }
            />

            <Input
              className="mt-2"
              placeholder="Details"
              value={project.details}
              onChange={(e) =>
                handleProjectChange(index, "details", e.target.value)
              }
            />

            <Input
              className="mt-2"
              placeholder="Link"
              value={project.link}
              onChange={(e) =>
                handleProjectChange(index, "link", e.target.value)
              }
            />

            <input
              type="file"
              className="mt-3"
              onChange={(e) =>
                handleProjectImage(index, e.target.files?.[0] || null)
              }
            />

            {project.preview && (
              <img src={project.preview} className="h-20 mt-2 rounded" />
            )}

            <Button
              variant="ghost"
              className="mt-2"
              onClick={() => removeProject(index)}
            >
              <TrashIcon className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded">
        <h2 className="font-semibold mb-4">About Me</h2>

        <Input
          placeholder="Subtitle"
          value={portfolioData.AboutMeData.subTitle}
          onChange={(e) =>
            handleAboutChange("subTitle", e.target.value)
          }
        />

        <Input
          className="mt-2"
          placeholder="Who I Am"
          value={portfolioData.AboutMeData.whoIam}
          onChange={(e) =>
            handleAboutChange("whoIam", e.target.value)
          }
        />

        <Input
          className="mt-2"
          placeholder="Experience"
          value={portfolioData.AboutMeData.experience}
          onChange={(e) =>
            handleAboutChange("experience", e.target.value)
          }
        />

        <Input
          className="mt-2"
          placeholder="Projects Completed"
          value={portfolioData.AboutMeData.projects}
          onChange={(e) =>
            handleAboutChange("projects", e.target.value)
          }
        />

        <div className="flex justify-between mt-4">
          <h3>Skills</h3>
          <Button onClick={addSkill}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>

        {portfolioData.AboutMeData.skills.map((skill: any, index: number) => (
          <div key={index} className="flex gap-2 mt-2">
            <Input
              placeholder="Skill"
              value={skill.name}
              onChange={(e) =>
                handleSkillChange(index, "name", e.target.value)
              }
            />
            <Input
              type="number"
              placeholder="Level"
              value={skill.level}
              onChange={(e) =>
                handleSkillChange(index, "level", Number(e.target.value))
              }
            />
            <Button
              variant="ghost"
              onClick={() => removeSkill(index)}
            >
              <TrashIcon className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded">
        <h2 className="font-semibold mb-4">Footer</h2>

        <Input
          placeholder="Footer Title"
          value={portfolioData.FooterData.title}
          onChange={(e) =>
            setPortfolioData({
              ...portfolioData,
              FooterData: {
                ...portfolioData.FooterData,
                title: e.target.value
              }
            })
          }
        />

        <div className="flex justify-between mt-4">
          <h3>Social Links</h3>
          <Button onClick={addSocial}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>

        {portfolioData.FooterData.socialLinks.map((social: any, index: number) => (
          <div key={index} className="flex gap-2 mt-2">
            <Input
              placeholder="Name"
              value={social.name}
              onChange={(e) =>
                handleSocialChange(index, "name", e.target.value)
              }
            />
            <Input
              placeholder="URL"
              value={social.url}
              onChange={(e) =>
                handleSocialChange(index, "url", e.target.value)
              }
            />
            <Button
              variant="ghost"
              onClick={() => removeSocial(index)}
            >
              <TrashIcon className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

    </div>
  )
}