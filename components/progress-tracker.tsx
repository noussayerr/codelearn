"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Trophy, Target, BookOpen, Code, Play, Award } from "lucide-react"

interface ProgressTrackerProps {
  workshopTitle: string
  modules: Array<{
    id: string
    title: string
    lessons: Array<{
      id: string
      title: string
      type: "video" | "reading" | "exercise" | "interactive"
      duration: string
      completed: boolean
    }>
    completed: boolean
  }>
  overallProgress: number
  timeSpent: number
  completedLessons: number
  totalLessons: number
  onLessonClick: (moduleId: string, lessonId: string) => void
}

export function ProgressTracker({
  workshopTitle,
  modules,
  overallProgress,
  timeSpent,
  completedLessons,
  totalLessons,
  onLessonClick,
}: ProgressTrackerProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-3 h-3" />
      case "reading":
        return <BookOpen className="w-3 h-3" />
      case "exercise":
        return <Code className="w-3 h-3" />
      case "interactive":
        return <Target className="w-3 h-3" />
      default:
        return <Circle className="w-3 h-3" />
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
            Progress Tracker
          </span>
          <Badge variant="outline">{Math.round(overallProgress)}% Complete</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{workshopTitle}</span>
            <span className="text-sm text-gray-600">
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{completedLessons}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{formatTime(timeSpent)}</div>
            <div className="text-xs text-gray-600">Time Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totalLessons - completedLessons}</div>
            <div className="text-xs text-gray-600">Remaining</div>
          </div>
        </div>

        {/* Module Progress */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Module Progress</h4>
          {modules.map((module) => {
            const moduleProgress = (module.lessons.filter((l) => l.completed).length / module.lessons.length) * 100
            const isExpanded = expandedModule === module.id

            return (
              <div key={module.id} className="border rounded-lg">
                <button
                  className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {module.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                      <div>
                        <div className="font-medium text-sm">{module.title}</div>
                        <div className="text-xs text-gray-600">
                          {module.lessons.filter((l) => l.completed).length}/{module.lessons.length} lessons
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{Math.round(moduleProgress)}%</div>
                      <Progress value={moduleProgress} className="w-16 h-1 mt-1" />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t bg-gray-50 p-3 space-y-2">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className="w-full flex items-center justify-between p-2 hover:bg-white rounded text-left transition-colors"
                        onClick={() => onLessonClick(module.id, lesson.id)}
                      >
                        <div className="flex items-center space-x-3">
                          {lesson.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400" />
                          )}
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(lesson.type)}
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {lesson.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{lesson.duration}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Achievement Preview */}
        {overallProgress >= 100 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-900">Congratulations!</h4>
                <p className="text-sm text-yellow-800">You've completed this workshop. Claim your certificate!</p>
              </div>
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                Get Certificate
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
