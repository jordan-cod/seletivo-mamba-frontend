import { Campaign } from "@/types/campaign.interface";
import CampaignItem from "./campaign";

export default function CampaignList({
    campaigns
}: {
    campaigns: Campaign[];
}): React.ReactNode {
    if (!campaigns || campaigns.length === 0) {
        return (
            <div className="text-center text-zinc-500 dark:text-zinc-400">
                No campaigns found.
            </div>
        );
    }

    return (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => {
                return (
                    <li key={campaign.id}>
                        <CampaignItem campaign={campaign} />
                    </li>
                );
            })}
        </ul>
    );
}

