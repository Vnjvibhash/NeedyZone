import fs from "fs"
import path from "path"

export interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Customer"
  status: "Active" | "Suspended"
}

const usersFilePath = path.join(process.cwd(), "data", "users.json")

export function getStoredUsers(): User[] {
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Failed to read users database", error)
  }
  return []
}

export function writeStoredUsers(users: User[]) {
  try {
    const dir = path.dirname(usersFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8")
  } catch (error) {
    console.error("Failed to write users database", error)
  }
}
