import { Campaign } from "@/types/campaign.interface";

const statusColors: Record<Campaign["status"] | "default", string> = {
    active: "text-green-600 border-green-600",
    paused: "text-yellow-500 border-yellow-500",
    expired: "text-red-600 border-red-600",
    default: "text-gray-600 border-gray-600"
};

export function StatusBadge({ status }: { status: Campaign["status"] }) {
    const colorClasses = statusColors[status] || statusColors.default;
    return (
        <span
            className={`inline-block px-2 rounded-full border text-sm font-light tracking-wide select-none ${colorClasses}`}
            title={`Status: ${status}`}
        >
            {status}
        </span>
    );
}
