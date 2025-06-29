"use server";

import { BACKEND_BASE_URL } from "@/config/constants";
import { ActionCampaignResponse } from "@/types/campaign.interface";
import { revalidatePath, revalidateTag } from "next/cache";
import { UpdateCampaignSchema } from "../schemas/campaign";

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
        const response = await fetch(
            `${BACKEND_BASE_URL}/campaigns/${parsed.data.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(parsed.data)
            }
        );

        if (!response.ok) {
            throw new Error(
                response.statusText || "Erro ao atualizar a campanha."
            );
        }

        revalidateTag("campaigns");
        revalidateTag(`campaigns/${parsed.data.id}`);

        revalidatePath("/campaigns");
        revalidatePath(`/campaigns/${parsed.data.id}`);
        revalidatePath("/campaigns/[id]", "page");

        revalidatePath("/", "layout");

        return {
            success: true,
            message: "Campanha atualizada com sucesso!"
        };
    } catch {
        return {
            success: false,
            message:
                "Ocorreu um erro ao atualizar a campanha. Tente novamente mais tarde.",
            inputs: raw as Record<string, string>
        };
    }
}

