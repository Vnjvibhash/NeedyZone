import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SpecificationTable } from "@/components/specification-table"
import { LeadInquiryForm } from "@/components/lead-inquiry-form"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { switchboardProducts, getProductById } from "@/lib/products-data"
import { ArrowLeft, Check, Phone, FileText, Download } from "lucide-react"

export function generateStaticParams() {
  return switchboardProducts.map((product) => ({ id: product.id }))
}

export default async function SwitchboardProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(id)

  if (!product || product.category !== "switchboard") {
    notFound()
  }

  const relatedProducts = switchboardProducts.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-4 lg:px-8">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/products/switchboards" className="text-muted-foreground hover:text-foreground">
                Smart Switchboards
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Header */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <Button variant="ghost" asChild className="mb-6 gap-2">
              <Link href="/products/switchboards">
                <ArrowLeft className="h-4 w-4" />
                Back to Smart Switchboards
              </Link>
            </Button>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
                {product.badge && <Badge className="absolute left-4 top-4 z-10">{product.badge}</Badge>}
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{product.name}</h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{product.description}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{product.price}</span>
                  <span className="text-muted-foreground">Starting price</span>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold">Key Features</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" asChild className="gap-2">
                    <a href="#inquiry">
                      Request Quote
                      <FileText className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="gap-2 bg-transparent">
                    <a href="tel:+1234567890">
                      <Phone className="h-4 w-4" />
                      Call for Pricing
                    </a>
                  </Button>
                </div>

                <div className="mt-6">
                  <Button variant="ghost" className="gap-2 text-muted-foreground">
                    <Download className="h-4 w-4" />
                    Download Datasheet (PDF)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="border-t border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="mb-8 w-full justify-start">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="max-w-2xl">
                <SpecificationTable specs={product.specs} />
              </TabsContent>

              <TabsContent value="features">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {product.features.map((feature) => (
                    <Card key={feature}>
                      <CardContent className="flex items-start gap-3 p-4">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="compatibility">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {["Amazon Alexa", "Google Home", "Apple HomeKit", "SmartThings"].map((platform) => (
                    <Card key={platform}>
                      <CardContent className="p-6 text-center">
                        <h4 className="font-semibold">{platform}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">Full Integration</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry" className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Request a Quote</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <LeadInquiryForm productName={product.name} />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="border-t border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  description={p.description}
                  image={p.image}
                  specs={p.specs.slice(0, 3).map((s) => s.value)}
                  href={`/products/switchboards/${p.id}`}
                  badge={p.badge}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
