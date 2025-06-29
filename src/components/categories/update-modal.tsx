"use client";

import { UpdateCategoryAction } from "@/actions/category.actions";
import Button from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { Category } from "@/types/category.interface";
import { Suspense, useRef, useState } from "react";
import { BiPencil } from "react-icons/bi";
import CategoryForm from "./form";

export default function ModalUpdate({ category }: { category: Category }) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleCreateClick(): void {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="group text-blue-600 hover:text-blue-800 transition-colors hover:cursor-pointer p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
            >
                <BiPencil
                    size={16}
                    className="group-hover:text-white transition-colors"
                />
            </button>
            <Modal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header title="Update Category" />
                <Modal.Body>
                    <Suspense fallback={<div>Loading...</div>}>
                        <CategoryForm
                            formRef={formRef}
                            action={UpdateCategoryAction}
                            onPendingChange={(pending) => {
                                setIsPending(pending);
                            }}
                            onSuccess={() => setIsOpen(false)}
                            initialInputs={category}
                        />
                    </Suspense>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setIsOpen(false)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleCreateClick} disabled={isPending}>
                        {isPending ? "Updating..." : "Update Category"}
                    </Button>
                </Modal.Footer>
            </Modal.Root>
        </>
    );
}

