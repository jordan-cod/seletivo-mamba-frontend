import { Campaign } from "@/types/campaign.interface";
import { NextResponse } from "next/server";

const campaigns: Campaign[] = [
    {
        id: "1",
        name: "Black Friday Sale",
        startDate: new Date("2025-11-01"),
        endDate: new Date("2025-11-30"),
        status: "active",
        createdAt: new Date("2025-10-01"),
        updatedAt: new Date("2025-10-15")
    },
    {
        id: "2",
        name: "Christmas Campaign",
        startDate: new Date("2025-12-01"),
        endDate: new Date("2025-12-31"),
        status: "paused",
        createdAt: new Date("2025-11-10"),
        updatedAt: new Date("2025-12-01")
    },
    {
        id: "3",
        name: "New Year Blast",
        startDate: new Date("2025-12-28"),
        endDate: new Date("2026-01-05"),
        status: "expired",
        createdAt: new Date("2025-12-01"),
        updatedAt: new Date("2026-01-06")
    }
];

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const campaign = campaigns.find((c) => c.id === id);

    if (!campaign) {
        return NextResponse.json(
            { message: "Campaign not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(campaign);
}
