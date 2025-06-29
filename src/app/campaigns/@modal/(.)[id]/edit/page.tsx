import { campaignService } from "@/services/campaign.service";
import UpdateCampaign from "./update-campaign";

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}): Promise<React.ReactNode> {
    const { id } = await params;

    const campaign = await campaignService.getCampaign(id);

    if (!campaign) {
        return <div>Campaign not found.</div>;
    }

    return (
        <>
            <UpdateCampaign campaign={campaign} />
        </>
    );
}

