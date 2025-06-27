import { categoryService } from "@/services/categories.service";
import { Category } from "@/types/category.interface";
import { redirect } from "next/navigation";

export default function CategoryItem({
    category
}: {
    category: Category;
}): React.ReactNode {
    async function handleDeleteCategory(): Promise<void> {
        "use server";
        await categoryService.deleteCategory(category.id);
        redirect("/categories");
    }

    return (
        <div
            className="
                inline-flex
                px-4 py-1
                items-center
                gap-8
                rounded-full
                bg-zinc-200 dark:bg-zinc-700
                text-zinc-800 dark:text-zinc-200
                font-semibold
                shadow-sm
                select-none
                cursor-default
                transition-colors
                hover:bg-zinc-300 dark:hover:bg-zinc-600
                text-nowrap
            "
            aria-label={`Category: ${category.name}`}
            tabIndex={0}
        >
            {category.name}

            <div className="flex gap-3">
                <button
                    type="button"
                    aria-label={`Edit category ${category.name}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                    edit
                </button>

                <form action={handleDeleteCategory}>
                    <button
                        type="submit"
                        aria-label={`Delete category ${category.name}`}
                        className="text-red-600 hover:text-red-800 transition-colors"
                    >
                        delete
                    </button>
                </form>
            </div>
        </div>
    );
}
