type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    className?: string;
};

const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium  hover:cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantStyles: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
        "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
};
const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
};

export default function Button({
    variant = "primary",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {
    const variantClass = variantStyles[variant] || variantStyles.primary;
    const sizeClass = sizeStyles[size] || sizeStyles.md;

    return (
        <button
            className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
            {...props}
        />
    );
}

