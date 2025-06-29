"use server";

import { campaignService } from "@/services/campaign.service";
import { categoryService } from "@/services/categories.service";
import { ActionCampaignResponse } from "@/types/campaign.interface";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
    CreateCampaignSchema,
    UpdateCampaignSchema
} from "../schemas/campaign";

export async function CreateCategoryAction(
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

        revalidateTag("categories");

        revalidatePath("/");
        revalidatePath("/categories");

        return {
            success: true,
            message: "Category created successfully!"
        };
    } catch {
        return {
            success: false,
            message:
                "An error occurred while creating the category. Please try again later.",
            inputs: raw as Record<string, string>
        };
    }
}

export async function deleteCategoryAction(formData: FormData): Promise<void> {
    console.log(formData);
    const id = formData.get("id")?.toString() ?? "";
    await categoryService.deleteCategory(id);

    revalidateTag("categories");
    revalidatePath("/categories");

    redirect("/");
}

export async function UpdateCategoryAction(
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
                ? "This category does not exist or is not yours. : "
                : "Please, fix the erros in the form.",
            errors: fieldErrors,
            inputs: parsed.data
        };
    }
    try {
        await categoryService.updateCategory(parsed.data.id, parsed.data);

        revalidateTag("categories");
        revalidatePath("/categories");

        return {
            success: true,
            message: "Category updated successfully!"
        };
    } catch {
        return {
            success: false,
            message:
                "An error occurred while updating the category. Please try again later.",
            inputs: raw as Record<string, string>
        };
    }
}

