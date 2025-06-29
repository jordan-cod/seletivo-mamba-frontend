import { CampaignStatus } from "@/types/campaign.interface";
import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const UpdateCampaignSchema = z
    .object({
        id: z.string().uuid("Invalid ID."),
        name: z
            .string({
                required_error: "Campaign name is required.",
                invalid_type_error: "Name must be a string."
            })
            .min(3, "Name must be at least 3 characters long.")
            .max(100, "Name must be at most 100 characters long.")
            .optional(),
        category_id: z.string().uuid("Invalid category ID."),

        status: z
            .enum(Object.values(CampaignStatus) as [string, ...string[]], {
                required_error: "Campaign status is required.",
                invalid_type_error: "Invalid status."
            })
            .optional(),

        start_date: z.coerce
            .date({
                required_error: "Start date is required.",
                invalid_type_error: "Invalid format for start date."
            })
            .refine((date) => date >= today, {
                message: "Start date must be today or a future date."
            })
            .optional(),

        end_date: z.coerce
            .date({
                required_error: "End date is required.",
                invalid_type_error: "Invalid format for end date."
            })
            .optional()
    })
    .refine(
        (data) =>
            !data.start_date ||
            !data.end_date ||
            data.end_date > data.start_date,
        {
            message: "End date must be later than start date.",
            path: ["end_date"]
        }
    );

export const CreateCampaignSchema = z
    .object({
        name: z
            .string({
                required_error: "Campaign name is required.",
                invalid_type_error: "Name must be a string."
            })
            .min(3, "Name must be at least 3 characters long.")
            .max(100, "Name must be at most 100 characters long."),
        category_id: z.string().uuid("Invalid category ID."),

        status: z.enum(Object.values(CampaignStatus) as [string, ...string[]], {
            required_error: "Campaign status is required.",
            invalid_type_error: "Invalid status."
        }),

        start_date: z.coerce
            .date({
                required_error: "Start date is required.",
                invalid_type_error: "Invalid format for start date."
            })
            .refine((date) => date >= today, {
                message: "Start date must be today or a future date."
            }),

        end_date: z.coerce.date({
            required_error: "End date is required.",
            invalid_type_error: "Invalid format for end date."
        })
    })
    .refine((data) => data.end_date > data.start_date, {
        message: "End date must be later than start date.",
        path: ["end_date"]
    });

export type UpdateCampaignData = z.infer<typeof UpdateCampaignSchema>;
export type CreateCampaignData = z.infer<typeof CreateCampaignSchema>;

