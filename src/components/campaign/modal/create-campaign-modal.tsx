"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../../shared/button";
import { Modal } from "../../shared/modal";
import CreateCampaignForm from "../forms/create-form";

export default function CreateCampaignAction() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);

    function handleCreateClick(): void {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }

    useEffect(() => {
        if (!formRef.current) return;
        setIsPending(formRef.current.isPending);
        console.log("Form isPending:", formRef.current.isPending);
    }, [formRef.current?.isPending]);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>+ New Campaign</Button>
            <Modal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header title="Create Campaign" />
                <Modal.Body>
                    <CreateCampaignForm formRef={formRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setIsOpen(false)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleCreateClick} disabled={isPending}>
                        {isPending ? "Creating..." : "Create Campaign"}
                    </Button>
                </Modal.Footer>
            </Modal.Root>
        </>
    );
}
