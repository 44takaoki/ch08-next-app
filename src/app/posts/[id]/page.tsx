"use client";

// import { useParams } from "react-router-dom";
import PostDetail from "./_components/PostDetail";
import { useEffect, useState } from "react";
import { Post } from "../../_types/Post";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  // ルートパラメータを取得
  // const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null); //初期値が空配列のため、nullを明示
  const [isLoading, setLoading] = useState(true);
  // const { state: posts } = useLocation();

  // APIでpostを取得する処理をuseEffectで実行
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${params.id}`
      );
      const data = await res.json();

      setPost(data.post);
      setLoading(false);
    };

    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <p className="text-left">読み込み中...</p>;
  if (!post) return <p className="text-left">投稿が見つかりませんでした</p>;

  return (
    <div>
      <PostDetail post={post} />
    </div>
  );
}
