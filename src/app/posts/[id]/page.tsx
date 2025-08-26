"use client";

// import { useParams } from "react-router-dom";
import PostDetail from "./_components/PostDetail";
import { useEffect, useState } from "react";
import { Post } from "@/app/_types/Post";
import { useParams } from "next/navigation";

export default function PostDetailPage() {
  // ルートパラメータを取得
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null); //初期値が空配列のため、nullを明示
  const [isLoading, setLoading] = useState(true);

  // APIでpostを取得する処理をuseEffectで実行
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `/api/posts/${id}`,

        {
          headers: {},
        }
      );
      const { post } = await res.json();

      setPost(post);
      setLoading(false);
    };

    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) return <p className="text-left">読み込み中...</p>;
  if (!post) return <p className="text-left">投稿が見つかりませんでした</p>;

  return (
    <div>
      <PostDetail post={post} />
    </div>
  );
}
