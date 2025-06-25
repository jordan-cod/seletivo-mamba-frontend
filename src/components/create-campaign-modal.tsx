"use client";

import { useState } from "react";
import { Modal } from "./shared/modal";
import Button from "./shared/button";

export default function CreateCampaignAction() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <Button onClick={() => setIsOpen(true)}>+ New Campaign</Button>
            <Modal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header title="Create Campaign" />
                <Modal.Body>
                    <p className="mb-4"> dasdasd</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setIsOpen(false)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => setIsOpen(false)}>Create</Button>
                </Modal.Footer>
            </Modal.Root>
        </>
    );
}

