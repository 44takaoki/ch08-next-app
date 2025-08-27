"use client";

import Link from "next/link";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <aside className="fixed bg-slate-200 w-48 h-screen top-16">
        <ul className="text-base text-gray-900 ">
          <Link href={`/admin/posts`}>
            <li className="p-2 hover:bg-slate-300">記事一覧</li>
          </Link>
          <Link href={`/admin/categories`}>
            <li className="p-2 hover:bg-slate-300">カテゴリー一覧</li>
          </Link>
        </ul>
      </aside>
      {/* main */}
      <div className="ml-48">{children}</div>
    </div>
  );
}
