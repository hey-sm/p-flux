import { neon } from "@neondatabase/serverless";

// 从环境变量获取数据库 URL
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("请在环境变量中设置 DATABASE_URL");
}

// 创建 neon SQL 执行函数
export const sql = neon(DATABASE_URL);

// 创建引言表的函数
export async function createQuotesTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("quotes 表创建成功");
  } catch (error) {
    console.error("创建 quotes 表失败:", error);
  }
}
