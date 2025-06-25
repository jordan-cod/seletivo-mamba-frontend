type ModalFooterProps = {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
};

export default function ModalFooter({
    children,
    align = "right"
}: ModalFooterProps) {
    const justifyClass =
        align === "left"
            ? "justify-start"
            : align === "center"
              ? "justify-center"
              : "justify-end";

    return <div className={`mt-6 flex gap-2 ${justifyClass}`}>{children}</div>;
}

