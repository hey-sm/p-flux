/** @format */

import type { Metadata } from "next";
import { Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

// 定义页面结构的接口
interface PageData {
  name: string;
  route: string;
  children?: PageData[];
  title: string;
}

export const metadata: Metadata = {
  title: "fluxp Blog - 知识分享与技术探索",
  description: "fluxp的博客，分享前端、后端开发经验和技巧",
  keywords: ["fluxp", "fluxp blog", "技术博客", "前端开发"],
};

const navbar = (
  <Navbar
    logo={<b>fluxp Blog</b>}
    projectLink="https://github.com/hey-sm/p-flux"
  />
);
const search = <Search placeholder="🔍" />;
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
      docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
    >
      {children}
    </Layout>
  );
}
