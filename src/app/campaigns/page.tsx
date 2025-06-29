export const revalidate = 5;

import CampaignList from "@/components/campaign/campaign-list";
import Button from "@/components/shared/button";
import { campaignService } from "@/services/campaign.service";
import Link from "next/link";

export default async function CampaignsPage(): Promise<React.ReactNode> {
    const { data } = await campaignService.getCampaigns({
        page: 1,
        size: 10
    });

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

                <h1 className="text-2xl text-left sm:text-center sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                    Campaigns
                </h1>

                <div className="flex justify-end">
                    <Link href="/campaigns/new">
                        <Button className="w-full sm:w-auto">
                            + New Campaign
                        </Button>
                    </Link>
                </div>
            </header>

            <CampaignList campaigns={data} />
        </div>
    );
}

