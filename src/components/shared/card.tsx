export default function Card({
    label,
    status,
    children
}: {
    label: string;
    status: string;
    children: React.ReactNode;
}): React.ReactNode {
    return (
        <article
            key={status}
            className={`p-6 rounded-2xl shadow-md border-l-4 bg-white dark:bg-zinc-900`}
        >
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
                {label} Campaigns
            </h3>
            <p className={`text-3xl font-bold`}>{children}</p>
        </article>
    );
}
