"use client"

import type React from "react"
import { useEffect } from "react"
import { LeadInquiryForm } from "@/components/lead-inquiry-form"
import { X } from "lucide-react"

interface QuoteModalProps {
  open: boolean
  onClose: () => void
  productName?: string
  type?: "product" | "dealer" | "contact"
  title?: string
  subtitle?: string
}

export function QuoteModal({
  open,
  onClose,
  productName,
  type = "product",
  title = "Request a Quote",
  subtitle = "Fill out the form and our team will get back to you within 24 hours.",
}: QuoteModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (open) window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
      aria-labelledby="quote-modal-title"
    >
      {/* Dark overlay — click to close */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-border shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between bg-background px-6 pt-6 pb-4 border-b border-border">
          <div>
            <h2 id="quote-modal-title" className="text-2xl font-bold tracking-tight">
              {title}
            </h2>
            {productName && (
              <p className="mt-0.5 text-sm font-medium text-primary">{productName}</p>
            )}
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="ml-4 shrink-0 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-6">
          <LeadInquiryForm productName={productName} type={type} />
        </div>
      </div>
    </div>
  )
}
