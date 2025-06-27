export enum CampaignStatus {
    Active = "ativa",
    Paused = "pausada",
    Expired = "expirada"
}

export type Campaign = {
    readonly id: string;
    name: string;
    status: CampaignStatus;
    category: {
        id: string;
        name: string;
    } | null;
    start_date: Date;
    end_date: Date | null;

    readonly created_at: Date;
    readonly updated_at: Date;
    readonly deleted_at: Date | null;
};

export type CreateCampaignPayload = Omit<
    Campaign,
    "id" | "createdAt" | "updatedAt"
>;

export type UpdateCampaignPayload = Partial<
    Omit<Campaign, "id" | "createdAt" | "updatedAt">
>;
