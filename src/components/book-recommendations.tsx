"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight, Star } from "lucide-react"

export function BookRecommendations() {
  const [activeTab, setActiveTab] = useState("For You")
  const router = useRouter()

  const book1 = [
    {
      title: "Rich Dad Poor Dad",
      image: "/rdpd.jpg",
      alt: "Rich Dad Poor Dad book cover",
      rating: 4.8,
      genre: "Finance",
    },
    {
      title: "Pride And Prejudice",
      image: "/Pride.jpeg",
      alt: "Pride And Prejudice book cover",
      rating: 4.9,
      genre: "Classic",
    },
    {
      title: "The Hunger Games",
      image: "/Hunger.jpeg",
      alt: "The Hunger Games book cover",
      rating: 4.7,
      genre: "Dystopian",
    },
  ]

  const book2 = [
    {
      title: "The Great Gatsby",
      image: "/great.jpg",
      alt: "The Great Gatsby book cover",
      rating: 4.6,
      genre: "Classic",
    },
    {
      title: "To Kill a Mockingbird",
      image: "/mocking.jpeg",
      alt: "To Kill a Mockingbird book cover",
      rating: 4.8,
      genre: "Classic",
    },
    {
      title: "The Lord of the Rings",
      image: "/lord.png",
      alt: "The Lord of the Rings book cover",
      rating: 4.9,
      genre: "Fantasy",
    },
  ]

  const book3 = [
    {
      title: "Pride and Prejudice",
      image: "/PRIDE.jpeg",
      alt: "Pride and Prejudice book cover",
      rating: 4.9,
      genre: "Romance",
    },
    {
      title: "The Catcher in the Rye",
      image: "/CATCHER.jpeg",
      alt: "The Catcher in the Rye book cover",
      rating: 4.5,
      genre: "Coming-of-age",
    },
    {
      title: "The Hunger Games",
      image: "/HUNGER.jpeg",
      alt: "The Hunger Games book cover",
      rating: 4.7,
      genre: "Dystopian",
    },
  ]

  const [books, setBooks] = useState(book1)

  const tabs = ["For You", "Genres", "Top selling"]

  useEffect(() => {
    const changeRecommendation = () => {
      if (activeTab === tabs[1]) {
        setBooks(book2)
      } else if (activeTab === tabs[2]) {
        setBooks(book3)
      } else {
        setBooks(book1)
      }
    }
    changeRecommendation()
  }, [activeTab])

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Book Recommendations</h3>
            <p className="text-purple-100">Discover your next great read</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeTab === tab
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10",
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 min-h-[420px]">
                {/* Book Cover */}
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.alt}
                    width={200}
                    height={300}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ArrowRight className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      {book.genre}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">{book.rating}</span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-purple-700 transition-colors duration-200">
                    {book.title}
                  </h4>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">Available now</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Link */}
        <div className="flex justify-center mt-12">
          <Link
            href="/library"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            Explore All Books
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
