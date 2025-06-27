export type Category = {
    readonly id: string;
    name: string;

    readonly created_at: Date;
    readonly updated_at: Date;
    readonly deleted_at: null;
};

export type CreateCategoryPayload = Omit<
    Category,
    "id" | "created_at" | "updated_at" | "deleted_at"
>;

export type UpdateCategoryPayload = Partial<
    Omit<Category, "id" | "createdAt" | "updatedAt" | "deletedAt">
>;
