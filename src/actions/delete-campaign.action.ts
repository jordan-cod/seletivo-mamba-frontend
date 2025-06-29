"use server";

import { campaignService } from "@/services/campaign.service";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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

