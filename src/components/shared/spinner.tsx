import React from "react";

type LoadingProps = {
    message?: string;
    size?: number;
    colorClass?: string;
};

export default function Spinner({
    message = "Loading...",
    size = 56,
    colorClass = "border-blue-500"
}: LoadingProps): React.ReactNode {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 text-zinc-600 dark:text-zinc-300">
            <div
                className={`border-4 border-t-transparent rounded-full animate-spin shadow-lg ${colorClass}`}
                style={{ width: size, height: size }}
            />
            <p className="text-lg font-medium">{message}</p>
        </div>
    );
}
