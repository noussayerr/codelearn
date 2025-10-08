"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Code, Clock, Target, Trophy, CheckCircle, XCircle, Play, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

const assignments = [
  {
    id: 1,
    title: "Fibonacci Calculator",
    description: "Create an efficient function to calculate Fibonacci numbers",
    difficulty: "Medium",
    language: "JavaScript",
    timeLimit: 30,
    points: 100,
    dueDate: "2024-01-20",
    status: "pending",
    attempts: 0,
    bestScore: null,
    topics: ["Algorithms", "Dynamic Programming"],
    estimatedTime: "20-30 min",
  },
  {
    id: 2,
    title: "Array Manipulation",
    description: "Implement various array operations and transformations",
    difficulty: "Easy",
    language: "JavaScript",
    timeLimit: 20,
    points: 75,
    dueDate: "2024-01-18",
    status: "completed",
    attempts: 2,
    bestScore: 85,
    topics: ["Arrays", "Data Structures"],
    estimatedTime: "15-20 min",
  },
  {
    id: 3,
    title: "Binary Tree Traversal",
    description: "Implement different tree traversal algorithms",
    difficulty: "Hard",
    language: "Python",
    timeLimit: 45,
    points: 150,
    dueDate: "2024-01-25",
    status: "in-progress",
    attempts: 1,
    bestScore: 60,
    topics: ["Trees", "Recursion", "Data Structures"],
    estimatedTime: "30-45 min",
  },
  {
    id: 4,
    title: "String Pattern Matching",
    description: "Implement pattern matching algorithms for strings",
    difficulty: "Medium",
    language: "Java",
    timeLimit: 35,
    points: 120,
    dueDate: "2024-01-22",
    status: "pending",
    attempts: 0,
    bestScore: null,
    topics: ["Strings", "Pattern Matching", "Algorithms"],
    estimatedTime: "25-35 min",
  },
  {
    id: 5,
    title: "Database Query Optimization",
    description: "Write efficient SQL queries for complex data operations",
    difficulty: "Hard",
    language: "SQL",
    timeLimit: 40,
    points: 130,
    dueDate: "2024-01-28",
    status: "locked",
    attempts: 0,
    bestScore: null,
    topics: ["SQL", "Database", "Optimization"],
    estimatedTime: "30-40 min",
  },
]

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDifficulty = selectedDifficulty === "all" || assignment.difficulty.toLowerCase() === selectedDifficulty
    const matchesLanguage =
      selectedLanguage === "all" || assignment.language.toLowerCase() === selectedLanguage.toLowerCase()
    const matchesStatus = selectedStatus === "all" || assignment.status === selectedStatus

    return matchesSearch && matchesDifficulty && matchesLanguage && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "locked":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Coding Assignments</h1>
              <p className="text-gray-600 mt-2">Practice your programming skills with hands-on challenges</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {assignments.filter((a) => a.status === "completed").length}/{assignments.length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search assignments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="sql">SQL</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="locked">Locked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignments Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{assignment.title}</CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">{assignment.description}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getDifficultyColor(assignment.difficulty)} ml-3 mt-1`} />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{assignment.language}</Badge>
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {assignment.status === "in-progress" && <Play className="w-3 h-3 mr-1" />}
                    {assignment.status === "locked" && <XCircle className="w-3 h-3 mr-1" />}
                    {assignment.status.replace("-", " ")}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {assignment.timeLimit} min
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Target className="w-4 h-4 mr-1" />
                    {assignment.points} pts
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {assignment.attempts} attempts
                  </div>
                </div>

                {assignment.bestScore && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">Best Score</span>
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 text-green-600 mr-1" />
                        <span className="font-bold text-green-800">{assignment.bestScore}%</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {assignment.topics.slice(0, 3).map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {assignment.topics.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{assignment.topics.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="pt-2">
                  {assignment.status === "locked" ? (
                    <Button disabled className="w-full">
                      <XCircle className="w-4 h-4 mr-2" />
                      Locked
                    </Button>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href="/code-editor">
                        <Code className="w-4 h-4 mr-2" />
                        {assignment.status === "completed" ? "Review Solution" : "Start Assignment"}
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms to find assignments.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedDifficulty("all")
                setSelectedLanguage("all")
                setSelectedStatus("all")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
