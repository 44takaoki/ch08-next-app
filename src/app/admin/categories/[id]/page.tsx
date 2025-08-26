"use client";

import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { CategoryForm } from "../_components/CategoryForm";

export default function page() {
  const [name, setName] = useState("");
  const { id } = useParams();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトのキャンセル
    e.preventDefault();

    // カテゴリーの作成
    await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    alert("カテゴリーを更新しました。");
  };

  const handleDeletePost = async () => {
    if (!confirm("カテゴリーを削除しますか？")) return;

    await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });

    alert("カテゴリーを削除しました。");

    router.push("/admin/categories");
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`);
      const { category } = await res.json();
      setName(category.name);
    };

    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="max-w-3xl mx-10">
      <h1 className="font-medium text-xl my-6 text-gray-700 text-left ">
        カテゴリー編集
      </h1>
      <CategoryForm
        mode={"edit"}
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        onDelete={handleDeletePost}
      />
    </div>
  );
}
