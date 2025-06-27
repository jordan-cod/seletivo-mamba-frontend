import CampaignList from "@/components/campaign/campaign-list";
import Card from "@/components/shared/card";
import { campaignService } from "@/services/campaign.service";
import { CampaignStatus } from "@/types/campaign.interface";
import Link from "next/link";

export default async function Home(): Promise<React.ReactNode> {
    // todo: update get campaings to use pagination
    const campaigns = await campaignService.getCampaigns({ page: 1, size: 6 });
    const countByStatus = (status: string) =>
        campaigns.filter((c) => c.status === status).length;

    return (
        <div className="container mx-auto p-6 space-y-8">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active", status: CampaignStatus.Active },
                    { label: "Paused", status: CampaignStatus.Paused },
                    { label: "Expired", status: CampaignStatus.Expired }
                ].map(({ label, status }) => {
                    return (
                        <Card label={label} status={status} key={status}>
                            {countByStatus(status)}
                        </Card>
                    );
                })}
            </section>

            <section className="space-y-4">
                <header className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                        Recent Campaigns
                    </h2>
                    <Link
                        href="/campaigns"
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        View all campaigns →
                    </Link>
                </header>

                <CampaignList campaings={campaigns} />
            </section>
        </div>
    );
}
