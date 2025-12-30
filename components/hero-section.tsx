import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Wifi, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground">
      <div className="absolute inset-0 bg-[url('/modern-industrial-security-camera-factory-dark-blu.jpg')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70" />

      <div className="container relative mx-auto px-4 py-24 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-foreground">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Industry-Leading Smart Solutions
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            Intelligent Security & Automation Solutions
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            We manufacture industrial-grade CCTV cameras and IoT smart switchboards trusted by homes, offices,
            factories, and dealers worldwide. Experience precision engineering and cutting-edge technology.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild className="gap-2">
              <Link href="/products/cctv">
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/dealers">Become a Dealer</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary-foreground">Enterprise Security</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <Wifi className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary-foreground">IoT Connected</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary-foreground">Energy Efficient</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
