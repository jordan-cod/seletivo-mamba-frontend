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
    start_date: string;
    end_date: string | null;

    readonly created_at: Date;
    readonly updated_at: Date;
    readonly deleted_at: Date | null;
};

export type ActionCampaignResponse = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    inputs?: Record<string, string>;
};

