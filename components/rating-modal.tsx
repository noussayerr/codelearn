"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, ThumbsUp, CheckCircle } from "lucide-react"

interface RatingModalProps {
  workshopTitle: string
  instructorName: string
  onSubmitRating: (rating: number, review: string) => void
  trigger?: React.ReactNode
}

export function RatingModal({ workshopTitle, instructorName, onSubmitRating, trigger }: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmitRating(rating, review)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setRating(0)
        setReview("")
      }, 2000)
    }
  }

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1:
        return "Poor"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Very Good"
      case 5:
        return "Excellent"
      default:
        return "Rate this workshop"
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Star className="w-4 h-4 mr-2" />
            Rate Workshop
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">Rate Your Experience</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1">{workshopTitle}</h3>
                <p className="text-gray-600 text-sm">by {instructorName}</p>
              </div>

              <div className="text-center">
                <div className="flex justify-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="p-1 transition-transform hover:scale-110"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || rating)
                            ? "fill-blue-400 text-blue-400"
                            : "text-gray-300 hover:text-blue-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-700">{getRatingText(hoveredRating || rating)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Share your thoughts (optional)</label>
                <Textarea
                  placeholder="What did you like about this workshop? Any suggestions for improvement?"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={rating === 0} className="flex-1">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Submit Rating
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Thank you for your feedback!</h3>
            <p className="text-gray-600 text-sm">Your rating helps other learners discover great content.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
