import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * 扩展默认的Session类型
   */
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  /**
   * 扩展默认的User类型
   */
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * 扩展JWT类型
   */
  interface JWT {
    role?: string;
  }
}
