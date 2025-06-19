import { BookRecommendations } from "@/components/book-recommendations"
import Footer from "@/components/footer/Footer"
import { ProcessSteps } from "@/components/process-steps"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

export default async function Home() {
  const { userId } = auth()
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <video
          autoPlay
          muted
          loop
          className="absolute top-1/2 left-1/2 w-full h-full object-cover z-0 opacity-30 transform -translate-x-1/2 -translate-y-1/2"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-5"></div>

        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <div className="text-center space-y-8 px-4 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-sm font-medium text-purple-200">✨ Welcome to</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
                Rent-a-Read
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
                Discover your next favorite book with the world's most elegant online book rental service
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/library">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                  <span className="relative z-10">Explore Library</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </Link>
              {!userId && (
                <Link href="/sign-up">
                  <button className="px-8 py-4 border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm font-semibold rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300">
                    Get Started Free
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Publishers Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium">Trusted by leading publishers worldwide</p>
          </div>
          <div className="flex justify-center">
            <img
              src="/publishers.svg"
              alt="publishers"
              className="max-w-4xl opacity-60 hover:opacity-80 transition-opacity duration-300"
            />
          </div>
        </div>
      </section>

      {/* Book Recommendations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Curated Just for You</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover handpicked books tailored to your interests and reading preferences
            </p>
          </div>
          <BookRecommendations />
        </div>
      </section>

      {/* Process Steps */}
      <ProcessSteps />

      {/* Choice Section */}
      {/* Interactive Reading Paths Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-500"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/40 mb-6">
              <span className="text-sm font-medium text-purple-700">📚 Choose Your Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Every Book Opens a New
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Universe of Possibilities
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're seeking knowledge, adventure, or inspiration - your perfect reading journey awaits
            </p>
          </div>

          {/* Interactive Reading Paths */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Knowledge Path */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 text-center transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-purple-200 hover:-translate-y-4">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-3xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Knowledge Seeker</h3>
                <p className="text-gray-600 mb-6">
                  Dive deep into non-fiction, biographies, and educational content that expands your mind
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Science</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">History</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Business</span>
                </div>
              </div>
            </div>

            {/* Adventure Path */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 text-center transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-pink-200 hover:-translate-y-4">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-3xl">⚔️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Adventure Lover</h3>
                <p className="text-gray-600 mb-6">
                  Embark on thrilling journeys through fantasy, sci-fi, and action-packed narratives
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">Fantasy</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">Sci-Fi</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">Thriller</span>
                </div>
              </div>
            </div>

            {/* Soul Path */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 text-center transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-indigo-200 hover:-translate-y-4">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-3xl">💫</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Soul Searcher</h3>
                <p className="text-gray-600 mb-6">
                  Find meaning and connection through poetry, philosophy, and transformative literature
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                    Poetry
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                    Philosophy
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                    Spirituality
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8">
              Not sure which path to take? Let our AI recommend the perfect books for your mood and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/library">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                  Start Your Journey
                </button>
              </Link>
              <button className="px-8 py-4 border-2 border-purple-300 text-purple-700 bg-white/60 backdrop-blur-sm font-semibold rounded-full hover:bg-white hover:border-purple-400 transition-all duration-300">
                Take Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
