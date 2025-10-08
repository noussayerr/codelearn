"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  BookOpen,
  Code,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Zap,
  CheckCircle,
  Play,
  BarChart3,
  Users,
  File as Fire,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "/user-avatar.jpg",
  joinDate: "2023-09-15",
  level: 12,
  xp: 2450,
  xpToNextLevel: 550,
  streak: 7,
  totalPoints: 1850,
  rank: 156,
  totalUsers: 50000,
}

const stats = {
  coursesCompleted: 8,
  coursesInProgress: 3,
  totalCourses: 11,
  assignmentsCompleted: 24,
  totalAssignments: 30,
  hoursLearned: 47,
  averageScore: 87,
  languages: ["JavaScript", "Python", "React", "Node.js"],
}

const recentActivity = [
  {
    id: 1,
    type: "course_completed",
    title: "JavaScript Fundamentals",
    description: "Completed with 92% score",
    date: "2024-01-15",
    points: 100,
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "assignment_submitted",
    title: "Fibonacci Calculator",
    description: "Submitted solution - 85% score",
    date: "2024-01-14",
    points: 85,
    icon: Code,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "course_started",
    title: "React Development Path",
    description: "Started new course",
    date: "2024-01-13",
    points: 0,
    icon: Play,
    color: "text-purple-600",
  },
  {
    id: 4,
    type: "achievement_unlocked",
    title: "Code Warrior",
    description: "Completed 20 assignments",
    date: "2024-01-12",
    points: 50,
    icon: Trophy,
    color: "text-yellow-600",
  },
]

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first course",
    icon: BookOpen,
    unlocked: true,
    unlockedDate: "2023-10-01",
    rarity: "common",
  },
  {
    id: 2,
    title: "Code Warrior",
    description: "Complete 20 assignments",
    icon: Code,
    unlocked: true,
    unlockedDate: "2024-01-12",
    rarity: "uncommon",
  },
  {
    id: 3,
    title: "Speed Demon",
    description: "Complete an assignment in under 10 minutes",
    icon: Zap,
    unlocked: true,
    unlockedDate: "2024-01-08",
    rarity: "rare",
  },
  {
    id: 4,
    title: "Perfect Score",
    description: "Get 100% on 5 assignments",
    icon: Target,
    unlocked: false,
    progress: 3,
    total: 5,
    rarity: "epic",
  },
  {
    id: 5,
    title: "Streak Master",
    description: "Maintain a 30-day learning streak",
    icon: Fire,
    unlocked: false,
    progress: 7,
    total: 30,
    rarity: "legendary",
  },
]

