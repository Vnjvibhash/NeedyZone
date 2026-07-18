import { NextResponse } from "next/server"
import { getStoredInquiries, writeStoredInquiries, type Inquiry } from "@/lib/inquiries-data"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      phone,
      company,
      type = "product",
      business,
      region,
      productName,
      quantity,
      message,
    } = body

    // 1. Basic validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required fields." },
        { status: 400 }
      )
    }

    // 2. Record the inquiry locally in data/inquiries.json
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      phone,
      company: company || undefined,
      type,
      business: business || undefined,
      region: region || undefined,
      productName: productName || undefined,
      quantity: quantity || undefined,
      message: message || undefined,
      status: "Pending",
      date: new Date().toISOString(),
    }

    try {
      const currentInquiries = getStoredInquiries()
      currentInquiries.push(newInquiry)
      writeStoredInquiries(currentInquiries)
    } catch (dbError) {
      console.error("Failed to write to local inquiries database", dbError)
    }

    // 3. Forward submission to Formspree
    let formspreeSuccess = false
    try {
      const formspreeResponse = await fetch("https://formspree.io/f/mdaqerbl", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      if (formspreeResponse.ok) {
        formspreeSuccess = true
      } else {
        console.error("Formspree rejected submission:", await formspreeResponse.text())
      }
    } catch (forwardError) {
      console.error("Failed to forward inquiry to Formspree:", forwardError)
    }

    return NextResponse.json(
      {
        success: true,
        recordedLocally: true,
        forwardedToFormspree: formspreeSuccess,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error handling contact submission:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to submit message." },
      { status: 500 }
    )
  }
}
