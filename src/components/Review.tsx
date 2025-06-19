"use client"
import { useState, type FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Separator } from "./ui/separator"
import { BookReview } from "./book-review"
import { CheckCircle, XCircle, X } from "lucide-react"

interface Review {
  rating: number
  reviewText: string
  userId: { username: string }
  createdAt: string
}

interface Message {
  type: "success" | "error"
  text: string
}

const ReviewComponent = ({
  bookId,
  updateRating,
}: {
  bookId: string
  updateRating: () => Promise<void>
}) => {
  const router = useRouter()
  const { user, isSignedIn } = useUser()
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState("1")
  const [message, setMessage] = useState<Message | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Auto-hide message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/addReview/${bookId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const result = await response.json()
        if (result.status) {
          setReviews(result.reviews)
        } else {
          setMessage({
            type: "error",
            text: "Failed to load reviews. Please refresh the page.",
          })
        }
      } catch (error) {
        setMessage({
          type: "error",
          text: "Unable to connect to server. Please check your internet connection.",
        })
      }
    }

    fetchReviews()
  }, [bookId])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const username = user?.username || ""

    try {
      const response = await fetch(`/api/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          rating,
          reviewText: newReview,
          bookId,
        }),
      })

      const result = await response.json()

      if (result.status) {
        setMessage({
          type: "success",
          text: "Review submitted successfully! Thank you for sharing your thoughts.",
        })

        result.review.userId = {
          id: result.review.userId,
          username: user?.username,
        }
        setReviews((prevReviews) => [result.review, ...prevReviews])
        setNewReview("")
        setRating("1")
        updateRating()
      } else {
        setMessage({
          type: "error",
          text: "Please sign in to submit a review.",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again in a moment.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeMessage = () => {
    setMessage(null)
  }

  return (
    <div className="w-full p-6 bg-white pt-20">
      <Separator className="h-[1.5px]" />

      {/* Custom Message Display */}
      {message && (
        <div className="max-w-6xl mx-auto pt-6">
          <div
            className={`
            flex items-center justify-between p-4 rounded-lg border-l-4 shadow-sm
            ${
              message.type === "success"
                ? "bg-green-50 border-green-400 text-green-800"
                : "bg-red-50 border-red-400 text-red-800"
            }
          `}
          >
            <div className="flex items-center space-x-3">
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
            <button onClick={closeMessage} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto flex pt-10 justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Leave a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-medium">Rating:</span>
              <select
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
                disabled={isSubmitting}
              >
                <option value={1}>⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={5}>⭐⭐⭐⭐⭐</option>
              </select>
            </label>

            <textarea
              name="reviewText"
              placeholder="Share your thoughts about this book..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
              rows={4}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-500 text-white p-3 rounded-md font-medium hover:bg-pink-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>

        <div className="flex-grow max-w-2xl">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-6">Reviews</h3>
          <ul className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <li key={index}>
                  <BookReview
                    date={review.createdAt}
                    rating={review.rating}
                    review={review.reviewText}
                    username={review.userId?.username || "anonymous"}
                    avatarUrl={`/defaultprofile.jpg`}
                  />
                </li>
              ))
            ) : (
              <div className="text-gray-500 text-center py-8">
                📚 No reviews yet. Be the first to share your thoughts!
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ReviewComponent
