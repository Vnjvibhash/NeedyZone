import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { switchboardProducts } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, ToggleRight, Smartphone, Zap, BarChart3 } from "lucide-react"

export const dynamic = "force-dynamic"


const features = [
  {
    icon: ToggleRight,
    title: "Smart Control",
    description: "Remote on/off for every circuit",
  },
  {
    icon: Smartphone,
    title: "App Enabled",
    description: "iOS & Android compatible",
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "Real-time consumption monitoring",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Detailed usage reports & insights",
  },
]

export default function SwitchboardsProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-foreground py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground">
                <ToggleRight className="h-4 w-4" />
                Automation Solutions
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl text-balance">
                IoT Smart Switchboards
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Transform any space with intelligent power distribution. Our smart switchboards offer remote control,
                energy monitoring, and seamless integration with your favorite smart home platforms.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="#products">View All Panels</Link>
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
              {switchboardProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  specs={product.specs.slice(0, 3).map((s) => s.value)}
                  href={`/products/switchboards/${product.id}`}
                  badge={product.badge}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="border-y border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">Works With Your Ecosystem</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Our smart switchboards integrate seamlessly with popular smart home platforms and voice assistants.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
                {["Amazon Alexa", "Google Home", "Apple HomeKit", "Samsung SmartThings", "IFTTT"].map((platform) => (
                  <div
                    key={platform}
                    className="flex h-16 items-center justify-center rounded-lg border border-border bg-card px-6"
                  >
                    <span className="font-medium text-muted-foreground">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">Ready to Upgrade Your Electrical System?</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Our experts can help you choose the right smart switchboard solution for your home, office, or
                industrial facility.
              </p>
              <Button asChild className="mt-6 gap-2">
                <Link href="/contact">
                  Get Expert Advice
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
