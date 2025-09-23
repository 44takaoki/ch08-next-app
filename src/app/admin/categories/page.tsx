"use client";

import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Category } from "@/app/_types/Category";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useFetch } from "../_hooks/useFetch";

export default function page() {
  const [categories, setCategories] = useState<Category[]>([]);
  // const { token } = useSupabaseSession();

  // const fetcher = async (key: string) => {
  //   const res = await fetch(key, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token!, //Headerにtokenを付与
  //     },
  //   });
  //   if (!res.ok) throw new Error("データの取得に失敗しました");
  //   const data = await res.json();
  //   return data.categories as Category[];
  // };

  // // useSWRでデータ取得
  // const {
  //   data: categoriesData,
  //   error,
  //   isLoading,
  // } = useSWR(token ? `/api/admin/categories` : null, fetcher);

  // カスタムフック useFetchに置き換え
  const { data, error, isLoading } = useFetch<{ categories: Category[] }>(
    `/api/admin/categories`
  );

  // データ取得後にstateを更新
  useEffect(() => {
    if (data) {
      setCategories(data.categories || []);
    }
  }, [data]);

  if (isLoading) return <p className="text-left">読み込み中...</p>;
  if (error)
    return <p className="text-left">エラーが発生しました: {error.message}</p>;

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
