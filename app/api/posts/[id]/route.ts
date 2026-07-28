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

    const updatedPost = await updateSanityPost(id, body);

    // Immediately purge Next.js Data Cache for instant UI update
    revalidatePath("/");
    revalidatePath("/posts");
    revalidatePath(`/posts/${id}`);
    if (body.slug && body.slug !== id) {
      revalidatePath(`/posts/${body.slug}`);
    }

    return NextResponse.json({ success: true, data: updatedPost });
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
    const result = await deleteSanityPost(id);

    // Immediately purge Next.js Data Cache for instant UI update
    revalidatePath("/");
    revalidatePath("/posts");
    revalidatePath(`/posts/${id}`);

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete post" },
      { status: 500 }
    );
  }
}
