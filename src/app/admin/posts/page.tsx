"use client";

import { Post } from "@/app/_types/Post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/posts");
      const { posts } = await res.json();

      setPosts(posts);
    };

    fetcher();
  }, []);

  const formatDate = (date: Post) => {
    // 日時をyyyy/MM/DD形式にフォーマット
    const yeardate = new Date(date.createdAt).toLocaleString().split(" ", 1);
    return yeardate;
  };

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
