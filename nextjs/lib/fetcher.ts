import axios from "axios"

const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL ?? process.env.CMS_URL ?? ""

function resolveCmsUrl(endpoint: string) {
  const base = cmsUrl.replace(/\/+$/, "")
  const path = endpoint.replace(/^\/+/, "")
  return `${base}/${path}`
}

export async function fetchFromCms<T>(endpoint: string, fallbackData: T): Promise<T> {
  if (!cmsUrl) {
    console.warn("[fetchFromCms] NEXT_PUBLIC_CMS_URL is not set. Falling back to dummy data.")
    return fallbackData
  }

  try {
    const response = await axios.get<T>(resolveCmsUrl(endpoint), {
      timeout: 5000,
    })

    const backendData = response.data
    const useBackend = backendData === true || Boolean(backendData)

    if (useBackend) {
      return backendData as T
    }

    return fallbackData
  } catch (error) {
    console.warn("[fetchFromCms] request failed, using fallback data.", error)
    return fallbackData
  }
}
