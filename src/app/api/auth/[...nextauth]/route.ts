import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// 从环境变量获取密码
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// 定义NextAuth处理程序
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "admin-login",
      name: "管理员密码",
      credentials: {
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        // 只验证密码
        if (credentials?.password === ADMIN_PASSWORD) {
          // 返回一个简单的用户对象
          return { id: "1", role: "admin" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        // 添加角色到会话用户对象
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // 自定义登录页面路径
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24小时
  },
  debug: process.env.NODE_ENV === "development",
});

// 导出GET和POST处理程序
export { handler as GET, handler as POST };
