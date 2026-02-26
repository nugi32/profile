'use client'

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SaveIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"
import { AlertCircleIcon } from "lucide-react"

function SuccessAlert() {
  return (
    <Alert className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>Data updated successfully</AlertTitle>
      <AlertDescription>
        Your data information has been saved. Changes will be reflected
        immediately.
      </AlertDescription>
    </Alert>
  )
}

function AlertDestructive(errMeassage: string, errDescription: string) {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>{errMeassage}</AlertTitle>
      <AlertDescription>
        {errDescription}
      </AlertDescription>
    </Alert>
  )
}

export default function AdminPage() {
    const [portfolioData, setPortfolioData] = useState<any>({
        landingPage: {
            title: "",
            subtitle: "",
            smallTitle: "",
            heroImage: "",
            heroImageFile: null,
            heroImagePreview: ""
        },
        projects: [
            { id: 1, title: "", description: "", image: "", imageFile: null, imagePreview: "", link: "", technologies: "" },
            { id: 2, title: "", description: "", image: "", imageFile: null, imagePreview: "", link: "", technologies: "" }
        ],
        about: {
            bio: "",
            avatar: "",
            avatarFile: null,
            avatarPreview: "",
            skills: [""]
        },
        contact: {
            email: "",
            github: "",
            linkedin: "",
            twitter: ""
        }
    })

    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string; description: string } | null>(null)

    const handleLandingPageChange = (field: string, value: string) => {
        setPortfolioData({
            ...portfolioData,
            landingPage: {
                ...portfolioData.landingPage,
                [field]: value
            }
        })
    }

    const handleProjectChange = (index: number, field: string, value: string): void => {
        const updatedProjects = [...portfolioData.projects]
        updatedProjects[index] = {
            ...updatedProjects[index],
            [field]: value
        }
        setPortfolioData({
            ...portfolioData,
            projects: updatedProjects
        })
    }

    const handleProjectImageChange = (index: number, file?: File | null): void => {
        const updatedProjects = [...portfolioData.projects]
        const preview = file ? URL.createObjectURL(file) : null
        updatedProjects[index] = {
            ...updatedProjects[index],
            imageFile: file || null,
            imagePreview: preview || null
        }
        setPortfolioData({
            ...portfolioData,
            projects: updatedProjects
        })
    }

    const handleLandingImageChange = (file?: File | null) => {
        const preview = file ? URL.createObjectURL(file) : ""
        setPortfolioData({
            ...portfolioData,
            landingPage: {
                ...portfolioData.landingPage,
                heroImageFile: file || null,
                heroImagePreview: preview || ""
            }
        })
    }

    const handleAboutAvatarChange = (file?: File | null) => {
        const preview = file ? URL.createObjectURL(file) : ""
        setPortfolioData({
            ...portfolioData,
            about: {
                ...portfolioData.about,
                avatarFile: file || null,
                avatarPreview: preview || ""
            }
        })
    }

    const handleAboutChange = (
        field: keyof typeof portfolioData.about,
        value: string | string[]
    ) => {
        setPortfolioData({
            ...portfolioData,
            about: {
                ...portfolioData.about,
                [field]: value
            }
        })
    }

    const handleContactChange = (field: string, value: string) => {
        setPortfolioData({
            ...portfolioData,
            contact: {
                ...portfolioData.contact,
                [field]: value
            }
        })
    }

    const addProject = () => {
        setPortfolioData({
            ...portfolioData,
            projects: [
                ...portfolioData.projects,
                { id: Date.now(), title: "", description: "", image: "", imageFile: null, imagePreview: "", link: "", technologies: "" }
            ]
        })
    }

    const removeProject = (id: number) => {
        setPortfolioData({
            ...portfolioData,
            projects: portfolioData.projects.filter((project: any) => project.id !== id)
        })
    }

    const saveData = async (): Promise<void> => {
        // Upload projects (including image files) to backend
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

        const uploadPromises = portfolioData.projects.map(async (project: any) => {
            // Skip projects without title and description
            if (!project.title && !project.description) {
                return null
            }

            const form = new FormData()
            form.append("title", project.title || "")
            form.append("description", project.description || "")
            form.append("link", project.link || "")
            form.append("technologies", project.technologies || "")
            if (project.imageFile) {
                form.append("image", project.imageFile)
            }

            try {
                const res = await fetch(`${backendUrl}/api/projects`, {
                    method: "POST",
                    body: form
                })
                if (!res.ok) {
                    const errorData = await res.text()
                    throw new Error(`Upload failed: ${errorData}`)
                }
                return await res.json()
            } catch (err) {
                console.error("Project upload error:", err)
                throw err
            }
        })

        try {
            const results = await Promise.all(uploadPromises)
            console.log("Save results:", results)
            
            // Show success alert
            setAlert({
                type: 'success',
                message: 'Data updated successfully',
                description: 'Your data information has been saved. Changes will be reflected immediately.'
            })
            
            // Auto-hide alert after 5 seconds
            setTimeout(() => setAlert(null), 5000)
        } catch (error) {
            console.error("Save error:", error)
            
            // Show error alert
            setAlert({
                type: 'error',
                message: 'Failed to save data',
                description: 'An error occurred while saving your data. Please try again.'
            })
            
            // Auto-hide alert after 5 seconds
            setTimeout(() => setAlert(null), 5000)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="container mx-auto p-6 max-w-4xl">
                {/* Alert Messages */}
                {alert && (
                    <div className="mb-6">
                        {alert.type === 'success' ? (
                            <SuccessAlert />
                        ) : (
                            AlertDestructive(alert.message, alert.description)
                        )}
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h1>
                    <Button 
                        onClick={saveData} 
                        className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                    >
                        <SaveIcon className="h-4 w-4" />
                        Save All Changes
                    </Button>
                </div>

                {/* Landing Page Section */}
                <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors duration-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Landing Page
                    </h2>
                    
                    <Field className="mb-4">
                        <FieldLabel 
                            htmlFor="hero-title"
                            className="text-gray-700 dark:text-gray-200"
                        >
                            Hero Title
                        </FieldLabel>
                        <Input 
                            id="hero-title" 
                            placeholder="John Doe" 
                            value={portfolioData.landingPage.title}
                            onChange={(e) => handleLandingPageChange("title", e.target.value)}
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                        <FieldDescription className="text-gray-500 dark:text-gray-400">
                            Your main headline (e.g., "John Doe - Full Stack Developer")
                        </FieldDescription>
                    </Field>

                    <Field className="mb-4">
                        <FieldLabel 
                            htmlFor="hero-title"
                            className="text-gray-700 dark:text-gray-200"
                        >
                            Hero Small Title
                        </FieldLabel>
                        <Input 
                            id="hero-small-title" 
                            placeholder="Web 3 - Full Stack Developer" 
                            value={portfolioData.landingPage.smallTitle}
                            onChange={(e) => handleLandingPageChange("smallTitle", e.target.value)}
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                        <FieldDescription className="text-gray-500 dark:text-gray-400">
                            Your small headline (e.g., "Web 3 - Full Stack Developer")
                        </FieldDescription>
                    </Field>

                    <Field className="mb-4">
                        <FieldLabel 
                            htmlFor="hero-subtitle"
                            className="text-gray-700 dark:text-gray-200"
                        >
                            Hero Subtitle
                        </FieldLabel>
                        <Input 
                            id="hero-subtitle" 
                            placeholder="Building amazing web experiences" 
                            value={portfolioData.landingPage.subtitle}
                            onChange={(e) => handleLandingPageChange("subtitle", e.target.value)}
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </Field>

                    <Field className="mb-4">
                        <FieldLabel 
                            htmlFor="hero-image"
                            className="text-gray-700 dark:text-gray-200"
                        >
                            Hero Image
                        </FieldLabel>
                        <input
                            id="hero-image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleLandingImageChange(e.target.files ? e.target.files[0] : null)}
                            className="mt-2 text-sm text-gray-600 dark:text-gray-300"
                        />
                        {portfolioData.landingPage.heroImagePreview ? (
                            <img src={portfolioData.landingPage.heroImagePreview} alt="hero preview" className="mt-2 h-24 w-auto rounded" />
                        ) : portfolioData.landingPage.heroImage ? (
                            <img src={`/${portfolioData.landingPage.heroImage}`} alt="hero" className="mt-2 h-24 w-auto rounded" />
                        ) : null}
                        <FieldDescription className="text-gray-500 dark:text-gray-400">
                            Upload your profile picture or hero background
                        </FieldDescription>
                    </Field>
                </div>

                {/* Projects Section */}
                <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Projects
                        </h2>
                        <Button 
                            variant="outline" 
                            onClick={addProject} 
                            className="gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add Project
                        </Button>
                    </div>

                    {portfolioData.projects.map((project: any, index: number) => (
                        <div 
                            key={project.id} 
                            className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900/50 transition-colors duration-200"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                                    Project {index + 1}
                                </h3>
                                {portfolioData.projects.length > 1 && (
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => removeProject(project.id)}
                                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                            <Field className="mb-3">
                                <FieldLabel className="text-gray-700 dark:text-gray-200">
                                    Project Title
                                </FieldLabel>
                                <Input 
                                    placeholder="E-Commerce Platform" 
                                    value={project.title}
                                    onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                />
                            </Field>

                            <Field className="mb-3">
                                <FieldLabel className="text-gray-700 dark:text-gray-200">
                                    Description
                                </FieldLabel>
                                <Input 
                                    placeholder="A full-stack e-commerce solution..." 
                                    value={project.description}
                                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                />
                            </Field>

                            <Field className="mb-3">
                                <FieldLabel className="text-gray-700 dark:text-gray-200">
                                    Project Image
                                </FieldLabel>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleProjectImageChange(index, e.target.files ? e.target.files[0] : null)}
                                    className="mt-2 text-sm text-gray-600 dark:text-gray-300"
                                />
                                {project.imagePreview ? (
                                    <img src={project.imagePreview} alt="project preview" className="mt-2 h-32 w-auto rounded" />
                                ) : project.image ? (
                                    <img src={`/${project.image}`} alt="project" className="mt-2 h-32 w-auto rounded" />
                                ) : null}
                                <FieldDescription className="text-gray-500 dark:text-gray-400">
                                    Upload your project image
                                </FieldDescription>
                            </Field>

                            <Field className="mb-3">
                                <FieldLabel className="text-gray-700 dark:text-gray-200">
                                    Project Link
                                </FieldLabel>
                                <Input 
                                    placeholder="https://github.com/username/project" 
                                    value={project.link}
                                    onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                />
                            </Field>

                            <Field className="mb-3">
                                <FieldLabel className="text-gray-700 dark:text-gray-200">
                                    Technologies
                                </FieldLabel>
                                <Input 
                                    placeholder="React, Node.js, MongoDB" 
                                    value={project.technologies}
                                    onChange={(e) => handleProjectChange(index, "technologies", e.target.value)}
                                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                />
                                <FieldDescription className="text-gray-500 dark:text-gray-400">
                                    Comma-separated list of technologies used
                                </FieldDescription>
                            </Field>
                        </div>
                    ))}
                </div>

                {/* About Section */}
                <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors duration-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        About Me
                    </h2>

                    <Field className="mb-4">
                        <FieldLabel className="text-gray-700 dark:text-gray-200">
                            Bio
                        </FieldLabel>
                        <Input 
                            placeholder="Write a brief introduction about yourself..." 
                            value={portfolioData.about.bio}
                            onChange={(e) => handleAboutChange("bio", e.target.value)}
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </Field>

                    <Field className="mb-4">
                        <FieldLabel className="text-gray-700 dark:text-gray-200">
                            Avatar
                        </FieldLabel>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleAboutAvatarChange(e.target.files ? e.target.files[0] : null)}
                            className="mt-2 text-sm text-gray-600 dark:text-gray-300"
                        />
                        {portfolioData.about.avatarPreview ? (
                            <img src={portfolioData.about.avatarPreview} alt="avatar preview" className="mt-2 h-20 w-20 rounded-full" />
                        ) : portfolioData.about.avatar ? (
                            <img src={`/${portfolioData.about.avatar}`} alt="avatar" className="mt-2 h-20 w-20 rounded-full" />
                        ) : null}
                    </Field>

                    <Field className="mb-4">
                        <FieldLabel className="text-gray-700 dark:text-gray-200">
                            Skills
                        </FieldLabel>
                        <Input 
                            placeholder="React, TypeScript, Node.js, Python" 
                            value={portfolioData.about.skills.join(", ")}
                            onChange={(e) => handleAboutChange("skills", e.target.value.split(",").map(s => s.trim()))}
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                        <FieldDescription className="text-gray-500 dark:text-gray-400">
                            Comma-separated list of your skills
                        </FieldDescription>
                    </Field>
                </div>

                {/* Contact Section */}
                <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors duration-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Contact Information
                    </h2>

                    <Field className="mb-4">
                        <FieldLabel className="text-gray-700 dark:text-gray-200">
                            Email
                        </FieldLabel>
                        <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            value={portfolioData.contact.email}
                            onChange={(e) => handleContactChange("email", e.target.value)}
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </Field>

                    <Field className="mb-4">
                        <FieldLabel className="text-gray-700 dark:text-gray-200">
                            GitHub
                        </FieldLabel>
                        <Input 
                            placeholder="https://github.com/username" 
                            value={portfolioData.contact.github}
                            onChange={(e) => handleContactChange("github", e.target.value)}
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </Field>

                    <Field className="mb-4">
                        <FieldLabel className="text-gray-700 dark:text-gray-200">
                            LinkedIn
                        </FieldLabel>
                        <Input 
                            placeholder="https://linkedin.com/in/username" 
                            value={portfolioData.contact.linkedin}
                            onChange={(e) => handleContactChange("linkedin", e.target.value)}
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </Field>

                    <Field className="mb-4">
                        <FieldLabel className="text-gray-700 dark:text-gray-200">
                            Twitter
                        </FieldLabel>
                        <Input 
                            placeholder="https://twitter.com/username" 
                            value={portfolioData.contact.twitter}
                            onChange={(e) => handleContactChange("twitter", e.target.value)}
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </Field>
                </div>

                {/* Save Button (Bottom) */}
                <div className="flex justify-end gap-4 mt-6">
                    <Button 
                        variant="outline" 
                        onClick={() => window.location.reload()}
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={saveData} 
                        className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                    >
                        <SaveIcon className="h-4 w-4" />
                        Save Portfolio
                    </Button>
                </div>
            </div>
        </div>
    )
}