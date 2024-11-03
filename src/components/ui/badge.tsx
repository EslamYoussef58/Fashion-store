import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
