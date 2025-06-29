import { CreateCampaignData, UpdateCampaignData } from "@/schemas/campaign";
import { BACKEND_BASE_URL } from "@/config/constants";
import { Campaign, CampaignStatus } from "@/types/campaign.interface";
import { Pagination, PaginationResponse } from "@/types/Pagination.interface";

class CampaignService {
    private baseUrl: string = BACKEND_BASE_URL;

    public async getCampaigns({
        page = 1,
        size = 10
    }: Pagination): Promise<PaginationResponse<Campaign>> {
        try {
            const response = await fetch(
                `${this.baseUrl}/campaigns?page=${page}&size=${size}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        cache: "no-store"
                    },
                    next: {
                        revalidate: 60,
                        tags: ["campaigns"]
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch campaigns");
            }

            const campaigns: PaginationResponse<Campaign> =
                await response.json();
            return campaigns;
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            return {
                message: "Error fetching campaigns",
                data: [],
                pagination: {
                    page: 1,
                    size: size,
                    total: 0,
                    totalPages: 0
                }
            };
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
                    revalidate: 60,
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

    public async countCampaignsPerStatus(
        statuses?: CampaignStatus[]
    ): Promise<Record<string, number>> {
        try {
            const query =
                statuses && statuses.length > 0
                    ? `?${statuses.map((s) => `status=${encodeURIComponent(s)}`).join("&")}`
                    : "";

            const response = await fetch(
                `${this.baseUrl}/campaigns/status-count${query}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    next: {
                        revalidate: 60,
                        tags: ["campaigns"]
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to count campaigns");
            }

            const campaigns: { data: Record<string, number> } =
                await response.json();
            return campaigns.data;
        } catch (error) {
            console.error("Error counting campaigns:", error);
            return {};
        }
    }

    public async createCampaign(
        campaign: CreateCampaignData
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

            const createdCampaign: Campaign = await response.json();
            return createdCampaign;
        } catch (error) {
            console.error("Error creating campaign:", error);
            throw error;
        }
    }

    public async updateCampaign(
        id: string,
        campaign: UpdateCampaignData
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
        } catch (error) {
            console.error(`Error deleting campaign with id ${id}:`, error);
            return;
        }
    }
}

export const campaignService = new CampaignService();

