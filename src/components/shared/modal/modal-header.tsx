type ModalHeaderProps = {
    title?: string;
    children?: React.ReactNode;
};

export default function ModalHeader({ title, children }: ModalHeaderProps) {
    return (
        <div className="mb-4 flex items-center justify-between">
            {title && <h2 className="text-xl font-semibol">{title}</h2>}
            {children}
        </div>
    );
}

