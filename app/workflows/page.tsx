"use client"
import { useState } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import {
  ArrowLeft,
  Mail,
  Database,
  MessageSquare,
  FileText,
  BarChart3,
  Users,
  Play,
  Clock,
  DollarSign,
} from "lucide-react"
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  buttonVariants,
  cardVariants,
  slideInLeft,
  slideInRight,
  getReducedMotionVariants,
  microTransition,
} from "@/lib/animations"

// Workflow data
const workflows = [
  {
    id: 1,
    name: "Email Campaign Automation",
    description: "Automatically send personalized email campaigns based on user behavior and preferences",
    icon: Mail,
    category: "Marketing",
    credits: 25,
    estimatedTime: "2-5 minutes",
    difficulty: "Easy",
    tags: ["Email", "Marketing", "Automation"],
    fields: [
      {
        name: "campaignName",
        label: "Campaign Name",
        type: "text",
        required: true,
        placeholder: "Enter campaign name",
      },
      {
        name: "emailList",
        label: "Email List",
        type: "select",
        required: true,
        options: ["Newsletter Subscribers", "Premium Users", "Trial Users", "All Users"],
      },
      { name: "subject", label: "Email Subject", type: "text", required: true, placeholder: "Enter email subject" },
      {
        name: "content",
        label: "Email Content",
        type: "textarea",
        required: true,
        placeholder: "Enter your email content here...",
      },
      {
        name: "sendTime",
        label: "Send Time",
        type: "select",
        required: false,
        options: ["Immediately", "1 hour", "6 hours", "24 hours", "Custom"],
      },
    ],
  },
  {
    id: 2,
    name: "Data Processing Pipeline",
    description: "Process and transform large datasets with automated validation and error handling",
    icon: Database,
    category: "Data",
    credits: 50,
    estimatedTime: "5-15 minutes",
    difficulty: "Medium",
    tags: ["Data", "Processing", "ETL"],
    fields: [
      {
        name: "dataSource",
        label: "Data Source",
        type: "select",
        required: true,
        options: ["CSV Upload", "Database Connection", "API Endpoint", "Google Sheets"],
      },
      {
        name: "outputFormat",
        label: "Output Format",
        type: "select",
        required: true,
        options: ["JSON", "CSV", "Excel", "Database"],
      },
      {
        name: "transformations",
        label: "Transformations",
        type: "textarea",
        required: false,
        placeholder: "Describe any data transformations needed...",
      },
      {
        name: "validationRules",
        label: "Validation Rules",
        type: "textarea",
        required: false,
        placeholder: "Enter validation rules...",
      },
    ],
  },
  {
    id: 3,
    name: "Slack Notification System",
    description: "Send automated notifications to Slack channels based on triggers and conditions",
    icon: MessageSquare,
    category: "Communication",
    credits: 15,
    estimatedTime: "1-3 minutes",
    difficulty: "Easy",
    tags: ["Slack", "Notifications", "Alerts"],
    fields: [
      {
        name: "channel",
        label: "Slack Channel",
        type: "select",
        required: true,
        options: ["#general", "#alerts", "#marketing", "#development", "#support"],
      },
      {
        name: "message",
        label: "Message Template",
        type: "textarea",
        required: true,
        placeholder: "Enter your message template...",
      },
      {
        name: "trigger",
        label: "Trigger Condition",
        type: "select",
        required: true,
        options: ["New User Registration", "Error Occurred", "Daily Report", "Custom Webhook"],
      },
      {
        name: "frequency",
        label: "Frequency",
        type: "select",
        required: false,
        options: ["Once", "Daily", "Weekly", "On Trigger"],
      },
    ],
  },
  {
    id: 4,
    name: "Content Generation",
    description: "Generate blog posts, social media content, and marketing copy using AI",
    icon: FileText,
    category: "Content",
    credits: 75,
    estimatedTime: "3-10 minutes",
    difficulty: "Medium",
    tags: ["AI", "Content", "Writing"],
    fields: [
      {
        name: "contentType",
        label: "Content Type",
        type: "select",
        required: true,
        options: ["Blog Post", "Social Media Post", "Email Newsletter", "Product Description"],
      },
      {
        name: "topic",
        label: "Topic/Keywords",
        type: "text",
        required: true,
        placeholder: "Enter main topic or keywords",
      },
      {
        name: "tone",
        label: "Tone of Voice",
        type: "select",
        required: true,
        options: ["Professional", "Casual", "Friendly", "Authoritative", "Creative"],
      },
      {
        name: "length",
        label: "Content Length",
        type: "select",
        required: true,
        options: ["Short (100-300 words)", "Medium (300-800 words)", "Long (800+ words)"],
      },
      {
        name: "additionalInstructions",
        label: "Additional Instructions",
        type: "textarea",
        required: false,
        placeholder: "Any specific requirements or instructions...",
      },
    ],
  },
  {
    id: 5,
    name: "Analytics Dashboard",
    description: "Generate comprehensive analytics reports with charts and insights",
    icon: BarChart3,
    category: "Analytics",
    credits: 40,
    estimatedTime: "5-12 minutes",
    difficulty: "Medium",
    tags: ["Analytics", "Reports", "Dashboard"],
    fields: [
      {
        name: "dataSource",
        label: "Data Source",
        type: "select",
        required: true,
        options: ["Google Analytics", "Database", "CSV File", "API"],
      },
      {
        name: "reportType",
        label: "Report Type",
        type: "select",
        required: true,
        options: ["Traffic Report", "Sales Report", "User Behavior", "Custom"],
      },
      {
        name: "dateRange",
        label: "Date Range",
        type: "select",
        required: true,
        options: ["Last 7 days", "Last 30 days", "Last 3 months", "Custom Range"],
      },
      {
        name: "metrics",
        label: "Key Metrics",
        type: "textarea",
        required: false,
        placeholder: "Specify which metrics to include...",
      },
    ],
  },
  {
    id: 6,
    name: "Team Onboarding",
    description: "Automate the complete onboarding process for new team members",
    icon: Users,
    category: "HR",
    credits: 30,
    estimatedTime: "2-8 minutes",
    difficulty: "Easy",
    tags: ["HR", "Onboarding", "Automation"],
    fields: [
      {
        name: "employeeName",
        label: "Employee Name",
        type: "text",
        required: true,
        placeholder: "Enter employee name",
      },
      {
        name: "department",
        label: "Department",
        type: "select",
        required: true,
        options: ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"],
      },
      { name: "role", label: "Job Role", type: "text", required: true, placeholder: "Enter job title" },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      {
        name: "manager",
        label: "Direct Manager",
        type: "select",
        required: true,
        options: ["John Smith", "Sarah Johnson", "Mike Chen", "Lisa Brown"],
      },
    ],
  },
]

