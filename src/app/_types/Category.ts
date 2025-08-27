export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// カテゴリーの更新時に送られてくるリクエストのbodyの型
export interface UpdateCategoryRequestBody {
  name: string;
}

// カテゴリー作成のリクエストボディの型
export interface CreateCategoryRequestBody {
  name: string;
}
