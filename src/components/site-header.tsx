import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">SajhaSabha</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm ml-10">
            <Link href="/representatives" className="transition-colors hover:text-foreground/80">
              Find Representatives
            </Link>
            <Link href="/actions" className="transition-colors hover:text-foreground/80">
              Take Action
            </Link>
            <Link href="/discussions" className="transition-colors hover:text-foreground/80">
              Discussions
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 mr-2">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <ThemeToggle />
          <Button className="ml-4">Sign In</Button>
        </div>
      </div>
    </header>
  )
}
