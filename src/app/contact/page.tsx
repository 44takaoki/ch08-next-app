"use client";

import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function Contact() {
  const [isSubmit, setSubmit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState<FormErrors>({});

  // フォームの更新
  const handleUpdate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // フォームのリセット
  const handleReset = (e?: MouseEvent) => {
    setForm({ name: "", email: "", message: "" });
  };

  // バリデーション
  const valid = () => {
    let isValid = true;
    const errors: FormErrors = {};

    if (!form.name) {
      errors.name = "お名前は必須です。";
      isValid = false;
    } else if (form.name.length > 30) {
      errors.name = "お名前は30文字以内で入力してください。";
      isValid = false;
    }

    if (!form.email) {
      errors.email = "メールアドレスは必須です。";
      isValid = false;
    } else if (!form.email.match(/.+@.+\..+/)) {
      errors.email = "メールアドレスの形式が正しくありません。";
      isValid = false;
    }

    if (!form.message) {
      errors.message = "本文は必須です。";
      isValid = false;
    } else if (form.message.length > 500) {
      errors.message = "本文は500文字以内で入力してください。";
      isValid = false;
    }

    setErrorMessage(errors);

    return isValid;
  };

  // フォームの送信
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //デフォルトの機能、ページのリロードを防ぐ
    if (!valid()) return; //isVaid = falseのとき、処理を中断
    setSubmit(true); //isSubmit = trueのとき、入力の無効化
    try {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      console.log("送信成功:", data);

      alert("送信しました");

      setSubmit(false); //isSubmit = falseに戻し、入力の有効化
      handleReset();
    } catch (error) {
      // エラーのハンドリング
      alert("データの送信に失敗しました。");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-medium text-xl my-10 text-gray-700 text-left ">
        お問い合わせフォーム
      </h1>
      <form className="mt-6 w-full " onSubmit={handleSubmit}>
        <div className="flex my-7 items-center ">
          <label className="w-40  text-gray-700 text-left" htmlFor="name">
            お名前
          </label>
          <div className="w-full">
            <input
              id="name"
              name="name"
              type="text"
              className="w-full border border-gray-300 rounded p-3"
              onChange={handleUpdate}
              value={form.name}
              disabled={isSubmit}
            />

            {errorMessage.name && (
              <p className="text-red-700 text-left"> {errorMessage.name}</p>
            )}
          </div>
        </div>

        <div className="flex my-7 items-center ">
          <label className="w-40  text-gray-700 text-left" htmlFor="email">
            メールアドレス
          </label>
          <div className="w-full">
            <input
              className="w-full border border-gray-300 rounded p-3"
              type="email"
              id="email"
              name="email"
              onChange={handleUpdate}
              value={form.email}
              disabled={isSubmit}
            />
            {errorMessage.email && (
              <p className="text-red-700 text-left"> {errorMessage.email}</p>
            )}
          </div>
        </div>
        <div className="flex my-7 items-center ">
          <label className="w-40  text-gray-700 text-left" htmlFor="message">
            本文
          </label>
          <div className="w-full">
            <textarea
              className="w-full border border-gray-300 rounded h-72 p-3"
              id="message"
              name="message"
              onChange={handleUpdate}
              value={form.message}
              disabled={isSubmit}
            ></textarea>
            {errorMessage.message && (
              <p className="text-red-700 text-left"> {errorMessage.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            className="bg-slate-600 px-6 py-3 text-white rounded"
            type="submit"
            disabled={isSubmit}
            // onClick={handleSubmit}
          >
            送信
          </button>
          <button
            className="bg-slate-200 px-6 py-3 rounded"
            type="button"
            disabled={isSubmit}
            onClick={handleReset}
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
}
