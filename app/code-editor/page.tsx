"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  RotateCcw,
  Save,
  Download,
  Maximize,
  Minimize,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Lightbulb,
  Code,
  Terminal,
  Zap,
} from "lucide-react"

import Editor from "@monaco-editor/react"

// Mock assignment data
const assignment = {
  id: 1,
  title: "Create a Function to Calculate Fibonacci Numbers",
  description:
    "Write a JavaScript function that calculates the nth Fibonacci number. The function should be efficient and handle edge cases.",
  difficulty: "Medium",
  timeLimit: 30, // minutes
  points: 100,
  language: "javascript",
  instructions: [
    "Create a function named 'fibonacci' that takes one parameter 'n'",
    "Return the nth Fibonacci number (0-indexed)",
    "Handle edge cases: n < 0 should return null, n = 0 should return 0, n = 1 should return 1",
    "Optimize for performance - avoid recursive solutions that recalculate the same values",
  ],
  examples: [
    { input: "fibonacci(0)", output: "0" },
    { input: "fibonacci(1)", output: "1" },
    { input: "fibonacci(5)", output: "5" },
    { input: "fibonacci(10)", output: "55" },
  ],
  starterCode: `// Write your fibonacci function here
function fibonacci(n) {
    // Your code here
    
}

// Test your function
console.log(fibonacci(0)); // Should output: 0
console.log(fibonacci(1)); // Should output: 1
console.log(fibonacci(5)); // Should output: 5
console.log(fibonacci(10)); // Should output: 55`,
  solution: `function fibonacci(n) {
    if (n < 0) return null;
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
  testCases: [
    { input: 0, expected: 0, description: "Base case: fibonacci(0)" },
    { input: 1, expected: 1, description: "Base case: fibonacci(1)" },
    { input: 5, expected: 5, description: "Small number: fibonacci(5)" },
    { input: 10, expected: 55, description: "Medium number: fibonacci(10)" },
    { input: -1, expected: null, description: "Negative input: fibonacci(-1)" },
  ],
}

const languageConfigs = {
  javascript: {
    name: "JavaScript",
    extension: "js",
    starterCode: `// Write your fibonacci function here
function fibonacci(n) {
    // Your code here
    
}

// Test your function
console.log(fibonacci(0)); // Should output: 0
console.log(fibonacci(1)); // Should output: 1
console.log(fibonacci(5)); // Should output: 5
console.log(fibonacci(10)); // Should output: 55`,
  },
  python: {
    name: "Python",
    extension: "py",
    starterCode: `# Write your fibonacci function here
def fibonacci(n):
    # Your code here
    pass

# Test your function
print(fibonacci(0))  # Should output: 0
print(fibonacci(1))  # Should output: 1
print(fibonacci(5))  # Should output: 5
print(fibonacci(10)) # Should output: 55`,
  },
  java: {
    name: "Java",
    extension: "java",
    starterCode: `public class Solution {
    // Write your fibonacci function here
    public static int fibonacci(int n) {
        // Your code here
        return 0;
    }
    
    // Test your function
    public static void main(String[] args) {
        System.out.println(fibonacci(0));  // Should output: 0
        System.out.println(fibonacci(1));  // Should output: 1
        System.out.println(fibonacci(5));  // Should output: 5
        System.out.println(fibonacci(10)); // Should output: 55
    }
}`,
  },
  cpp: {
    name: "C++",
    extension: "cpp",
    starterCode: `#include <iostream>
using namespace std;

// Write your fibonacci function here
int fibonacci(int n) {
    // Your code here
    return 0;
}

// Test your function
int main() {
    cout << fibonacci(0) << endl;  // Should output: 0
    cout << fibonacci(1) << endl;  // Should output: 1
    cout << fibonacci(5) << endl;  // Should output: 5
    cout << fibonacci(10) << endl; // Should output: 55
    return 0;
}`,
  },
}

