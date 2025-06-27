import { Campaign } from "@/types/campaign.interface";
import { formatDate } from "@/utils/format";
import Link from "next/link";
import { StatusBadge } from "../shared/badge";

export default function CampaignItem({
    campaign
}: {
    campaign: Campaign;
}): React.ReactNode {
    return (
        <Link
            href={`/campaigns/${campaign.id}`}
            className="block p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900
        hover:shadow-lg hover:scale-[1.03] transition-transform duration-200"
            aria-label={`View details of campaign ${campaign.name}`}
            tabIndex={0}
        >
            <div className="flex items-baseline flex-col gap-3">
                <h4 className="w-full flex items-center justify-between gap-1 text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                    {campaign.name}

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                        {campaign.category
                            ? campaign.category.name
                            : "No category"}
                    </p>
                </h4>

                <StatusBadge status={campaign.status} />

                <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
                    <div>
                        <dt className="font-medium">Start</dt>
                        <dd
                            title={new Date(
                                campaign.start_date
                            ).toLocaleString()}
                        >
                            {formatDate(campaign.start_date)}
                        </dd>
                    </div>
                    <div>
                        <dt className="font-medium">End</dt>
                        <dd
                            title={
                                campaign.end_date
                                    ? new Date(
                                          campaign.end_date
                                      ).toLocaleString()
                                    : undefined
                            }
                        >
                            {campaign.end_date
                                ? formatDate(campaign.end_date)
                                : "No expiration"}
                        </dd>
                    </div>
                </dl>
            </div>
        </Link>
    );
}
