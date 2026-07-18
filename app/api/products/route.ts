import { NextResponse } from "next/server"
import { getStoredProducts, writeStoredProducts, type Product } from "@/lib/products-data"

export async function GET() {
  try {
    const products = getStoredProducts()
    return NextResponse.json(products, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, category, description, price, badge, specs, features, image } = body

    if (!name || !category || !description || !price) {
      return NextResponse.json(
        { error: "Name, category, description, and price are required." },
        { status: 400 }
      )
    }

    if (category !== "cctv" && category !== "switchboard") {
      return NextResponse.json(
        { error: "Invalid category. Must be 'cctv' or 'switchboard'." },
        { status: 400 }
      )
    }

    // Generate unique slug-like ID
    const baseId = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const id = `${baseId}-${randomSuffix}`

    const newProduct: Product = {
      id,
      name,
      category,
      description,
      image: image || "/placeholder.svg",
      price,
      badge: badge || undefined,
      specs: specs || [],
      features: features || [],
    }

    const currentData = getStoredProducts()
    if (category === "cctv") {
      currentData.cctv.push(newProduct)
    } else {
      currentData.switchboard.push(newProduct)
    }

    writeStoredProducts(currentData)

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 })
    }

    const currentData = getStoredProducts()
    const cctvLengthBefore = currentData.cctv.length
    const sbLengthBefore = currentData.switchboard.length

    currentData.cctv = currentData.cctv.filter((p) => p.id !== id)
    currentData.switchboard = currentData.switchboard.filter((p) => p.id !== id)

    if (currentData.cctv.length === cctvLengthBefore && currentData.switchboard.length === sbLengthBefore) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 })
    }

    writeStoredProducts(currentData)

    return NextResponse.json({ success: true, message: "Product deleted successfully." }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete product" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, name, category, description, price, badge, specs, features, image } = body

    if (!id || !name || !category || !description || !price) {
      return NextResponse.json(
        { error: "Product ID, name, category, description, and price are required." },
        { status: 400 }
      )
    }

    if (category !== "cctv" && category !== "switchboard") {
      return NextResponse.json(
        { error: "Invalid category. Must be 'cctv' or 'switchboard'." },
        { status: 400 }
      )
    }

    const currentData = getStoredProducts()
    const allProducts = [...currentData.cctv, ...currentData.switchboard]
    const originalProduct = allProducts.find((p) => p.id === id)

    if (!originalProduct) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 })
    }

    // Remove from both lists to accommodate potential category shifts
    currentData.cctv = currentData.cctv.filter((p) => p.id !== id)
    currentData.switchboard = currentData.switchboard.filter((p) => p.id !== id)

    const updatedProduct: Product = {
      id,
      name,
      category,
      description,
      image: image || originalProduct.image,
      price,
      badge: badge || undefined,
      specs: specs || [],
      features: features || [],
    }

    if (category === "cctv") {
      currentData.cctv.push(updatedProduct)
    } else {
      currentData.switchboard.push(updatedProduct)
    }

    writeStoredProducts(currentData)

    return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 })
  }
}

