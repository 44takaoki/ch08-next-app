import { Category } from "@/app/_types/Category";
import React from "react";
import { CategoriesSelect } from "./CategoriesSelect";

interface Props {
  mode: "new" | "edit";
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (thumbnailUrl: string) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  isSubmit: boolean;
}

export const PostForm = ({
  mode,
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  categories,
  setCategories,
  onSubmit,
  onDelete,
  isSubmit,
}: Props) => {
  return (
    <form className="mt-4 w-full ">
      <div className="">
        <label className="w-40  text-gray-700 text-left" htmlFor="title">
          タイトル
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="my-2 w-full border border-gray-300 rounded p-3"
          disabled={isSubmit}
        />
      </div>

      <div className="">
        <label className="w-40  text-gray-700 text-left" htmlFor="content">
          内容
        </label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          className="my-2 w-full border border-gray-300 rounded p-3"
          disabled={isSubmit}
        />
      </div>

      <div className="">
        <label className="w-40  text-gray-700 text-left" htmlFor="thumbnailUrl">
          サムネイルURL
        </label>
        <input
          id="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          type="text"
          className="my-2 w-full border border-gray-300 rounded p-3"
          disabled={isSubmit}
        />
      </div>

      <div className="">
        <label className="w-40  text-gray-700 text-left" htmlFor="categories">
          カテゴリー
        </label>
        <CategoriesSelect
          selectedCategories={categories}
          setSelectedCategories={setCategories}
        />
      </div>
      <div className="my-3">
        <button
          onClick={onSubmit}
          className="bg-emerald-600 px-3 py-2 text-white rounded"
          disabled={isSubmit}
        >
          {mode === "new" ? "作成" : "更新"}
        </button>
        {mode === "edit" && (
          <button
            onClick={onDelete}
            className="bg-rose-600 mx-3 px-3 py-2 text-white rounded"
            disabled={isSubmit}
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
};
