import CampaignList from "@/components/campaign/campaign-list";
import CreateCampaignAction from "@/components/campaign/modal/create-campaign-modal";
import { campaignService } from "@/services/campaign.service";
import { Campaign } from "@/types/campaign.interface";
import Link from "next/link";

export default async function CampaignsPage(): Promise<React.ReactNode> {
    const campaigns: Campaign[] = await campaignService.getCampaigns();

    return (
        <div className="container mx-auto px-6 py-8 space-y-6">
            <header className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                <div className="flex justify-start">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-blue-600 hover:underline"
                    >
                        ← Back to dashboard
                    </Link>
                </div>

                <h1 className="text-2xl text-center sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                    Campaigns
                </h1>

                <div className="flex justify-end">
                    <CreateCampaignAction />
                </div>
            </header>

            <CampaignList campaings={campaigns} />
        </div>
    );
}
