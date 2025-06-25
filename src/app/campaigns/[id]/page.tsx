import { StatusBadge } from "@/components/shared/badge";
import { campaignService } from "@/services/campaign.service";
import { formatDate } from "@/utils/format";
import Link from "next/link";

export default async function CampaignPage({
    params
}: {
    params: { id: string };
}): Promise<React.ReactNode> {
    const campaign = await campaignService.getCampaign(params.id);

    return (
        <div className="container mx-auto px-6 py-8 space-y-6">
            <Link
                href="/campaigns"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
                ← Back to campaigns
            </Link>

            {!campaign ? (
                <div className="text-center text-zinc-500 dark:text-zinc-400 py-12">
                    Campaign not found.
                </div>
            ) : (
                <section className="space-y-4">
                    <header className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                            {campaign.name}
                        </h1>
                        <Link
                            href={`/campaigns/${campaign.id}/edit`}
                            className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Edit Campaign
                        </Link>
                    </header>

                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                        <StatusBadge status={campaign.status} />
                        <p>
                            <strong>Start date:</strong>
                            {formatDate(campaign.startDate)}
                        </p>
                        <p>
                            <strong>End date:</strong>
                            {formatDate(campaign.endDate)}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-4">
                            Created at {formatDate(campaign.createdAt)} •
                            Updated em {formatDate(campaign.updatedAt)}
                        </p>
                    </div>
                </section>
            )}
        </div>
    );
}
