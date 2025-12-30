import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Factory,
  Shield,
  Award,
  CheckCircle,
  Microscope,
  Cpu,
  Users,
  Globe,
  ArrowRight,
  Cog,
  FlaskConical,
  PackageCheck,
} from "lucide-react"

const certifications = [
  {
    icon: Shield,
    title: "ISO 9001:2015",
    description: "Quality Management System certification ensuring consistent quality in all processes.",
  },
  {
    icon: Award,
    title: "CE Certified",
    description: "European Conformity marking for product safety and compliance standards.",
  },
  {
    icon: CheckCircle,
    title: "RoHS Compliant",
    description: "Restriction of Hazardous Substances directive compliance for environmental safety.",
  },
  {
    icon: Globe,
    title: "FCC Approved",
    description: "Federal Communications Commission certification for electromagnetic compatibility.",
  },
]

const processes = [
  {
    icon: FlaskConical,
    step: "01",
    title: "Research & Development",
    description:
      "Our dedicated R&D team continuously innovates, testing new technologies and materials to improve product performance and reliability.",
  },
  {
    icon: Cog,
    step: "02",
    title: "Precision Manufacturing",
    description:
      "State-of-the-art SMT lines and automated assembly ensure consistent quality with tolerances as tight as 0.01mm.",
  },
  {
    icon: Microscope,
    step: "03",
    title: "Quality Testing",
    description:
      "Every unit undergoes rigorous testing including burn-in, environmental stress screening, and functional verification.",
  },
  {
    icon: PackageCheck,
    step: "04",
    title: "Final Inspection",
    description:
      "Multi-point inspection before packaging ensures only products meeting our strict standards reach customers.",
  },
]

const stats = [
  { value: "50,000", label: "Sq. Ft. Facility" },
  { value: "200+", label: "Skilled Employees" },
  { value: "15+", label: "Years Experience" },
  { value: "99.8%", label: "Quality Rate" },
]

const capabilities = [
  {
    icon: Cpu,
    title: "SMT Assembly",
    description: "High-speed surface mount technology lines capable of placing 50,000+ components per hour.",
  },
  {
    icon: Factory,
    title: "Injection Molding",
    description: "In-house plastic molding for custom enclosures and housing components.",
  },
  {
    icon: Microscope,
    title: "Test Laboratories",
    description: "Fully equipped labs for environmental, electrical, and reliability testing.",
  },
  {
    icon: Users,
    title: "Skilled Workforce",
    description: "Over 200 trained technicians and engineers ensuring quality at every step.",
  },
]

export default function ManufacturingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('/modern-electronics-manufacturing-facility-factory.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/95 to-foreground/80" />

          <div className="container relative mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground">
                <Factory className="h-4 w-4" />
                Our Manufacturing Excellence
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
                Engineering Quality at Every Step
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Our world-class manufacturing facility combines advanced automation with skilled craftsmanship to
                produce security and automation products that exceed industry standards.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Schedule a Factory Tour</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/dealers">Become a Partner</Link>
                </Button>
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

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Manufacturing Process</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                From initial concept to final product, every step is designed to ensure the highest quality and
                reliability.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {processes.map((process, index) => (
                <div key={process.title} className="relative">
                  {index < processes.length - 1 && (
                    <div className="absolute right-0 top-8 hidden h-0.5 w-full translate-x-1/2 bg-border lg:block" />
                  )}
                  <div className="relative rounded-xl border border-border bg-card p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <process.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-3xl font-bold text-muted-foreground/30">{process.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{process.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Manufacturing Capabilities</h2>
                <p className="mt-4 text-muted-foreground">
                  Our facility is equipped with cutting-edge technology and staffed by experienced professionals to
                  deliver products of exceptional quality.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {capabilities.map((cap) => (
                    <div key={cap.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <cap.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{cap.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{cap.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-2xl lg:aspect-square">
                <img
                  src="/electronics-manufacturing-assembly-line-factory.jpg"
                  alt="Manufacturing facility"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Quality Certifications</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Our commitment to quality is validated by internationally recognized certifications and standards.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {certifications.map((cert) => (
                <Card key={cert.title} className="text-center">
                  <CardContent className="pt-6">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <cert.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{cert.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Promise Section */}
        <section className="border-y border-border bg-foreground py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Our Quality Promise
                </h2>
                <p className="mt-4 leading-relaxed text-primary-foreground/80">
                  Every product that leaves our facility undergoes comprehensive testing and inspection. We stand behind
                  our products with industry-leading warranties and responsive support.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "100% functional testing before shipment",
                    "3-year comprehensive warranty",
                    "Dedicated technical support team",
                    "Free firmware updates for life",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-primary-foreground/80">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center lg:text-right">
                <div className="inline-flex flex-col items-center rounded-2xl border border-primary/20 bg-primary/10 p-8">
                  <span className="text-6xl font-bold text-primary">99.8%</span>
                  <span className="mt-2 text-primary-foreground/80">Customer Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">See Our Facility in Action</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Schedule a virtual or in-person tour of our manufacturing facility to see our quality processes
                firsthand.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/contact">
                    Schedule Factory Tour
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent">
                  <Link href="/dealers">Dealer Partnership</Link>
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
