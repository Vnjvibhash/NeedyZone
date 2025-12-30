import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { cctvProducts } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, Camera, Shield, Wifi, Cloud } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "4K to 8K Resolution",
    description: "Crystal clear footage for precise identification",
  },
  {
    icon: Shield,
    title: "Weatherproof Design",
    description: "IP66-IP68 rated for any environment",
  },
  {
    icon: Wifi,
    title: "Smart Connectivity",
    description: "WiFi, PoE, and cloud integration options",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Secure cloud backup with instant access",
  },
]

export default function CCTVProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-foreground py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground">
                <Camera className="h-4 w-4" />
                Security Solutions
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
                Professional CCTV Cameras
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Industrial-grade surveillance cameras engineered for homes, offices, factories, and commercial spaces.
                From compact indoor cameras to heavy-duty PTZ systems.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="#products">View All Cameras</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/contact">Request Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="border-b border-border bg-muted/30 py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section id="products" className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cctvProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  specs={product.specs.slice(0, 3).map((s) => s.value)}
                  href={`/products/cctv/${product.id}`}
                  badge={product.badge}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">Need a Custom Solution?</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Our security experts can design a complete surveillance system tailored to your specific requirements.
              </p>
              <Button asChild className="mt-6 gap-2">
                <Link href="/contact">
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
