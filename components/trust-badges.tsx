import { Shield, Award, CheckCircle, Factory } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "ISO 9001:2015",
    description: "Quality Management Certified",
  },
  {
    icon: Award,
    title: "CE Certified",
    description: "European Conformity Standards",
  },
  {
    icon: CheckCircle,
    title: "RoHS Compliant",
    description: "Environmentally Responsible",
  },
  {
    icon: Factory,
    title: "Made in India",
    description: "Premium Manufacturing",
  },
]

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <badge.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{badge.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
