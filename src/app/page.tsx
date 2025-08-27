"use client";

import { useEffect, useState } from "react";
import PostList from "./_components/PostList";

import { Post } from "./_types/Post";

export default function TopPage() {
  const [posts, setPosts] = useState<Post[]>([]); //Post[]としてPostの配列型を明示
  const [isLoading, setLoading] = useState(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/posts", {
        headers: {},
      });
      const { posts } = await res.json();

      setPosts(posts);
      setLoading(false);
    };

    fetcher();
  }, []);

  if (isLoading) return <p className="text-left">読み込み中...</p>;

  return (
    <>
      <div>
        <PostList posts={posts} />
      </div>
    </>
  );
}
