"use server";

import { campaignService } from "@/services/campaign.service";
import { ActionCampaignResponse } from "@/types/campaign.interface";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
    CreateCampaignSchema,
    UpdateCampaignSchema
} from "../schemas/campaign";

export async function CreateCampaignAction(
    _: unknown,
    formData: FormData
): Promise<ActionCampaignResponse> {
    const raw = Object.fromEntries(formData.entries());

    const parsed = CreateCampaignSchema.safeParse(raw);

    if (!parsed.success) {
        return {
            success: false,
            message: "Please, fix the erros in the form.",
            errors: parsed.error.flatten().fieldErrors,
            inputs: parsed.data
        };
    }
    try {
        await campaignService.createCampaign(parsed.data);

        revalidateTag("campaigns");

        revalidatePath("/");
        revalidatePath("/campaigns");

        return {
            success: true,
            message: "Campanha criada com sucesso!"
        };
    } catch {
        return {
            success: false,
            message:
                "Ocorreu um erro ao criar a campanha. Tente novamente mais tarde.",
            inputs: raw as Record<string, string>
        };
    }
}

export async function deleteCampaignAction(formData: FormData): Promise<void> {
    console.log(formData);
    const id = formData.get("id")?.toString() ?? "";
    await campaignService.deleteCampaign(id);

    revalidateTag("campaigns");
    revalidateTag(`campaign:${id}`);

    revalidatePath("/", "layout");
    revalidatePath("/campaigns");
    revalidatePath(`/campaigns/${id}`);

    redirect("/");
}

export default async function UpdateCampaignAction(
    _: unknown,
    formData: FormData
): Promise<ActionCampaignResponse> {
    const raw = Object.fromEntries(formData.entries());
    const parsed = UpdateCampaignSchema.safeParse(raw);

    if (!parsed.success) {
        const { fieldErrors } = parsed.error.flatten();

        const idError = fieldErrors.id?.[0];

        delete fieldErrors.id;

        return {
            success: false,
            message: idError
                ? "This campaign does not exist or is not yours. : "
                : "Please, fix the erros in the form.",
            errors: fieldErrors,
            inputs: parsed.data
        };
    }
    try {
        await campaignService.updateCampaign(parsed.data.id, parsed.data);

        revalidateTag("campaigns");
        revalidateTag(`campaigns/${parsed.data.id}`);

        revalidatePath("/campaigns");
        revalidatePath(`/campaigns/${parsed.data.id}`);

        return {
            success: true,
            message: "Campaign updated successfully!"
        };
    } catch {
        return {
            success: false,
            message:
                "An error occurred while updating the campaign. Please try again later.",
            inputs: raw as Record<string, string>
        };
    }
}

