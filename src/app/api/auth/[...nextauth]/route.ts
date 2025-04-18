import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// 从环境变量获取密码，或使用默认值
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "flux'";

export const authOptions: NextAuthOptions = {
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
        (session.user as { role?: string }).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // 自定义登录页面路径
  },
  session: {
    strategy: "jwt",
    maxAge: 72 * 60 * 60, // 72小时
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
