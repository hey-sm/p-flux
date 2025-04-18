"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("admin-login", {
        password,
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error("密码错误");
      }

      // 登录成功，重定向到管理页面
      router.push(callbackUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("登录失败，请检查密码");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-72">
        {error && (
          <div className="mb-4 text-red-600 text-center text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入管理员密码"
            required
            autoFocus
            className="text-center h-10"
            disabled={loading}
          />
          {loading && (
            <div className="mt-2 text-center text-sm text-gray-500">
              验证中...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
