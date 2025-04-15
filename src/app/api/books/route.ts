import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    // 从Vercel Blob获取books目录下的所有文件
    const { blobs } = await list({ prefix: "books/" });

    // 过滤出EPUB文件并构建书籍列表
    const books = blobs
      .filter((blob) => blob.pathname.toLowerCase().endsWith(".epub"))
      .map((blob) => ({
        name: blob.pathname.split("/").pop() || "",
        url: blob.url,
        title: (blob.pathname.split("/").pop() || "").replace(".epub", ""),
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      }));

    return NextResponse.json({ books });
  } catch (error) {
    console.error("Error fetching books from Vercel Blob:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch books list",
      },
      { status: 500 }
    );
  }
}
