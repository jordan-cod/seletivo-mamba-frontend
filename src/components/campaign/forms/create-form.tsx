import { registerCampaign } from "@/app/actions";
import Spinner from "@/components/shared/spinner";
import React, { forwardRef, useActionState, useImperativeHandle } from "react";

export type CampaignFormHandle = {
    isPending: boolean;
};

type CampaignFormProps = {
    formRef?: React.Ref<HTMLFormElement>;
};

const CreateCampaignForm = forwardRef<CampaignFormHandle, CampaignFormProps>(
    ({ formRef }, ref) => {
        const [result, handleCreateCampaign, isPending] = useActionState(
            registerCampaign,
            null
        );

        useImperativeHandle(
            ref,
            () => ({
                isPending
            }),
            [isPending]
        );

        return (
            <form
                action={handleCreateCampaign}
                ref={formRef}
                className="max-w-md mx-auto p-6  rounded-md space-y-6"
            >
                {isPending && (
                    <div className="flex items-center justify-center mb-4">
                        <Spinner />
                    </div>
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
                        type="text"
                        placeholder="Enter campaign name"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {result?.error?.name && (
                        <p className="text-red-600 text-sm mt-1">
                            {result.error.name[0]}
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
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                        <option value="expired">Expired</option>
                    </select>
                    {result?.error?.status && (
                        <p className="text-red-600 text-sm mt-1">
                            {result.error.status[0]}
                        </p>
                    )}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="startDate" className="mb-1 font-semibold ">
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        name="startDate"
                        required
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {result?.error?.startDate && (
                        <p className="text-red-600 text-sm mt-1">
                            {result.error.startDate[0]}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="endDate" className="mb-1 font-semibold ">
                        End Date
                    </label>
                    <input
                        id="endDate"
                        name="endDate"
                        required
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {result?.error?.endDate && (
                        <p className="text-red-600 text-sm mt-1">
                            {result.error.endDate[0]}
                        </p>
                    )}
                </div>
                {result?.success && (
                    <p className="text-green-600 text-sm mt-2">
                        Campaign created successfully!
                    </p>
                )}
            </form>
        );
    }
);

CreateCampaignForm.displayName = "CreateCampaignForm";
export default CreateCampaignForm;
