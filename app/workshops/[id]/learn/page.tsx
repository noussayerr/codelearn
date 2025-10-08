"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { RatingModal } from "@/components/rating-modal"
import { ProgressTracker } from "@/components/progress-tracker"
import { CompletionCertificate } from "@/components/completion-certificate"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Code,
  Video,
  Clock,
  Target,
  Menu,
  X,
  Volume2,
  Settings,
  Maximize,
  Star,
  Award,
} from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchWorkshop } from '@/store/slices/workshopsSlice'

function buildCourseData(workshop: any) {
  const modules = (workshop.modules || []).map((m: any, idx: number) => ({
    id: idx + 1,
    title: m.title,
    progress: Number(m.progress || 0),
    lessons: (m.lessons || []).map((l: any, lidx: number) => ({
      id: Number(`${idx + 1}${lidx + 1}`),
      title: l.title,
      type: l.type,
      duration: l.duration || "",
      completed: Boolean(l.completed || false),
      content: l.content || {},
    })),
  }))
  return {
    id: workshop._id,
    title: workshop.title,
    currentModule: 1,
    currentLesson: 1,
    totalModules: modules.length,
    overallProgress: Math.round(
      modules.length
        ? modules.reduce((acc: number, m: any) => acc + (m.progress || 0), 0) / modules.length
        : 0,
    ),
    modules,
  }
}

