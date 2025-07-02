"use client";

// import { useParams } from "react-router-dom";
import PostDetail from "./_components/PostDetail";
import { useEffect, useState } from "react";
import { MicroCmsPost } from "@/app/_types/MicroCmsPost";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  // ルートパラメータを取得
  // const { id } = useParams();
  const [post, setPost] = useState<MicroCmsPost | null>(null); //初期値が空配列のため、nullを明示
  const [isLoading, setLoading] = useState(true);

  // APIでpostを取得する処理をuseEffectで実行
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://muinnr02nv.microcms.io/api/v1/posts/${params.id}`,

        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };

    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (isLoading) return <p className="text-left">読み込み中...</p>;
  if (!post) return <p className="text-left">投稿が見つかりませんでした</p>;

  return (
    <div>
      <PostDetail post={post} />
    </div>
  );
}
