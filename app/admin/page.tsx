"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { toast } from "sonner"
import {
  Plus, Trash2, Search, Camera, ToggleRight, RefreshCw, X,
  Package, ArrowLeft, Settings, PlusCircle, FileText, Pencil,
  Users, MessageSquare, HelpCircle, Star, CheckCircle, XCircle,
  Mail, Phone, Building2, Globe, Clock, ShieldCheck, AlertCircle,
} from "lucide-react"
import Link from "next/link"

// ─── Types ─────────────────────────────────────────────────────────────────

interface Product {
  id: string; name: string; category: "cctv" | "switchboard"
  description: string; image: string; price: string; badge?: string
  specs: { label: string; value: string }[]; features: string[]
}
interface User { id: string; name: string; email: string; role: string; status: string }
interface Inquiry {
  id: string; name: string; email: string; phone: string; company?: string
  type: string; region?: string; productName?: string; quantity?: string
  message?: string; status: string; date: string
}
interface FAQ { id: string; question: string; answer: string; category: string }
interface Review { id: string; author: string; role: string; rating: number; comment: string; approved: boolean; date: string }

// ─── Product Form Presets ───────────────────────────────────────────────────

const imageOptions = {
  cctv: [
    { label: "Dome Camera (Indoor)", value: "/professional-dome-cctv-camera-white-background.jpg" },
    { label: "Bullet Camera (Outdoor)", value: "/outdoor-bullet-cctv-camera-white-background.jpg" },
    { label: "PTZ Camera (Industrial)", value: "/ptz-industrial-cctv-camera-white-background.jpg" },
    { label: "Mini Compact Camera", value: "/mini-compact-indoor-camera-white-background.jpg" },
    { label: "Fisheye Panoramic Camera", value: "/fisheye-panoramic-cctv-camera-white-background.jpg" },
    { label: "Network Video Recorder (NVR)", value: "/network-video-recorder-nvr-device-white-background.jpg" },
  ],
  switchboard: [
    { label: "Home Panel 8-Way", value: "/smart-home-switchboard-panel-white-background.jpg" },
    { label: "Commercial Panel 16-Way", value: "/professional-commercial-switchboard-panel-white-ba.jpg" },
    { label: "Industrial Panel 32-Way", value: "/industrial-electrical-switchboard-panel-white-back.jpg" },
    { label: "Retail Panel 12-Way", value: "/retail-store-switchboard-panel-white-background.jpg" },
    { label: "WiFi Relay Module", value: "/wifi-relay-module-electrical-device-white-backgrou.jpg" },
    { label: "Central Hub Gateway", value: "/smart-home-gateway-hub-device-white-background.jpg" },
  ],
}
const defaultSpecs = {
  cctv: [
    { label: "Resolution", value: "4K (8MP)" }, { label: "Field of View", value: "110°" },
    { label: "Night Vision", value: "30m IR" }, { label: "Storage", value: "Up to 256GB SD" },
    { label: "Power", value: "PoE / 12V DC" }, { label: "Weather Rating", value: "IP67" },
  ],
  switchboard: [
    { label: "Circuits", value: "8 Ways" }, { label: "Max Load", value: "63A" },
    { label: "Connectivity", value: "WiFi / Zigbee" }, { label: "Display", value: "LCD Energy Monitor" },
    { label: "Compatibility", value: "Alexa / Google" }, { label: "Installation", value: "Surface / Flush" },
  ],
}
const defaultFeatures = {
  cctv: ["AI-powered motion detection", "Two-way audio communication", "Smart phone notifications", "Weatherproof construction"],
  switchboard: ["Individual circuit control", "Real-time energy monitoring", "Voice assistant compatible", "Surge protection built-in"],
}

