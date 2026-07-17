"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface LeadInquiryFormProps {
  productName?: string
  type?: "product" | "dealer" | "contact"
}

export function LeadInquiryForm({ productName, type = "product" }: LeadInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data: Record<string, any> = {
      type,
      productName,
    }

    formData.forEach((value, key) => {
      data[key] = value
    })

    try {
      const response = await fetch("https://formspree.io/f/mdaqerbl", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const resData = await response.json()

      if (response.ok) {
        setSubmitted(true)
        toast.success("Message sent successfully!")
      } else {
        toast.error(resData.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("An error occurred while sending your message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Thank You!</h3>
        <p className="mt-2 text-muted-foreground">
          We&apos;ve received your inquiry and will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" name="company" placeholder="Your Company" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+1 234 567 890" required />
        </div>
      </div>

      {type === "dealer" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="business">Business Type *</Label>
            <Select name="business" required>
              <SelectTrigger id="business">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distributor">Distributor</SelectItem>
                <SelectItem value="retailer">Retailer</SelectItem>
                <SelectItem value="system-integrator">System Integrator</SelectItem>
                <SelectItem value="installer">Professional Installer</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region/Territory *</Label>
            <Input id="region" name="region" placeholder="Your region or city" required />
          </div>
        </div>
      )}

      {type === "product" && (
        <div className="space-y-2">
          <Label htmlFor="interest">Product Interest *</Label>
          <Select name="interest" defaultValue={productName} required>
            <SelectTrigger id="interest">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cctv">CCTV Cameras</SelectItem>
              <SelectItem value="switchboards">Smart Switchboards</SelectItem>
              <SelectItem value="both">Both Products</SelectItem>
              <SelectItem value="custom">Custom Solution</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="quantity">Estimated Quantity</Label>
        <Select name="quantity">
          <SelectTrigger id="quantity">
            <SelectValue placeholder="Select quantity range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-10">1-10 units</SelectItem>
            <SelectItem value="11-50">11-50 units</SelectItem>
            <SelectItem value="51-100">51-100 units</SelectItem>
            <SelectItem value="100+">100+ units</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Tell us about your requirements..." rows={4} className="resize-none" />
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  )
}
