E:\ai-agency-website"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Zap, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Lock, 
  Clock, 
  Quote, 
  Play,
  Code,
  Database,
  Bot,
  Workflow,
  Sparkles,
  TrendingUp,
  Shield,
  Cpu,
  BarChart3
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  buttonVariants,
  typewriterVariants,
  glowPulse,
  rotateYoyo,
  counterVariants,
  card3D,
  backgroundGradient,
  flipUp,
  getReducedMotionVariants,
  microTransition,
} from "@/lib/animations"

// Counter component for animated numbers
function AnimatedCounter({
  value,
  suffix = "",
  duration = 1000,
  shouldStart = false,
  onComplete,
}: {
  value: number
  suffix?: string
  duration?: number
  shouldStart: boolean
  onComplete?: () => void
}) {
  const [count, setCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing out function
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easedProgress * value)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(value)
        setIsComplete(true)
        onComplete?.()
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [shouldStart, value, duration, onComplete])

  return (
    <motion.div
      className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#A3FF00] to-[#8FE600] bg-clip-text text-transparent"
      variants={getReducedMotionVariants(counterVariants)}
      initial="hidden"
      animate={isComplete ? "glow" : "visible"}
    >
      {count}
      {suffix}
    </motion.div>
  )
}

export default function HomePage() {
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [showSubhead, setShowSubhead] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [completedLines, setCompletedLines] = useState<number[]>([])
  const [testimonialStates, setTestimonialStates] = useState({
    card1: { flipped: false, quoteVisible: false, countStarted: false },
    card2: { flipped: false, quoteVisible: false, countStarted: false },
    card3: { flipped: false, quoteVisible: false, countStarted: false },
  })

  const headlineLines = ["Automate Everything", "with n8n Workflows"]
  const valuePropsRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)

  const valuePropsInView = useInView(valuePropsRef, { amount: 0.5, once: true })
  const ctaInView = useInView(ctaRef, { amount: 0.3, once: true })
  const testimonialsInView = useInView(testimonialsRef, { amount: 0.3, once: true })

  useEffect(() => {
    // Start typewriter effect
    const startTypewriter = setTimeout(() => {
      typeNextCharacter()
    }, 800)

    return () => clearTimeout(startTypewriter)
  }, [])

  useEffect(() => {
    if (testimonialsInView) {
      // Start card flip animations with staggered timing
      setTimeout(() => {
        setTestimonialStates((prev) => ({ ...prev, card1: { ...prev.card1, flipped: true } }))
      }, 0)

      setTimeout(() => {
        setTestimonialStates((prev) => ({ ...prev, card2: { ...prev.card2, flipped: true } }))
      }, 150)

      setTimeout(() => {
        setTestimonialStates((prev) => ({ ...prev, card3: { ...prev.card3, flipped: true } }))
      }, 300)

      // Start quote text fade after flip completes
      setTimeout(() => {
        setTestimonialStates((prev) => ({ ...prev, card1: { ...prev.card1, quoteVisible: true } }))
      }, 500)

      setTimeout(() => {
        setTestimonialStates((prev) => ({ ...prev, card2: { ...prev.card2, quoteVisible: true } }))
      }, 650)

      setTimeout(() => {
        setTestimonialStates((prev) => ({ ...prev, card3: { ...prev.card3, quoteVisible: true } }))
      }, 800)

      // Start counting animations after quote text appears
      setTimeout(() => {
        setTestimonialStates((prev) => ({ ...prev, card1: { ...prev.card1, countStarted: true } }))
      }, 900)

      setTimeout(() => {
        setTestimonialStates((prev) => ({ ...prev, card2: { ...prev.card2, countStarted: true } }))
      }, 1050)

      setTimeout(() => {
        setTestimonialStates((prev) => ({ ...prev, card3: { ...prev.card3, countStarted: true } }))
      }, 1200)
    }
  }, [testimonialsInView])

  const typeNextCharacter = () => {
    if (currentLine < headlineLines.length) {
      const currentLineText = headlineLines[currentLine]

      if (currentChar < currentLineText.length) {
        setTimeout(() => {
          setCurrentChar((prev) => prev + 1)
          typeNextCharacter()
        }, 100) // 0.1s character delay
      } else {
        // Line complete
        setCompletedLines((prev) => [...prev, currentLine])

        if (currentLine < headlineLines.length - 1) {
          // Move to next line
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1)
            setCurrentChar(0)
            typeNextCharacter()
          }, 200)
        } else {
          // All lines complete - show subhead
          setTimeout(() => {
            setShowSubhead(true)
            // Show buttons after subhead
            setTimeout(() => {
              setShowButtons(true)
            }, 800) // 0.6s + 0.2s delay
          }, 200)
        }
      }
    }
  }

  const renderHeadline = () => {
    return headlineLines.map((line, lineIndex) => {
      const isCurrentLine = lineIndex === currentLine
      const isCompletedLine = completedLines.includes(lineIndex)

      let displayText = ""
      if (isCurrentLine) {
        displayText = line.substring(0, currentChar)
      } else if (isCompletedLine) {
        displayText = line
      }

      // First line (Automate Everything) in green, second line in white
      const textColor = lineIndex === 0 ? "#A3FF00" : "white"

      return (
        <motion.div
          key={lineIndex}
          className="relative overflow-hidden"
          style={{
            minHeight: "1.2em",
            color: textColor,
          }}
        >
          <motion.div
            variants={getReducedMotionVariants(typewriterVariants)}
            initial="hidden"
            animate={isCurrentLine ? "visible" : "hidden"}
            className="border-r-2 border-[#A3FF00] pr-1"
            style={{
              whiteSpace: "nowrap",
              borderRight: isCompletedLine && !isCurrentLine ? "none" : undefined,
            }}
          >
            {displayText}
          </motion.div>
        </motion.div>
      )
    })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Enhanced Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 overflow-hidden"
        aria-label="Hero section with main headline and call to action"
      >
        {/* Enhanced animated background elements */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          variants={getReducedMotionVariants(backgroundGradient)}
          initial="hidden"
          animate="visible"
        >
          {/* Improved background glow with better balance */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_20%,rgba(163,255,0,0.2),transparent_60%)]" />
          <div className="absolute inset-0 opacity-12 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.25),transparent_60%)]" />
          <div className="absolute inset-0 opacity-8 bg-[radial-gradient(circle_at_50%_50%,rgba(163,255,0,0.1),transparent_70%)]" />
          
          {/* Enhanced floating particles with better distribution */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-[#A3FF00] rounded-full opacity-60 animate-pulse" />
          <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-bounce" />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-ping" />
          <div className="absolute bottom-20 right-20 w-5 h-5 bg-[#A3FF00] rounded-full opacity-30 animate-pulse" />
          <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-[#A3FF00] rounded-full opacity-40 animate-ping" />
          <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-purple-300 rounded-full opacity-30 animate-bounce" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout: Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left Column: Enhanced Text Content */}
            <div className="text-left">
              {/* Enhanced "Powered by n8n" badge with better positioning */}
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-[#A3FF00]/15 border border-[#A3FF00]/30 rounded-full text-[#A3FF00] text-sm font-medium mb-8 backdrop-blur-sm shadow-lg shadow-[#A3FF00]/10"
                variants={getReducedMotionVariants(fadeInUp)}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(163, 255, 0, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by n8n
              </motion.div>

              {/* Enhanced headline container with better styling */}
              <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-10 mb-8 inline-block border border-gray-800/50 shadow-2xl shadow-black/50">
                <h1 className="font-serif text-7xl xl:text-8xl font-normal mb-6 leading-tight tracking-tight">
                  {renderHeadline()}
                </h1>
                <AnimatePresence>
                  {showSubhead && (
                    <motion.p
                      className="font-sans text-2xl text-black bg-[#A3FF00] px-6 py-3 rounded-xl inline-block font-semibold shadow-lg shadow-[#A3FF00]/25"
                      variants={getReducedMotionVariants(fadeInUp)}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      in a few clicks
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {showSubhead && (
                  <motion.p
                    className="font-sans text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed"
                    variants={getReducedMotionVariants(fadeInUp)}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: 0.2 }}
                  >
                    Create, deploy, and manage powerful n8n workflows through our intuitive interface. 
                    No coding required—just drag, drop, and automate.
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showButtons && (
                  <motion.div
                    className="flex flex-col sm:flex-row gap-6"
                    variants={getReducedMotionVariants(staggerContainer)}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={getReducedMotionVariants(slideInLeft)}>
                      <motion.div
                        variants={getReducedMotionVariants(buttonVariants)}
                        initial="idle"
                        whileHover="hover"
                        whileTap="tap"
                        className="relative group"
                      >
                        {/* Enhanced glow effect for primary button */}
                        <div className="absolute inset-0 bg-[#A3FF00] rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                        <Button className="relative bg-[#A3FF00] text-black hover:bg-[#8FE600] font-bold text-lg px-12 py-5 transition-all duration-300 shadow-xl shadow-[#A3FF00]/30 hover:shadow-2xl hover:shadow-[#A3FF00]/50 hover:scale-105 border-2 border-[#A3FF00]">
                          Start Building
                          <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </motion.div>
                    </motion.div>
                    <motion.div variants={getReducedMotionVariants(slideInRight)}>
                      <motion.div
                        variants={getReducedMotionVariants(buttonVariants)}
                        initial="idle"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          variant="outline"
                          className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-12 py-5 bg-transparent transition-all duration-300 group backdrop-blur-sm"
                        >
                          <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                          Watch Demo
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced trust indicators */}
              <AnimatePresence>
                {showButtons && (
                  <motion.div
                    className="flex items-center space-x-8 mt-12 pt-8 border-t border-gray-800/50"
                    variants={getReducedMotionVariants(fadeInUp)}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-gray-400 text-sm font-medium">99.9% Uptime</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-[#A3FF00]" />
                      <span className="text-gray-400 text-sm font-medium">Enterprise Security</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-[#A3FF00]" />
                      <span className="text-gray-400 text-sm font-medium">10,000+ Users</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Interactive Workflow Builder */}
            <div className="relative">
              <AnimatePresence>
                {showButtons && (
                  <motion.div
                    variants={getReducedMotionVariants(card3D)}
                    initial="idle"
                    animate="idle"
                    whileHover="hover"
                    className="transform perspective-1000"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Enhanced Main Workflow Builder Card */}
                    <motion.div
                      className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8"
                      variants={getReducedMotionVariants(fadeIn)}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.5 }}
                    >
                      {/* Enhanced Card Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#A3FF00]/15 to-purple-500/15 rounded-3xl blur-xl"></div>

                      {/* Workflow Builder Content */}
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#A3FF00] to-[#8FE600] rounded-lg flex items-center justify-center">
                              <Workflow className="h-4 w-4 text-black" />
                            </div>
                            <span className="text-white font-semibold text-lg">Workflow Builder</span>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        </div>

                        {/* Enhanced Workflow Canvas */}
                        <div className="bg-gray-800/60 rounded-2xl p-6 mb-6 border border-gray-700/50 backdrop-blur-sm">
                          <div className="flex items-center justify-center space-x-4 mb-4">
                            {/* Trigger Node */}
                            <motion.div
                              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 flex items-center space-x-2 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              transition={microTransition}
                            >
                              <div className="w-2 h-2 bg-white rounded-full" />
                              <span className="text-white text-sm font-medium">Webhook</span>
                            </motion.div>
                            
                            {/* Connection Line */}
                            <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-[#A3FF00] relative">
                              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#A3FF00] rounded-full animate-pulse" />
                            </div>

                            {/* Action Node */}
                            <motion.div
                              className="bg-gradient-to-br from-[#A3FF00] to-[#8FE600] rounded-lg p-3 flex items-center space-x-2 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              transition={microTransition}
                            >
                              <Database className="w-4 h-4 text-black" />
                              <span className="text-black text-sm font-medium">Database</span>
                            </motion.div>
                          </div>

                          {/* Additional Nodes */}
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { icon: Bot, label: "AI Agent", color: "from-purple-500 to-purple-600" },
                              { icon: Code, label: "Function", color: "from-orange-500 to-orange-600" },
                              { icon: Globe, label: "HTTP", color: "from-green-500 to-green-600" },
                            ].map((node, index) => (
                              <motion.div
                                key={node.label}
                                className={`bg-gradient-to-br ${node.color} rounded-lg p-2 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity shadow-md`}
                                whileHover={{ scale: 1.05 }}
                                transition={microTransition}
                              >
                                <node.icon className="w-4 h-4 text-white" />
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm">
                            <div className="flex items-center space-x-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-[#A3FF00]" />
                              <span className="text-gray-400 text-sm">Executions</span>
                            </div>
                            <div className="text-white text-2xl font-bold">1,247</div>
                          </div>
                          <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm">
                            <div className="flex items-center space-x-2 mb-2">
                              <Clock className="w-4 h-4 text-[#A3FF00]" />
                              <span className="text-gray-400 text-sm">Avg Time</span>
                            </div>
                            <div className="text-white text-2xl font-bold">2.3s</div>
                          </div>
                        </div>

                        {/* Enhanced Deploy Button */}
                        <motion.div
                          variants={getReducedMotionVariants(fadeInUp)}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 1.5 }}
                        >
                          <motion.div
                            variants={getReducedMotionVariants(buttonVariants)}
                            whileHover="hover"
                            whileTap="tap"
                            className="relative group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#A3FF00] to-[#8FE600] rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <Button className="relative w-full bg-gradient-to-r from-[#A3FF00] to-[#8FE600] hover:from-[#8FE600] hover:to-[#A3FF00] text-black font-bold py-4 rounded-xl transition-all duration-300 shadow-xl shadow-[#A3FF00]/25 hover:shadow-2xl hover:shadow-[#A3FF00]/40 hover:scale-105">
                              <Zap className="mr-3 h-5 w-5" />
                              Deploy Workflow
                            </Button>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Enhanced Mobile/Tablet Layout: Stacked */}
          <div className="lg:hidden text-center">
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-[#A3FF00]/15 border border-[#A3FF00]/30 rounded-full text-[#A3FF00] text-sm font-medium mb-8 backdrop-blur-sm shadow-lg shadow-[#A3FF00]/10"
              variants={getReducedMotionVariants(fadeInUp)}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(163, 255, 0, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by n8n
            </motion.div>

            <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-8 mb-8 inline-block border border-gray-800/50 shadow-2xl shadow-black/50">
              <h1 className="font-serif text-5xl sm:text-6xl font-normal mb-6 leading-tight tracking-tight">
                {renderHeadline()}
              </h1>
              <AnimatePresence>
                {showSubhead && (
                  <motion.p
                    className="font-sans text-xl text-black bg-[#A3FF00] px-4 py-3 rounded-xl inline-block font-semibold shadow-lg shadow-[#A3FF00]/25"
                    variants={getReducedMotionVariants(fadeInUp)}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    in a few clicks
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {showSubhead && (
                <motion.p
                  className="font-sans text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                  variants={getReducedMotionVariants(fadeInUp)}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ delay: 0.2 }}
                >
                  Create, deploy, and manage powerful n8n workflows through our intuitive interface. 
                  No coding required—just drag, drop, and automate.
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showButtons && (
                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
                  variants={getReducedMotionVariants(staggerContainer)}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={getReducedMotionVariants(slideInLeft)}>
                    <motion.div variants={getReducedMotionVariants(buttonVariants)} whileHover="hover" whileTap="tap" className="relative group">
                      <div className="absolute inset-0 bg-[#A3FF00] rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                      <Button className="relative bg-[#A3FF00] text-black hover:bg-[#8FE600] font-bold text-lg px-10 py-4 transition-all duration-300 shadow-xl shadow-[#A3FF00]/30 hover:shadow-2xl hover:shadow-[#A3FF00]/50 hover:scale-105 border-2 border-[#A3FF00]">
                        Start Building
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </motion.div>
                  </motion.div>
                  <motion.div variants={getReducedMotionVariants(slideInRight)}>
                    <motion.div variants={getReducedMotionVariants(buttonVariants)} whileHover="hover" whileTap="tap">
                      <Button
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white hover:text-black text-lg px-10 py-4 bg-transparent transition-all duration-300 group backdrop-blur-sm"
                      >
                        <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                        Watch Demo
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Mobile Workflow Preview */}
            <AnimatePresence>
              {showButtons && (
                <motion.div
                  className="max-w-md mx-auto"
                  variants={getReducedMotionVariants(fadeInUp)}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.8 }}
                >
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#A3FF00]/15 to-purple-500/15 rounded-3xl blur-xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#A3FF00] to-[#8FE600] rounded-lg flex items-center justify-center">
                            <Workflow className="h-3 w-3 text-black" />
                          </div>
                          <span className="text-white font-semibold">Workflow Builder</span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>

                      <div className="bg-gray-800/60 rounded-2xl p-4 mb-4 border border-gray-700/50 backdrop-blur-sm">
                        <div className="flex items-center justify-center space-x-3 mb-3">
                          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2 shadow-md">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                          <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-[#A3FF00]" />
                          <div className="bg-gradient-to-br from-[#A3FF00] to-[#8FE600] rounded-lg p-2 shadow-md">
                            <Database className="w-3 h-3 text-black" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { icon: Bot, color: "from-purple-500 to-purple-600" },
                            { icon: Code, color: "from-orange-500 to-orange-600" },
                            { icon: Globe, color: "from-green-500 to-green-600" },
                          ].map((node, index) => (
                            <div key={index} className={`bg-gradient-to-br ${node.color} rounded-lg p-1.5 flex items-center justify-center opacity-60 shadow-sm`}>
                              <node.icon className="w-3 h-3 text-white" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-[#A3FF00] to-[#8FE600] hover:from-[#8FE600] hover:to-[#A3FF00] text-black font-bold py-3 rounded-xl transition-all duration-300 text-sm shadow-xl shadow-[#A3FF00]/25">
                        <Zap className="mr-2 h-4 w-4" />
                        Deploy Workflow
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Value Propositions - Three Columns */}
      <section ref={valuePropsRef} className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={getReducedMotionVariants(fadeInUp)}
            initial="hidden"
            animate={valuePropsInView ? "visible" : "hidden"}
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Built on n8n's powerful engine with enterprise-grade features and intuitive design
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-12"
            variants={getReducedMotionVariants(staggerContainer)}
            initial="hidden"
            animate={valuePropsInView ? "visible" : "hidden"}
          >
            {/* Value Prop 1 */}
            <motion.div className="text-center group" variants={getReducedMotionVariants(fadeInUp)}>
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-[#A3FF00] to-[#8FE600] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#A3FF00]/25"
                variants={getReducedMotionVariants(scaleIn)}
                whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
              >
                <Workflow className="h-10 w-10 text-black" />
              </motion.div>
              <div className="bg-gray-800/30 rounded-lg p-3 mb-4 border border-gray-700/50">
                <p className="text-sm text-[#A3FF00] font-medium">1. Fill out a simple form</p>
              </div>
              <motion.h3
                className="font-sans text-xl font-bold text-white mb-4"
                variants={getReducedMotionVariants(fadeIn)}
              >
                Visual Workflow Builder
              </motion.h3>
              <motion.p
                className="font-sans text-base font-light text-gray-400 leading-relaxed"
                variants={getReducedMotionVariants(fadeInUp)}
              >
                Drag-and-drop interface makes creating complex workflows as easy as drawing a diagram
              </motion.p>
            </motion.div>

            {/* Value Prop 2 */}
            <motion.div className="text-center group" variants={getReducedMotionVariants(fadeInUp)}>
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-[#A3FF00] to-[#8FE600] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#A3FF00]/25"
                variants={getReducedMotionVariants(scaleIn)}
                whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
              >
                <Cpu className="h-10 w-10 text-black" />
              </motion.div>
              <div className="bg-gray-800/30 rounded-lg p-3 mb-4 border border-gray-700/50">
                <p className="text-sm text-[#A3FF00] font-medium">2. Automatically create workflow</p>
              </div>
              <motion.h3
                className="font-sans text-xl font-bold text-white mb-4"
                variants={getReducedMotionVariants(fadeIn)}
              >
                AI-Powered Automation
              </motion.h3>
              <motion.p
                className="font-sans text-base font-light text-gray-400 leading-relaxed"
                variants={getReducedMotionVariants(fadeInUp)}
              >
                Intelligent agents that learn from your data and optimize workflows automatically
              </motion.p>
            </motion.div>

            {/* Value Prop 3 */}
            <motion.div className="text-center group" variants={getReducedMotionVariants(fadeInUp)}>
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-[#A3FF00] to-[#8FE600] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-[#A3FF00]/25"
                variants={getReducedMotionVariants(scaleIn)}
                whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
              >
                <BarChart3 className="h-10 w-10 text-black" />
              </motion.div>
              <div className="bg-gray-800/30 rounded-lg p-3 mb-4 border border-gray-700/50">
                <p className="text-sm text-[#A3FF00] font-medium">3. Your automation is ready!</p>
              </div>
              <motion.h3
                className="font-sans text-xl font-bold text-white mb-4"
                variants={getReducedMotionVariants(fadeIn)}
              >
                Real-Time Analytics
              </motion.h3>
              <motion.p
                className="font-sans text-base font-light text-gray-400 leading-relaxed"
                variants={getReducedMotionVariants(fadeInUp)}
              >
                Monitor performance, track execution times, and optimize your workflows with detailed insights
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof - Logo Grid */}
      <section className="py-16 bg-gray-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            className="text-center text-gray-400 text-sm font-medium mb-12 uppercase tracking-wider"
            variants={getReducedMotionVariants(fadeIn)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Integrations with Popular Services
          </motion.p>
          
          {/* Infinite Scrolling Container */}
          <div className="relative">
            <div className="flex space-x-12 animate-scroll">
              {/* First set of logos */}
              {[
                { name: "slack", alt: "Slack" },
                { name: "google", alt: "Google" },
                { name: "gmail", alt: "Gmail" },
                { name: "whatsapp", alt: "WhatsApp" },
                { name: "aws", alt: "AWS" },
                { name: "microsoft", alt: "Microsoft" },
                { name: "notion", alt: "Notion" },
                { name: "github", alt: "GitHub" },
                { name: "discord", alt: "Discord" },
                { name: "telegram", alt: "Telegram" },
                { name: "dropbox", alt: "Dropbox" },
                { name: "salesforce", alt: "Salesforce" },
                { name: "hubspot", alt: "HubSpot" },
                { name: "airtable", alt: "Airtable" },
                { name: "zoom", alt: "Zoom" },
                { name: "spotify", alt: "Spotify" },
                { name: "twitter", alt: "Twitter" },
                { name: "linkedin", alt: "LinkedIn" },
                { name: "facebook", alt: "Facebook" },
                { name: "instagram", alt: "Instagram" },
                { name: "youtube", alt: "YouTube" },
                { name: "trello", alt: "Trello" },
                { name: "asana", alt: "Asana" },
                { name: "jira", alt: "Jira" },
                { name: "stripe", alt: "Stripe" },
              ].map((integration, index) => (
                <motion.div 
                  key={`first-${integration.name}`} 
                  className="flex-shrink-0 flex justify-center items-center w-20 h-20"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={microTransition}
                >
                  <Image
                    src={`/integrations/${integration.name}.png`}
                    alt={integration.alt}
                    width={80}
                    height={80}
                    className="brightness-110 contrast-110 hover:brightness-125 hover:contrast-125 transition-all duration-300 drop-shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-logo.png'
                    }}
                  />
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {[
                { name: "slack", alt: "Slack" },
                { name: "google", alt: "Google" },
                { name: "gmail", alt: "Gmail" },
                { name: "whatsapp", alt: "WhatsApp" },
                { name: "aws", alt: "AWS" },
                { name: "microsoft", alt: "Microsoft" },
                { name: "notion", alt: "Notion" },
                { name: "github", alt: "GitHub" },
                { name: "discord", alt: "Discord" },
                { name: "telegram", alt: "Telegram" },
                { name: "dropbox", alt: "Dropbox" },
                { name: "salesforce", alt: "Salesforce" },
                { name: "hubspot", alt: "HubSpot" },
                { name: "airtable", alt: "Airtable" },
                { name: "zoom", alt: "Zoom" },
                { name: "spotify", alt: "Spotify" },
                { name: "twitter", alt: "Twitter" },
                { name: "linkedin", alt: "LinkedIn" },
                { name: "facebook", alt: "Facebook" },
                { name: "instagram", alt: "Instagram" },
                { name: "youtube", alt: "YouTube" },
                { name: "trello", alt: "Trello" },
                { name: "asana", alt: "Asana" },
                { name: "jira", alt: "Jira" },
                { name: "stripe", alt: "Stripe" },
              ].map((integration, index) => (
                <motion.div 
                  key={`second-${integration.name}`} 
                  className="flex-shrink-0 flex justify-center items-center w-20 h-20"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={microTransition}
                >
                  <Image
                    src={`/integrations/${integration.name}.png`}
                    alt={integration.alt}
                    width={80}
                    height={80}
                    className="brightness-110 contrast-110 hover:brightness-125 hover:contrast-125 transition-all duration-300 drop-shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-logo.png'
                    }}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-gray-900/80 via-gray-900/40 to-transparent pointer-events-none z-10" />
          </div>
          
          {/* Second row scrolling in opposite direction */}
          <div className="relative mt-8">
            <div className="flex space-x-12 animate-scroll-reverse">
              {/* First set of logos for reverse scroll */}
              {[
                { name: "paypal", alt: "PayPal" },
                { name: "shopify", alt: "Shopify" },
                { name: "wordpress", alt: "WordPress" },
                { name: "mailchimp", alt: "Mailchimp" },
                { name: "zendesk", alt: "Zendesk" },
                { name: "intercom", alt: "Intercom" },
                { name: "figma", alt: "Figma" },
                { name: "sketch", alt: "Sketch" },
                { name: "adobe", alt: "Adobe" },
                { name: "canva", alt: "Canva" },
                { name: "miro", alt: "Miro" },
                { name: "monday", alt: "Monday.com" },
                { name: "clickup", alt: "ClickUp" },
                { name: "basecamp", alt: "Basecamp" },
                { name: "todoist", alt: "Todoist" },
                { name: "evernote", alt: "Evernote" },
                { name: "onenote", alt: "OneNote" },
                { name: "google-drive", alt: "Google Drive" },
                { name: "box", alt: "Box" },
                { name: "onedrive", alt: "OneDrive" },
                { name: "bitbucket", alt: "Bitbucket" },
                { name: "gitlab", alt: "GitLab" },
                { name: "jenkins", alt: "Jenkins" },
                { name: "docker", alt: "Docker" },
                { name: "kubernetes", alt: "Kubernetes" },
              ].map((integration, index) => (
                <motion.div 
                  key={`third-${integration.name}`} 
                  className="flex-shrink-0 flex justify-center items-center w-20 h-20"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  transition={microTransition}
                >
                  <Image
                    src={`/integrations/${integration.name}.png`}
                    alt={integration.alt}
                    width={80}
                    height={80}
                    className="brightness-110 contrast-110 hover:brightness-125 hover:contrast-125 transition-all duration-300 drop-shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-logo.png'
                    }}
                  />
                </motion.div>
              ))}
              
              {/* Duplicate for seamless loop */}
              {[
                { name: "paypal", alt: "PayPal" },
                { name: "shopify", alt: "Shopify" },
                { name: "wordpress", alt: "WordPress" },
                { name: "mailchimp", alt: "Mailchimp" },
                { name: "zendesk", alt: "Zendesk" },
                { name: "intercom", alt: "Intercom" },
                { name: "figma", alt: "Figma" },
                { name: "sketch", alt: "Sketch" },
                { name: "adobe", alt: "Adobe" },
                { name: "canva", alt: "Canva" },
                { name: "miro", alt: "Miro" },
                { name: "monday", alt: "Monday.com" },
                { name: "clickup", alt: "ClickUp" },
                { name: "basecamp", alt: "Basecamp" },
                { name: "todoist", alt: "Todoist" },
                { name: "evernote", alt: "Evernote" },
                { name: "onenote", alt: "OneNote" },
                { name: "google-drive", alt: "Google Drive" },
                { name: "box", alt: "Box" },
                { name: "onedrive", alt: "OneDrive" },
                { name: "bitbucket", alt: "Bitbucket" },
                { name: "gitlab", alt: "GitLab" },
                { name: "jenkins", alt: "Jenkins" },
                { name: "docker", alt: "Docker" },
                { name: "kubernetes", alt: "Kubernetes" },
              ].map((integration, index) => (
                <motion.div 
                  key={`fourth-${integration.name}`} 
                  className="flex-shrink-0 flex justify-center items-center w-20 h-20"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  transition={microTransition}
                >
                  <Image
                    src={`/integrations/${integration.name}.png`}
                    alt={integration.alt}
                    width={80}
                    height={80}
                    className="brightness-110 contrast-110 hover:brightness-125 hover:contrast-125 transition-all duration-300 drop-shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-logo.png'
                    }}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-gray-900/80 via-gray-900/40 to-transparent pointer-events-none z-10" />
          </div>
          
          <motion.p
            className="text-center text-gray-500 text-sm mt-12"
            variants={getReducedMotionVariants(fadeInUp)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            + 200 more integrations available
          </motion.p>
        </div>
      </section>

      {/* Features - Alternating Rows */}
      <section id="features" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Feature Row 1 - Image Left, Copy Right */}
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center mb-32"
            variants={getReducedMotionVariants(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="bg-gradient-to-br from-[#A3FF00]/10 to-transparent p-8 rounded-2xl"
              variants={getReducedMotionVariants(slideInLeft)}
            >
              <div className="bg-gray-900 h-80 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#A3FF00]/5 to-transparent"></div>
                <div className="text-center relative z-10">
                  <motion.div whileHover={{ scale: 1.1 }} transition={microTransition}>
                    <Workflow className="h-16 w-16 text-[#A3FF00] mx-auto mb-4" />
                  </motion.div>
                  <p className="text-white text-lg">Visual Workflow Editor</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={getReducedMotionVariants(slideInRight)}>
              <h2 className="font-serif text-4xl text-white mb-6">Build Workflows Visually</h2>
              <ul className="space-y-4">
                {[
                  "Drag-and-drop interface with 200+ pre-built nodes and integrations",
                  "Real-time workflow validation and error detection",
                  "Version control and collaboration features for team workflows",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    variants={getReducedMotionVariants(fadeInUp)}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="h-6 w-6 text-[#A3FF00] mr-4 mt-1 flex-shrink-0" />
                    <span className="font-sans text-base font-light text-gray-400 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Feature Row 2 - Copy Left, Image Right */}
          <motion.div
            id="security"
            className="grid lg:grid-cols-2 gap-16 items-center mb-32"
            variants={getReducedMotionVariants(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="order-2 lg:order-1" variants={getReducedMotionVariants(slideInLeft)}>
              <h2 className="font-serif text-4xl text-white mb-6">Enterprise-Grade Security</h2>
              <ul className="space-y-4">
                {[
                  "End-to-end encryption with zero-knowledge architecture",
                  "SOC 2 Type II compliance and GDPR-ready data handling",
                  "Role-based access control and audit logging for all operations",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    variants={getReducedMotionVariants(fadeInUp)}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="h-6 w-6 text-[#A3FF00] mr-4 mt-1 flex-shrink-0" />
                    <span className="font-sans text-base font-light text-gray-400 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2 bg-gradient-to-br from-[#A3FF00]/10 to-transparent p-8 rounded-2xl"
              variants={getReducedMotionVariants(slideInRight)}
            >
              <div className="bg-gray-900 h-80 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#A3FF00]/5 to-transparent"></div>
                <div className="text-center relative z-10">
                  <motion.div whileHover={{ scale: 1.1 }} transition={microTransition}>
                    <Shield className="h-16 w-16 text-[#A3FF00] mx-auto mb-4" />
                  </motion.div>
                  <p className="text-white text-lg">Security Dashboard</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature Row 3 - Image Left, Copy Right */}
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            variants={getReducedMotionVariants(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="bg-gradient-to-br from-[#A3FF00]/10 to-transparent p-8 rounded-2xl"
              variants={getReducedMotionVariants(slideInLeft)}
            >
              <div className="bg-gray-900 h-80 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#A3FF00]/5 to-transparent"></div>
                <div className="text-center relative z-10">
                  <motion.div whileHover={{ scale: 1.1 }} transition={microTransition}>
                    <BarChart3 className="h-16 w-16 text-[#A3FF00] mx-auto mb-4" />
                  </motion.div>
                  <p className="text-white text-lg">Analytics & Monitoring</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={getReducedMotionVariants(slideInRight)}>
              <h2 className="font-serif text-4xl text-white mb-6">Monitor & Optimize</h2>
              <ul className="space-y-4">
                {[
                  "Real-time execution monitoring with detailed performance metrics",
                  "AI-powered optimization suggestions for workflow efficiency",
                  "Comprehensive logging and debugging tools for troubleshooting",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    variants={getReducedMotionVariants(fadeInUp)}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="h-6 w-6 text-[#A3FF00] mr-4 mt-1 flex-shrink-0" />
                    <span className="font-sans text-base font-light text-gray-400 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Dark Cards */}
      <section id="testimonials" ref={testimonialsRef} className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={getReducedMotionVariants(fadeInUp)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6">
              What Our Customers Say
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              See how teams are transforming their workflows with our platform
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={getReducedMotionVariants(staggerContainer)}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
          >
            {/* Testimonial 1 */}
            <motion.div variants={getReducedMotionVariants(flipUp)}>
              <Card className="bg-gray-800/50 border-gray-700/50 p-8 relative backdrop-blur-sm">
                <CardContent className="p-0">
                  <Quote className="h-8 w-8 text-[#A3FF00] mb-6" />
                  <AnimatePresence>
                    {testimonialStates.card1.quoteVisible && (
                      <motion.blockquote
                        className="text-white text-lg font-light leading-relaxed mb-8"
                        variants={getReducedMotionVariants(fadeIn)}
                        initial="hidden"
                        animate="visible"
                      >
                        "We reduced our data processing time by 85% using n8n workflows. The visual builder made it so easy to create complex automations."
                      </motion.blockquote>
                    )}
                  </AnimatePresence>
                  <div className="mb-6">
                    <AnimatedCounter value={85} suffix="%" shouldStart={testimonialStates.card1.countStarted} />
                    <div className="text-gray-400 text-sm">faster data processing</div>
                  </div>
                  <div className="border-t border-gray-700/50 pt-6">
                    <div className="text-white font-medium">Sarah Chen</div>
                    <div className="text-gray-400 text-sm">CTO, DataFlow Inc.</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div variants={getReducedMotionVariants(flipUp)}>
              <Card className="bg-gray-800/50 border-gray-700/50 p-8 relative backdrop-blur-sm">
                <CardContent className="p-0">
                  <Quote className="h-8 w-8 text-[#A3FF00] mb-6" />
                  <AnimatePresence>
                    {testimonialStates.card2.quoteVisible && (
                      <motion.blockquote
                        className="text-white text-lg font-light leading-relaxed mb-8"
                        variants={getReducedMotionVariants(fadeIn)}
                        initial="hidden"
                        animate="visible"
                      >
                        "Our onboarding process is now 3x faster thanks to the automation capabilities of n8n."
                      </motion.blockquote>
                    )}
                  </AnimatePresence>
                  <div className="mb-6">
                    <AnimatedCounter value={3} suffix="x" shouldStart={testimonialStates.card2.countStarted} />
                    <div className="text-gray-400 text-sm">faster onboarding</div>
                  </div>
                  <div className="border-t border-gray-700/50 pt-6">
                    <div className="text-white font-medium">Marcus Rodriguez</div>
                    <div className="text-gray-400 text-sm">Head of HR, FinTech Solutions</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div variants={getReducedMotionVariants(flipUp)}>
              <Card className="bg-gray-800/50 border-gray-700/50 p-8 relative backdrop-blur-sm">
                <CardContent className="p-0">
                  <Quote className="h-8 w-8 text-[#A3FF00] mb-6" />
                  <AnimatePresence>
                    {testimonialStates.card3.quoteVisible && (
                      <motion.blockquote
                        className="text-white text-lg font-light leading-relaxed mb-8"
                        variants={getReducedMotionVariants(fadeIn)}
                        initial="hidden"
                        animate="visible"
                      >
                        "Customer support tickets are resolved twice as fast. Our team focuses on complex issues while AI handles the routine ones."
                      </motion.blockquote>
                    )}
                  </AnimatePresence>
                  <div className="mb-6">
                    <AnimatedCounter value={2} suffix="x" shouldStart={testimonialStates.card3.countStarted} />
                    <div className="text-gray-400 text-sm">faster issue resolution</div>
                  </div>
                  <div className="border-t border-gray-700/50 pt-6">
                    <div className="text-white font-medium">Jennifer Park</div>
                    <div className="text-gray-400 text-sm">VP Customer Success, Industrial Corp</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Placeholder */}
      <section id="pricing" className="py-20 bg-black">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={getReducedMotionVariants(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="font-serif text-4xl text-white mb-8" variants={getReducedMotionVariants(fadeInUp)}>
            Pricing Plans
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg mb-12"
            variants={getReducedMotionVariants(fadeInUp)}
            transition={{ delay: 0.1 }}
          >
            Choose the perfect plan for your team
          </motion.p>
          <motion.div
            className="text-[#A3FF00] text-lg"
            variants={getReducedMotionVariants(fadeInUp)}
            transition={{ delay: 0.2 }}
          >
            Coming Soon
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA - Centered on Black */}
      <section id="cta" ref={ctaRef} className="py-32 bg-black relative">
        {/* Animated radial glow background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#A3FF00]/5 to-transparent"
          variants={getReducedMotionVariants(glowPulse)}
          initial="initial"
          animate={ctaInView ? "animate" : "initial"}
        />

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          variants={getReducedMotionVariants(staggerContainer)}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="font-serif text-6xl lg:text-7xl text-white mb-8 leading-tight"
            variants={getReducedMotionVariants(fadeInUp)}
          >
            Transform Your Business Today
          </motion.h2>
          <motion.p
            className="font-sans text-xl text-gray-400 font-light mb-12 leading-relaxed"
            variants={getReducedMotionVariants(fadeInUp)}
            transition={{ delay: 0.2 }}
          >
            Join thousands of companies already saving time and scaling with secure AI automation
          </motion.p>
          <motion.div variants={getReducedMotionVariants(fadeInUp)} transition={{ delay: 0.4 }}>
            <motion.div variants={getReducedMotionVariants(buttonVariants)} whileHover="hover" whileTap="tap">
              <Button className="bg-[#A3FF00] text-black hover:bg-[#8FE600] font-semibold text-xl px-12 py-6 transition-colors duration-300">
                Start Your Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={getReducedMotionVariants(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div className="col-span-2" variants={getReducedMotionVariants(fadeInUp)}>
              <div className="w-8 h-8 bg-[#A3FF00] rounded-full flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <p className="text-gray-400 mb-4 font-light leading-relaxed">
                Secure AI agents that accelerate your workflow while protecting your data.
                <br />
                Deploy in minutes, scale with confidence.
              </p>
              <div className="text-sm text-gray-600">© 2024 SecureAI Agents. All rights reserved.</div>
            </motion.div>
            <motion.div variants={getReducedMotionVariants(fadeInUp)} transition={{ delay: 0.1 }}>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {["AI Agents", "Integrations", "Security", "Enterprise"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={getReducedMotionVariants(fadeInUp)} transition={{ delay: 0.2 }}>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {["About", "Customers", "Support", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </footer>
    </div>
  )
}
