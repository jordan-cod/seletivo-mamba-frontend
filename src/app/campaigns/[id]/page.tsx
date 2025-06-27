import { StatusBadge } from "@/components/shared/badge";
import Button from "@/components/shared/button";
import { campaignService } from "@/services/campaign.service";
import { formatDate } from "@/utils/format";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CampaignPage({
    params
}: {
    params: Promise<{ id: string }>;
}): Promise<React.ReactNode> {
    const { id } = await params;
    const campaign = await campaignService.getCampaign(id);

    async function handleDeleteCampaign(): Promise<void> {
        "use server";
        await campaignService.deleteCampaign(id);
        redirect("/campaigns");
    }

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
                    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                            {campaign.name}
                        </h1>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                            <Button>Edit Campaign</Button>
                            <form action={handleDeleteCampaign}>
                                <Button variant="danger" type="submit">
                                    Delete Campaign
                                </Button>
                            </form>
                        </div>
                    </header>

                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                        <StatusBadge status={campaign.status} />
                        <p>
                            <strong>Start date:</strong>
                            {formatDate(campaign.start_date)}
                        </p>
                        <p>
                            <strong>End date:</strong>
                            {campaign.end_date
                                ? formatDate(campaign.end_date)
                                : "No expiration"}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-4">
                            Created at {formatDate(campaign.created_at)} •
                            Updated em {formatDate(campaign.updated_at)}
                        </p>
                    </div>
                </section>
            )}
        </div>
    );
}
