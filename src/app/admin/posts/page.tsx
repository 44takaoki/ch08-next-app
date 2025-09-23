"use client";

import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Post } from "@/app/_types/Post";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useFetch } from "../_hooks/useFetch";

export default function page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useSupabaseSession();

  // const fetcher = async (key: string) => {
  //   // console.log("トークン", token);
  //   const res = await fetch(key, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token!, //Headerにtokenを付与
  //     },
  //   });
  //   if (!res.ok) throw new Error("データの取得に失敗しました");
  //   const data = await res.json();
  //   return data.posts as Post[];
  // };

  // // useSWRでデータ取得
  // const {
  //   data: postsData,
  //   error,
  //   isLoading,
  // } = useSWR(token ? `/api/admin/posts` : null, fetcher);

  // カスタムフック useFetchに置き換え
  const { data, error, isLoading } = useFetch<{ posts: Post[] }>(
    `/api/admin/posts`
  );

  const formatDate = (date: Post) => {
    // 日時をyyyy/MM/DD形式にフォーマット
    const yeardate = new Date(date.createdAt).toLocaleString().split(" ", 1);
    return yeardate;
  };

  // データ取得後にstateを更新
  useEffect(() => {
    if (data) {
      setPosts(data.posts || []);
    }
  }, [data]);

  if (isLoading) return <p className="text-left">読み込み中...</p>;
  if (error)
    return <p className="text-left">エラーが発生しました: {error.message}</p>;

  return (
    <main className="m-5 ">
      <div className="flex justify-between">
        <h1 className="font-medium text-xl text-gray-700 ">記事一覧</h1>
        <button className="bg-sky-500 px-3 py-1 text-white rounded">
          <Link href="/admin/posts/new">新規作成</Link>
        </button>
      </div>
      <ul className="max-w-4xl grid grid-cols-1 gap-2 mt-6 ">
        {posts.map((post) => (
          <li key={post.id} className="w-auto border-b-2 ">
            <Link href={`/admin/posts/${post.id}`}>
              <p className="font-medium text-gray-700">{post.title}</p>
              <p className="text-gray-400 m-2">{formatDate(post)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
