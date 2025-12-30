import { Monitor, Cloud, Lock, Smartphone, Cpu, HeadphonesIcon } from "lucide-react"

const features = [
  {
    icon: Monitor,
    title: "4K Ultra HD",
    description: "Crystal clear footage with up to 8MP resolution for precise identification and monitoring.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Secure cloud backup with 30-day retention and instant access from anywhere in the world.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Military-grade encryption ensures your data remains private and secure at all times.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Control",
    description: "Full control from your smartphone with real-time notifications and live view streaming.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Analytics",
    description: "Smart detection for people, vehicles, and unusual activity with minimal false alarms.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock technical support to keep your security systems running smoothly.",
  },
]

export function FeaturesGrid() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose SecureVision Pro?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our products combine cutting-edge technology with reliable performance to deliver security solutions you can
            trust.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
