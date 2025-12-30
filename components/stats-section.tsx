const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "50K+", label: "Units Deployed" },
  { value: "500+", label: "Dealer Partners" },
  { value: "99.9%", label: "Uptime Guarantee" },
]

export function StatsSection() {
  return (
    <section className="bg-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary lg:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm text-primary-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
