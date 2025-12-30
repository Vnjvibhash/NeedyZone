"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "#",
    children: [
      { name: "CCTV Cameras", href: "/products/cctv" },
      { name: "Smart Switchboards", href: "/products/switchboards" },
    ],
  },
  { name: "Manufacturing", href: "/manufacturing" },
  { name: "Dealers", href: "/dealers" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
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
          <span className="text-lg font-semibold tracking-tight">NeedyZone</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1 text-muted-foreground hover:text-foreground">
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild>
                      <Link href={child.href}>{child.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button key={item.name} variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden md:inline-flex">
            <Link href="/dealers">Become a Dealer</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="mt-8 flex flex-col gap-4">
                {navigation.map((item) =>
                  item.children ? (
                    <div key={item.name} className="flex flex-col gap-2">
                      <span className="font-medium text-foreground">{item.name}</span>
                      <div className="ml-4 flex flex-col gap-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => setOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="font-medium text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ),
                )}
                <Button asChild className="mt-4">
                  <Link href="/dealers" onClick={() => setOpen(false)}>
                    Become a Dealer
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
