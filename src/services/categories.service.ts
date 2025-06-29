import { BACKEND_BASE_URL } from "@/config/constants";
import {
    Category,
    CreateCategoryPayload,
    UpdateCategoryPayload
} from "@/types/category.interface";
import { Pagination } from "@/types/Pagination.interface";

class CategoryService {
    private baseUrl: string = BACKEND_BASE_URL;

    public async getCategories({
        page = 1,
        size = 10
    }: Pagination): Promise<Category[]> {
        try {
            const response = await fetch(
                `${this.baseUrl}/categories?page=${page}&size=${size}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    next: {
                        revalidate: 60,
                        tags: ["categories"]
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }

            const campaigns: { data: Category[] } = await response.json();
            return campaigns.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    }

    public async createCategory(
        category: CreateCategoryPayload
    ): Promise<Category> {
        try {
            const response = await fetch(`${this.baseUrl}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            });

            if (!response.ok) {
                throw new Error("Failed to create category");
            }

            const createdCampaign: { data: Category } = await response.json();
            return createdCampaign.data;
        } catch (error) {
            console.error("Error creating category:", error);
            throw error;
        }
    }

    public async updateCategory(
        id: string,
        category: UpdateCategoryPayload
    ): Promise<Category | null> {
        try {
            const response = await fetch(`${this.baseUrl}/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            });

            if (!response.ok) {
                throw new Error(`Failed to update campaign with id ${id}`);
            }

            const updatedCampaign: { data: Category } = await response.json();
            return updatedCampaign.data;
        } catch (error) {
            console.error(`Error updating campaign with id ${id}:`, error);
            return null;
        }
    }

    public async deleteCategory(id: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete category with id ${id}`);
            }
        } catch (error) {
            console.error(`Error deleting category with id ${id}:`, error);
            return;
        }
    }
}

export const categoryService = new CategoryService();

