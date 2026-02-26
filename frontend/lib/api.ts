const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// Landing Page Data
export interface LandingPageData {
  title: string
  subtitle: string
  smallTitle: string
  heroImage: string
}

export async function getLandingPage(): Promise<LandingPageData> {
  try {
    const response = await fetch(`${API_URL}/api/landing`)
    if (!response.ok) throw new Error("Failed to fetch landing page")
    const data = await response.json()
    // Return first entry if array, otherwise return as is
    return Array.isArray(data) && data.length > 0 ? data[0] : (data.title ? data : {
      title: "Portfolio",
      subtitle: "Building amazing web experiences",
      smallTitle: "Web Developer",
      heroImage: ""
    })
  } catch (error) {
    console.error("Error fetching landing page:", error)
    return {
      title: "Portfolio",
      subtitle: "Building amazing web experiences",
      smallTitle: "Web Developer",
      heroImage: ""
    }
  }
}

// Project Data
export interface Project {
  id: string
  title: string
  description: string
  image: string
  link: string
  technologies: string
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_URL}/api/projects`)
    if (!response.ok) throw new Error("Failed to fetch projects")
    return await response.json()
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

// About Data
export interface AboutData {
  bio: string
  avatar: string
  skills: string[]
}

export async function getAbout(): Promise<AboutData> {
  try {
    const response = await fetch(`${API_URL}/api/about`)
    if (!response.ok) throw new Error("Failed to fetch about data")
    return await response.json()
  } catch (error) {
    console.error("Error fetching about data:", error)
    return {
      bio: "",
      avatar: "",
      skills: []
    }
  }
}

// Contact Data
export interface ContactData {
  email: string
  github: string
  linkedin: string
  twitter: string
}

export async function getContact(): Promise<ContactData> {
  try {
    const response = await fetch(`${API_URL}/api/contact`)
    if (!response.ok) throw new Error("Failed to fetch contact data")
    return await response.json()
  } catch (error) {
    console.error("Error fetching contact data:", error)
    return {
      email: "",
      github: "",
      linkedin: "",
      twitter: ""
    }
  }
}

// Combined Portfolio Data
export interface PortfolioData {
  landingPage: LandingPageData
  projects: Project[]
  about: AboutData
  contact: ContactData
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [landingPage, projects, about, contact] = await Promise.all([
    getLandingPage(),
    getProjects(),
    getAbout(),
    getContact()
  ])

  return {
    landingPage,
    projects,
    about,
    contact
  }
}
