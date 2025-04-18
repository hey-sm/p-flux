"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Ripple } from "@/components/magicui/ripple";
// 将使用useSearchParams的部分抽离为单独组件
function LoginForm() {
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

      // 使用window.location直接跳转，而不是使用router
      // 这样可以确保在生产环境中重定向正常工作
      window.location.href = callbackUrl;
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
    <div className="w-42">
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
  );
}

// 主页面组件使用Suspense包裹LoginForm
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div className="w-72 text-center">加载中...</div>}>
        <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
          <LoginForm />
          <Ripple />
        </div>
      </Suspense>
    </div>
  );
}
