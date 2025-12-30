import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { TrustBadges } from "@/components/trust-badges"
import { ProductCategories } from "@/components/product-categories"
import { StatsSection } from "@/components/stats-section"
import { FeaturesGrid } from "@/components/features-grid"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustBadges />
        <ProductCategories />
        <StatsSection />
        <FeaturesGrid />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
