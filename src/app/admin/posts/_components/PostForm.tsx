import { Category } from "@/app/_types/Category";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CategoriesSelect } from "./CategoriesSelect";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";
import Image from "next/image";

interface Props {
  mode: "new" | "edit";
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailImageKey: string;
  setThumbnailImageKey: (thumbnailImageKey: string) => void;
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
  thumbnailImageKey,
  setThumbnailImageKey,
  categories,
  setCategories,
  onSubmit,
  onDelete,
  isSubmit,
}: Props) => {
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return;
    }

    const file = event.target.files[0]; //選択された画像を取得

    const filePath = `private/${uuidv4()}`; //ファイルパスを指定

    //Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from("post_thumbnail") //ここでバケット名を指定
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    // アップロードに失敗したらエラーを表示して終了
    if (error) {
      alert(error.message);
      return;
    }

    // data.pathに画像固有のkeyが入っているので、thumbnailImageKeyに格納する
    setThumbnailImageKey(data.path);
  };

  // DBに保存しているthumnailImageKeyを元に、Supabaseから画像のURLを取得する
  useEffect(() => {
    if (!thumbnailImageKey || thumbnailImageKey.trim() === "") return;

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(thumbnailImageKey);

      setThumbnailImageUrl(publicUrl);
    };

    fetcher();
  }, [thumbnailImageKey]);

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
        <label
          className="w-40  text-gray-700 text-left"
          htmlFor="thumbnailImageKey"
        >
          サムネイルURL
        </label>
        <input
          id="thumbnailImageKey"
          onChange={handleImageChange}
          type="file"
          className="my-2 w-full border border-gray-300 rounded p-3"
        />
        {/* 画像の表示 */}

        {thumbnailImageUrl && (
          <div className="mt-2">
            <Image
              src={thumbnailImageUrl}
              alt="thumbnail"
              width={400}
              height={400}
            />
          </div>
        )}
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
