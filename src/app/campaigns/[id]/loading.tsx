export default function Loading(): React.ReactNode {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 text-zinc-600 dark:text-zinc-300">
            <div className="h-14 w-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg" />
            <p className="text-lg font-medium">Loading campaign...</p>
        </div>
    );
}
