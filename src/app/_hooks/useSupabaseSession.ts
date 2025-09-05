import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

export const useSupabaseSession = () => {
  // undefind: ログイン状態ログイン中 null: ログインしていない　Session: ログインしている
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setToken(session?.access_token || null);
      setIsLoading(false);
    };

    fetcher();

    // セッション状態の変更をリアルタイムで監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setToken(session?.access_token || null);
      setIsLoading(false);
    });

    // クリーンアップ
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, isLoading, token };
};
