import { createQuotesTable } from "./db";

// 初始化数据库的函数
export async function initDatabase() {
  try {
    // 只创建表（如果不存在）
    await createQuotesTable();

    console.log("数据库初始化完成");
  } catch (error) {
    console.error("数据库初始化失败:", error);
  }
}
