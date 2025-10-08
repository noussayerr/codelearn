"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  Edit,
  Eye,
  Copy,
  MoreHorizontal,
  TrendingUp,
  Star,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock admin data
const adminStats = {
  totalWorkshops: 12,
  totalStudents: 1250,
  totalRevenue: 15420,
  averageRating: 4.7,
  activeStudents: 890,
  completionRate: 78,
}

const myWorkshops = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming",
    status: "published",
    students: 450,
    rating: 4.9,
    revenue: 2250,
    lastUpdated: "2024-01-15",
    modules: 12,
    assignments: 8,
    difficulty: "Beginner",
    language: "JavaScript",
  },
  {
    id: 2,
    title: "React Development Path",
    description: "Build modern web applications with React",
    status: "published",
    students: 320,
    rating: 4.8,
    revenue: 4800,
    lastUpdated: "2024-01-12",
    modules: 18,
    assignments: 12,
    difficulty: "Intermediate",
    language: "React",
  },
  {
    id: 3,
    title: "Advanced Node.js Concepts",
    description: "Deep dive into server-side JavaScript",
    status: "draft",
    students: 0,
    rating: 0,
    revenue: 0,
    lastUpdated: "2024-01-10",
    modules: 8,
    assignments: 6,
    difficulty: "Advanced",
    language: "Node.js",
  },
  {
    id: 4,
    title: "Python Data Structures",
    description: "Learn essential data structures in Python",
    status: "review",
    students: 0,
    rating: 0,
    revenue: 0,
    lastUpdated: "2024-01-08",
    modules: 15,
    assignments: 10,
    difficulty: "Intermediate",
    language: "Python",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "enrollment",
    message: "25 new students enrolled in JavaScript Fundamentals",
    time: "2 hours ago",
    workshop: "JavaScript Fundamentals",
  },
  {
    id: 2,
    type: "review",
    message: "New 5-star review on React Development Path",
    time: "4 hours ago",
    workshop: "React Development Path",
  },
  {
    id: 3,
    type: "completion",
    message: "15 students completed Advanced Node.js Concepts",
    time: "1 day ago",
    workshop: "Advanced Node.js Concepts",
  },
  {
    id: 4,
    type: "revenue",
    message: "Generated $320 in revenue today",
    time: "1 day ago",
    workshop: null,
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-yellow-500"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
              <p className="text-gray-600">Manage your workshops and track student progress</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/admin/workshop/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workshop
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workshops">My Workshops</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Stats */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{adminStats.totalWorkshops}</div>
                      <div className="text-sm text-gray-600">Total Workshops</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{adminStats.totalStudents}</div>
                      <div className="text-sm text-gray-600">Total Students</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">${adminStats.totalRevenue}</div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{adminStats.averageRating}</div>
                      <div className="text-sm text-gray-600">Average Rating</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.message}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500">{activity.time}</span>
                              {activity.workshop && (
                                <Badge variant="outline" className="text-xs">
                                  {activity.workshop}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performing Workshops */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Workshops</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myWorkshops
                        .filter((w) => w.status === "published")
                        .sort((a, b) => b.students - a.students)
                        .slice(0, 3)
                        .map((workshop) => (
                          <div
                            key={workshop.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{workshop.title}</h4>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-sm text-gray-600">{workshop.students} students</span>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                  <span className="text-sm text-gray-600">{workshop.rating}</span>
                                </div>
                                <span className="text-sm text-green-600 font-medium">${workshop.revenue}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/workshop/${workshop.id}`}>View</Link>
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild className="w-full justify-start">
                      <Link href="/admin/workshop/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Workshop
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                      <Link href="/admin/assignments/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Assignment
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                      <Link href="/admin/students">
                        <Users className="w-4 h-4 mr-2" />
                        View All Students
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                      <Link href="/admin/analytics">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Students</span>
                      <span className="font-semibold">{adminStats.activeStudents}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <span className="font-semibold">{adminStats.completionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">New Enrollments</span>
                      <span className="font-semibold text-green-600">+127</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Revenue Growth</span>
                      <span className="font-semibold text-green-600">+23%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">My Workshops</h2>
                  <p className="text-gray-600">Manage and edit your workshop content</p>
                </div>
                <Button asChild>
                  <Link href="/admin/workshop/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workshop
                  </Link>
                </Button>
              </div>

              {/* Search and Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Input
                      placeholder="Search workshops..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline">Filter</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Workshops Grid */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {myWorkshops.map((workshop) => (
                  <Card key={workshop.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{workshop.title}</CardTitle>
                          <p className="text-sm text-gray-600 line-clamp-2">{workshop.description}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getDifficultyColor(workshop.difficulty)} ml-3 mt-1`} />
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{workshop.language}</Badge>
                        <Badge className={getStatusColor(workshop.status)}>{workshop.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {workshop.students} students
                        </div>
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {workshop.modules} modules
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Star className="w-4 h-4 mr-1" />
                          {workshop.rating || "No rating"}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {workshop.assignments} assignments
                        </div>
                      </div>

                      {workshop.status === "published" && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-800">Revenue</span>
                            <span className="font-bold text-green-800">${workshop.revenue}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href={`/admin/workshop/${workshop.id}/edit`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/workshops/${workshop.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="students" className="mt-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
                <p className="text-gray-600">View and manage your students' progress</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Student Management</h3>
                    <p className="text-gray-600 mb-6">
                      View detailed student progress, manage enrollments, and communicate with learners.
                    </p>
                    <Button>View All Students</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
                <p className="text-gray-600">Track performance and student engagement</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Revenue chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Student Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Engagement chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
