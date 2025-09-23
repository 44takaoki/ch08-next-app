import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Category } from "@/app/_types/Category";
import React from "react";
import useSWR from "swr";

export const useFetch = <T>(key: string) => {
  const { token } = useSupabaseSession();
  const fetcher = async (key: string) => {
    const res = await fetch(key, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token!, //Headerにtokenを付与
      },
    });
    if (!res.ok) throw new Error("データの取得に失敗しました");
    const data = await res.json();
    return data as T;
  };

  // useSWRでデータ取得
  const { data, error, isLoading } = useSWR(token ? key : null, fetcher);

  return { data, error, isLoading };
};
