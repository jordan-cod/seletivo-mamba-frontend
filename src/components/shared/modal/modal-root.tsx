import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ModalRoot({
    isOpen,
    onClose,
    children,
    ...rest
}: ModalProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        document.documentElement.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.documentElement.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isMounted || !isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
            onClick={onClose}
            {...rest}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl transform transition-all duration-200 scale-100 opacity-100 animate-modal"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}

