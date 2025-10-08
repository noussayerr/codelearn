"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Trophy,
  Play,
  CheckCircle,
  Circle,
  Heart,
  Share2,
  Download,
  Code,
  FileText,
  Video,
  Award,
  Target,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { RatingModal } from "@/components/rating-modal"
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchWorkshop } from '@/store/slices/workshopsSlice'

export default function WorkshopDetailPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch()
  const { current: workshop, status } = useAppSelector((s) => s.workshops)
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!workshop || (workshop as any)._id !== params.id) {
      dispatch(fetchWorkshop(params.id))
    }
  }, [dispatch, params.id])

  if (!workshop) {
    return <div className="min-h-screen bg-gray-50"><div className="max-w-7xl mx-auto p-8">Loading...</div></div>
  }

  const data = {
  id: 1,
  title: "JavaScript Fundamentals",
  description:
    "Master the basics of JavaScript with hands-on exercises, DOM manipulation, and modern ES6+ features. This comprehensive course is designed for beginners who want to build a solid foundation in JavaScript programming.",
  longDescription:
    "This course covers everything you need to know to get started with JavaScript programming. You'll learn about variables, functions, objects, arrays, and modern ES6+ features. We'll also cover DOM manipulation, event handling, and asynchronous programming. By the end of this course, you'll be able to build interactive web applications and have a solid foundation for learning advanced JavaScript frameworks.",
  instructor: {
    name: "Sarah Chen",
    avatar: "/instructor-sarah.jpg",
    bio: "Senior Frontend Developer with 8+ years of experience. Previously worked at Google and Meta.",
    rating: 4.9,
    students: 25000,
    courses: 12,
  },
  level: "Beginner",
  duration: "8 hours",
  students: 12500,
  rating: 4.9,
  reviews: 2340,
  language: "JavaScript",
  category: "Web Development",
  price: "Free",
  originalPrice: "$49",
  modules: 12,
  exercises: 45,
  projects: 3,
  certificate: true,
  tags: ["ES6", "DOM", "Functions", "Objects", "Async", "Events"],
  thumbnail: "/javascript-course-hero.jpg",
  isPopular: true,
  isNew: false,
  lastUpdated: "2024-01-15",
  completionRate: 87,
  difficulty: 2, // out of 5
  prerequisites: ["Basic HTML knowledge", "Basic CSS knowledge"],
  whatYouWillLearn: [
    "JavaScript fundamentals and syntax",
    "Variables, functions, and data types",
    "DOM manipulation and event handling",
    "ES6+ features and modern JavaScript",
    "Asynchronous programming with promises",
    "Building interactive web applications",
  ],
  roadmap: [
    {
      id: 1,
      title: "Getting Started",
      description: "Introduction to JavaScript and setting up your development environment",
      duration: "45 min",
      lessons: 4,
      exercises: 2,
      completed: false,
      locked: false,
      type: "video",
    },
    {
      id: 2,
      title: "Variables and Data Types",
      description: "Learn about different data types and how to work with variables",
      duration: "60 min",
      lessons: 5,
      exercises: 6,
      completed: false,
      locked: false,
      type: "interactive",
    },
    {
      id: 3,
      title: "Functions and Scope",
      description: "Understanding functions, parameters, and variable scope",
      duration: "75 min",
      lessons: 6,
      exercises: 8,
      completed: false,
      locked: true,
      type: "mixed",
    },
    {
      id: 4,
      title: "Objects and Arrays",
      description: "Working with complex data structures",
      duration: "90 min",
      lessons: 7,
      exercises: 10,
      completed: false,
      locked: true,
      type: "interactive",
    },
    {
      id: 5,
      title: "DOM Manipulation",
      description: "Interacting with HTML elements using JavaScript",
      duration: "80 min",
      lessons: 6,
      exercises: 8,
      completed: false,
      locked: true,
      type: "project",
    },
    {
      id: 6,
      title: "Event Handling",
      description: "Responding to user interactions and browser events",
      duration: "70 min",
      lessons: 5,
      exercises: 7,
      completed: false,
      locked: true,
      type: "interactive",
    },
  ],
  }

  const handleRatingSubmit = (rating: number, review: string) => {
    console.log("Rating submitted:", { rating, review })
    // In a real app, this would submit to the backend
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{workshop.category}</Badge>
                {(workshop as any).isPopular && (
                  <Badge className="bg-orange-500 hover:bg-orange-600">
                    <Trophy className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
                {(workshop as any).isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{workshop.title}</h1>

              <p className="text-lg text-gray-600 mb-6">{workshop.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{workshop.rating}</span>
                  <span className="text-gray-600 ml-1">({workshop.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-1" />
                  {workshop.students.toLocaleString()} students
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-1" />
                  {workshop.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-1" />
                  {(workshop as any).modules?.length || 0} modules
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <img
                  src={workshop.instructor.avatar || "/placeholder.svg"}
                  alt={workshop.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{workshop.instructor.name}</p>
                  <p className="text-sm text-gray-600">{data.instructor.bio}</p>
                </div>
              </div>

              <img
                src={workshop.thumbnail || "/placeholder.svg"}
                alt={workshop.title}
                className="w-full h-64 object-cover rounded-lg mb-8"
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {workshop.price}
                      {workshop.originalPrice && (
                        <span className="text-lg text-gray-500 line-through ml-2">{workshop.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Full lifetime access</p>
                  </div>

                  <Button size="lg" className="w-full mb-4" asChild>
                    <Link href={`/workshops/${workshop.id}/learn`}>
                      <Play className="w-5 h-5 mr-2" />
                      Start Learning
                    </Link>
                  </Button>

                  <div className="flex gap-2 mb-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-medium">{workshop.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{workshop.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exercises:</span>
                      <span className="font-medium">{workshop.exercises}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projects:</span>
                      <span className="font-medium">{workshop.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certificate:</span>
                      <span className="font-medium flex items-center">
                        <Award className="w-4 h-4 mr-1 text-yellow-500" />
                        Yes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completion Rate:</span>
                      <span className="font-medium">{workshop.completionRate}%</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-3">This course includes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Video className="w-4 h-4 mr-2 text-blue-500" />8 hours of video content
                      </li>
                      <li className="flex items-center">
                        <Code className="w-4 h-4 mr-2 text-green-500" />
                        45 coding exercises
                      </li>
                      <li className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-purple-500" />
                        Downloadable resources
                      </li>
                      <li className="flex items-center">
                        <Award className="w-4 h-4 mr-2 text-yellow-500" />
                        Certificate of completion
                      </li>
                      <li className="flex items-center">
                        <Download className="w-4 h-4 mr-2 text-gray-500" />
                        Lifetime access
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About this workshop</h3>
                    <p className="text-gray-600 leading-relaxed">{workshop.longDescription}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-500" />
                      What you'll learn
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {workshop.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                      Prerequisites
                    </h3>
                    <ul className="space-y-2">
                      {workshop.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-center">
                          <Circle className="w-2 h-2 bg-gray-400 rounded-full mr-3" />
                          <span className="text-gray-700">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Skills you'll gain</h3>
                    <div className="flex flex-wrap gap-2">
                      {workshop.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Course Curriculum</h3>
                  <div className="text-sm text-gray-600">
                    {(workshop as any).modules?.length || 0} modules • {data.exercises} exercises • {data.duration}
                  </div>
                </div>

                <div className="space-y-4">
                  {data.roadmap.map((module, index) => (
                    <Card key={module.id} className={`border ${module.locked ? "bg-gray-50" : "bg-white"}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                module.completed
                                  ? "bg-green-100 text-green-600"
                                  : module.locked
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {module.completed ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <span className="text-sm font-semibold">{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <h4 className={`font-semibold ${module.locked ? "text-gray-400" : "text-gray-900"}`}>
                                {module.title}
                              </h4>
                              <p className={`text-sm ${module.locked ? "text-gray-400" : "text-gray-600"}`}>
                                {module.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm ${module.locked ? "text-gray-400" : "text-gray-600"}`}>
                              {module.duration}
                            </div>
                            <div className={`text-xs ${module.locked ? "text-gray-400" : "text-gray-500"}`}>
                              {module.lessons} lessons • {module.exercises} exercises
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructor" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <img
                    src={workshop.instructor.avatar || "/placeholder.svg"}
                    alt={workshop.instructor.name}
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{workshop.instructor.name}</h3>
                    <p className="text-gray-600 mb-4">{workshop.instructor.bio}</p>

                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{workshop.instructor.rating}</div>
                        <div className="text-sm text-gray-600">Instructor Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {workshop.instructor.students.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{workshop.instructor.courses}</div>
                        <div className="text-sm text-gray-600">Courses</div>
                      </div>
                    </div>

                    <Button variant="outline">View Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Student Reviews</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">{workshop.rating}</span>
                      <span className="text-gray-600 ml-1">({workshop.reviews} reviews)</span>
                    </div>
                    <RatingModal
                      workshopTitle={workshop.title}
                      instructorName={workshop.instructor.name}
                      onSubmitRating={handleRatingSubmit}
                      trigger={
                        <Button>
                          <Star className="w-4 h-4 mr-2" />
                          Write Review
                        </Button>
                      }
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Sample reviews */}
                  {[
                    {
                      name: "Alex Johnson",
                      avatar: "/student-alex.jpg",
                      rating: 5,
                      date: "2 weeks ago",
                      comment:
                        "Excellent course! Sarah explains everything clearly and the exercises are really helpful for understanding the concepts.",
                    },
                    {
                      name: "Maria Garcia",
                      avatar: "/student-maria.jpg",
                      rating: 5,
                      date: "1 month ago",
                      comment:
                        "Perfect for beginners. I had no prior JavaScript experience and now I feel confident building small projects.",
                    },
                    {
                      name: "David Chen",
                      avatar: "/student-david.jpg",
                      rating: 4,
                      date: "1 month ago",
                      comment:
                        "Great content and structure. Would love to see more advanced topics covered in a follow-up course.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.name}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
