"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "w-full py-4 transition-all duration-200",
        scrolled ? "sticky top-0 bg-white shadow-md z-50" : "bg-white",
      )}
    >
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold md:text-xl">
          G-to-G Negotiation Data Management System
        </Link>
        <nav className="flex items-center gap-4">
          {pathname !== "/login" && (
            <Link href="/login">
              <Button variant="default">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
