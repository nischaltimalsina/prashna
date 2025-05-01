import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="max-w-(--breakpoint-xl) mx-auto flex flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-bold text-xl">
            PledgePoint
          </Link>
          <p className="text-sm text-muted-foreground max-w-md">
            Empowering Nepali citizens to rate, review, and engage with their elected officials for a more transparent democracy.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-sm">Platform</h3>
            <Link href="/representatives" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Find Representatives
            </Link>
            <Link href="/actions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Take Action
            </Link>
            <Link href="/discussions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Discussions
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-sm">About</h3>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Our Mission
            </Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-sm">Legal</h3>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/guidelines" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Community Guidelines
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex py-6 text-sm text-muted-foreground">
          <p>© 2025 PledgePoint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
