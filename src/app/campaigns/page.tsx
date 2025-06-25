import CampaignList from "@/components/campaign-list";
import { campaignService } from "@/services/campaign.service";
import { Campaign } from "@/types/campaign.interface";
import Link from "next/link";

export default async function CampaignsPage(): Promise<React.ReactNode> {
    const campaigns: Campaign[] = await campaignService.getCampaigns();

    return (
        <div className="container mx-auto px-6 py-8 space-y-6">
            <header className="flex items-center justify-between">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-blue-600 hover:underline"
                >
                    ← Back to dashboard
                </Link>
                <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                    Campaigns
                </h1>
                <Link
                    href="/campaigns/new"
                    className="inline-block px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    + New Campaign
                </Link>
            </header>

            <CampaignList campaings={campaigns} />
        </div>
    );
}
