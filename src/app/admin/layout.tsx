"use client";

import Link from "next/link";
import React from "react";
import { useRouteGuard } from "./_hooks/useRouteGuard";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRouteGuard();

  const pathname = usePathname();
  const isSelected = (href: string) => {
    return pathname.includes(href);
  };

  return (
    // サイドバー
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
