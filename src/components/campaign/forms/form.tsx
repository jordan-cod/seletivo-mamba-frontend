import { BACKEND_BASE_URL } from "@/config/constants";
import { CampaignStatus } from "@/types/campaign.interface";
import { Category } from "@/types/category.interface";
import { useRouter } from "next/navigation";
import React, {
    forwardRef,
    useActionState,
    useEffect,
    useImperativeHandle,
    useState
} from "react";

export type CampaignFormHandle = {
    isPending: boolean;
};

type CampaignFormProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (_: unknown, formData: FormData) => Promise<any>;
    initialInputs?: {
        id?: string;
        name?: string;
        status?: CampaignStatus;
        category_id?: string;
        start_date?: string;
        end_date?: string;
    };
    formRef?: React.Ref<HTMLFormElement>;
};

const CreateCampaignForm = forwardRef<CampaignFormHandle, CampaignFormProps>(
    ({ formRef, action, initialInputs }, ref) => {
        const router = useRouter();

        const [state, handleCreateCampaign, isPending] = useActionState(
            action,
            {
                id: initialInputs?.id ?? "",
                name: initialInputs?.name ?? "",
                status: initialInputs?.status ?? CampaignStatus.Active,
                category_id: initialInputs?.category_id ?? "",
                start_date: initialInputs?.start_date ?? "",
                end_date: initialInputs?.end_date ?? ""
            }
        );

        const [categories, setCategories] = useState<Category[]>([]);
        const [loadingCategories, setLoadingCategories] = useState(false);
        const [categoriesError, setCategoriesError] = useState<string | null>(
            null
        );

        useImperativeHandle(
            ref,
            () => ({
                isPending
            }),
            [isPending]
        );

        useEffect(() => {
            if (state?.success) {
                router.back();
                router.refresh();
            }
        }, [state, router]);

        useEffect(() => {
            async function fetchCategories() {
                setLoadingCategories(true);
                setCategoriesError(null);
                try {
                    const res = await fetch(`${BACKEND_BASE_URL}/categories`);
                    if (!res.ok) throw new Error("Failed to fetch categories");
                    const categories: { data: Category[] } = await res.json();
                    setCategories(categories.data);
                } catch {
                    setCategoriesError("Error loading categories");
                } finally {
                    setLoadingCategories(false);
                }
            }
            fetchCategories();
        }, []);

        return (
            <form
                action={handleCreateCampaign}
                ref={formRef}
                className="max-w-md mx-auto p-6  rounded-md space-y-6"
            >
                {initialInputs?.id && (
                    <input type="hidden" name="id" value={initialInputs.id} />
                )}
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1 font-semibold ">
                        Campaign Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        required
                        minLength={3}
                        maxLength={100}
                        defaultValue={
                            state?.inputs?.name ?? initialInputs?.name ?? ""
                        }
                        type="text"
                        placeholder="Enter campaign name"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {!state?.success && state?.errors?.name && (
                        <p className="text-red-600 text-sm mt-1">
                            {state.errors.name[0]}
                        </p>
                    )}
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="status" className="mb-1 font-semibold ">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        defaultValue={
                            state?.inputs?.status ?? initialInputs?.status ?? ""
                        }
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-900"
                    >
                        {Object.values(CampaignStatus).map((status) => (
                            <option
                                key={status}
                                value={status}
                                className="capitalize"
                            >
                                {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                            </option>
                        ))}
                    </select>
                    {!state?.success && state?.errors?.status && (
                        <p className="text-red-600 text-sm mt-1">
                            {state.errors.status[0]}
                        </p>
                    )}
                </div>

                <div className="flex flex-col mb-4">
                    <label
                        htmlFor="category_id"
                        className="mb-1 font-semibold "
                    >
                        Category
                    </label>
                    {loadingCategories ? (
                        <p>Loading categories...</p>
                    ) : categoriesError ? (
                        <p className="text-red-600 text-sm">
                            {categoriesError}
                        </p>
                    ) : (
                        <select
                            id="category_id"
                            name="category_id"
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-900"
                            defaultValue={
                                state?.inputs?.category_id ??
                                initialInputs?.category_id ??
                                ""
                            }
                        >
                            <option value="" disabled>
                                Selecione uma categoria
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    )}
                    {!state?.success && state?.errors?.category && (
                        <p className="text-red-600 text-sm mt-1">
                            {state.errors.category[0]}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="start_date" className="mb-1 font-semibold ">
                        Start Date
                    </label>
                    <input
                        id="start_date"
                        name="start_date"
                        required
                        defaultValue={
                            state?.inputs?.start_date ??
                            initialInputs?.start_date ??
                            ""
                        }
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {!state?.success && state?.errors?.start_date && (
                        <p className="text-red-600 text-sm mt-1">
                            {state.errors.start_date[0]}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="end_date" className="mb-1 font-semibold ">
                        End Date
                    </label>
                    <input
                        id="end_date"
                        name="end_date"
                        required
                        defaultValue={
                            state?.inputs?.end_date ??
                            initialInputs?.end_date ??
                            ""
                        }
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {state && !state?.success && state?.errors?.end_date && (
                        <p className="text-red-600 text-sm mt-1">
                            {state.errors.end_date[0]}
                        </p>
                    )}
                </div>

                {isPending && (
                    <div className="flex items-center justify-center mb-4">
                        Enviando...
                    </div>
                )}
                {state && (
                    <p
                        className={`text-sm mt-2 ${
                            state.success ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {state.message}
                    </p>
                )}
            </form>
        );
    }
);

CreateCampaignForm.displayName = "CreateCampaignForm";
export default CreateCampaignForm;

