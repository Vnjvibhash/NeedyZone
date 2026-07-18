import fs from "fs"
import path from "path"

export interface FAQ {
  id: string
  question: string
  answer: string
  category: "General" | "Dealers" | "Technical" | "Products"
}

const faqsFilePath = path.join(process.cwd(), "data", "faqs.json")

export function getStoredFAQs(): FAQ[] {
  try {
    if (fs.existsSync(faqsFilePath)) {
      const data = fs.readFileSync(faqsFilePath, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Failed to read FAQs database", error)
  }
  return []
}

export function writeStoredFAQs(faqs: FAQ[]) {
  try {
    const dir = path.dirname(faqsFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(faqsFilePath, JSON.stringify(faqs, null, 2), "utf8")
  } catch (error) {
    console.error("Failed to write FAQs database", error)
  }
}
