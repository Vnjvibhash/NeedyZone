import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface ProductCardProps {
  name: string
  description: string
  image: string
  specs: string[]
  href: string
  badge?: string
}

export function ProductCard({ name, description, image, specs, href, badge }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge && <Badge className="absolute right-3 top-3">{badge}</Badge>}
      </div>
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {specs.map((spec) => (
            <span
              key={spec}
              className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {spec}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-border bg-muted/30 p-4">
        <Button variant="ghost" asChild className="w-full gap-2">
          <Link href={href}>
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
