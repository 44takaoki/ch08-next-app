import { Category } from "@/app/_types/Category";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

interface Props {
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
}

export const CategoriesSelect = ({
  selectedCategories,
  setSelectedCategories,
}: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  // const handleChange = (value: number[]) => {
  //   value.forEach((v: number) => {
  //     const isSelect = selectedCategories.some((c) => c.id === v);
  //     if (isSelect) {
  //       setSelectedCategories(selectedCategories.filter((c) => c.id !== v));
  //       return;
  //     }

  //     const category = categories.find((c) => c.id === v);

  //     if (!category) return;
  //     setSelectedCategories([...selectedCategories, category]);
  //   });
  // };

  // const removeCategory = (id: number) => {
  //   setSelectedCategories(selectedCategories.filter((c) => c.id !== id));
  // };

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/categories");
      const { categories } = await res.json();
      setCategories(categories);
    };

    fetcher();
  }, []);

  return (
    <div>
      <Listbox
        value={selectedCategories}
        onChange={setSelectedCategories}
        multiple
        by="id"
      >
        <ListboxButton
          id="categories"
          className="my-2 w-full border border-gray-300 rounded p-3 text-left"
        >
          {selectedCategories.length > 0 ? (
            <div className="flex ">
              {selectedCategories.map((c) => (
                <p
                  key={c.id}
                  className="border border-gray-300 bg-slate-200 rounded px-2 mx-1"
                >
                  {c.name}
                </p>
              ))}
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400 right-0" />
            </div>
          ) : (
            <span className="text-slate-400">カテゴリを選択...</span>
          )}
        </ListboxButton>
        <ListboxOptions className="absolute mt-1 max-h-60 w-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {categories.map((category) => (
            <ListboxOption
              key={category.id}
              value={category}
              className="data-[focus]:bg-slate-50 cursor-pointer  px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span>{category.name}</span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
