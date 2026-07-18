import { NextResponse } from "next/server"
import { getStoredUsers, writeStoredUsers, type User } from "@/lib/users-data"

export async function GET() {
  try {
    const users = getStoredUsers()
    return NextResponse.json(users, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, role, status = "Active" } = body

    if (!name || !email || !role) {
      return NextResponse.json({ error: "Name, email, and role are required." }, { status: 400 })
    }

    const currentUsers = getStoredUsers()
    
    // Check if email already exists
    if (currentUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: "User with this email already exists." }, { status: 400 })
    }

    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role,
      status,
    }

    currentUsers.push(newUser)
    writeStoredUsers(currentUsers)

    return NextResponse.json({ success: true, user: newUser }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to add user" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, name, email, role, status } = body

    if (!id || !name || !email || !role || !status) {
      return NextResponse.json({ error: "Missing required fields for update." }, { status: 400 })
    }

    const currentUsers = getStoredUsers()
    const userIndex = currentUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found." }, { status: 404 })
    }

    const updatedUser: User = {
      id,
      name,
      email,
      role,
      status,
    }

    currentUsers[userIndex] = updatedUser
    writeStoredUsers(currentUsers)

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 })
    }

    const currentUsers = getStoredUsers()
    const filteredUsers = currentUsers.filter((u) => u.id !== id)

    if (filteredUsers.length === currentUsers.length) {
      return NextResponse.json({ error: "User not found." }, { status: 404 })
    }

    writeStoredUsers(filteredUsers)
    return NextResponse.json({ success: true, message: "User deleted successfully." }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 })
  }
}
