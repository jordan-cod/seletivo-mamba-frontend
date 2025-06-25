import { Campaign } from "@/types/campaign.interface";
import CampaignItem from "./campaign";

export default function CampaignList({
    campaings
}: {
    campaings: Campaign[];
}): React.ReactNode {
    if (!campaings || campaings.length === 0) {
        return (
            <div className="text-center text-zinc-500 dark:text-zinc-400">
                No campaigns found.
            </div>
        );
    }

    return (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {campaings.slice(0, 5).map((campaign) => {
                return (
                    <li key={campaign.id}>
                        <CampaignItem campaign={campaign} />
                    </li>
                );
            })}
        </ul>
    );
}
