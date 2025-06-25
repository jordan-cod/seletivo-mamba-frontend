import { BASE_URL } from "@/config/constants";
import {
    Campaign,
    CreateCampaignPayload,
    UpdateCampaignPayload
} from "@/types/campaign.interface";

class CampaignService {
    public async getCampaigns(): Promise<Campaign[]> {
        try {
            const response = await fetch(`${BASE_URL}/api/campaigns`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch campaigns");
            }

            const campaigns: Campaign[] = await response.json();
            return campaigns;
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            return [];
        }
    }

    public async getCampaign(id: string): Promise<Campaign | null> {
        try {
            const response = await fetch(`${BASE_URL}/api/campaigns/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch campaign with id ${id}`);
            }

            const campaign: Campaign = await response.json();
            return campaign;
        } catch (error) {
            console.error(`Error fetching campaign with id ${id}:`, error);
            return null;
        }
    }

    public async createCampaign(
        campaign: CreateCampaignPayload
    ): Promise<Campaign> {
        try {
            const response = await fetch(`${BASE_URL}/api/campaigns`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(campaign)
            });

            if (!response.ok) {
                throw new Error("Failed to create campaign");
            }

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
            const response = await fetch(`${BASE_URL}/api/campaigns/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(campaign)
            });

            if (!response.ok) {
                throw new Error(`Failed to update campaign with id ${id}`);
            }

            const updatedCampaign: Campaign = await response.json();
            return updatedCampaign;
        } catch (error) {
            console.error(`Error updating campaign with id ${id}:`, error);
            return null;
        }
    }

    public async deleteCampaign(id: string): Promise<void> {
        try {
            const response = await fetch(`${BASE_URL}/api/campaigns/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete campaign with id ${id}`);
            }
        } catch (error) {
            console.error(`Error deleting campaign with id ${id}:`, error);
            throw error;
        }
    }
}

export const campaignService = new CampaignService();
