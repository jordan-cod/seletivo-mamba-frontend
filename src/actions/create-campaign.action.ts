"use server";

import { campaignService } from "@/services/campaign.service";
import { ActionCampaignResponse } from "@/types/campaign.interface";
import { revalidatePath, revalidateTag } from "next/cache";
import { CreateCampaignSchema } from "../schemas/campaign";

export default async function CreateCampaignAction(
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

