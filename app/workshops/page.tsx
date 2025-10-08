"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, Clock, Users, BookOpen, Trophy, ChevronRight, Heart } from "lucide-react"
import Link from "next/link"

import { useAppDispatch, useAppSelector } from '@/store'
import { fetchWorkshops } from '@/store/slices/workshopsSlice'

export default function WorkshopsPage() {
  const dispatch = useAppDispatch()
  const { items: workshops, status } = useAppSelector((s) => s.workshops)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (workshopId: number) => {
    setFavorites((prev) => (prev.includes(workshopId) ? prev.filter((id) => id !== workshopId) : [...prev, workshopId]))
  }

  // load workshops
  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWorkshops())
    }
  }, [dispatch, status])

  const filteredWorkshops = (workshops || [])
    .filter((workshop) => {
      const matchesSearch =
        workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workshop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workshop.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesLevel = selectedLevel === "all" || workshop.level.toLowerCase() === selectedLevel
      const matchesCategory =
        selectedCategory === "all" || workshop.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesLanguage =
        selectedLanguage === "all" || workshop.language.toLowerCase() === selectedLanguage.toLowerCase()

      return matchesSearch && matchesLevel && matchesCategory && matchesLanguage
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.students - a.students
        case "rating":
          return b.rating - a.rating
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        case "duration":
          return Number.parseInt(a.duration) - Number.parseInt(b.duration)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Workshops & Courses</h1>
              <p className="text-gray-600 mt-2">Discover interactive coding workshops and structured learning paths</p>
            </div>
            <Button asChild>
              <Link href="/create-workshop">Create Workshop</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              <div className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search workshops..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Level */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="web development">Web Development</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="full-stack">Full-Stack</SelectItem>
                      <SelectItem value="data science">Data Science</SelectItem>
                      <SelectItem value="algorithms">Algorithms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="node.js">Node.js</SelectItem>
                      <SelectItem value="multiple">Multiple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Platform Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Workshops</span>
                  <span className="font-medium">450+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Students</span>
                  <span className="font-medium">50k+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="font-medium">87%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{filteredWorkshops.length} workshops found</h2>
                <p className="text-gray-600 text-sm mt-1">{searchQuery && `Results for "${searchQuery}"`}</p>
              </div>
            </div>

            {/* Workshop Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredWorkshops.map((workshop) => (
                <Card
                  key={(workshop as any)._id || (workshop as any).id}
                  className="hover:shadow-lg transition-all duration-200 group cursor-pointer border-0 bg-white"
                >
                  <div className="relative">
                    <img
                      src={workshop.thumbnail || "/placeholder.svg"}
                      alt={workshop.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {(workshop as any).isPopular && (
                        <Badge className="bg-orange-500 hover:bg-orange-600">
                          <Trophy className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {(workshop as any).isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite((workshop as any)._id || (workshop as any).id)
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(((workshop as any)._id || (workshop as any).id) as number)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </Button>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{workshop.language}</Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {workshop.rating} ({workshop.reviews})
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {workshop.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{workshop.description}</p>

                    <div className="flex items-center mb-4">
                      <img
                        src={(workshop as any).instructorAvatar || "/placeholder.svg"}
                        alt={(workshop as any).instructor || 'Instructor'}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium">{(workshop as any).instructor || 'Instructor'}</p>
                        <p className="text-xs text-gray-500">{workshop.level}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {workshop.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {Number(workshop.students || 0).toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {(workshop as any).modules?.length || 0} modules
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {workshop.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {workshop.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{workshop.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-blue-600">{workshop.price}</div>
                      <Button asChild className="group-hover:bg-blue-600 transition-colors">
                        <Link href={`/workshops/${(workshop as any)._id || (workshop as any).id}`}>
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {filteredWorkshops.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Workshops
                </Button>
              </div>
            )}

            {/* No Results */}
            {filteredWorkshops.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No workshops found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedLevel("all")
                    setSelectedCategory("all")
                    setSelectedLanguage("all")
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
