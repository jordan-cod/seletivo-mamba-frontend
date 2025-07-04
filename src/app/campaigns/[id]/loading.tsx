import Spinner from "@/components/shared/spinner";

export default function Loading(): React.ReactNode {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 text-zinc-600 dark:text-zinc-300">
            <Spinner message="Loading campaign..." />
        </div>
    );
}
