import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LeadInquiryForm } from "@/components/lead-inquiry-form"
import { OfficeLocationMap } from "@/components/office-location-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, MessageSquare, HeadphonesIcon, FileText, ArrowRight } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Sales Inquiries",
    description: "Talk to our sales team about products and pricing",
    contact: "+91 9717798826",
    link: "tel:+919717798826",
    hours: "Mon-Fri, 9AM-6PM IST",
  },
  {
    icon: HeadphonesIcon,
    title: "Technical Support",
    description: "Get help with installation or troubleshooting",
    contact: "+1 (234) 567-891",
    link: "tel:+1234567891",
    hours: "24/7 Support Available",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message and we'll respond within 24 hours",
    contact: "info@needyzone.com",
    link: "mailto:info@needyzone.com",
    hours: "Response within 24 hours",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our team for quick questions",
    contact: "Start a conversation",
    link: "#",
    hours: "Mon-Fri, 9AM-8PM EST",
  },
]

const offices = [
  {
    name: "Office Address",
    address: "Phase-5 Aya Nagar, Near CBR Hospital, New Delhi - 110047, India",
    phone: "+91 9717798826",
    email: "info@needyzone.com",
  },
  {
    name: "Main Address",
    address: "N-346/A Shanti Colony, Mandi Village, New Delhi - 110047, India",
    phone: "+91 9717798826",
    email: "hq@needyzone.com",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-foreground py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
                Get in Touch
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Have questions about our products or services? Our team is here to help. Reach out through any of the
                channels below.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="border-b border-border py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactMethods.map((method) => (
                <Card key={method.title} className="transition-shadow hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold">{method.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>
                    <a href={method.link} className="mt-3 block font-medium text-primary hover:underline">
                      {method.contact}
                    </a>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {method.hours}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Send Us a Message</h2>
                <p className="mt-3 text-muted-foreground">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                <Card className="mt-8">
                  <CardContent className="pt-6">
                    <LeadInquiryForm type="contact" />
                  </CardContent>
                </Card>
              </div>

              {/* Office Locations */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our Locations</h2>
                <p className="mt-3 text-muted-foreground">
                  Visit us at one of our offices around the world or schedule a virtual meeting.
                </p>

                <div className="mt-8 space-y-6">
                  {offices.map((office) => (
                    <Card key={office.name}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{office.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{office.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <a href={`tel:${office.phone}`} className="text-sm hover:text-primary">
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <a href={`mailto:${office.email}`} className="text-sm hover:text-primary">
                            {office.email}
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Interactive Map */}
                <div className="mt-8">
                  <OfficeLocationMap />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">Looking for Something Else?</h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <FileText className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Product Datasheets</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Download technical specifications and documentation
                  </p>
                  <Button variant="link" asChild className="mt-4 gap-2">
                    <Link href="/products/cctv">
                      Browse Products
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <HeadphonesIcon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Technical Support</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Get help with installation and troubleshooting</p>
                  <Button variant="link" asChild className="mt-4 gap-2">
                    <a href="tel:+1234567891">
                      Call Support
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Dealer Inquiries</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Learn about partnership opportunities</p>
                  <Button variant="link" asChild className="mt-4 gap-2">
                    <Link href="/dealers">
                      Become a Dealer
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
