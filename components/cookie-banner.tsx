"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Show banner after a short delay to simulate the original
    const timer = setTimeout(() => {
      const hasAccepted = localStorage.getItem("cookies-accepted")
      if (!hasAccepted) {
        setShowBanner(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookies-accepted", "true")
    setShowBanner(false)
  }

  const acceptNecessaryOnly = () => {
    localStorage.setItem("cookies-accepted", "necessary-only")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white text-black max-w-md w-full">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🍪</div>
            <h3 className="text-lg font-semibold mb-4">Cookies</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We and selected partners use cookies or similar technologies as specified in the cookie policy. You can
              consent to the use of such technologies by closing this notice, by interacting with any link or button
              outside of this notice or by continuing to browse otherwise.
            </p>
            <button className="text-sm text-blue-600 hover:underline mt-2">Learn more</button>
          </div>
          <div className="space-y-3">
            <Button onClick={acceptCookies} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium">
              Accept
            </Button>
            <Button onClick={acceptNecessaryOnly} variant="ghost" className="w-full text-gray-600 hover:text-gray-800">
              Only necessary cookies
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
