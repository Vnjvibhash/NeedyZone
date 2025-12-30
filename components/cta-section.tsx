import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center lg:px-12">
          <div className="absolute inset-0 bg-[url('/abstract-blue-technology-pattern-dark.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Ready to Secure Your Space?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80 text-pretty">
              Whether you&apos;re a homeowner, business, or dealer looking for partnership opportunities, we have the
              right solution for you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2 border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href="tel:+1234567890">
                  <Phone className="h-4 w-4" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
