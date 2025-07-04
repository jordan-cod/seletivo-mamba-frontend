import Link from "next/link";

export default function Header(): React.ReactNode {
    return (
        <header className="w-full px-6 py-4 bg-white dark:bg-zinc-900 shadow-sm border-b border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto flex items-center justify-between">
                <Link
                    prefetch={false}
                    href="/"
                    className="text-2xl font-bold text-zinc-800 dark:text-zinc-100"
                >
                    <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                        Campaign Manager
                    </h1>
                </Link>
                <Link
                    href="/categories"
                    className="text-sm font-medium text-blue-600 hover:underline"
                >
                    Categories
                </Link>
            </div>
        </header>
    );
}

