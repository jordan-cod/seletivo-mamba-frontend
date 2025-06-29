"use client";

import React, { useActionState, useEffect } from "react";

type CategoryFormProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (_: unknown, formData: FormData) => Promise<any>;
    initialInputs?: {
        id?: string;
        name?: string;
    };
    formRef?: React.Ref<HTMLFormElement>;
    onPendingChange?: (pending: boolean) => void;
    onSuccess?: () => void;
};

export default function CategoryForm({
    formRef,
    action,
    initialInputs,
    onPendingChange,
    onSuccess
}: CategoryFormProps) {
    const [state, handleCreateCategory, isPending] = useActionState(action, {
        id: initialInputs?.id ?? "",
        name: initialInputs?.name ?? ""
    });

    useEffect(() => {
        onPendingChange?.(isPending);
    }, [isPending, onPendingChange]);

    useEffect(() => {
        if (state?.success) {
            onSuccess?.();
        }
    }, [state, onSuccess]);

    return (
        <form
            ref={formRef}
            action={handleCreateCategory}
            className="max-w-md mx-auto p-6 rounded-md space-y-6"
        >
            {initialInputs?.id && (
                <input type="hidden" name="id" value={initialInputs.id} />
            )}
            <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 font-semibold">
                    Category Name
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
                    placeholder="Enter category name"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {!state?.success && state?.errors?.name && (
                    <p className="text-red-600 text-sm mt-1">
                        {state.errors.name[0]}
                    </p>
                )}
            </div>
        </form>
    );
}

