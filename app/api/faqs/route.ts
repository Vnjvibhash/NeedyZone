import { NextResponse } from "next/server"
import { getStoredFAQs, writeStoredFAQs, type FAQ } from "@/lib/faqs-data"

export async function GET() {
  try {
    const faqs = getStoredFAQs()
    return NextResponse.json(faqs, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch FAQs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { question, answer, category } = body

    if (!question || !answer || !category) {
      return NextResponse.json({ error: "Question, answer, and category are required." }, { status: 400 })
    }

    const currentFAQs = getStoredFAQs()
    const newFAQ: FAQ = {
      id: `faq-${Date.now()}`,
      question,
      answer,
      category,
    }

    currentFAQs.push(newFAQ)
    writeStoredFAQs(currentFAQs)

    return NextResponse.json({ success: true, faq: newFAQ }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to add FAQ" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, question, answer, category } = body

    if (!id || !question || !answer || !category) {
      return NextResponse.json({ error: "Missing required fields for update." }, { status: 400 })
    }

    const currentFAQs = getStoredFAQs()
    const faqIndex = currentFAQs.findIndex((f) => f.id === id)

    if (faqIndex === -1) {
      return NextResponse.json({ error: "FAQ not found." }, { status: 404 })
    }

    const updatedFAQ: FAQ = {
      id,
      question,
      answer,
      category,
    }

    currentFAQs[faqIndex] = updatedFAQ
    writeStoredFAQs(currentFAQs)

    return NextResponse.json({ success: true, faq: updatedFAQ }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update FAQ" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "FAQ ID is required." }, { status: 400 })
    }

    const currentFAQs = getStoredFAQs()
    const filteredFAQs = currentFAQs.filter((f) => f.id !== id)

    if (filteredFAQs.length === currentFAQs.length) {
      return NextResponse.json({ error: "FAQ not found." }, { status: 404 })
    }

    writeStoredFAQs(filteredFAQs)
    return NextResponse.json({ success: true, message: "FAQ deleted successfully." }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete FAQ" }, { status: 500 })
  }
}
