// src/app/library/addbook/page.tsx
"use client"

import { useState, useEffect, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Footer from "@/components/footer/Footer"
import { CheckCircle, XCircle, X, Upload } from "lucide-react"
import { AvatarUploader } from "@/components/avatar-uploader"

interface BookPayload {
  name: string
  author: string
  description: string
  price: number
  isbn: string
  username: string | null
  url: string    
}

interface Message {
  type: "success" | "error"
  text: string
}

export default function Page() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    author: "",
    description: "",
    price: 0,
    isbn: "",
    username: null as string | null,
  })
  const [imageUrl, setImageUrl] = useState<string>("")
  const [message, setMessage] = useState<Message | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const username = localStorage.getItem("username")
    setForm((f) => ({ ...f, username }))
  }, [])

  // auto-hide messages
  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(null), 5_000)
    return () => clearTimeout(t)
  }, [message])

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }))
  }

  function validate(): boolean {
    if (!form.name.trim())    { setMessage({type:"error",text:"Enter book name."}); return false }
    if (!form.author.trim())  { setMessage({type:"error",text:"Enter author."});    return false }
    if (!form.description.trim()){ setMessage({type:"error",text:"Enter description."}); return false }
    if (!form.isbn.trim())    { setMessage({type:"error",text:"Enter ISBN."});      return false }
    if (form.price <= 0)      { setMessage({type:"error",text:"Price must be > 0."}); return false }
    if (!imageUrl)            { setMessage({type:"error",text:"Please upload a cover image."}); return false }
    if (!form.username)       { setMessage({type:"error",text:"Please log in first."}); return false }
    return true
  }

  async function handleSubmit() {
    setMessage(null)
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const payload: BookPayload = {
        ...form,
        url: imageUrl,  
      }

      const res = await axios.post("/api/add", payload)
      if (res.data.status === false) {
        throw new Error(res.data.message || "Failed to save book")
      }

      setMessage({ type: "success", text: "Book created! Redirecting…" })
      setTimeout(() => router.push("/library"), 2000)
    } catch (err: any) {
      console.error(err)
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "Unexpected error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl border-t-4 border-pink-400">
          <h2 className="text-3xl font-bold text-center mb-8">
            Add a New Book
          </h2>

          {message && (
            <div className={`mb-6 flex items-center justify-between p-4 rounded-lg shadow-sm
              ${message.type === "success"
                ? "bg-green-50 border-l-4 border-green-400 text-green-800"
                : "bg-red-50 border-l-4 border-red-400 text-red-800"}`}>
              <div className="flex items-center space-x-3">
                {message.type === "success" ? <CheckCircle/> : <XCircle/>}
                <span>{message.text}</span>
              </div>
              <button onClick={() => setMessage(null)}><X/></button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-8">
            {/* Book Name */}
            <div>
              <label className="font-semibold">Book Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            {/* Cover via Cloudinary widget */}
            <div className="flex flex-col gap-3">
              <label className="font-semibold">Cover Image *</label>
              {!imageUrl &&  <AvatarUploader onUploadSuccess={(url) => setImageUrl(url)} />}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Cover preview"
                  className="m-1 h-24 object-contain"
                />
              )}
            </div>

            {/* Author */}
            <div>
              <label className="font-semibold">Author *</label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            {/* ISBN */}
            <div>
              <label className="font-semibold">ISBN *</label>
              <input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="font-semibold">Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-3 border rounded-lg"
                rows={4}
              />
            </div>

            {/* Price & Submit */}
            <div className="col-span-2 flex items-end space-x-4">
              <div className="flex-grow">
                <label className="font-semibold">Price ($) *</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3 border rounded-lg"
                  step="0.01"
                  min="0"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2 bg-[#1a2a47] text-white font-bold py-3 px-8 rounded-full hover:bg-[#33415c] disabled:bg-gray-400"
              >
                {isSubmitting
                  ? <span className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"/>
                  : <span>Submit</span>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
