import type { LucideProps } from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.5 6.5a4.5 4.5 0 1 1 8.5 1.5H5.5A2.5 2.5 0 0 0 3 10.5v2A2.5 2.5 0 0 0 5.5 15h13A2.5 2.5 0 0 0 21 12.5v-2a2.5 2.5 0 0 0-2.5-2.5h-3.34A4.5 4.5 0 1 1 12 6.5" />
      <path d="M12 21a2 2 0 0 0 2-2v-3H10v3a2 2 0 0 0 2 2z" />
    </svg>
  ),
};
