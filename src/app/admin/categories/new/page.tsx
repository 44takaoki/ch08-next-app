"use client";

import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { CategoryForm } from "../_components/CategoryForm";

export default function page() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [isSubmit, setSubmit] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトのキャンセル
    e.preventDefault();

    setSubmit(true);
    // カテゴリーの作成
    try {
      const res = await fetch(`/api/admin/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      // レスポンスから作成したカテゴリーIDを取得
      const { id } = await res.json();

      // 作成したカテゴリーの詳細ページに遷移
      router.push(`/admin/categories/${id}`);

      alert("カテゴリーを作成しました。");

      setSubmit(false);
    } catch (err) {
      alert("送信に失敗しました。");
    }
  };

  return (
    <div className="max-w-3xl mx-10">
      <h1 className="font-medium text-xl my-6 text-gray-700 text-left ">
        カテゴリー作成
      </h1>

      <CategoryForm
        mode={"new"}
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        isSubmit={isSubmit}
      />
    </div>
  );
}
