import { z } from "zod";

export const updateCategorySchema = z.object({
    id: z.string().uuid("Invalid ID."),
    name: z
        .string({
            required_error: "Category name is required.",
            invalid_type_error: "Name must be a string."
        })
        .min(3, "Name must be at least 3 characters long.")
        .max(100, "Name must be at most 100 characters long.")
        .optional()
});

export const createCategorySchema = z.object({
    name: z
        .string({
            required_error: "Category name is required.",
            invalid_type_error: "Name must be a string."
        })
        .min(3, "Name must be at least 3 characters long.")
        .max(100, "Name must be at most 100 characters long.")
});

export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
export type CreateCategoryData = z.infer<typeof createCategorySchema>;

