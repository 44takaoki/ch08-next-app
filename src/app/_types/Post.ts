import { Category } from "./Category";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  postCategories: { category: Category }[];
  thumbnailUrl: string;
}

// 記事の更新に送られてくるリクエストのbodyの型
export interface UpdatePostRequestBody {
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnailUrl: string;
}

// 記事作成のリクエストボディの型
export interface CreatePostRequestBody {
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnailUrl: string;
}
