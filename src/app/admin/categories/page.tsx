"use client";

import { Category } from "@/app/_types/Category";
import { Post } from "@/app/_types/Post";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/categories");
      const { categories } = await res.json();

      setCategories(categories);
    };

    fetcher();
  }, []);

  return (
    <main className="m-5 ">
      <div className="flex justify-between">
        <h1 className="font-medium text-xl text-gray-700 ">カテゴリー一覧</h1>
        <button className="bg-sky-500 px-3 py-1 text-white rounded">
          <Link href="/admin/categories/new">新規作成</Link>
        </button>
      </div>
      <ul className="max-w-4xl grid grid-cols-1 gap-2 mt-6 ">
        {categories.map((category) => (
          <li key={category.id} className="w-auto border-b-2 ">
            <Link href={`/admin/categories/${category.id}`}>
              <p className="py-2 font-medium text-gray-700">{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
