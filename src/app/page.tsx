"use client";

import { useEffect, useState } from "react";
import PostList from "./_components/PostList";

import { MicroCmsPost } from "./_types/MicroCmsPost";

export default function TopPage() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]); //Post[]としてPostの配列型を明示
  const [isLoading, setLoading] = useState(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://muinnr02nv.microcms.io/api/v1/posts", {
        headers: {
          "X-MICROCMS-API-KEY": process.env
            .NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      });
      const { contents } = await res.json();

      setPosts(contents);
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