const currentCourses = [
  {
    id: 1,
    title: "React Development Path",
    progress: 35,
    totalLessons: 18,
    completedLessons: 6,
    nextLesson: "State Management with Hooks",
    instructor: "Mike Rodriguez",
    thumbnail: "/react-development.jpg",
  },
  {
    id: 2,
    title: "Python for Data Science",
    progress: 60,
    totalLessons: 15,
    completedLessons: 9,
    nextLesson: "Data Visualization with Matplotlib",
    instructor: "Dr. Emily Watson",
    thumbnail: "/python-data-science.jpg",
  },
  {
    id: 3,
    title: "Algorithm Challenges",
    progress: 20,
    totalLessons: 30,
    completedLessons: 6,
    nextLesson: "Binary Search Trees",
    instructor: "David Kim",
    thumbnail: "/algorithm-challenges.jpg",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50"
      case "uncommon":
        return "border-green-300 bg-green-50"
      case "rare":
        return "border-blue-300 bg-blue-50"
      case "epic":
        return "border-purple-300 bg-purple-50"
      case "legendary":
        return "border-yellow-300 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={userData.avatar || "/placeholder.svg"}
                alt={userData.name}
                className="w-16 h-16 rounded-full border-4 border-blue-100"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userData.name}!</h1>
                <p className="text-gray-600">Ready to continue your coding journey?</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userData.level}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userData.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userData.totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Level {userData.level} Progress</span>
              <span className="text-sm text-gray-600">
                {userData.xp} / {userData.xp + userData.xpToNextLevel} XP
              </span>
            </div>
            <Progress value={(userData.xp / (userData.xp + userData.xpToNextLevel)) * 100} className="h-3" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
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
                      <div className="text-2xl font-bold text-gray-900">{stats.coursesCompleted}</div>
                      <div className="text-sm text-gray-600">Courses Completed</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Code className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{stats.assignmentsCompleted}</div>
                      <div className="text-sm text-gray-600">Assignments Done</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{stats.hoursLearned}</div>
                      <div className="text-sm text-gray-600">Hours Learned</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{stats.averageScore}%</div>
                      <div className="text-sm text-gray-600">Average Score</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Continue Learning */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Play className="w-5 h-5 mr-2 text-blue-600" />
                      Continue Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentCourses.map((course) => (
                        <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">Next: {course.nextLesson}</p>
                            <div className="flex items-center space-x-4">
                              <Progress value={course.progress} className="flex-1 h-2" />
                              <span className="text-sm text-gray-600">
                                {course.completedLessons}/{course.totalLessons}
                              </span>
                            </div>
                          </div>
                          <Button asChild>
                            <Link href={`/workshops/${course.id}/learn`}>Continue</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => {
                        const IconComponent = activity.icon
                        return (
                          <div key={activity.id} className="flex items-start space-x-4">
                            <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{activity.title}</h4>
                              <p className="text-sm text-gray-600">{activity.description}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-xs text-gray-500">
                                  {new Date(activity.date).toLocaleDateString()}
                                </span>
                                {activity.points > 0 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{activity.points} XP
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Rank Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                      Your Rank
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">#{userData.rank}</div>
                    <p className="text-sm text-gray-600 mb-4">out of {userData.totalUsers.toLocaleString()} learners</p>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg">
                      <div className="text-sm font-medium">Top 1% of learners!</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.languages.map((language, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{language}</span>
                          <Badge variant="outline">{Math.floor(Math.random() * 50) + 50}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Award className="w-5 h-5 mr-2 text-purple-600" />
                        Recent Achievements
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="#achievements">
                          View All <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {achievements
                        .filter((a) => a.unlocked)
                        .slice(0, 3)
                        .map((achievement) => {
                          const IconComponent = achievement.icon
                          return (
                            <div key={achievement.id} className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${getRarityColor(achievement.rarity)}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium">{achievement.title}</h4>
                                <p className="text-xs text-gray-600">{achievement.description}</p>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                <Button asChild>
                  <Link href="/workshops">Browse More Courses</Link>
                </Button>
              </div>

              {/* Course Progress */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/90 text-gray-900">{course.progress}% Complete</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">Instructor: {course.instructor}</p>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-600">
                              {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-blue-900">Next Lesson:</p>
                          <p className="text-sm text-blue-800">{course.nextLesson}</p>
                        </div>

                        <Button asChild className="w-full">
                          <Link href={`/workshops/${course.id}/learn`}>
                            <Play className="w-4 h-4 mr-2" />
                            Continue Learning
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Achievements</h2>
                <p className="text-gray-600">Unlock achievements by completing courses and challenges</p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon
                  return (
                    <Card
                      key={achievement.id}
                      className={`${achievement.unlocked ? getRarityColor(achievement.rarity) : "bg-gray-50 opacity-60"}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                            achievement.unlocked ? "bg-white shadow-md" : "bg-gray-200"
                          }`}
                        >
                          <IconComponent
                            className={`w-8 h-8 ${achievement.unlocked ? "text-gray-700" : "text-gray-400"}`}
                          />
                        </div>

                        <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>

                        {achievement.unlocked ? (
                          <div>
                            <Badge className={`mb-2 ${getRarityColor(achievement.rarity)} border-0`}>
                              {achievement.rarity}
                            </Badge>
                            <p className="text-xs text-gray-500">
                              Unlocked {new Date(achievement.unlockedDate!).toLocaleDateString()}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <div className="mb-2">
                              <Progress
                                value={((achievement.progress || 0) / (achievement.total || 1)) * 100}
                                className="h-2"
                              />
                            </div>
                            <p className="text-xs text-gray-500">
                              {achievement.progress || 0} / {achievement.total || 1}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Analytics</h2>
                <p className="text-gray-600">Track your learning progress and performance over time</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                      Weekly Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Activity chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Performance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Performance chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">23</div>
                    <div className="text-sm text-gray-600">Days Active This Month</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">156</div>
                    <div className="text-sm text-gray-600">Global Rank</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Fire className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">7</div>
                    <div className="text-sm text-gray-600">Current Streak</div>
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
