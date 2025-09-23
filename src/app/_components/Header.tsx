"use client";

import { supabase } from "@/utils/supabase";
import Link from "next/link";
import React from "react";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";

export const Header: React.FC = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const { session, isLoading } = useSupabaseSession();

  return (
    <header className=" bg-slate-600 p-4 ">
      <div className="flex justify-between mx-auto container items-center">
        <Link href="/" className="header-link">
          <h1 className="text-2xl text-white font-semibold">Blog</h1>
        </Link>
        {!isLoading && (
          <div className="flex ">
            {session ? (
              <>
                <Link href="/admin" className="header-link">
                  <p className="text-base text-white mx-5">管理画面</p>
                </Link>
                <button onClick={handleLogout}>
                  <p className="text-base text-white">ログアウト</p>
                </button>
              </>
            ) : (
              <>
                <Link href="/contact" className="header-link">
                  <p className="text-base text-white mx-5 ">お問い合わせ</p>
                </Link>
                <Link
                  href="/login"
                  className="header-link 
                "
                >
                  <p className="text-base text-white">ログイン</p>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
