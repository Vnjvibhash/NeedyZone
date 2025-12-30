import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Camera, ToggleRight } from "lucide-react"

const categories = [
  {
    icon: Camera,
    title: "CCTV Cameras",
    description:
      "Industrial-grade surveillance cameras with 4K resolution, night vision, and AI-powered analytics for complete security coverage.",
    features: ["4K Ultra HD", "Night Vision", "AI Analytics", "Weather Resistant"],
    href: "/products/cctv",
    image: "/professional-cctv-security-camera-white-background.jpg",
  },
  {
    icon: ToggleRight,
    title: "Smart Switchboards",
    description:
      "IoT-enabled switchboards with remote control, energy monitoring, and seamless integration with your smart home ecosystem.",
    features: ["Remote Control", "Energy Monitor", "Voice Control", "App Enabled"],
    href: "/products/switchboards",
    image: "/modern-smart-electrical-switchboard-panel-white-ba.jpg",
  },
]

export function ProductCategories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Product Lines</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Discover our comprehensive range of smart security and automation solutions designed for residential,
            commercial, and industrial applications.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-[3/2] overflow-hidden bg-muted">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">{category.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {category.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <Button asChild className="mt-6 gap-2">
                  <Link href={category.href}>
                    View Products
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
