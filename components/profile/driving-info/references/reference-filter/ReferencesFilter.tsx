"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutList, LayoutGrid } from "lucide-react";

const ACTIVE_COLOR = "#007FA3";

export default function ReferencesFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Default to "card" when not present
    const current = searchParams.get("view") === "list" ? "list" : "card";

    const setView = (next: "card" | "list") => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("view", next);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const baseBtn =
        "flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#007FA3]/30";

    return (
        <div className="flex justify-end items-center h-9 gap-5 w-full">
            <div
                aria-pressed={current === "card"}
                onClick={() => setView("card")}
                className={`${baseBtn} ${current === "card" ? "text-[#007FA3]" : "text-gray-700"}`}
                title="Card View"
            >
                <span>Card View</span>
                <LayoutGrid size={18} />
            </div>

            <div className="w-0.5 h-5 bg-gray-200" />

            <div
                aria-pressed={current === "list"}
                onClick={() => setView("list")}
                className={`${baseBtn} ${current === "list" ? "text-[#007FA3]" : "text-gray-700"}`}
                title="List View"
            >
                <span>List View</span>
                <LayoutList size={18} />
            </div>
        </div>
    );
}
