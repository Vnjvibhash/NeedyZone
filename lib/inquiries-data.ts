import fs from "fs"
import path from "path"

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  type: "product" | "dealer" | "contact"
  business?: string
  region?: string
  productName?: string
  quantity?: string
  message?: string
  status: "Pending" | "Reviewed" | "In-Progress" | "Completed"
  date: string
}

const inquiriesFilePath = path.join(process.cwd(), "data", "inquiries.json")

export function getStoredInquiries(): Inquiry[] {
  try {
    if (fs.existsSync(inquiriesFilePath)) {
      const data = fs.readFileSync(inquiriesFilePath, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Failed to read inquiries database", error)
  }
  return []
}

export function writeStoredInquiries(inquiries: Inquiry[]) {
  try {
    const dir = path.dirname(inquiriesFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(inquiriesFilePath, JSON.stringify(inquiries, null, 2), "utf8")
  } catch (error) {
    console.error("Failed to write inquiries database", error)
  }
}
