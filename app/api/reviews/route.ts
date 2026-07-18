import { NextResponse } from "next/server"
import { getStoredReviews, writeStoredReviews, type Review } from "@/lib/reviews-data"

export async function GET() {
  try {
    const reviews = getStoredReviews()
    return NextResponse.json(reviews, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { author, role, rating, comment, approved = false } = body

    if (!author || !role || !rating || !comment) {
      return NextResponse.json({ error: "Author, role, rating, and comment are required." }, { status: 400 })
    }

    const currentReviews = getStoredReviews()
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author,
      role,
      rating: Number(rating),
      comment,
      approved: Boolean(approved),
      date: new Date().toISOString().split("T")[0],
    }

    currentReviews.push(newReview)
    writeStoredReviews(currentReviews)

    return NextResponse.json({ success: true, review: newReview }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to add review" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, author, role, rating, comment, approved } = body

    if (!id) {
      return NextResponse.json({ error: "Review ID is required for update." }, { status: 400 })
    }

    const currentReviews = getStoredReviews()
    const reviewIndex = currentReviews.findIndex((r) => r.id === id)

    if (reviewIndex === -1) {
      return NextResponse.json({ error: "Review not found." }, { status: 404 })
    }

    const original = currentReviews[reviewIndex]
    const updatedReview: Review = {
      id,
      author: author !== undefined ? author : original.author,
      role: role !== undefined ? role : original.role,
      rating: rating !== undefined ? Number(rating) : original.rating,
      comment: comment !== undefined ? comment : original.comment,
      approved: approved !== undefined ? Boolean(approved) : original.approved,
      date: original.date,
    }

    currentReviews[reviewIndex] = updatedReview
    writeStoredReviews(currentReviews)

    return NextResponse.json({ success: true, review: updatedReview }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update review" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Review ID is required." }, { status: 400 })
    }

    const currentReviews = getStoredReviews()
    const filteredReviews = currentReviews.filter((r) => r.id !== id)

    if (filteredReviews.length === currentReviews.length) {
      return NextResponse.json({ error: "Review not found." }, { status: 404 })
    }

    writeStoredReviews(filteredReviews)
    return NextResponse.json({ success: true, message: "Review deleted successfully." }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete review" }, { status: 500 })
  }
}
