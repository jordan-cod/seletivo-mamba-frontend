export const revalidate = 5;

import { categoryService } from "@/services/categories.service";
import { Category } from "@/types/category.interface";
import Link from "next/link";
import CategoryItem from "@/components/categories/category";
import ModalCreate from "@/components/categories/create-modal";

export default async function CategoriesPage(): Promise<React.ReactNode> {
    const categories: Category[] = await categoryService.getCategories({
        page: 1,
        size: 10
    });

    return (
        <div className="container mx-auto px-6 py-8 space-y-6">
            <header className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                <div className="flex justify-start">
                    <Link
                        prefetch={false}
                        href="/"
                        className="inline-flex items-center text-sm text-blue-600 hover:underline"
                    >
                        ← Back to dashboard
                    </Link>
                </div>

                <h1 className="text-2xl text-left sm:text-center sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                    Categories
                </h1>

                <div className="flex justify-end">
                    <ModalCreate />
                </div>

                <div className="flex items-center gap-4">
                    {categories.map((category) => {
                        return (
                            <CategoryItem
                                category={category}
                                key={category.id}
                            />
                        );
                    })}
                </div>
            </header>
        </div>
    );
}

