const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// ================= LANDING PAGE =================
export interface LandingData {
  _id?: string
  greeting: string
  role: string
  description: string
  profilePicture: string
}

export async function getLandingPage(): Promise<LandingData> {
  try {
    const response = await fetch(`${API_URL}/api/landing`)
    if (!response.ok) throw new Error("Failed to fetch landing page")
    const data = await response.json()
    return Array.isArray(data) && data.length > 0 ? data[0] : {
      greeting: "",
      role: "",
      description: "",
      profilePicture: ""
    }
  } catch (error) {
    console.error("Error fetching landing page:", error)
    return {
      greeting: "",
      role: "",
      description: "",
      profilePicture: ""
    }
  }
}

// ================= PROJECTS =================
export interface ProjectData {
  _id?: string
  title: string
  short: string
  details: string
  image: string
  link: string
}

export async function getProjects(): Promise<ProjectData[]> {
  try {
    const response = await fetch(`${API_URL}/api/projects`)
    if (!response.ok) throw new Error("Failed to fetch projects")
    return await response.json()
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

// ================= ABOUT =================
export interface Skill {
  name: string
  level: number
}

export interface AboutData {
  _id?: string
  subTitle: string
  whoIam: string
  experience: string
  projects: string
  skills: Skill[]
}

export async function getAbout(): Promise<AboutData> {
  try {
    const response = await fetch(`${API_URL}/api/about`)
    if (!response.ok) throw new Error("Failed to fetch about data")
    const data = await response.json()
    return Array.isArray(data) && data.length > 0 ? data[0] : {
      subTitle: "",
      whoIam: "",
      experience: "",
      projects: "",
      skills: []
    }
  } catch (error) {
    console.error("Error fetching about data:", error)
    return {
      subTitle: "",
      whoIam: "",
      experience: "",
      projects: "",
      skills: []
    }
  }
}

// ================= FOOTER =================
export interface SocialLink {
  name: string
  url: string
}

export interface FooterData {
  _id?: string
  title: string
  socialLinks: SocialLink[]
}

export async function getFooter(): Promise<FooterData> {
  try {
    const response = await fetch(`${API_URL}/api/footer`)
    if (!response.ok) throw new Error("Failed to fetch footer data")
    const data = await response.json()
    return Array.isArray(data) && data.length > 0 ? data[0] : {
      title: "",
      socialLinks: []
    }
  } catch (error) {
    console.error("Error fetching footer data:", error)
    return {
      title: "",
      socialLinks: []
    }
  }
}

// ================= CONTACT =================
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
    const data = await response.json()
    return Array.isArray(data) && data.length > 0 ? data[0] : {
      email: "",
      github: "",
      linkedin: "",
      twitter: ""
    }
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

// ================= PORTFOLIO (Save All) =================
export interface PortfolioPayload {
  Landingdata: {
    section: string
    data: LandingData & { profilePictureFile?: File; preview?: string }
  }
  ProjectsData: {
    section: string
    data: Array<ProjectData & { imageFile?: File; preview?: string }>
  }
  AboutMeData: AboutData
  FooterData: FooterData
}
export async function savePortfolio(portfolioData: PortfolioPayload) {

  const payload = {
    landing: portfolioData.Landingdata.data,
    projects: portfolioData.ProjectsData.data,
    about: portfolioData.AboutMeData,
    footer: portfolioData.FooterData
  }

  const response = await fetch(`${API_URL}/api/portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) throw new Error("Failed to save portfolio")

  return response.json()
}

// ================= GET COMPLETE PORTFOLIO =================
export interface CompletePortfolio {
  Landingdata: {
    section: string
    data: LandingData
  }
  ProjectsData: {
    section: string
    data: ProjectData[]
  }
  AboutMeData: AboutData
  FooterData: FooterData
}

export async function getPortfolio(): Promise<CompletePortfolio> {
  try {
    const response = await fetch(`${API_URL}/api/portfolio`)
    if (!response.ok) throw new Error("Failed to fetch portfolio")
    return await response.json()
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return {
      Landingdata: { section: "LandingPage", data: { greeting: "", role: "", description: "", profilePicture: "" } },
      ProjectsData: { section: "ProjectsPage", data: [] },
      AboutMeData: { subTitle: "", whoIam: "", experience: "", projects: "", skills: [] },
      FooterData: { title: "", socialLinks: [] }
    }
  }
}
