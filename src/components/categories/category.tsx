import { deleteCategoryAction } from "@/actions/category.actions";
import { Category } from "@/types/category.interface";
import { BsTrash2 } from "react-icons/bs";
import ModalUpdate from "./update-modal";

export default function CategoryItem({
    category
}: {
    category: Category;
}): React.ReactNode {
    return (
        <div
            className="flex items-center justify-between px-4 py-2 gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow"
            aria-label={`Category: ${category.name}`}
            tabIndex={0}
        >
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {category.name}
            </span>

            <div className="flex items-center gap-2">
                <ModalUpdate category={category} />

                <form action={deleteCategoryAction}>
                    <input type="hidden" name="id" value={category.id} />
                    <button
                        type="submit"
                        aria-label={`Delete category ${category.name}`}
                        className="group text-red-600 hover:text-red-800 transition-colors hover:cursor-pointer p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                    >
                        <BsTrash2
                            size={16}
                            className="group-hover:text-white transition-colors"
                        />
                    </button>
                </form>
            </div>
        </div>
    );
}

