"use client";

import { CreateCategoryAction } from "@/actions/category.actions";
import Button from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { useRef, useState } from "react";
import CategoryForm from "./form";

export default function ModalCreate() {
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
            <Button onClick={() => setIsOpen(true)}>+ New Category</Button>
            <Modal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header title="Create Category" />
                <Modal.Body>
                    <CategoryForm
                        formRef={formRef}
                        action={CreateCategoryAction}
                        onPendingChange={(pending) => {
                            setIsPending(pending);
                        }}
                        onSuccess={() => setIsOpen(false)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setIsOpen(false)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleCreateClick} disabled={isPending}>
                        {isPending ? "Creating..." : "Create Category"}
                    </Button>
                </Modal.Footer>
            </Modal.Root>
        </>
    );
}

