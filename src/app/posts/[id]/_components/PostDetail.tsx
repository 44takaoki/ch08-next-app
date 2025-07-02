"use client";

import Image from "next/image";
import { MicroCmsPost } from "@/app/_types/MicroCmsPost";

type PostDetailProps = {
  post: MicroCmsPost;
};

export default function PostDetail({ post }: PostDetailProps) {
  const formatDate = (date: MicroCmsPost) => {
    // 日時をyyyy/MM/DD形式にフォーマット
    const yeardate = new Date(date.createdAt).toLocaleString().split(" ", 1);
    return yeardate;
  };

  // const post = posts.find((item) => item.id === Number(id));

  if (!post) return <p className="text-left">投稿が見つかりませんでした</p>;

  return (
    <ul className="max-w-[800px] grid grid-cols-1 gap-2 mx-auto mt-6 ">
      <li key={post.id} className="h-auto m-5 p-3  ">
        <div>
          <Image
            height={400}
            width={800}
            src={post.thumbnail.url}
            alt={post.id}
          />
        </div>
        <div className="flex justify-between mx-auto m-3 ">
          <p className="m-2 text-gray-400">{formatDate(post)}</p>
          <div className="flex space-x-2 ">
            {post.categories?.map((category, index) => (
              <p
                key={index}
                className="p-1 text-blue-500 border border-blue-300 rounded-md "
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
        <p className="m-2 text-xl text-gray-500 text-left">{post.title}</p>
        <div>
          <div
            className="m-2 w-2/3  text-gray-500 text-left "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </li>
    </ul>
  );
}
