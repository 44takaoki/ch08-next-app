"use client";

import Link from "next/link";
// import { Link } from "react-router-dom";
import { Post } from "../_types/Post";

// propsの型宣言
type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  const formatDate = (date: Post) => {
    // 日時をyyyy/MM/DD形式にフォーマット
    const yeardate = new Date(date.createdAt).toLocaleString().split(" ", 1);
    return yeardate;
  };

  return (
    <ul className="max-w-4xl grid grid-cols-1 gap-2 mx-auto mt-6 ">
      {/* postに型付けしなくても、推論されるので不要 */}
      {posts.map((post) => (
        <li key={post.id} className="h-auto m-5 p-3 border border-slate-400 ">
          <Link href={`/posts/${post.id}`} className="header-link">
            <div className="flex justify-between mx-auto  ">
              <p className="text-gray-400 m-2">{formatDate(post)}</p>
              <div className="flex space-x-2 ">
                {post.categories.map((category, index) => (
                  <p
                    key={index}
                    className="p-1 text-blue-500 border border-blue-300 rounded-md "
                  >
                    {category}
                  </p>
                ))}
              </div>
            </div>
            <p className="text-xl m-2 text-gray-500 text-left">{post.title}</p>

            <div
              className="m-2 text-gray-500 line-clamp-2 text-left "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
