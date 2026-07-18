import fs from "fs"
import path from "path"

export interface Review {
  id: string
  author: string
  role: string
  rating: number // 1 to 5
  comment: string
  approved: boolean
  date: string
}

const reviewsFilePath = path.join(process.cwd(), "data", "reviews.json")

export function getStoredReviews(): Review[] {
  try {
    if (fs.existsSync(reviewsFilePath)) {
      const data = fs.readFileSync(reviewsFilePath, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Failed to read reviews database", error)
  }
  return []
}

export function writeStoredReviews(reviews: Review[]) {
  try {
    const dir = path.dirname(reviewsFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), "utf8")
  } catch (error) {
    console.error("Failed to write reviews database", error)
  }
}
