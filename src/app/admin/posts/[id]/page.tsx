"use client";

import { Category } from "@/app/_types/Category";
import { Post } from "@/app/_types/Post";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { PostForm } from "../_components/PostForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import useSWR from "swr";
import { useFetch } from "../../_hooks/useFetch";

export default function page({ params }: { params: { id: string } }) {
  // ルートパラメータを取得
  // const { id } = useParams();

  // const [isLoading, setLoading] = useState(true);

  const [title, setTitle] = useState(" ");
  const [content, setContent] = useState(" ");
  const [thumbnailImageKey, setThumbnailImageKey] = useState(" ");
  const [categories, setCategories] = useState<Category[]>([]);
  const { id } = useParams();
  const router = useRouter();
  const [isSubmit, setSubmit] = useState(false);
  const { token } = useSupabaseSession();

  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトの動作をキャンセル
    e.preventDefault();

    setSubmit(true);
    // 記事を作成
    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!, //Headerにtokenを付与
        },
        body: JSON.stringify({ title, content, thumbnailImageKey, categories }),
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

  // const fetcher = async (key: string) => {
  //   const res = await fetch(key, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token!, //Headerにtokenを付与
  //     },
  //   });
  //   if (!res.ok) throw new Error("データの取得に失敗しました");
  //   const data = await res.json();
  //   return data.post as Post; // APIのレスポンスから post を返す
  // };

  // // useSWRでデータ取得
  // const {
  //   data: post,
  //   error,
  //   isLoading,
  // } = useSWR(token && id ? `/api/admin/posts/${id}` : null, fetcher);

  // カスタムフック useFetchに置き換え
  const { data, error, isLoading } = useFetch<{ post: Post }>(
    `/api/admin/posts/${id}`
  );

  // データ取得後にstateを更新
  useEffect(() => {
    if (data) {
      setTitle(data.post.title);
      setContent(data.post.content);
      setThumbnailImageKey(data.post.thumbnailImageKey);
      setCategories(data.post.postCategories.map((pc) => pc.category));
    }
  }, [data]);

  if (isLoading) return <p className="text-left">読み込み中...</p>;
  if (error)
    return <p className="text-left">エラーが発生しました: {error.message}</p>;

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
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
        onDelete={handleDeletePost}
        isSubmit={isSubmit}
      />
    </div>
  );
}
