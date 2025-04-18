import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { initDatabase } from "@/lib/init-db";

// 确保数据库初始化
initDatabase().catch(console.error);

// 获取所有引言
export async function GET() {
  try {
    // 从数据库获取所有引言
    const quotes = await sql`SELECT * FROM quotes ORDER BY id`;
    return NextResponse.json({ quotes });
  } catch (error) {
    console.error("获取引言失败:", error);
    return NextResponse.json({ error: "获取引言失败" }, { status: 500 });
  }
}

// 添加新引言
export async function POST(request: NextRequest) {
  try {
    const { text, author } = await request.json();

    if (!text || !author) {
      return NextResponse.json(
        { error: "引言文本和作者不能为空" },
        { status: 400 }
      );
    }

    // 添加新引言到数据库
    const result = await sql`
      INSERT INTO quotes (text, author)
      VALUES (${text}, ${author})
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      quote: result[0],
      message: "引言已添加",
    });
  } catch (error) {
    console.error("添加引言失败:", error);
    return NextResponse.json({ error: "添加引言失败" }, { status: 500 });
  }
}

// 更新引言
export async function PUT(request: NextRequest) {
  try {
    const { id, text, author } = await request.json();

    if (!id || !text || !author) {
      return NextResponse.json(
        { error: "ID、引言文本和作者不能为空" },
        { status: 400 }
      );
    }

    // 更新数据库中的引言
    const result = await sql`
      UPDATE quotes
      SET text = ${text}, author = ${author}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "找不到指定ID的引言" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      quote: result[0],
      message: "引言已更新",
    });
  } catch (error) {
    console.error("更新引言失败:", error);
    return NextResponse.json({ error: "更新引言失败" }, { status: 500 });
  }
}

// 删除引言
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID不能为空" }, { status: 400 });
    }

    // 从数据库删除引言
    await sql`DELETE FROM quotes WHERE id = ${id}`;

    return NextResponse.json({
      success: true,
      message: "引言已删除",
    });
  } catch (error) {
    console.error("删除引言失败:", error);
    return NextResponse.json({ error: "删除引言失败" }, { status: 500 });
  }
}
