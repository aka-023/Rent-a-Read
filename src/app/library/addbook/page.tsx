//src/app/library/addbook/page.tsx
"use client"

import axios from "axios"
import { useState, type ChangeEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import Footer from "@/components/footer/Footer"
import { CheckCircle, XCircle, X, Upload } from "lucide-react"

interface BookPayload {
  name: string
  author: string 
  description: string
  price: number
  isbn: string
  username: string | null
  imageUrl: string
}

interface Message {
  type: "success" | "error"
  text: string
}

export default function Page() {
  const router = useRouter()

  // keep form fields except image file here
  const [form, setForm] = useState({
    name: "",
    author: "",
    description: "",
    price: 0,
    isbn: "",
    username: null as string | null,
  })

  // store the chosen file separately
  const [file, setFile] = useState<File | null>(null)

  const [message, setMessage] = useState<Message | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // pull username from localStorage once
  useEffect(() => {
    const username = localStorage.getItem("username")
    setForm((f) => ({ ...f, username }))
  }, [])

  // auto‑hide message
  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(null), 5000)
    return () => clearTimeout(t)
  }, [message])

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }))
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    if (!f) return

    // validate
    const okTypes = ["image/jpeg","image/png","image/webp"]
    if (!okTypes.includes(f.type)) {
      return setMessage({ type: "error", text: "Invalid image type." })
    }
    if (f.size > 5*1024*1024) {
      return setMessage({ type: "error", text: "Max size is 5 MB." })
    }

    setFile(f)
    setMessage(null)
  }

  function validate(): boolean {
    if (!form.name.trim())    { setMessage({ type:"error", text:"Enter book name." }); return false }
    if (!form.author.trim())  { setMessage({ type:"error", text:"Enter author." }); return false }
    if (!form.description.trim()) { setMessage({ type:"error", text:"Enter description." }); return false }
    if (!form.isbn.trim())    { setMessage({ type:"error", text:"Enter ISBN." }); return false }
    if (form.price <= 0)      { setMessage({ type:"error", text:"Price must be > 0." }); return false }
    if (!file)                { setMessage({ type:"error", text:"Please select a cover image." }); return false }
    if (!form.username)       { setMessage({ type:"error", text:"Please log in first." }); return false }
    return true
  }

  async function handleSubmit() {
    console.log("lend book!!");
    setMessage(null)
    if (!validate()) return

    setIsSubmitting(true)
    try {
      // 1. upload image
      const fm = new FormData()
      fm.append("image", file!)
      const uploadRes = await axios.post<{ imageUrl: string }>(
        "/api/add/upload_image",
        fm,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      const cloudinary_image_url = uploadRes.data.imageUrl
      
      console.log("book uploaded!!");
      // 2️. save book
      const payload: BookPayload = {
           name: form.name,
           author: form.author, 
           description: form.description,
           price: form.price,
           isbn: form.isbn,
           username: form.username,
           imageUrl : cloudinary_image_url
      }

      console.log("payload "+ payload);

      const bookRes = await axios.post("/api/add", payload)
      if (bookRes.data.status === false) {
        throw new Error(bookRes.data.message || "Failed to save book")
      }


      setMessage({ type: "success", text: "Book uploaded! Redirecting…" })
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
      <div className="flex items-center justify-center min-h-screen p-8 relative mb-10">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl border-t-4 border-pink-400 relative top-[40px]">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Upload Book Information
          </h2>

          {message && (
            <div className={`mb-6 flex items-center justify-between p-4 rounded-lg shadow-sm
              ${message.type === "success"
                ? "bg-green-50 border-l-4 border-green-400 text-green-800"
                : "bg-red-50 border-l-4 border-red-400 text-red-800"
              }`}>
              <div className="flex items-center space-x-3">
                {message.type === "success" ? <CheckCircle/> : <XCircle/>}
                <span>{message.text}</span>
              </div>
              <button onClick={() => setMessage(null)}><X/></button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-8">
            {/* Name */}
            <div>
              <label className="font-semibold">Book Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter book name"
              />
            </div>

            {/* Cover Upload */}
            <div>
              <label className="font-semibold">Cover Image *</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  className="w-full p-3 border rounded-lg"
                />
                <Upload className="absolute right-3 top-3 w-5 h-5 text-gray-400"/>
              </div>
              <p className="text-xs text-gray-500">Max 5 MB; JPEG/PNG/WebP</p>
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
                placeholder="Author name"
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
                placeholder="978-0123456789"
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
                placeholder="Brief description..."
                rows={4}
              />
            </div>

            {/* Price + Submit */}
            <div className="flex items-end space-x-4 col-span-2">
              <div className="flex-grow">
                <label className="font-semibold">Price ($) *</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3 border rounded-lg"
                  placeholder="0.00"
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

          <p className="mt-6 text-center text-sm text-gray-500">
            <span className="text-red-500">*</span> Required fields
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
