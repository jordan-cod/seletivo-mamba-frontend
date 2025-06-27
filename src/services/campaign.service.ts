import { BACKEND_BASE_URL } from "@/config/constants";
import {
    Campaign,
    CreateCampaignPayload,
    UpdateCampaignPayload
} from "@/types/campaign.interface";
import { revalidateTag } from "next/cache";

type Pagination = {
    page: number;
    size: number;
};

class CampaignService {
    private baseUrl: string = BACKEND_BASE_URL;

    public async getCampaigns({
        page = 1,
        size = 10
    }: Pagination): Promise<Campaign[]> {
        try {
            const response = await fetch(
                `${this.baseUrl}/campaigns?page=${page}&size=${size}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    next: {
                        revalidate: 3600,
                        tags: ["campaigns"]
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch campaigns");
            }

            const campaigns: { data: Campaign[] } = await response.json();
            return campaigns.data;
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            return [];
        }
    }

    public async getCampaign(id: string): Promise<Campaign | null> {
        try {
            const response = await fetch(`${this.baseUrl}/campaigns/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                next: {
                    revalidate: 3600,
                    tags: ["campaigns", `campaign:${id}`]
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch campaign with id ${id}`);
            }

            const campaign: { data: Campaign } = await response.json();
            return campaign.data;
        } catch (error) {
            console.error(`Error fetching campaign with id ${id}:`, error);
            return null;
        }
    }

    public async createCampaign(
        campaign: CreateCampaignPayload
    ): Promise<Campaign> {
        try {
            const response = await fetch(`${this.baseUrl}/campaigns`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(campaign)
            });

            if (!response.ok) {
                throw new Error("Failed to create campaign");
            }

            revalidateTag("campaigns");
            const createdCampaign: Campaign = await response.json();
            return createdCampaign;
        } catch (error) {
            console.error("Error creating campaign:", error);
            throw error;
        }
    }

    public async updateCampaign(
        id: string,
        campaign: UpdateCampaignPayload
    ): Promise<Campaign | null> {
        try {
            const response = await fetch(`${this.baseUrl}/campaigns/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(campaign)
            });

            if (!response.ok) {
                throw new Error(`Failed to update campaign with id ${id}`);
            }

            revalidateTag("campaigns");
            revalidateTag(`campaign:${id}`);
            const updatedCampaign: { data: Campaign } = await response.json();
            return updatedCampaign.data;
        } catch (error) {
            console.error(`Error updating campaign with id ${id}:`, error);
            return null;
        }
    }

    public async deleteCampaign(id: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/campaigns/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete campaign with id ${id}`);
            }

            revalidateTag("campaigns");
            revalidateTag(`campaign:${id}`);
        } catch (error) {
            console.error(`Error deleting campaign with id ${id}:`, error);
            throw error;
        }
    }
}

export const campaignService = new CampaignService();
