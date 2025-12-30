import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  products: [
    { name: "CCTV Cameras", href: "/products/cctv" },
    { name: "Smart Switchboards", href: "/products/switchboards" },
    { name: "Accessories", href: "/products/cctv" },
  ],
  company: [
    { name: "About Us", href: "/manufacturing" },
    { name: "Manufacturing", href: "/manufacturing" },
    { name: "Quality Assurance", href: "/manufacturing" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Dealer Inquiry", href: "/dealers" },
    { name: "Technical Support", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-lg font-semibold">NeedyZone</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Leading manufacturer of industrial-grade CCTV cameras and IoT smart switchboards. Trusted by homes,
              offices, and factories worldwide.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="tel:+919717798826" className="flex items-center gap-2 hover:text-foreground">
                <Phone className="h-4 w-4" />
                +91 9717798826
              </a>
              <a href="mailto:info@needyzone.com" className="flex items-center gap-2 hover:text-foreground">
                <Mail className="h-4 w-4" />
                info@needyzone.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>123 Industrial Park, Tech City, TC 12345</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Products</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Support</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} NeedyZone. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
