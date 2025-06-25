export type Campaign = {
    readonly id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    status: "active" | "paused" | "expired";

    readonly createdAt: Date;
    readonly updatedAt: Date;
};

export type CreateCampaignPayload = Omit<
    Campaign,
    "id" | "createdAt" | "updatedAt"
>;

export type UpdateCampaignPayload = Partial<
    Omit<Campaign, "id" | "createdAt" | "updatedAt">
>;
