// src/app/api/add/book/route.ts
import connectToDB from "@/server/connectToDB";
import Book        from "@/server/models/bookmodels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, url, author, description, price, isbn, username } =
      await req.json();

    // Validate
    if (
      !name?.trim()    ||
      !url?.trim()     ||
      !author?.trim()  ||
      !description?.trim() ||
      !isbn?.trim()    ||
      !username?.trim() ||
      Number(price) <= 0
    ) {
      return NextResponse.json(
        {
          message:
            "Please provide all fields correctly (including a valid image URL).",
          status: false,
        },
        { status: 400 }
      );
    }

    await connectToDB();

    const newBook = await Book.create({
      name,
      url,
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
