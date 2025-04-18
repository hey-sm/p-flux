import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 获取NextAuth token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 检查访问路径是否为admin页面
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 如果没有token或不是admin角色，重定向到登录页面
    if (!token || token.role !== "admin") {
      const url = new URL("/login", request.url);
      // 将原始URL添加为查询参数，以便登录后重定向回来
      url.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 配置中间件应用于哪些路径
export const config = {
  matcher: ["/admin/:path*"],
};
