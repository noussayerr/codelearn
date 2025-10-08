"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Users, BookOpen, Trophy, Star, Play, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    solutions: 0,
    languages: 0,
    workshops: 0,
  })

  const finalStats = {
    users: 50000,
    solutions: 125000,
    languages: 15,
    workshops: 450,
  }

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setAnimatedStats({
        users: Math.floor(finalStats.users * easeOut),
        solutions: Math.floor(finalStats.solutions * easeOut),
        languages: Math.floor(finalStats.languages * easeOut),
        workshops: Math.floor(finalStats.workshops * easeOut),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedStats(finalStats)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CodeLearn
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/workshops" className="text-gray-600 hover:text-gray-900 transition-colors">
                Workshops
              </Link>
              <Link href="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
                Courses
              </Link>
              <Link href="/practice" className="text-gray-600 hover:text-gray-900 transition-colors">
                Practice
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                Dashboard
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                🚀 Join 50,000+ developers learning to code
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Master Coding Through
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Interactive Workshops
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              Learn programming languages, solve real-world problems, and build projects with our hands-on workshops.
              From beginner to expert, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-3 text-lg" asChild>
                <Link href="/workshops">
                  Start Learning <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg bg-transparent" asChild>
                <Link href="/demo">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-200 rounded-lg opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-25 animate-pulse"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.users.toLocaleString()}+</div>
              <div className="text-gray-600">Active Learners</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.solutions.toLocaleString()}+</div>
              <div className="text-gray-600">Solutions Submitted</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.languages}+</div>
              <div className="text-gray-600">Programming Languages</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{animatedStats.workshops}+</div>
              <div className="text-gray-600">Workshops Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose CodeLearn?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines interactive learning with real-world practice to help you become a better developer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-white">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Interactive Code Editor</h3>
                <p className="text-gray-600 mb-4">
                  Write, test, and debug code directly in your browser with our powerful online IDE supporting multiple
                  languages.
                </p>
                <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                  Learn more <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-white">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Structured Learning Path</h3>
                <p className="text-gray-600 mb-4">
                  Follow carefully designed roadmaps that take you from beginner to advanced with clear milestones and
                  progress tracking.
                </p>
                <Button variant="ghost" className="p-0 h-auto text-green-600 hover:text-green-700">
                  Explore paths <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-white">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-World Projects</h3>
                <p className="text-gray-600 mb-4">
                  Build actual applications and solve practical problems that you'll encounter in your development
                  career.
                </p>
                <Button variant="ghost" className="p-0 h-auto text-purple-600 hover:text-purple-700">
                  View projects <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Workshops Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Workshops</h2>
              <p className="text-gray-600">Start with these highly-rated learning experiences</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/workshops">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "JavaScript Fundamentals",
                description: "Master the basics of JavaScript with hands-on exercises and real projects.",
                level: "Beginner",
                duration: "8 hours",
                students: "12.5k",
                rating: 4.9,
                language: "JavaScript",
              },
              {
                title: "React Development Path",
                description: "Build modern web applications with React, hooks, and state management.",
                level: "Intermediate",
                duration: "15 hours",
                students: "8.2k",
                rating: 4.8,
                language: "React",
              },
              {
                title: "Python for Data Science",
                description: "Learn Python programming with focus on data analysis and visualization.",
                level: "Beginner",
                duration: "12 hours",
                students: "15.3k",
                rating: 4.9,
                language: "Python",
              },
            ].map((workshop, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{workshop.language}</Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {workshop.rating}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{workshop.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{workshop.level}</span>
                    <span>{workshop.duration}</span>
                    <span>{workshop.students} students</span>
                  </div>

                  <Button className="w-full">Start Workshop</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Your Coding Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who are already learning and building amazing projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CodeLearn</span>
              </div>
              <p className="text-gray-400">Empowering developers worldwide with interactive coding education.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/workshops" className="hover:text-white transition-colors">
                    Workshops
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/practice" className="hover:text-white transition-colors">
                    Practice
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CodeLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