// ─── Status Badge ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Reviewed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    "In-Progress": "bg-purple-500/15 text-purple-400 border-purple-500/30",
    Completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Suspended: "bg-red-500/15 text-red-400 border-red-500/30",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${map[status] ?? "bg-neutral-800 text-neutral-400 border-neutral-700"}`}>
      {status}
    </span>
  )
}

// ─── Section Wrapper ────────────────────────────────────────────────────────

function SectionCard({ title, count, action, children }: { title: string; count?: number; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="bg-neutral-900 border-neutral-800 shadow-xl rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
        <h2 className="font-bold text-neutral-100 tracking-tight">{title}</h2>
        <div className="flex items-center gap-3">
          {count !== undefined && (
            <Badge variant="outline" className="border-neutral-700 text-neutral-400 bg-transparent">{count} items</Badge>
          )}
          {action}
        </div>
      </div>
      {children}
    </Card>
  )
}

// ─── Input Styling Helpers ──────────────────────────────────────────────────
const inputCls = "bg-neutral-950 border-neutral-800 text-neutral-100 focus-visible:ring-blue-500"
const labelCls = "text-neutral-300 text-sm font-medium"

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "inquiries" | "users" | "faqs" | "reviews">("products")
  const [globalLoading, setGlobalLoading] = useState(false)

  // ── Products State ──────────────────────────────────────────────────────
  const [products, setProducts] = useState<{ cctv: Product[]; switchboard: Product[] }>({ cctv: [], switchboard: [] })
  const [productLoading, setProductLoading] = useState(true)
  const [productSearch, setProductSearch] = useState("")
  const [productCatTab, setProductCatTab] = useState<"all" | "cctv" | "switchboard">("all")
  const [productSheetOpen, setProductSheetOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productSubmitting, setProductSubmitting] = useState(false)

  // Product form
  const [pName, setPName] = useState("")
  const [pCategory, setPCategory] = useState<"cctv" | "switchboard">("cctv")
  const [pPrice, setPPrice] = useState("")
  const [pBadge, setPBadge] = useState("")
  const [pImage, setPImage] = useState(imageOptions.cctv[0].value)
  const [pCustomImage, setPCustomImage] = useState("")
  const [pDesc, setPDesc] = useState("")
  const [pSpecs, setPSpecs] = useState<{ label: string; value: string }[]>(defaultSpecs.cctv)
  const [pFeatures, setPFeatures] = useState<string[]>(defaultFeatures.cctv)
  const [pNewFeat, setPNewFeat] = useState("")
  const [pNewSpecLabel, setPNewSpecLabel] = useState("")
  const [pNewSpecVal, setPNewSpecVal] = useState("")

  // ── Inquiries State ─────────────────────────────────────────────────────
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [inquiryLoading, setInquiryLoading] = useState(false)
  const [inquirySearch, setInquirySearch] = useState("")

  // ── Users State ─────────────────────────────────────────────────────────
  const [users, setUsers] = useState<User[]>([])
  const [userLoading, setUserLoading] = useState(false)
  const [userSearch, setUserSearch] = useState("")
  const [userSheetOpen, setUserSheetOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [uName, setUName] = useState("")
  const [uEmail, setUEmail] = useState("")
  const [uRole, setURole] = useState("Customer")
  const [uStatus, setUStatus] = useState("Active")
  const [userSubmitting, setUserSubmitting] = useState(false)

  // ── FAQs State ──────────────────────────────────────────────────────────
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [faqLoading, setFaqLoading] = useState(false)
  const [faqSheetOpen, setFaqSheetOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [fQuestion, setFQuestion] = useState("")
  const [fAnswer, setFAnswer] = useState("")
  const [fCategory, setFCategory] = useState("General")
  const [faqSubmitting, setFaqSubmitting] = useState(false)

  // ── Reviews State ───────────────────────────────────────────────────────
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewSheetOpen, setReviewSheetOpen] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [rAuthor, setRAuthor] = useState("")
  const [rRole, setRRole] = useState("")
  const [rRating, setRRating] = useState(5)
  const [rComment, setRComment] = useState("")
  const [rApproved, setRApproved] = useState(false)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)

  // ══════════════════════════════════════════════════════════════════════
  // DATA FETCHERS
  // ══════════════════════════════════════════════════════════════════════

  const fetchProducts = useCallback(async () => {
    setProductLoading(true)
    try {
      const res = await fetch("/api/products")
      if (res.ok) setProducts(await res.json())
      else toast.error("Failed to load products")
    } catch { toast.error("Network error loading products") }
    finally { setProductLoading(false) }
  }, [])

  const fetchInquiries = useCallback(async () => {
    setInquiryLoading(true)
    try {
      const res = await fetch("/api/inquiries")
      if (res.ok) setInquiries(await res.json())
      else toast.error("Failed to load inquiries")
    } catch { toast.error("Network error loading inquiries") }
    finally { setInquiryLoading(false) }
  }, [])

  const fetchUsers = useCallback(async () => {
    setUserLoading(true)
    try {
      const res = await fetch("/api/users")
      if (res.ok) setUsers(await res.json())
      else toast.error("Failed to load users")
    } catch { toast.error("Network error loading users") }
    finally { setUserLoading(false) }
  }, [])

  const fetchFaqs = useCallback(async () => {
    setFaqLoading(true)
    try {
      const res = await fetch("/api/faqs")
      if (res.ok) setFaqs(await res.json())
      else toast.error("Failed to load FAQs")
    } catch { toast.error("Network error loading FAQs") }
    finally { setFaqLoading(false) }
  }, [])

  const fetchReviews = useCallback(async () => {
    setReviewLoading(true)
    try {
      const res = await fetch("/api/reviews")
      if (res.ok) setReviews(await res.json())
      else toast.error("Failed to load reviews")
    } catch { toast.error("Network error loading reviews") }
    finally { setReviewLoading(false) }
  }, [])

  // Load all on mount, individual sections lazy-load on tab switch
  useEffect(() => { fetchProducts() }, [fetchProducts])
  useEffect(() => {
    if (activeTab === "inquiries" && inquiries.length === 0) fetchInquiries()
    if (activeTab === "users" && users.length === 0) fetchUsers()
    if (activeTab === "faqs" && faqs.length === 0) fetchFaqs()
    if (activeTab === "reviews" && reviews.length === 0) fetchReviews()
  }, [activeTab]) // eslint-disable-line

  const refreshAll = async () => {
    setGlobalLoading(true)
    await Promise.all([fetchProducts(), fetchInquiries(), fetchUsers(), fetchFaqs(), fetchReviews()])
    setGlobalLoading(false)
    toast.success("All data refreshed")
  }

  // ══════════════════════════════════════════════════════════════════════
  // PRODUCTS HANDLERS
  // ══════════════════════════════════════════════════════════════════════

  const resetProductForm = () => {
    setPName(""); setPPrice(""); setPBadge(""); setPCustomImage(""); setPDesc("")
    setPCategory("cctv"); setPImage(imageOptions.cctv[0].value)
    setPSpecs(defaultSpecs.cctv); setPFeatures(defaultFeatures.cctv)
    setPNewFeat(""); setPNewSpecLabel(""); setPNewSpecVal("")
    setEditingProduct(null)
  }

  useEffect(() => {
    if (!editingProduct) {
      setPSpecs(defaultSpecs[pCategory]); setPFeatures(defaultFeatures[pCategory])
      setPImage(imageOptions[pCategory][0].value)
    }
  }, [pCategory, editingProduct])

  const openEditProduct = (p: Product) => {
    setEditingProduct(p); setPName(p.name); setPCategory(p.category)
    setPPrice(p.price); setPBadge(p.badge || ""); setPImage(p.image)
    setPCustomImage(""); setPDesc(p.description)
    setPSpecs(p.specs || []); setPFeatures(p.features || [])
    setProductSheetOpen(true)
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pName || !pPrice || !pDesc) { toast.error("Name, Price, and Description are required"); return }
    setProductSubmitting(true)
    const finalImage = pCustomImage.trim() || pImage
    const payload = {
      id: editingProduct?.id,
      name: pName, category: pCategory,
      price: pPrice.startsWith("$") ? pPrice : `$${pPrice}`,
      badge: pBadge || undefined, description: pDesc,
      image: finalImage, specs: pSpecs, features: pFeatures,
    }
    try {
      const res = await fetch("/api/products", {
        method: editingProduct ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        toast.success(editingProduct ? "Product updated!" : "Product added!")
        setProductSheetOpen(false); resetProductForm(); fetchProducts()
      } else {
        const err = await res.json()
        toast.error(err.error || "Operation failed")
      }
    } catch { toast.error("Network error") }
    finally { setProductSubmitting(false) }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" })
      if (res.ok) { toast.success("Product deleted"); fetchProducts() }
      else { const err = await res.json(); toast.error(err.error || "Delete failed") }
    } catch { toast.error("Network error") }
  }

  // ══════════════════════════════════════════════════════════════════════
  // USERS HANDLERS
  // ══════════════════════════════════════════════════════════════════════

  const resetUserForm = () => { setUName(""); setUEmail(""); setURole("Customer"); setUStatus("Active"); setEditingUser(null) }

  const openEditUser = (u: User) => {
    setEditingUser(u); setUName(u.name); setUEmail(u.email); setURole(u.role); setUStatus(u.status)
    setUserSheetOpen(true)
  }

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uName || !uEmail || !uRole) { toast.error("Name, email, and role are required"); return }
    setUserSubmitting(true)
    const payload = { id: editingUser?.id, name: uName, email: uEmail, role: uRole, status: uStatus }
    try {
      const res = await fetch("/api/users", {
        method: editingUser ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        toast.success(editingUser ? "User updated!" : "User added!")
        setUserSheetOpen(false); resetUserForm(); fetchUsers()
      } else {
        const err = await res.json()
        toast.error(err.error || "Operation failed")
      }
    } catch { toast.error("Network error") }
    finally { setUserSubmitting(false) }
  }

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" })
      if (res.ok) { toast.success("User deleted"); fetchUsers() }
      else { const err = await res.json(); toast.error(err.error || "Delete failed") }
    } catch { toast.error("Network error") }
  }

  // ══════════════════════════════════════════════════════════════════════
  // INQUIRIES HANDLERS
  // ══════════════════════════════════════════════════════════════════════

  const handleInquiryStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) { toast.success(`Status updated to ${status}`); fetchInquiries() }
      else toast.error("Failed to update status")
    } catch { toast.error("Network error") }
  }

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" })
      if (res.ok) { toast.success("Inquiry deleted"); fetchInquiries() }
      else toast.error("Delete failed")
    } catch { toast.error("Network error") }
  }

  // ══════════════════════════════════════════════════════════════════════
  // FAQs HANDLERS
  // ══════════════════════════════════════════════════════════════════════

  const resetFaqForm = () => { setFQuestion(""); setFAnswer(""); setFCategory("General"); setEditingFaq(null) }

  const openEditFaq = (f: FAQ) => {
    setEditingFaq(f); setFQuestion(f.question); setFAnswer(f.answer); setFCategory(f.category)
    setFaqSheetOpen(true)
  }

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fQuestion || !fAnswer || !fCategory) { toast.error("All fields are required"); return }
    setFaqSubmitting(true)
    const payload = { id: editingFaq?.id, question: fQuestion, answer: fAnswer, category: fCategory }
    try {
      const res = await fetch("/api/faqs", {
        method: editingFaq ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        toast.success(editingFaq ? "FAQ updated!" : "FAQ added!")
        setFaqSheetOpen(false); resetFaqForm(); fetchFaqs()
      } else {
        const err = await res.json()
        toast.error(err.error || "Operation failed")
      }
    } catch { toast.error("Network error") }
    finally { setFaqSubmitting(false) }
  }

  const handleDeleteFaq = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return
    try {
      const res = await fetch(`/api/faqs?id=${id}`, { method: "DELETE" })
      if (res.ok) { toast.success("FAQ deleted"); fetchFaqs() }
      else toast.error("Delete failed")
    } catch { toast.error("Network error") }
  }

  // ══════════════════════════════════════════════════════════════════════
  // REVIEWS HANDLERS
  // ══════════════════════════════════════════════════════════════════════

  const resetReviewForm = () => {
    setRAuthor(""); setRRole(""); setRRating(5); setRComment(""); setRApproved(false); setEditingReview(null)
  }

  const openEditReview = (r: Review) => {
    setEditingReview(r); setRAuthor(r.author); setRRole(r.role)
    setRRating(r.rating); setRComment(r.comment); setRApproved(r.approved)
    setReviewSheetOpen(true)
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rAuthor || !rRole || !rComment) { toast.error("All fields are required"); return }
    setReviewSubmitting(true)
    const payload = { id: editingReview?.id, author: rAuthor, role: rRole, rating: rRating, comment: rComment, approved: rApproved }
    try {
      const res = await fetch("/api/reviews", {
        method: editingReview ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        toast.success(editingReview ? "Review updated!" : "Review added!")
        setReviewSheetOpen(false); resetReviewForm(); fetchReviews()
      } else {
        const err = await res.json()
        toast.error(err.error || "Operation failed")
      }
    } catch { toast.error("Network error") }
    finally { setReviewSubmitting(false) }
  }

  const handleToggleApproval = async (r: Review) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: r.id, approved: !r.approved }),
      })
      if (res.ok) { toast.success(r.approved ? "Review hidden" : "Review approved!"); fetchReviews() }
      else toast.error("Update failed")
    } catch { toast.error("Network error") }
  }

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" })
      if (res.ok) { toast.success("Review deleted"); fetchReviews() }
      else toast.error("Delete failed")
    } catch { toast.error("Network error") }
  }

  // ══════════════════════════════════════════════════════════════════════
  // DERIVED DATA
  // ══════════════════════════════════════════════════════════════════════

  const allProductsList = [
    ...products.cctv.map((p) => ({ ...p, categoryLabel: "CCTV Camera" })),
    ...products.switchboard.map((p) => ({ ...p, categoryLabel: "Smart Switchboard" })),
  ]
  const filteredProducts = allProductsList.filter((p) => {
    const q = productSearch.toLowerCase()
    return (
      (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
      (productCatTab === "all" || p.category === productCatTab)
    )
  })

  const filteredInquiries = inquiries.filter((inq) => {
    const q = inquirySearch.toLowerCase()
    return inq.name.toLowerCase().includes(q) || inq.email.toLowerCase().includes(q) || (inq.company ?? "").toLowerCase().includes(q)
  })

  const filteredUsers = users.filter((u) => {
    const q = userSearch.toLowerCase()
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  })

  // ══════════════════════════════════════════════════════════════════════
  // TABS CONFIG
  // ══════════════════════════════════════════════════════════════════════

  const tabs = [
    { id: "products", label: "Products", icon: Package, count: allProductsList.length, color: "text-blue-400" },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare, count: inquiries.length, color: "text-yellow-400" },
    { id: "users", label: "Users", icon: Users, count: users.length, color: "text-emerald-400" },
    { id: "faqs", label: "FAQs", icon: HelpCircle, count: faqs.length, color: "text-purple-400" },
    { id: "reviews", label: "Reviews", icon: Star, count: reviews.length, color: "text-orange-400" },
  ] as const

  // ══════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="border-b border-neutral-800 bg-neutral-900/70 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">NeedyZone Admin</h1>
            <p className="text-xs text-neutral-400">Centralized management portal</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={refreshAll} disabled={globalLoading}
            className="text-neutral-400 hover:text-white hover:bg-neutral-800 gap-2 text-xs">
            <RefreshCw className={`h-3.5 w-3.5 ${globalLoading ? "animate-spin" : ""}`} />
            Refresh All
          </Button>
          <Button variant="outline" size="sm"
            className="border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white bg-transparent gap-2 text-xs" asChild>
            <Link href="/">
              <ArrowLeft className="h-3.5 w-3.5" />
              Live Site
            </Link>
          </Button>
        </div>
      </header>

      {/* ── Dashboard Stats ─────────────────────────────────────────────── */}
      <div className="border-b border-neutral-800 bg-neutral-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-neutral-800 border-neutral-600 shadow-md"
                    : "bg-neutral-900/50 border-neutral-800 hover:bg-neutral-800/50 hover:border-neutral-700"
                }`}>
                <Icon className={`h-5 w-5 shrink-0 ${tab.color}`} />
                <div>
                  <p className="text-xs text-neutral-400">{tab.label}</p>
                  <p className="font-bold text-neutral-100 text-sm">{tab.count}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">

        {/* ════════════════════════════════════════════════════════════════
            PRODUCTS TAB
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === "products" && (
          <>
            {/* Toolbar */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <Input placeholder="Search products..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)}
                    className={`pl-9 ${inputCls}`} />
                </div>
                <div className="flex rounded-lg bg-neutral-950 p-1 border border-neutral-800">
                  {(["all", "cctv", "switchboard"] as const).map((t) => (
                    <button key={t} onClick={() => setProductCatTab(t)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all capitalize ${
                        productCatTab === t ? "bg-blue-600 text-white shadow" : "text-neutral-400 hover:text-neutral-200"
                      }`}>
                      {t === "all" ? "All" : t === "cctv" ? "CCTV" : "Switchboards"}
                    </button>
                  ))}
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shrink-0"
                onClick={() => { resetProductForm(); setProductSheetOpen(true) }}>
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            </div>

            {/* Product Table */}
            <SectionCard title="Active Inventory" count={filteredProducts.length}>
              {productLoading ? (
                <div className="flex items-center justify-center py-20 gap-3 text-neutral-400">
                  <RefreshCw className="h-6 w-6 animate-spin text-blue-500" /><span className="text-sm">Loading...</span>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-2">
                  <Package className="h-10 w-10 text-neutral-700" />
                  <p className="text-sm">No products found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-neutral-950 border-b border-neutral-800">
                      <TableRow className="hover:bg-transparent border-neutral-800">
                        <TableHead className="text-neutral-400 w-[70px]">Image</TableHead>
                        <TableHead className="text-neutral-400">Name</TableHead>
                        <TableHead className="text-neutral-400">Category</TableHead>
                        <TableHead className="text-neutral-400">Price</TableHead>
                        <TableHead className="text-neutral-400">Badge</TableHead>
                        <TableHead className="text-right text-neutral-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((p) => (
                        <TableRow key={p.id} className="hover:bg-neutral-800/40 border-b border-neutral-800/60 transition-colors">
                          <TableCell className="py-3">
                            <div className="h-10 w-10 rounded-md overflow-hidden bg-neutral-950 border border-neutral-800">
                              <img src={p.image || "/placeholder.svg"} alt={p.name} className="h-full w-full object-cover" />
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-neutral-100">
                            <span>{p.name}</span>
                            <span className="block text-xs font-normal text-neutral-500 mt-0.5 max-w-[260px] truncate">{p.description}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-neutral-950 border border-neutral-800 text-neutral-400 text-xs">
                              {p.categoryLabel}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-neutral-200 font-medium">{p.price}</TableCell>
                          <TableCell>
                            {p.badge
                              ? <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/40 text-xs">{p.badge}</Badge>
                              : <span className="text-xs text-neutral-600">—</span>}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" asChild
                                className="h-7 text-xs border-neutral-800 hover:bg-neutral-800 hover:text-white bg-transparent text-neutral-400">
                                <Link href={`/products/${p.category === "cctv" ? "cctv" : "switchboards"}/${p.id}`} target="_blank">
                                  <FileText className="h-3 w-3 mr-1" />Preview
                                </Link>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => openEditProduct(p)}
                                className="h-7 w-7 text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10">
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(p.id)}
                                className="h-7 w-7 text-neutral-500 hover:text-red-400 hover:bg-red-500/10">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </SectionCard>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════
            INQUIRIES TAB
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === "inquiries" && (
          <SectionCard title="Inquiries & Orders" count={filteredInquiries.length}
            action={
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                <Input placeholder="Search..." value={inquirySearch} onChange={(e) => setInquirySearch(e.target.value)}
                  className={`pl-8 h-8 text-xs w-48 ${inputCls}`} />
              </div>
            }>
            {inquiryLoading ? (
              <div className="flex items-center justify-center py-20 gap-3 text-neutral-400">
                <RefreshCw className="h-6 w-6 animate-spin text-yellow-500" /><span className="text-sm">Loading...</span>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-2 text-neutral-500">
                <MessageSquare className="h-10 w-10 text-neutral-700" />
                <p className="text-sm">No inquiries yet</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-800">
                {filteredInquiries.map((inq) => (
                  <div key={inq.id} className="px-6 py-4 hover:bg-neutral-800/30 transition-colors group">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-neutral-100">{inq.name}</span>
                          <StatusBadge status={inq.status} />
                          <Badge variant="outline" className="border-neutral-700 text-neutral-500 text-xs capitalize">{inq.type}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                          <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{inq.email}</span>
                          <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{inq.phone}</span>
                          {inq.company && <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{inq.company}</span>}
                          {inq.region && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{inq.region}</span>}
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(inq.date).toLocaleDateString()}</span>
                        </div>
                        {inq.message && (
                          <p className="text-xs text-neutral-500 mt-1 max-w-xl leading-relaxed border-l-2 border-neutral-700 pl-3 italic">
                            "{inq.message}"
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <Select value={inq.status} onValueChange={(val) => handleInquiryStatus(inq.id, val)}>
                          <SelectTrigger className="h-7 text-xs w-36 bg-neutral-950 border-neutral-800 text-neutral-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-100">
                            {["Pending", "Reviewed", "In-Progress", "Completed"].map((s) => (
                              <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteInquiry(inq.id)}
                          className="h-7 w-7 text-neutral-600 hover:text-red-400 hover:bg-red-500/10">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        )}

        {/* ════════════════════════════════════════════════════════════════
            USERS TAB
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === "users" && (
          <SectionCard title="User Management" count={filteredUsers.length}
            action={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                  <Input placeholder="Search..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)}
                    className={`pl-8 h-8 text-xs w-44 ${inputCls}`} />
                </div>
                <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                  onClick={() => { resetUserForm(); setUserSheetOpen(true) }}>
                  <Plus className="h-3.5 w-3.5" /> Add User
                </Button>
              </div>
            }>
            {userLoading ? (
              <div className="flex items-center justify-center py-20 gap-3 text-neutral-400">
                <RefreshCw className="h-6 w-6 animate-spin text-emerald-500" /><span className="text-sm">Loading...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-2 text-neutral-500">
                <Users className="h-10 w-10 text-neutral-700" />
                <p className="text-sm">No users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-neutral-950 border-b border-neutral-800">
                    <TableRow className="hover:bg-transparent border-neutral-800">
                      <TableHead className="text-neutral-400">Name</TableHead>
                      <TableHead className="text-neutral-400">Email</TableHead>
                      <TableHead className="text-neutral-400">Role</TableHead>
                      <TableHead className="text-neutral-400">Status</TableHead>
                      <TableHead className="text-right text-neutral-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((u) => (
                      <TableRow key={u.id} className="hover:bg-neutral-800/40 border-b border-neutral-800/60 transition-colors">
                        <TableCell className="font-semibold text-neutral-100">{u.name}</TableCell>
                        <TableCell className="text-neutral-400 text-sm">{u.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-xs border ${
                            u.role === "Admin" ? "border-blue-600/40 text-blue-400 bg-blue-600/10"
                            : u.role === "Manager" ? "border-purple-600/40 text-purple-400 bg-purple-600/10"
                            : "border-neutral-700 text-neutral-400"
                          }`}>{u.role}</Badge>
                        </TableCell>
                        <TableCell><StatusBadge status={u.status} /></TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditUser(u)}
                              className="h-7 w-7 text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10">
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(u.id)}
                              className="h-7 w-7 text-neutral-500 hover:text-red-400 hover:bg-red-500/10">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </SectionCard>
        )}

        {/* ════════════════════════════════════════════════════════════════
            FAQs TAB
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === "faqs" && (
          <SectionCard title="FAQ Management" count={faqs.length}
            action={
              <Button size="sm" className="h-8 text-xs bg-purple-600 hover:bg-purple-700 text-white gap-1"
                onClick={() => { resetFaqForm(); setFaqSheetOpen(true) }}>
                <Plus className="h-3.5 w-3.5" /> Add FAQ
              </Button>
            }>
            {faqLoading ? (
              <div className="flex items-center justify-center py-20 gap-3 text-neutral-400">
                <RefreshCw className="h-6 w-6 animate-spin text-purple-500" /><span className="text-sm">Loading...</span>
              </div>
            ) : faqs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-2 text-neutral-500">
                <HelpCircle className="h-10 w-10 text-neutral-700" />
                <p className="text-sm">No FAQs yet</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-800">
                {faqs.map((f) => (
                  <div key={f.id} className="px-6 py-4 hover:bg-neutral-800/30 transition-colors group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-neutral-100 text-sm">{f.question}</p>
                          <Badge variant="outline" className="border-purple-600/40 text-purple-400 text-xs">{f.category}</Badge>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">{f.answer}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => openEditFaq(f)}
                          className="h-7 w-7 text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFaq(f.id)}
                          className="h-7 w-7 text-neutral-500 hover:text-red-400 hover:bg-red-500/10">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        )}

        {/* ════════════════════════════════════════════════════════════════
            REVIEWS TAB
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === "reviews" && (
          <SectionCard title="Review Moderation" count={reviews.length}
            action={
              <Button size="sm" className="h-8 text-xs bg-orange-600 hover:bg-orange-700 text-white gap-1"
                onClick={() => { resetReviewForm(); setReviewSheetOpen(true) }}>
                <Plus className="h-3.5 w-3.5" /> Add Review
              </Button>
            }>
            {reviewLoading ? (
              <div className="flex items-center justify-center py-20 gap-3 text-neutral-400">
                <RefreshCw className="h-6 w-6 animate-spin text-orange-500" /><span className="text-sm">Loading...</span>
              </div>
            ) : reviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-2 text-neutral-500">
                <Star className="h-10 w-10 text-neutral-700" />
                <p className="text-sm">No reviews yet</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-800">
                {reviews.map((r) => (
                  <div key={r.id} className="px-6 py-4 hover:bg-neutral-800/30 transition-colors group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-neutral-100 text-sm">{r.author}</span>
                          <span className="text-xs text-neutral-500">{r.role}</span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map((i) => (
                              <Star key={i} className={`h-3 w-3 ${i <= r.rating ? "fill-yellow-500 text-yellow-500" : "text-neutral-700"}`} />
                            ))}
                          </div>
                          {r.approved
                            ? <Badge className="bg-emerald-600/15 text-emerald-400 border border-emerald-600/30 text-xs">Approved</Badge>
                            : <Badge className="bg-neutral-700/40 text-neutral-400 border border-neutral-700 text-xs">Hidden</Badge>
                          }
                        </div>
                        <p className="text-xs text-neutral-400 italic leading-relaxed">"{r.comment}"</p>
                        <p className="text-xs text-neutral-600">{new Date(r.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => handleToggleApproval(r)}
                          className={`h-7 w-7 ${r.approved ? "text-neutral-500 hover:text-yellow-400 hover:bg-yellow-500/10" : "text-neutral-500 hover:text-emerald-400 hover:bg-emerald-500/10"}`}
                          title={r.approved ? "Hide review" : "Approve review"}>
                          {r.approved ? <XCircle className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditReview(r)}
                          className="h-7 w-7 text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteReview(r.id)}
                          className="h-7 w-7 text-neutral-500 hover:text-red-400 hover:bg-red-500/10">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        )}
      </main>

      {/* ══════════════════════════════════════════════════════════════════
          DRAWERS (SHEETS)
      ══════════════════════════════════════════════════════════════════ */}

      {/* ── Product Sheet ────────────────────────────────────────────────── */}
      <Sheet open={productSheetOpen} onOpenChange={(o) => { setProductSheetOpen(o); if (!o) resetProductForm() }}>
        <SheetContent className="bg-neutral-900 border-neutral-800 text-neutral-100 w-full sm:max-w-xl overflow-y-auto z-50">
          <SheetHeader className="border-b border-neutral-800 pb-4 mb-6">
            <SheetTitle className="text-neutral-100 text-xl font-bold">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription className="text-neutral-400 text-sm">
              {editingProduct ? "Update the product details below." : "Fill in the details to add a new item."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleProductSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider border-b border-neutral-800 pb-1">Basic Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className={labelCls}>Product Name *</Label>
                  <Input value={pName} onChange={(e) => setPName(e.target.value)} required placeholder="e.g. SV-Dome Pro Max" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <Label className={labelCls}>Category *</Label>
                  <Select value={pCategory} onValueChange={(v: "cctv" | "switchboard") => setPCategory(v)}>
                    <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-neutral-950 border-neutral-800 text-neutral-100">
                      <SelectItem value="cctv">CCTV Camera</SelectItem>
                      <SelectItem value="switchboard">Smart Switchboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className={labelCls}>Starting Price *</Label>
                  <Input value={pPrice} onChange={(e) => setPPrice(e.target.value)} required placeholder="e.g. $299" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <Label className={labelCls}>Badge (Optional)</Label>
                  <Input value={pBadge} onChange={(e) => setPBadge(e.target.value)} placeholder="e.g. New, Popular" className={inputCls} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className={labelCls}>Image Preset</Label>
                <Select value={pImage} onValueChange={setPImage}>
                  <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-neutral-950 border-neutral-800 text-neutral-100">
                    {imageOptions[pCategory].map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className={labelCls}>Custom Image URL (overrides preset)</Label>
                <Input value={pCustomImage} onChange={(e) => setPCustomImage(e.target.value)} placeholder="/custom.jpg or https://..." className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <Label className={labelCls}>Description *</Label>
                <Textarea value={pDesc} onChange={(e) => setPDesc(e.target.value)} required rows={3} placeholder="Product summary..." className={`${inputCls} resize-none`} />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider border-b border-neutral-800 pb-1">Key Features</h3>
              <div className="flex gap-2">
                <Input value={pNewFeat} onChange={(e) => setPNewFeat(e.target.value)} placeholder="Add a feature..." className={inputCls}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (pNewFeat.trim()) { setPFeatures([...pFeatures, pNewFeat.trim()]); setPNewFeat("") } } }} />
                <Button type="button" className="bg-neutral-800 hover:bg-neutral-700 text-white shrink-0"
                  onClick={() => { if (pNewFeat.trim()) { setPFeatures([...pFeatures, pNewFeat.trim()]); setPNewFeat("") } }}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {pFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs px-2 py-1 rounded-md">
                    <span>{feat}</span>
                    <button type="button" onClick={() => setPFeatures(pFeatures.filter((_, j) => j !== i))} className="text-neutral-500 hover:text-red-400">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider border-b border-neutral-800 pb-1">Specifications</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input value={pNewSpecLabel} onChange={(e) => setPNewSpecLabel(e.target.value)} placeholder="Spec name (e.g. Resolution)" className={inputCls} />
                <div className="flex gap-2">
                  <Input value={pNewSpecVal} onChange={(e) => setPNewSpecVal(e.target.value)} placeholder="Value (e.g. 4K)" className={inputCls}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (pNewSpecLabel.trim() && pNewSpecVal.trim()) { setPSpecs([...pSpecs, { label: pNewSpecLabel.trim(), value: pNewSpecVal.trim() }]); setPNewSpecLabel(""); setPNewSpecVal("") } } }} />
                  <Button type="button" className="bg-neutral-800 hover:bg-neutral-700 text-white shrink-0"
                    onClick={() => { if (pNewSpecLabel.trim() && pNewSpecVal.trim()) { setPSpecs([...pSpecs, { label: pNewSpecLabel.trim(), value: pNewSpecVal.trim() }]); setPNewSpecLabel(""); setPNewSpecVal("") } }}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {pSpecs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 bg-neutral-950 border border-neutral-800 px-3 py-1.5 rounded-lg text-xs">
                    <span className="font-semibold text-neutral-400">{spec.label}:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-200">{spec.value}</span>
                      <button type="button" onClick={() => setPSpecs(pSpecs.filter((_, j) => j !== i))} className="text-neutral-500 hover:text-red-400">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-800 pt-4 flex items-center justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => { setProductSheetOpen(false); resetProductForm() }} className="text-neutral-400 hover:text-white hover:bg-neutral-800">Cancel</Button>
              <Button type="submit" disabled={productSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-5 font-semibold">
                {productSubmitting ? "Saving..." : editingProduct ? "Save Changes" : "Add Product"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* ── User Sheet ───────────────────────────────────────────────────── */}
      <Sheet open={userSheetOpen} onOpenChange={(o) => { setUserSheetOpen(o); if (!o) resetUserForm() }}>
        <SheetContent className="bg-neutral-900 border-neutral-800 text-neutral-100 w-full sm:max-w-md overflow-y-auto z-50">
          <SheetHeader className="border-b border-neutral-800 pb-4 mb-6">
            <SheetTitle className="text-neutral-100 text-xl font-bold">{editingUser ? "Edit User" : "Add New User"}</SheetTitle>
            <SheetDescription className="text-neutral-400 text-sm">Manage team members, dealers, and customers.</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleUserSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className={labelCls}>Full Name *</Label>
              <Input value={uName} onChange={(e) => setUName(e.target.value)} required placeholder="e.g. John Doe" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <Label className={labelCls}>Email Address *</Label>
              <Input type="email" value={uEmail} onChange={(e) => setUEmail(e.target.value)} required placeholder="user@example.com" className={inputCls} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className={labelCls}>Role *</Label>
                <Select value={uRole} onValueChange={setURole}>
                  <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-neutral-950 border-neutral-800 text-neutral-100">
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className={labelCls}>Status</Label>
                <Select value={uStatus} onValueChange={setUStatus}>
                  <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-neutral-950 border-neutral-800 text-neutral-100">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="border-t border-neutral-800 pt-4 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => { setUserSheetOpen(false); resetUserForm() }} className="text-neutral-400 hover:text-white hover:bg-neutral-800">Cancel</Button>
              <Button type="submit" disabled={userSubmitting} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 font-semibold">
                {userSubmitting ? "Saving..." : editingUser ? "Save Changes" : "Add User"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* ── FAQ Sheet ────────────────────────────────────────────────────── */}
      <Sheet open={faqSheetOpen} onOpenChange={(o) => { setFaqSheetOpen(o); if (!o) resetFaqForm() }}>
        <SheetContent className="bg-neutral-900 border-neutral-800 text-neutral-100 w-full sm:max-w-md overflow-y-auto z-50">
          <SheetHeader className="border-b border-neutral-800 pb-4 mb-6">
            <SheetTitle className="text-neutral-100 text-xl font-bold">{editingFaq ? "Edit FAQ" : "Add New FAQ"}</SheetTitle>
            <SheetDescription className="text-neutral-400 text-sm">Manage the site's frequently asked questions.</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleFaqSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className={labelCls}>Category *</Label>
              <Select value={fCategory} onValueChange={setFCategory}>
                <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                <SelectContent className="bg-neutral-950 border-neutral-800 text-neutral-100">
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Dealers">Dealers</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Products">Products</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className={labelCls}>Question *</Label>
              <Textarea value={fQuestion} onChange={(e) => setFQuestion(e.target.value)} required rows={2} placeholder="e.g. How do I become a dealer?" className={`${inputCls} resize-none`} />
            </div>
            <div className="space-y-1.5">
              <Label className={labelCls}>Answer *</Label>
              <Textarea value={fAnswer} onChange={(e) => setFAnswer(e.target.value)} required rows={4} placeholder="Provide a clear, helpful answer..." className={`${inputCls} resize-none`} />
            </div>
            <div className="border-t border-neutral-800 pt-4 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => { setFaqSheetOpen(false); resetFaqForm() }} className="text-neutral-400 hover:text-white hover:bg-neutral-800">Cancel</Button>
              <Button type="submit" disabled={faqSubmitting} className="bg-purple-600 hover:bg-purple-700 text-white px-5 font-semibold">
                {faqSubmitting ? "Saving..." : editingFaq ? "Save Changes" : "Add FAQ"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* ── Review Sheet ──────────────────────────────────────────────────── */}
      <Sheet open={reviewSheetOpen} onOpenChange={(o) => { setReviewSheetOpen(o); if (!o) resetReviewForm() }}>
        <SheetContent className="bg-neutral-900 border-neutral-800 text-neutral-100 w-full sm:max-w-md overflow-y-auto z-50">
          <SheetHeader className="border-b border-neutral-800 pb-4 mb-6">
            <SheetTitle className="text-neutral-100 text-xl font-bold">{editingReview ? "Edit Review" : "Add New Review"}</SheetTitle>
            <SheetDescription className="text-neutral-400 text-sm">Manage customer testimonials displayed on the site.</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className={labelCls}>Author Name *</Label>
                <Input value={rAuthor} onChange={(e) => setRAuthor(e.target.value)} required placeholder="e.g. Rajesh Kumar" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <Label className={labelCls}>Title / Role *</Label>
                <Input value={rRole} onChange={(e) => setRRole(e.target.value)} required placeholder="e.g. Home Owner" className={inputCls} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className={labelCls}>Star Rating</Label>
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map((n) => (
                  <button key={n} type="button" onClick={() => setRRating(n)}>
                    <Star className={`h-6 w-6 transition-colors ${n <= rRating ? "fill-yellow-500 text-yellow-500" : "text-neutral-600 hover:text-yellow-400"}`} />
                  </button>
                ))}
                <span className="text-sm text-neutral-400 ml-2">{rRating} / 5</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className={labelCls}>Review Comment *</Label>
              <Textarea value={rComment} onChange={(e) => setRComment(e.target.value)} required rows={4} placeholder="Customer testimonial text..." className={`${inputCls} resize-none`} />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-950 border border-neutral-800">
              <button type="button" onClick={() => setRApproved(!rApproved)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${rApproved ? "bg-emerald-600" : "bg-neutral-700"}`}>
                <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${rApproved ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
              <span className="text-sm text-neutral-300">
                {rApproved ? <span className="text-emerald-400 font-medium">Approved – visible on site</span> : "Hidden – not shown on site"}
              </span>
            </div>
            <div className="border-t border-neutral-800 pt-4 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => { setReviewSheetOpen(false); resetReviewForm() }} className="text-neutral-400 hover:text-white hover:bg-neutral-800">Cancel</Button>
              <Button type="submit" disabled={reviewSubmitting} className="bg-orange-600 hover:bg-orange-700 text-white px-5 font-semibold">
                {reviewSubmitting ? "Saving..." : editingReview ? "Save Changes" : "Add Review"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

    </div>
  )
}
