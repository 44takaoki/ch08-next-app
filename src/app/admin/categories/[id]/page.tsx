"use client";

import React, { use, useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { CategoryForm } from "../_components/CategoryForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import useSWR from "swr";
import { Category } from "@/app/_types/Category";
import { useFetch } from "../../_hooks/useFetch";

export default function page() {
  const [name, setName] = useState("");
  const { id } = useParams();
  const router = useRouter();
  const [isSubmit, setSubmit] = useState(false);
  const { token } = useSupabaseSession();

  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトのキャンセル
    e.preventDefault();

    setSubmit(true);

    try {
      // 強制的に失敗させる
      // throw new Error("テスト用エラー");
      // カテゴリーの作成
      await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!, //Headerにtokenを付与
        },
        body: JSON.stringify({ name }),
      });

      alert("カテゴリーを更新しました。");
    } catch (err) {
      alert("送信に失敗しました。");
    } finally {
      setSubmit(false);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm("カテゴリーを削除しますか？")) return;

    setSubmit(true);
    try {
      await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      alert("カテゴリーを削除しました。");
      router.push("/admin/categories");
    } catch (err) {
      alert("カテゴリー削除に失敗しました。");
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
  //   return data.category as Category; // APIのレスポンスから category を返す
  // };

  // // useSWRでデータ取得
  // const {
  //   data: category,
  //   error,
  //   isLoading,
  // } = useSWR(token && id ? `/api/admin/categories/${id}` : null, fetcher);

  // カスタムフック useFetchに置き換え
  const { data, error, isLoading } = useFetch<{ category: Category }>(
    `/api/admin/categories/${id}`
  );

  // 追加: データ取得後にstateを更新
  useEffect(() => {
    if (data) {
      setName(data.category.name);
    }
  }, [data]);

  if (isLoading) return <p className="text-left">読み込み中…</p>;
  if (error)
    return <p className="text-left">エラーが発生しました: {error.message}</p>;

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
        isSubmit={isSubmit}
      />
    </div>
  );
}
