"use client";

import { useEffect, useState } from "react";
import PostList from "./_components/PostList";

import { Post } from "./_types/Post";
import useSWR from "swr";

export default function TopPage() {
  // const [posts, setPosts] = useState<Post[]>([]); //Post[]としてPostの配列型を明示
  // const [isLoading, setLoading] = useState(true);

  // // APIでpostsを取得する処理をuseEffectで実行します。
  // useEffect(() => {
  //   const fetcher = async () => {
  //     const res = await fetch("/api/posts", {
  //       headers: {},
  //     });
  //     const { posts } = await res.json();

  //     setPosts(posts);
  //     setLoading(false);
  //   };

  //   fetcher();
  // }, []);

  // useSWRに置き換え
  const fetcher = async (key: string) => {
    const res = await fetch(key);
    if (!res.ok) throw new Error("データの取得に失敗しました");
    const data = await res.json();
    return data.posts;
  };
  const { data: posts, error, isLoading } = useSWR("/api/posts", fetcher);

  if (isLoading) return <p className="text-left">読み込み中...</p>;
  if (error)
    return <p className="text-left">エラーが発生しました: {error.message}</p>;

  return (
    <>
      <div>
        <PostList posts={posts || {}} />
      </div>
    </>
  );
}
