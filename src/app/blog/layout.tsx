/** @format */

import type { Metadata } from "next";
import { Layout, Navbar } from "nextra-theme-docs";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import Image from "next/image";
import "./index.css";

// 定义页面结构的接口
interface PageData {
  name: string;
  route: string;
  children?: PageData[];
  title: string;
}

export const metadata: Metadata = {
  title: "fluxp Blog",
  description: "fluxp的博客，分享前端、后端开发经验和技巧",
  keywords: ["fluxp", "fluxp blog", "技术博客", "前端开发"],
};

const Logo = () => (
  <div className="flex items-center gap-2">
    <Image
      src="/favicon.svg"
      alt="fluxp logo"
      width={24}
      height={24}
      className="dark:invert"
    />
    <span className="font-bold">fluxp</span>
  </div>
);
const navbar = <Navbar logo={<Logo />} />;
const search = (
  <Search
    placeholder="🔍"
    className="[&_input:focus]:border-indigo-300 [&_input:focus]:border [&_input:focus]:outline-none"
  />
);
const pageMap = (await getPageMap()) as PageData[];
const blogPage = pageMap.find((page) => page.route === "/blog")?.children || [];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout
      themeSwitch={{
        dark: "Dark",
        light: "Light",
        system: "System",
      }}
      navbar={navbar}
      search={search}
      pageMap={blogPage}
      sidebar={{ defaultMenuCollapseLevel: 1 }}
      docsRepositoryBase="https://github.com/hey-sm/p-flux/blob/main"
    >
      {children}
    </Layout>
  );
}
