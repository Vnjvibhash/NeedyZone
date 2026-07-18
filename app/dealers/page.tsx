import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RequestQuoteButton } from "@/components/request-quote-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStoredFAQs } from "@/lib/faqs-data"
import {
  Handshake,
  TrendingUp,
  Package,
  HeadphonesIcon,
  GraduationCap,
  BadgePercent,
  Globe,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export const dynamic = "force-dynamic"


const benefits = [
  {
    icon: BadgePercent,
    title: "Competitive Margins",
    description: "Enjoy industry-leading profit margins with volume-based pricing tiers.",
  },
  {
    icon: Package,
    title: "No Minimum Orders",
    description: "Start small and grow at your pace with no minimum order requirements.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Get a dedicated account manager and priority technical support.",
  },
  {
    icon: GraduationCap,
    title: "Training & Certification",
    description: "Comprehensive product training and official installer certification.",
  },
  {
    icon: TrendingUp,
    title: "Marketing Support",
    description: "Access marketing materials, display units, and co-branding opportunities.",
  },
  {
    icon: Globe,
    title: "Lead Referrals",
    description: "Receive qualified leads from customers in your territory.",
  },
]

const dealerTypes = [
  {
    title: "Authorized Distributor",
    description: "Regional distribution rights with exclusive territory protection and highest margin tiers.",
    features: ["Exclusive territory", "Highest margins", "Priority stock allocation", "Co-marketing funds"],
  },
  {
    title: "System Integrator",
    description: "Partner with us to integrate our products into complete security and automation solutions.",
    features: ["Technical training", "API access", "Custom solutions", "Project support"],
  },
  {
    title: "Retail Partner",
    description: "Stock our products in your retail location with display support and marketing materials.",
    features: ["POP displays", "Marketing kits", "Demo units", "Retail margins"],
  },
  {
    title: "Installation Partner",
    description: "Join our certified installer network for residential and commercial installations.",
    features: ["Installer certification", "Lead referrals", "Technical support", "Extended warranty"],
  },
]

const stats = [
  { value: "500+", label: "Active Dealers" },
  { value: "45", label: "Countries" },
  { value: "98%", label: "Retention Rate" },
  { value: "$2M+", label: "Dealer Earnings" },
]

export default function DealersPage() {
  const faqs = getStoredFAQs().filter((f) => f.category === "Dealers")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-foreground py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground">
                  <Handshake className="h-4 w-4" />
                  Partner With Us
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
                  Grow Your Business as a SecureVision Dealer
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                  Join our global network of dealers and distributors. We provide the products, training, and support
                  you need to succeed in the security and automation market.
                </p>

                <ul className="mt-8 space-y-3">
                  {["High-margin products", "Exclusive territories available", "Full marketing support"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-primary-foreground/80">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <RequestQuoteButton
                  type="dealer"
                  label="Apply Now"
                  className="mt-8"
                />
              </div>

              <div className="relative">
                <div className="aspect-video overflow-hidden rounded-2xl lg:aspect-[4/3]">
                  <img
                    src="/business-partnership-handshake-professional-meeti.jpg"
                    alt="Business partnership"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-primary lg:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Dealer Benefits</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                We invest in our partners&apos; success with comprehensive support and competitive programs.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <Card key={benefit.title}>
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Types Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Partnership Opportunities</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                We offer flexible partnership models to fit your business type and goals.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dealerTypes.map((type) => (
                <Card key={type.title} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    <ul className="mt-4 flex-1 space-y-2">
                      {type.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="border-y border-border bg-foreground py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-primary-foreground">Quality Guaranteed</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  Industry-leading 3-year warranty on all products
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-primary-foreground">Dedicated Support</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">Personal account manager for all partners</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-primary-foreground">Growth Focused</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">Tools and resources to scale your business</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>

              <div className="mt-12 space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.id} className="rounded-lg border border-border bg-card p-6">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground">Have more questions?</p>
                <Button asChild className="mt-4 gap-2">
                  <Link href="/contact">
                    Contact Our Team
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
