"use client";

// import { useParams } from "react-router-dom";
import PostDetail from "./_components/PostDetail";
import { useEffect, useState } from "react";
import { Post } from "@/app/_types/Post";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function PostDetailPage() {
  // ルートパラメータを取得
  const { id } = useParams();
  // const [post, setPost] = useState<Post | null>(null); //初期値が空配列のため、nullを明示
  // const [isLoading, setLoading] = useState(true);

  // // APIでpostを取得する処理をuseEffectで実行
  // useEffect(() => {
  //   const fetcher = async () => {
  //     const res = await fetch(
  //       `/api/posts/${id}`,

  //       {
  //         headers: {},
  //       }
  //     );
  //     const { post } = await res.json();

  //     setPost(post);
  //     setLoading(false);
  //   };

  //   fetcher();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  // useSWRに置き換え
  const fetcher = async (key: string) => {
    const res = await fetch(key);
    if (!res.ok) throw new Error("データの取得に失敗しました");
    const data = await res.json();
    return data.post;
  };
  const { data: post, error, isLoading } = useSWR(`/api/posts/${id}`, fetcher);

  if (isLoading) return <p className="text-left">読み込み中...</p>;
  if (!post) return <p className="text-left">投稿が見つかりませんでした</p>;

  return (
    <div>
      <PostDetail post={post} />
    </div>
  );
}
