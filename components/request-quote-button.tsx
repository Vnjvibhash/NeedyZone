"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { QuoteModal } from "@/components/quote-modal"
import { FileText } from "lucide-react"

interface RequestQuoteButtonProps {
  productName?: string
  type?: "product" | "dealer" | "contact"
  label?: string
  size?: "sm" | "lg" | "default" | "icon"
  variant?: "default" | "outline" | "ghost" | "secondary"
  className?: string
  icon?: boolean
}

export function RequestQuoteButton({
  productName,
  type = "product",
  label = "Request Quote",
  size = "lg",
  variant = "default",
  className = "",
  icon = true,
}: RequestQuoteButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        size={size}
        variant={variant}
        className={`gap-2 ${className}`}
        onClick={() => setOpen(true)}
        id="request-quote-btn"
      >
        {label}
        {icon && <FileText className="h-4 w-4" />}
      </Button>

      <QuoteModal
        open={open}
        onClose={() => setOpen(false)}
        productName={productName}
        type={type}
        title={type === "dealer" ? "Apply to Become a Dealer" : "Request a Quote"}
        subtitle={
          type === "dealer"
            ? "Submit your details and our partnership team will contact you within 48 hours."
            : "Fill out the form and our team will get back to you within 24 hours."
        }
      />
    </>
  )
}
