"use client";

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `http://localhost:3000/login`,
  //     },
  //   });
  //   if (error) {
  //     alert("登録に失敗しました");
  //   } else {
  //     setEmail("");
  //     setPassword("");
  //     alert("確認メールを送信しました。");
  //   }
  // };

  interface LoginForm {
    email: string;
    password: string;
  }

  const onSubmit = async (data: LoginForm) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert("登録に失敗しました");
    } else {
      router.replace("/admin/posts");
    }
  };

  return (
    <div className="flex justify-center pt-[240px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
      space-y-4 w-full max-w-[400px]"
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 "
            placeholder="name@company.com"
            {...register("email", { required: "emailは必須です" })}
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 "
            {...register("password", {
              required: "passwordは必須です",
              minLength: {
                value: 6,
                message: "６文字以上で入力してください。",
              },
            })}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full text-white bg-sky-500 hover:bg-blue-700 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
}
