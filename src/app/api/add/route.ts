// src/app/api/add/book/route.ts

import connectToDB from "@/server/connectToDB";
import Book        from "@/server/models/bookmodels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      url,          // ← Cloudinary URL goes here now
      author,
      description,
      price,
      isbn,
      username,
    } = await req.json();

    // basic validation
    if (
      !name?.trim()    ||
      !url?.trim()     || // ensure the image URL is present
      !author?.trim()  ||
      !description?.trim() ||
      !isbn?.trim()    ||
      !username?.trim() ||
      Number(price) <= 0
    ) {
      return NextResponse.json(
        {
          message: "Please provide all fields correctly (including a valid image URL).",
          status: false,
        },
        { status: 400 }
      );
    }

    // connect to MongoDB
    await connectToDB();

    // create & save
    const newBook = await Book.create({
      name,
      url,              // stores your Cloudinary link
      author,
      description,
      price: Number(price),
      isbn,
      username,
    });

    return NextResponse.json(
      { message: "Book created successfully", book: newBook, status: true },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error creating book:", err);
    return NextResponse.json(
      {
        message: "An error occurred while creating the book",
        status: false,
      },
      { status: 500 }
    );
  }
}
