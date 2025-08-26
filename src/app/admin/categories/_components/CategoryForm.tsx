import React from "react";

interface Props {
  mode: "new" | "edit";
  name: string;
  setName: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  isSubmit: boolean;
}

export const CategoryForm = ({
  mode,
  name,
  setName,
  onSubmit,
  onDelete,
  isSubmit,
}: Props) => {
  return (
    <form className="max-w-3xl mx-10">
      <div className="">
        <label className="w-40  text-gray-700 text-left" htmlFor="title">
          カテゴリー名
        </label>
        <input
          type="text"
          id="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="my-2 w-full border border-gray-300 rounded p-3"
          disabled={isSubmit}
        />
      </div>
      <div className="my-3">
        <button
          className="bg-emerald-600 px-3 py-2 text-white rounded"
          onClick={onSubmit}
          disabled={isSubmit}
        >
          {mode === "new" ? "作成" : "更新"}
        </button>
        {mode === "edit" && (
          <button
            className="bg-rose-600 mx-3 px-3 py-2 text-white rounded"
            onClick={onDelete}
            disabled={isSubmit}
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
};
