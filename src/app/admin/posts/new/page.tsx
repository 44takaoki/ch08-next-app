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

  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトの動作をキャンセル
    e.preventDefault();

    // 記事を作成
    const res = await fetch(`/api/admin/posts`, {
      method: "POST",
      headers: {
        "Content-type": "applicaiton/json",
      },
      body: JSON.stringify({ title, content, thumbnailUrl, categories }),
    });

    //  レスポンスから作成した記事のIDを取得
    const { id } = await res.json();

    //作成した記事の詳細ページに遷移
    router.push(`/admin/posts/${id}`);

    alert("記事を作成しました。");
  };

  return (
    <div className="max-w-3xl mx-10">
      <h1 className="font-medium text-xl my-6 text-gray-700 text-left ">
        記事作成
      </h1>
      <PostForm
        mode="new"
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
