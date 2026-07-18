import { getStoredReviews } from "@/lib/reviews-data"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const reviews = getStoredReviews().filter((r) => r.approved)

  if (reviews.length === 0) return null

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Read testimonials from homeowners, business managers, and installers who trust NeedyZone.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4.5 w-4.5 ${
                        i < review.rating ? "fill-yellow-500" : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                {/* Comment */}
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-border/60">
                <h4 className="font-semibold text-sm text-foreground">{review.author}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
