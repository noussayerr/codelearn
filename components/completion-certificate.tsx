"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Award, Download, Share2, Calendar, CheckCircle } from "lucide-react"

interface CompletionCertificateProps {
  studentName: string
  workshopTitle: string
  instructorName: string
  completionDate: string
  finalScore: number
  certificateId: string
  trigger?: React.ReactNode
}

export function CompletionCertificate({
  studentName,
  workshopTitle,
  instructorName,
  completionDate,
  finalScore,
  certificateId,
  trigger,
}: CompletionCertificateProps) {
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF certificate
    console.log("Downloading certificate...")
  }

  const handleShare = () => {
    // In a real app, this would share the certificate
    console.log("Sharing certificate...")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-yellow-600 hover:bg-yellow-700">
            <Award className="w-4 h-4 mr-2" />
            View Certificate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">Certificate of Completion</DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {/* Certificate Design */}
          <Card className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-200">
            <CardContent className="p-8 text-center space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Certificate of Completion</h2>
                <p className="text-gray-600">This certifies that</p>
              </div>

              {/* Student Name */}
              <div className="py-4 border-b-2 border-blue-200">
                <h3 className="text-3xl font-bold text-blue-900">{studentName}</h3>
              </div>

              {/* Workshop Details */}
              <div className="space-y-3">
                <p className="text-gray-700">has successfully completed the workshop</p>
                <h4 className="text-xl font-semibold text-gray-900">{workshopTitle}</h4>
                <p className="text-gray-600">instructed by {instructorName}</p>
              </div>

              {/* Achievement Details */}
              <div className="bg-white/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{finalScore}%</div>
                    <div className="text-xs text-gray-600">Final Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      <CheckCircle className="w-8 h-8 mx-auto" />
                    </div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      <Calendar className="w-8 h-8 mx-auto" />
                    </div>
                    <div className="text-xs text-gray-600">{new Date(completionDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div>CodeLearn Platform</div>
                  <div>Certificate ID: {certificateId}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center space-x-4 mt-6">
            <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Certificate
            </Button>
          </div>

          {/* Verification Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              This certificate can be verified at{" "}
              <span className="font-mono text-blue-600">codelearn.com/verify/{certificateId}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
