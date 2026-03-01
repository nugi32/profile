// Utility function to get full image URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return ""
  
  // If already full URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath
  }
  
  // If relative path, prepend API URL
  if (imagePath.startsWith("/")) {
    return `${API_URL}${imagePath}`
  }
  
  // Default fallback
  return `${API_URL}/${imagePath}`
}
