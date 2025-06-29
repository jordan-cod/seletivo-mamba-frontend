"use client";

import UpdateCampaignAction from "@/actions/campaigns.actions";
import CreateCampaignForm from "@/components/campaign/forms/form";
import Button from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { Campaign } from "@/types/campaign.interface";
import { useRouter } from "next/navigation";
import React, { Suspense, useRef } from "react";

export default function UpdateCampaign({
    campaign
}: {
    campaign: Campaign;
}): React.ReactNode {
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
                        initialInputs={{
                            id: campaign.id,
                            name: campaign.name,
                            status: campaign.status,
                            category_id: campaign.category?.id,
                            start_date: campaign.start_date.slice(0, 10),
                            end_date: campaign.end_date
                                ? campaign.end_date.slice(0, 10)
                                : ""
                        }}
                        formRef={formRef}
                        action={UpdateCampaignAction}
                    />
                </Suspense>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={router.back} variant="secondary">
                    Cancel
                </Button>
                <Button onClick={handleCreateClick}>Update Campaign</Button>
            </Modal.Footer>
        </Modal.Root>
    );
}

