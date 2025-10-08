"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Save,
  Eye,
  Plus,
  Trash2,
  GripVertical,
  Type,
  ImageIcon,
  Code,
  FileText,
  Target,
  ChevronLeft,
  Settings,
} from "lucide-react"
import Link from "next/link"

// Content block types for the Notion-like editor
type ContentBlock = {
  id: string
  type: "heading" | "paragraph" | "image" | "video" | "code" | "exercise"
  content: string
  metadata?: any
}

export default function CreateWorkshopPage() {
  const [workshopData, setWorkshopData] = useState({
    title: "",
    description: "",
    difficulty: "",
    language: "",
    category: "",
    price: "",
    estimatedDuration: "",
    prerequisites: "",
  })

  const [modules, setModules] = useState([
    {
      id: "1",
      title: "Getting Started",
      description: "Introduction to the workshop",
      lessons: [
        {
          id: "1-1",
          title: "Welcome",
          type: "video",
          duration: "5 min",
          content: [] as ContentBlock[],
        },
      ],
    },
  ])

  const [activeModule, setActiveModule] = useState("1")
  const [activeLesson, setActiveLesson] = useState("1-1")
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: "block-1",
      type: "heading",
      content: "Welcome to the Workshop",
    },
    {
      id: "block-2",
      type: "paragraph",
      content: "This is where you can write your lesson content. Click to edit this text.",
    },
  ])

  const addModule = () => {
    const newId = (modules.length + 1).toString()
    setModules([
      ...modules,
      {
        id: newId,
        title: `Module ${modules.length + 1}`,
        description: "New module description",
        lessons: [
          {
            id: `${newId}-1`,
            title: "Lesson 1",
            type: "video",
            duration: "10 min",
            content: [],
          },
        ],
      },
    ])
  }

  const addLesson = (moduleId: string) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          const newLessonId = `${moduleId}-${module.lessons.length + 1}`
          return {
            ...module,
            lessons: [
              ...module.lessons,
              {
                id: newLessonId,
                title: `Lesson ${module.lessons.length + 1}`,
                type: "video",
                duration: "10 min",
                content: [],
              },
            ],
          }
        }
        return module
      }),
    )
  }

  const addContentBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type),
    }
    setContentBlocks([...contentBlocks, newBlock])
  }

  const getDefaultContent = (type: ContentBlock["type"]) => {
    switch (type) {
      case "heading":
        return "New Heading"
      case "paragraph":
        return "Start writing your content here..."
      case "code":
        return "// Write your code example here\nconsole.log('Hello, World!');"
      case "exercise":
        return "Create an exercise description here"
      default:
        return ""
    }
  }

  const updateContentBlock = (id: string, content: string) => {
    setContentBlocks(contentBlocks.map((block) => (block.id === id ? { ...block, content } : block)))
  }

  const deleteContentBlock = (id: string) => {
    setContentBlocks(contentBlocks.filter((block) => block.id !== id))
  }

  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "heading":
        return (
          <div className="group relative">
            <Input
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, e.target.value)}
              className="text-2xl font-bold border-0 px-0 focus-visible:ring-0 bg-transparent"
              placeholder="Enter heading..."
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 opacity-0 group-hover:opacity-100"
              onClick={() => deleteContentBlock(block.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )

      case "paragraph":
        return (
          <div className="group relative">
            <Textarea
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, e.target.value)}
              className="min-h-[100px] border-0 px-0 focus-visible:ring-0 bg-transparent resize-none"
              placeholder="Start writing..."
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 opacity-0 group-hover:opacity-100"
              onClick={() => deleteContentBlock(block.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )

      case "code":
        return (
          <div className="group relative">
            <div className="bg-gray-900 rounded-lg p-4">
              <Textarea
                value={block.content}
                onChange={(e) => updateContentBlock(block.id, e.target.value)}
                className="bg-transparent border-0 text-green-400 font-mono text-sm focus-visible:ring-0 resize-none min-h-[120px]"
                placeholder="// Enter your code here..."
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-white hover:bg-white/20"
              onClick={() => deleteContentBlock(block.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )

      case "exercise":
        return (
          <div className="group relative">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">Exercise</span>
              </div>
              <Textarea
                value={block.content}
                onChange={(e) => updateContentBlock(block.id, e.target.value)}
                className="bg-transparent border-0 text-blue-800 focus-visible:ring-0 resize-none min-h-[80px]"
                placeholder="Describe the exercise..."
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
              onClick={() => deleteContentBlock(block.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/admin">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Create New Workshop</h1>
                <p className="text-sm text-gray-600">Build your course content with our editor</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Workshop Structure */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Workshop Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Workshop Settings */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="title">Workshop Title</Label>
                    <Input
                      id="title"
                      value={workshopData.title}
                      onChange={(e) => setWorkshopData({ ...workshopData, title: e.target.value })}
                      placeholder="Enter workshop title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={workshopData.difficulty}
                      onValueChange={(value) => setWorkshopData({ ...workshopData, difficulty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={workshopData.language}
                      onValueChange={(value) => setWorkshopData({ ...workshopData, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="nodejs">Node.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Modules */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Modules</h4>
                    <Button size="sm" variant="outline" onClick={addModule}>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {modules.map((module) => (
                      <div key={module.id} className="space-y-1">
                        <div
                          className={`p-2 rounded cursor-pointer text-sm ${
                            activeModule === module.id ? "bg-blue-100 text-blue-900" : "hover:bg-gray-100"
                          }`}
                          onClick={() => setActiveModule(module.id)}
                        >
                          <div className="font-medium">{module.title}</div>
                        </div>

                        {activeModule === module.id && (
                          <div className="ml-4 space-y-1">
                            {module.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className={`p-2 rounded cursor-pointer text-xs ${
                                  activeLesson === lesson.id ? "bg-blue-50 text-blue-800" : "hover:bg-gray-50"
                                }`}
                                onClick={() => setActiveLesson(lesson.id)}
                              >
                                {lesson.title}
                              </div>
                            ))}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="w-full text-xs"
                              onClick={() => addLesson(module.id)}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add Lesson
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Content Editor</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => addContentBlock("heading")}>
                      <Type className="w-4 h-4 mr-1" />
                      Heading
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => addContentBlock("paragraph")}>
                      <FileText className="w-4 h-4 mr-1" />
                      Text
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => addContentBlock("code")}>
                      <Code className="w-4 h-4 mr-1" />
                      Code
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => addContentBlock("exercise")}>
                      <Target className="w-4 h-4 mr-1" />
                      Exercise
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => addContentBlock("image")}>
                      <ImageIcon className="w-4 h-4 mr-1" />
                      Image
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {contentBlocks.map((block) => (
                  <div key={block.id} className="relative">
                    <div className="absolute left-0 top-0 opacity-0 hover:opacity-100 -ml-8">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                    </div>
                    {renderContentBlock(block)}
                  </div>
                ))}

                {contentBlocks.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">Start building your lesson content</p>
                    <div className="flex justify-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => addContentBlock("heading")}>
                        Add Heading
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => addContentBlock("paragraph")}>
                        Add Text
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