export default function CodeEditorPage() {
  const [code, setCode] = useState(assignment.starterCode)
  const [language, setLanguage] = useState<keyof typeof languageConfigs>("javascript")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [timeRemaining, setTimeRemaining] = useState(assignment.timeLimit * 60) // in seconds
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark")
  const editorRef = useRef<any>(null)

  useEffect(() => {
    setCode(languageConfigs[language].starterCode)
    setOutput("")
    setTestResults([])
  }, [language])

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput("")

    try {
      if (language === "javascript") {
        // Create a safe execution environment
        const originalConsoleLog = console.log
        let capturedOutput = ""

        // Override console.log to capture output
        console.log = (...args) => {
          capturedOutput +=
            args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg))).join(" ") + "\n"
        }

        // Execute the code in a try-catch block
        const func = new Function(code)
        func()

        // Restore original console.log
        console.log = originalConsoleLog

        setOutput(capturedOutput || "Code executed successfully (no output)")
      } else {
        // For other languages, show a simulation message
        setOutput(
          `Code execution simulation for ${languageConfigs[language].name}:\n\n${code}\n\n[In a real implementation, this would be executed on a server]`,
        )
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}\n\nStack trace:\n${error.stack}`)
    } finally {
      setIsRunning(false)
    }
  }

  const runTests = async () => {
    if (language !== "javascript") {
      setOutput("Test execution is currently only supported for JavaScript")
      return
    }

    setIsRunning(true)
    setTestResults([])

    try {
      // Extract the fibonacci function from the code
      const func = new Function(code + "; return fibonacci;")
      const fibonacci = func()

      if (typeof fibonacci !== "function") {
        throw new Error("fibonacci function not found or not properly defined")
      }

      const results = assignment.testCases.map((test) => {
        const startTime = performance.now()
        let actualOutput
        let passed = false
        let error = null

        try {
          actualOutput = fibonacci(test.input)
          passed = actualOutput === test.expected
        } catch (err: any) {
          error = err.message
          actualOutput = `Error: ${err.message}`
        }

        const endTime = performance.now()
        const executionTime = Math.round(endTime - startTime)

        return {
          ...test,
          passed,
          actualOutput,
          executionTime,
          error,
        }
      })

      setTestResults(results)
    } catch (error: any) {
      setOutput(`Test execution failed: ${error.message}`)
      setTestResults([])
    } finally {
      setIsRunning(false)
    }
  }

  const submitSolution = () => {
    // In a real app, this would submit to the backend
    console.log("Submitting solution:", code)
    alert("Solution submitted successfully!")
  }

  const resetCode = () => {
    setCode(languageConfigs[language].starterCode)
    setOutput("")
    setTestResults([])
  }

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor

    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      lineHeight: 20,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: "on",
      lineNumbers: "on",
      glyphMargin: false,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
    })
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isFullscreen ? "fixed inset-0 z-50 bg-gray-900" : ""}`}>
      <div className={`bg-white border-b ${isFullscreen ? "bg-gray-800 border-gray-700" : ""}`}>
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className={`text-xl font-semibold ${isFullscreen ? "text-white" : "text-gray-900"}`}>
                  {assignment.title}
                </h1>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge
                    variant={
                      assignment.difficulty === "Easy"
                        ? "default"
                        : assignment.difficulty === "Medium"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {assignment.difficulty}
                  </Badge>
                  <div className={`flex items-center text-sm ${isFullscreen ? "text-gray-300" : "text-gray-600"}`}>
                    <Target className="w-4 h-4 mr-1" />
                    {assignment.points} points
                  </div>
                  <div
                    className={`flex items-center text-sm ${timeRemaining < 300 ? "text-red-500" : isFullscreen ? "text-gray-300" : "text-gray-600"}`}
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(timeRemaining)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Select value={language} onValueChange={(value: keyof typeof languageConfigs) => setLanguage(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </Button>

              <Button onClick={submitSolution} className="bg-blue-600 hover:bg-blue-700">
                Submit Solution
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="hints">Hints</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className={`font-semibold mb-2 ${isFullscreen ? "text-white" : "text-gray-900"}`}>
                    Problem Description
                  </h3>
                  <p className={`text-sm leading-relaxed ${isFullscreen ? "text-gray-300" : "text-gray-600"}`}>
                    {assignment.description}
                  </p>
                </div>

                <div>
                  <h3 className={`font-semibold mb-2 ${isFullscreen ? "text-white" : "text-gray-900"}`}>
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {assignment.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span className={isFullscreen ? "text-gray-300" : "text-gray-700"}>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignment.examples.map((example, index) => (
                  <Card key={index} className={`p-3 ${isFullscreen ? "bg-gray-700 border-gray-600" : ""}`}>
                    <div className="space-y-2">
                      <div>
                        <span className={`text-xs font-medium ${isFullscreen ? "text-gray-400" : "text-gray-500"}`}>
                          Input:
                        </span>
                        <code
                          className={`block p-2 rounded text-sm mt-1 ${isFullscreen ? "bg-gray-800 text-gray-200" : "bg-gray-100"}`}
                        >
                          {example.input}
                        </code>
                      </div>
                      <div>
                        <span className={`text-xs font-medium ${isFullscreen ? "text-gray-400" : "text-gray-500"}`}>
                          Output:
                        </span>
                        <code
                          className={`block p-2 rounded text-sm mt-1 ${isFullscreen ? "bg-gray-800 text-gray-200" : "bg-gray-100"}`}
                        >
                          {example.output}
                        </code>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hints" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-3 bg-yellow-50 border-yellow-200">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">Performance</span>
                  </div>
                  <p className="text-sm text-yellow-800">
                    Consider using an iterative approach instead of recursion for better performance.
                  </p>
                </Card>
                <Card className="p-3 bg-blue-50 border-blue-200">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-blue-800">Edge Cases</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Remember to handle edge cases like negative numbers and the base cases (0 and 1).
                  </p>
                </Card>
                <Card className="p-3 bg-green-50 border-green-200">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-green-800">Algorithm</span>
                  </div>
                  <p className="text-sm text-green-800">
                    You can use two variables to keep track of the previous two Fibonacci numbers.
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className={`flex h-[calc(100vh-280px)] ${isFullscreen ? "h-[calc(100vh-280px)]" : ""}`}>
        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          {/* Editor Controls */}
          <div
            className={`bg-gray-100 border-b px-4 py-2 flex items-center justify-between ${isFullscreen ? "bg-gray-700 border-gray-600" : ""}`}
          >
            <div className="flex items-center space-x-3">
              <Button size="sm" onClick={runCode} disabled={isRunning} className="bg-blue-600 hover:bg-blue-700">
                {isRunning ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                Run Code
              </Button>

              <Button size="sm" variant="outline" onClick={runTests} disabled={isRunning}>
                <Zap className="w-4 h-4 mr-2" />
                Run Tests
              </Button>

              <Button size="sm" variant="outline" onClick={resetCode}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <Select value={theme} onValueChange={(value: "vs-dark" | "light") => setTheme(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vs-dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>

              <Button size="sm" variant="ghost" className="opacity-50 hover:opacity-100">
                <Save className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="opacity-50 hover:opacity-100">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              onMount={handleEditorDidMount}
              theme={theme}
              options={{
                fontSize: 14,
                lineHeight: 20,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                wordWrap: "on",
                lineNumbers: "on",
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>

        <div className="w-96 bg-gray-50 flex flex-col border-l">
          <Tabs defaultValue="output" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 rounded-none">
              <TabsTrigger value="output">Console</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
            </TabsList>

            <TabsContent value="output" className="flex-1 p-4">
              <div className="h-full">
                <div className="flex items-center mb-3">
                  <Terminal className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm font-medium">Console Output</span>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg h-[calc(100%-2rem)] overflow-auto font-mono text-sm">
                  {isRunning ? (
                    <div className="flex items-center text-blue-400">
                      <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-2" />
                      Running code...
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap text-gray-100">
                      {output || "Click 'Run Code' to see output here..."}
                    </pre>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tests" className="flex-1 p-4">
              <div className="h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="text-sm font-medium">Test Results</span>
                  </div>
                  {testResults.length > 0 && (
                    <Badge variant={testResults.every((t) => t.passed) ? "default" : "destructive"}>
                      {testResults.filter((t) => t.passed).length}/{testResults.length} Passed
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 h-[calc(100%-3rem)] overflow-auto">
                  {isRunning ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Running tests...</p>
                      </div>
                    </div>
                  ) : testResults.length > 0 ? (
                    testResults.map((result, index) => (
                      <Card
                        key={index}
                        className={`p-3 ${result.passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              {result.passed ? (
                                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600 mr-2" />
                              )}
                              <span className="text-sm font-medium">{result.description}</span>
                            </div>
                            <div className="text-xs text-gray-600">
                              Expected: {String(result.expected)} | Got: {String(result.actualOutput)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Execution time: {result.executionTime}ms</div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 mt-8">
                      <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Click 'Run Tests' to see results here...</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
