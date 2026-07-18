import { NextResponse } from "next/server"
import { getStoredInquiries, writeStoredInquiries, type Inquiry } from "@/lib/inquiries-data"

export async function GET() {
  try {
    const inquiries = getStoredInquiries()
    // Sort inquiries by date descending so the newest show first
    const sorted = [...inquiries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return NextResponse.json(sorted, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch inquiries" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: "Inquiry ID and Status are required." }, { status: 400 })
    }

    const currentInquiries = getStoredInquiries()
    const index = currentInquiries.findIndex((inq) => inq.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 })
    }

    currentInquiries[index].status = status
    writeStoredInquiries(currentInquiries)

    return NextResponse.json({ success: true, inquiry: currentInquiries[index] }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update inquiry status" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required." }, { status: 400 })
    }

    const currentInquiries = getStoredInquiries()
    const filtered = currentInquiries.filter((inq) => inq.id !== id)

    if (filtered.length === currentInquiries.length) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 })
    }

    writeStoredInquiries(filtered)
    return NextResponse.json({ success: true, message: "Inquiry deleted successfully." }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete inquiry" }, { status: 500 })
  }
}
