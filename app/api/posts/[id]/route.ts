import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPostData } from "@/src/service/posts";
import { updateSanityPost, deleteSanityPost } from "@/src/service/sanityWrite";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getPostData(id);
    return NextResponse.json({ success: true, data: post });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Post not found" },
      { status: 404 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // 1. Update Sanity CMS
    let updatedPost;
    try {
      updatedPost = await updateSanityPost(id, body);
    } catch (sanityErr) {
      console.error("Sanity update warning:", sanityErr);
    }

    // 2. Purge Next.js cache for instant UI update
    revalidatePath("/", "layout");
    revalidatePath("/posts", "layout");
    revalidatePath("/about", "layout");
    revalidatePath(`/posts/${id}`, "layout");
    if (body.slug && body.slug !== id) {
      revalidatePath(`/posts/${body.slug}`, "layout");
    }

    return NextResponse.json({ success: true, data: updatedPost || { id } });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Sanity deletion
    try {
      await deleteSanityPost(id);
    } catch (e) {
      console.error("Sanity delete warning:", e);
    }

    // Purge Next.js cache
    revalidatePath("/", "layout");
    revalidatePath("/posts", "layout");
    revalidatePath(`/posts/${id}`, "layout");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete post" },
      { status: 500 }
    );
  }
}