export default function LearnPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch()
  const { current: workshop } = useAppSelector((s) => s.workshops)
  const { token } = useAppSelector((s) => s.auth)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const courseData = useMemo(() => (workshop ? buildCourseData(workshop) : null), [workshop])
  const [currentModule, setCurrentModule] = useState(1)
  const [currentLesson, setCurrentLesson] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [showProgressTracker, setShowProgressTracker] = useState(false)

  useEffect(() => {
    if (!token) return; // require auth
    if (!workshop || (workshop as any)._id !== params.id) {
      dispatch(fetchWorkshop(params.id))
    }
  }, [dispatch, params.id, token])

  // Get current lesson data
  const getCurrentLesson = () => {
    if (!courseData) return undefined
    const module = courseData.modules.find((m: any) => m.id === currentModule)
    return module?.lessons.find((l: any) => l.id === currentLesson)
  }

  const currentLessonData = getCurrentLesson()

  const navigateLesson = (direction: "prev" | "next") => {
    if (!courseData) return
    const allLessons = courseData.modules.flatMap((module: any) =>
      module.lessons.map((lesson: any) => ({ ...lesson, moduleId: module.id })),
    )
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson)

    if (direction === "next" && currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1]
      setCurrentLesson(nextLesson.id)
      setCurrentModule(nextLesson.moduleId)
    } else if (direction === "prev" && currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1]
      setCurrentLesson(prevLesson.id)
      setCurrentModule(prevLesson.moduleId)
    }
  }

  const markLessonComplete = () => {
    // In a real app, this would update the backend
    console.log(`Marking lesson ${currentLesson} as complete`)
  }

  const handleRatingSubmit = (rating: number, review: string) => {
    console.log("Rating submitted:", { rating, review })
    // In a real app, this would submit to the backend
  }

  const handleLessonNavigation = (moduleId: string, lessonId: string) => {
    setCurrentModule(Number.parseInt(moduleId))
    setCurrentLesson(Number.parseInt(lessonId))
    setShowProgressTracker(false)
  }

  const renderLessonContent = () => {
    if (!currentLessonData) return null

    switch (currentLessonData.type) {
      case "video":
        return (
          <div className="space-y-6">
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                <div className="text-white text-center">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-4">Video Player</p>
                  <p className="text-sm opacity-75">Duration: {currentLessonData.duration}</p>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <div className="flex-1">
                      <Progress value={videoProgress} className="h-1" />
                    </div>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-3">About this lesson</h3>
              <p className="text-gray-600 leading-relaxed">{currentLessonData.content.description}</p>
            </div>

            {currentLessonData.content.transcript && (
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3">Transcript</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{currentLessonData.content.transcript}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case "reading":
        return (
          <div className="prose max-w-none">
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  currentLessonData.content.content
                    ?.replace(/\n/g, "<br>")
                    .replace(
                      /```javascript\n(.*?)\n```/gs,
                      '<pre class="bg-gray-100 p-4 rounded-lg my-4"><code>$1</code></pre>',
                    )
                    .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
                    .replace(/## (.*)/g, '<h2 class="text-xl font-semibold mt-8 mb-4">$1</h2>')
                    .replace(/# (.*)/g, '<h1 class="text-2xl font-bold mt-8 mb-6">$1</h1>') || "",
              }}
            />
          </div>
        )

      case "interactive":
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">{currentLessonData.content.description}</p>
            </div>

            {currentLessonData.content.steps && (
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Steps to Complete</h4>
                  <div className="space-y-3">
                    {currentLessonData.content.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-900">Interactive Exercise</h4>
              </div>
              <p className="text-blue-800 mb-4">Follow the steps above and practice in your development environment.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">Open Code Editor</Button>
            </div>
          </div>
        )

      case "exercise":
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">{currentLessonData.content.description}</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold flex items-center">
                    <Code className="w-5 h-5 mr-2 text-green-600" />
                    {currentLessonData.content.exercise?.title}
                  </h4>
                  <Badge variant="outline">Exercise</Badge>
                </div>

                <p className="text-gray-600 mb-4">{currentLessonData.content.exercise?.instructions}</p>

                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <pre className="text-green-400 text-sm">
                    <code>{currentLessonData.content.exercise?.starterCode}</code>
                  </pre>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Run Code
                  </Button>
                  <Button variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button variant="outline">View Solution</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Content type not supported</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {!token ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-gray-700 mb-4">Please sign in to access the course.</p>
            <div className="flex items-center justify-center gap-3">
              <Button asChild><Link href="/login">Sign In</Link></Button>
              <Button variant="outline" asChild><Link href="/signup">Create Account</Link></Button>
            </div>
          </div>
        </div>
      ) : !courseData ? (
        <div className="flex-1 flex items-center justify-center">Loading...</div>
      ) : (
      <>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden bg-white border-r`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-lg">{courseData.title}</h2>
              <p className="text-sm text-gray-600">
                Module {currentModule} of {courseData.totalModules}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">{courseData.overallProgress}%</span>
            </div>
            <Progress value={courseData.overallProgress} className="h-2" />
          </div>

          <div className="space-y-4">
            {courseData.modules.map((module: any) => (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">{module.title}</h3>
                  <span className="text-xs text-gray-500">{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-1" />

                <div className="space-y-1 ml-4">
                  {module.lessons.map((lesson: any) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setCurrentLesson(lesson.id)
                        setCurrentModule(module.id)
                      }}
                      className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                        lesson.id === currentLesson
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{lesson.title}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            {lesson.type === "video" && <Video className="w-3 h-3 mr-1" />}
                            {lesson.type === "reading" && <BookOpen className="w-3 h-3 mr-1" />}
                            {lesson.type === "exercise" && <Code className="w-3 h-3 mr-1" />}
                            {lesson.type === "interactive" && <Target className="w-3 h-3 mr-1" />}
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                  <Menu className="w-4 h-4" />
                </Button>
              )}
              <div>
                <h1 className="text-xl font-semibold">{currentLessonData?.title}</h1>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentLessonData?.duration}
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <span className="capitalize">{currentLessonData?.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setShowProgressTracker(!showProgressTracker)}>
                <Target className="w-4 h-4 mr-2" />
                Progress
              </Button>

              <RatingModal
                workshopTitle={courseData.title}
                instructorName="Sarah Chen"
                onSubmitRating={handleRatingSubmit}
                trigger={
                  <Button variant="outline">
                    <Star className="w-4 h-4 mr-2" />
                    Rate
                  </Button>
                }
              />

              <Button variant="outline" asChild>
                <Link href={`/workshops/${params.id}`}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Course
                </Link>
              </Button>

              {!currentLessonData?.completed && (
                <Button onClick={markLessonComplete} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              )}

              {courseData.overallProgress >= 100 && (
                <CompletionCertificate
                  studentName="Alex Johnson"
                  workshopTitle={courseData.title}
                  instructorName="Sarah Chen"
                  completionDate="2024-01-15"
                  finalScore={92}
                  certificateId="CERT-JS-001-2024"
                  trigger={
                    <Button className="bg-yellow-600 hover:bg-yellow-700">
                      <Award className="w-4 h-4 mr-2" />
                      Certificate
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6">
            {showProgressTracker && (
              <div className="mb-6">
                <ProgressTracker
                  workshopTitle={courseData.title}
                  modules={courseData.modules.map((module: any) => ({
                    id: module.id.toString(),
                    title: module.title,
                    completed: module.progress === 100,
                    lessons: module.lessons.map((lesson: any) => ({
                      id: lesson.id.toString(),
                      title: lesson.title,
                      type: lesson.type as any,
                      duration: lesson.duration,
                      completed: lesson.completed,
                    })),
                  }))}
                  overallProgress={courseData.overallProgress}
                  timeSpent={180} // 3 hours
                  completedLessons={courseData.modules.reduce(
                    (acc: number, module: any) => acc + module.lessons.filter((l: any) => l.completed).length,
                    0,
                  )}
                  totalLessons={courseData.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0)}
                  onLessonClick={handleLessonNavigation}
                />
              </div>
            )}

            {renderLessonContent()}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="bg-white border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigateLesson("prev")} disabled={currentLesson === 1}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Lesson
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Lesson {currentLesson} of {courseData.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0)}
              </span>
            </div>

            <Button
              onClick={() => navigateLesson("next")}
              disabled={currentLesson === courseData.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0)}
            >
              Next Lesson
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  )
}