export default function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<(typeof workflows)[0] | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>("All")

  const categories = ["All", "Marketing", "Data", "Communication", "Content", "Analytics", "HR"]
  const filteredWorkflows =
    filterCategory === "All" ? workflows : workflows.filter((w) => w.category === filterCategory)

  const handleWorkflowSelect = (workflow: (typeof workflows)[0]) => {
    setSelectedWorkflow(workflow)
    setFormData({})
  }

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert(`Workflow "${selectedWorkflow?.name}" has been started successfully!`)
    setIsSubmitting(false)
    setSelectedWorkflow(null)
    setFormData({})
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (selectedWorkflow) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          variants={getReducedMotionVariants(fadeIn)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={getReducedMotionVariants(slideInLeft)} initial="hidden" animate="visible">
            <motion.div variants={getReducedMotionVariants(buttonVariants)} whileHover="hover" whileTap="tap">
              <Button
                variant="ghost"
                onClick={() => setSelectedWorkflow(null)}
                className="mb-8 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Workflows
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Workflow Info */}
            <motion.div
              className="lg:col-span-1"
              variants={getReducedMotionVariants(slideInLeft)}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gray-900 border-gray-800 sticky top-8">
                <CardHeader>
                  <motion.div
                    className="flex items-center space-x-3 mb-4"
                    variants={getReducedMotionVariants(fadeInUp)}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={microTransition}
                    >
                      <selectedWorkflow.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-white text-lg">{selectedWorkflow.name}</CardTitle>
                      <Badge className={getDifficultyColor(selectedWorkflow.difficulty)}>
                        {selectedWorkflow.difficulty}
                      </Badge>
                    </div>
                  </motion.div>
                  <motion.p
                    className="text-gray-400 text-sm mb-4"
                    variants={getReducedMotionVariants(fadeIn)}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 }}
                  >
                    {selectedWorkflow.description}
                  </motion.p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    className="flex items-center justify-between text-sm"
                    variants={getReducedMotionVariants(fadeInUp)}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-gray-400">Credits Required:</span>
                    <div className="flex items-center text-violet-400">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {selectedWorkflow.credits}
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-between text-sm"
                    variants={getReducedMotionVariants(fadeInUp)}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6 }}
                  >
                    <span className="text-gray-400">Estimated Time:</span>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedWorkflow.estimatedTime}
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex flex-wrap gap-2 pt-2"
                    variants={getReducedMotionVariants(staggerContainer)}
                    initial="hidden"
                    animate="visible"
                  >
                    {selectedWorkflow.tags.map((tag, index) => (
                      <motion.div
                        key={tag}
                        variants={getReducedMotionVariants(fadeIn)}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              variants={getReducedMotionVariants(slideInRight)}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Configure Workflow</CardTitle>
                  <p className="text-gray-400">Fill in the required information to run this workflow</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      variants={getReducedMotionVariants(staggerContainer)}
                      initial="hidden"
                      animate="visible"
                    >
                      {selectedWorkflow.fields.map((field, index) => (
                        <motion.div
                          key={field.name}
                          className="space-y-2"
                          variants={getReducedMotionVariants(fadeInUp)}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <Label htmlFor={field.name} className="text-white">
                            {field.label}
                            {field.required && <span className="text-red-400 ml-1">*</span>}
                          </Label>

                          {field.type === "text" && (
                            <Input
                              id={field.name}
                              type="text"
                              placeholder={field.placeholder}
                              value={formData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              required={field.required}
                              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-violet-500 transition-colors"
                            />
                          )}

                          {field.type === "textarea" && (
                            <Textarea
                              id={field.name}
                              placeholder={field.placeholder}
                              value={formData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              required={field.required}
                              rows={4}
                              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-violet-500 transition-colors"
                            />
                          )}

                          {field.type === "select" && field.options && (
                            <Select
                              value={formData[field.name] || ""}
                              onValueChange={(value) => handleInputChange(field.name, value)}
                              required={field.required}
                            >
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-violet-500 transition-colors">
                                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                {field.options.map((option) => (
                                  <SelectItem key={option} value={option} className="text-white hover:bg-gray-700">
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}

                          {field.type === "date" && (
                            <Input
                              id={field.name}
                              type="date"
                              value={formData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              required={field.required}
                              className="bg-gray-800 border-gray-700 text-white focus:border-violet-500 transition-colors"
                            />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      className="flex gap-4 pt-6"
                      variants={getReducedMotionVariants(fadeInUp)}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 1 }}
                    >
                      <motion.div
                        className="flex-1"
                        variants={getReducedMotionVariants(buttonVariants)}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-violet-600 hover:bg-violet-700 text-white w-full transition-colors"
                        >
                          <AnimatePresence mode="wait">
                            {isSubmitting ? (
                              <motion.div
                                key="loading"
                                className="flex items-center"
                                variants={getReducedMotionVariants(fadeIn)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                              >
                                <motion.div
                                  className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                />
                                Running Workflow...
                              </motion.div>
                            ) : (
                              <motion.div
                                key="idle"
                                className="flex items-center"
                                variants={getReducedMotionVariants(fadeIn)}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                              >
                                <Play className="mr-2 h-4 w-4" />
                                Run Workflow ({selectedWorkflow.credits} credits)
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                      <motion.div variants={getReducedMotionVariants(buttonVariants)} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedWorkflow(null)}
                          className="border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                        >
                          Cancel
                        </Button>
                      </motion.div>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={getReducedMotionVariants(fadeIn)}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={getReducedMotionVariants(staggerContainer)}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="text-4xl font-bold text-white mb-4" variants={getReducedMotionVariants(fadeInUp)}>
            Available Workflows
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={getReducedMotionVariants(fadeInUp)}
            transition={{ delay: 0.1 }}
          >
            Choose from our library of pre-built workflows to automate your business processes
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          variants={getReducedMotionVariants(staggerContainer)}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              variants={getReducedMotionVariants(fadeIn)}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <motion.div variants={getReducedMotionVariants(buttonVariants)} whileHover="hover" whileTap="tap">
                <Button
                  variant={filterCategory === category ? "default" : "outline"}
                  onClick={() => setFilterCategory(category)}
                  className={
                    filterCategory === category
                      ? "bg-violet-600 hover:bg-violet-700 text-white transition-colors"
                      : "border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                  }
                >
                  {category}
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Workflows Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filterCategory}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={getReducedMotionVariants(staggerContainer)}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredWorkflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                variants={getReducedMotionVariants(cardVariants)}
                transition={{ delay: index * 0.1 }}
                whileHover="hover"
                layout
              >
                <Card
                  className="bg-gray-900 border-gray-800 hover:border-violet-600 transition-all duration-300 cursor-pointer group h-full"
                  onClick={() => handleWorkflowSelect(workflow)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <motion.div
                        className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center group-hover:bg-violet-500 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={microTransition}
                      >
                        <workflow.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg group-hover:text-violet-300 transition-colors">
                          {workflow.name}
                        </CardTitle>
                        <Badge className={getDifficultyColor(workflow.difficulty)}>{workflow.difficulty}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{workflow.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {workflow.credits} credits
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {workflow.estimatedTime}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {workflow.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredWorkflows.length === 0 && (
          <motion.div
            className="text-center py-12"
            variants={getReducedMotionVariants(fadeIn)}
            initial="hidden"
            animate="visible"
          >
            <p className="text-gray-400 text-lg">No workflows found in this category.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
