"use client";

import { CreateCampaignAction } from "@/actions/campaigns.actions";
import CreateCampaignForm from "@/components/campaign/forms/form";
import Button from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { useRouter } from "next/navigation";
import { Suspense, useRef } from "react";

export default function Page() {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    function handleCreateClick(): void {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    }
    return (
        <Modal.Root isOpen={true} onClose={router.back}>
            <Modal.Header title="Create Campaign" />
            <Modal.Body>
                <Suspense fallback={<div>Loading...</div>}>
                    <CreateCampaignForm
                        formRef={formRef}
                        action={CreateCampaignAction}
                    />
                </Suspense>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={router.back} variant="secondary">
                    Cancel
                </Button>
                <Button onClick={handleCreateClick}>Create Campaign</Button>
            </Modal.Footer>
        </Modal.Root>
    );
}

