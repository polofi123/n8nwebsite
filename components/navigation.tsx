"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for sticky nav height
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { label: "Features", href: "features", isSection: true },
    { label: "Workflows", href: "/workflows", isSection: false },
    { label: "Testimonials", href: "testimonials", isSection: true },
    { label: "Security", href: "security", isSection: true },
    { label: "Pricing", href: "pricing", isSection: true },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/95 backdrop-blur-md border-b border-gray-800/50" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-[#A3FF00] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
                <span className="text-white font-semibold text-lg">SecureAI</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) =>
                  link.isSection ? (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-[#A3FF00] px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A3FF00] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-300 hover:text-[#A3FF00] px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A3FF00] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ),
                )}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection("cta")}
                className="bg-[#A3FF00] text-black hover:bg-[#8FE600] font-semibold px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#A3FF00]/30"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md border-t border-gray-800/50">
            {navLinks.map((link) =>
              link.isSection ? (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-300 hover:text-[#A3FF00] block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-[#A3FF00] block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
            <div className="pt-4 pb-2">
              <Button
                onClick={() => scrollToSection("cta")}
                className="bg-[#A3FF00] text-black hover:bg-[#8FE600] font-semibold w-full transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16"></div>
    </>
  )
}
