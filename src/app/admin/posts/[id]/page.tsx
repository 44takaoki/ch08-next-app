"use client";

import { Category } from "@/app/_types/Category";
import { Post } from "@/app/_types/Post";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { PostForm } from "../_components/PostForm";

export default function page({ params }: { params: { id: string } }) {
  // ルートパラメータを取得
  // const { id } = useParams();

  const [isLoading, setLoading] = useState(true);

  const [title, setTitle] = useState(" ");
  const [content, setContent] = useState(" ");
  const [thumbnailUrl, setThumbnailUrl] = useState(" ");
  const [categories, setCategories] = useState<Category[]>([]);
  const { id } = useParams();
  const router = useRouter();
  const [isSubmit, setSubmit] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトの動作をキャンセル
    e.preventDefault();

    setSubmit(true);
    // 記事を作成
    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "applicaiton/json",
        },
        body: JSON.stringify({ title, content, thumbnailUrl, categories }),
      });

      alert("記事を更新しました。");
    } catch (err) {
      alert("送信に失敗しました。");
    } finally {
      setSubmit(false);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm("記事を削除しますか？")) return;

    setSubmit(true);
    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });

      alert("記事を削除しました。");

      router.push("/admin/posts");
    } catch (err) {
      alert("削除に失敗しました。");
    } finally {
      setSubmit(false);
    }
  };

  // APIでpostを取得する処理をuseEffectで実行
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/posts/${id}`);
      const { post }: { post: Post } = await res.json();
      setLoading(false);

      setTitle(post.title);
      setContent(post.content);
      setThumbnailUrl(post.thumbnailUrl);
      setCategories(post.postCategories.map((pc) => pc.category));
    };

    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) return <p className="text-left">読み込み中...</p>;
  // if (!post) return <p className="text-left">記事が見つかりませんでした</p>;

  return (
    <div className="max-w-3xl mx-10">
      <h1 className="font-medium text-xl my-6 text-gray-700 text-left ">
        記事編集
      </h1>
      <PostForm
        mode="edit"
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
        onDelete={handleDeletePost}
        isSubmit={isSubmit}
      />
    </div>
  );
}
