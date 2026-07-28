import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllPosts } from "@/src/service/posts";
import { createSanityPost } from "@/src/service/sanityWrite";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ success: true, data: posts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (title, description, category)" },
        { status: 400 }
      );
    }

    const createdPost = await createSanityPost(body);

    // Immediately purge Next.js Data Cache for instant UI update
    revalidatePath("/");
    revalidatePath("/posts");

    return NextResponse.json({ success: true, data: createdPost }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create post" },
      { status: 500 }
    );
  }
}
