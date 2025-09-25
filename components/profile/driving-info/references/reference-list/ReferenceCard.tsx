"use client";

import { useState } from "react";
import { Repeat2, Play, Volume2, Mail } from "lucide-react";
import { ReferenceListItemType } from "./ReferenceListItem";
import { Button } from "@/components/ui/button";

export default function ReferenceCard({
    name,
    title,
    date,
    photoUrl,
    companyLogoUrl,
    website,
    address,
    intro,
}: ReferenceListItemType) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="w-full">
            <div className="relative [perspective:1200px]">
                {/* Card surface */}
                <div
                    className="relative h-[480px] w-full rounded-2xl shadow-md transition-transform duration-500 [transform-style:preserve-3d] bg-white"
                    style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                    {/* FRONT */}
                    <section className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] h-full">
                        <img
                            src={photoUrl}
                            alt=""
                            className="w-full h-[480px] object-cover absolute top-0 left-0"
                        />

                        <div className="flex flex-col h-full">
                            <div className="flex-1 relative">
                                <button
                                    type="button"
                                    onClick={() => setFlipped(true)}
                                    className="absolute top-3 right-3 h-8 w-8 inline-flex items-center gap-1 rounded-full bg-black/40 justify-center text-xs font-medium shadow hover:bg-black/50 text-white cursor-pointer"
                                    aria-label="Flip"
                                >
                                    <Repeat2 size={14} />
                                </button>
                            </div>

                            {/* Bottom panel (group for hover) */}
                            <div className="relative min-h-44 p-5 bg-white group">
                                {/* logo badge */}
                                <div className="absolute rounded-full flex items-center justify-center p-1 border-[#76A0B5] border-2 h-18 w-18 bg-white bottom-full translate-y-1/2">
                                    <img
                                        src={companyLogoUrl}
                                        alt=""
                                        className="w-full h-full object-contain rounded-full"
                                    />
                                </div>

                                <span className="absolute right-5 top-5 text-xs text-[#00000080] font-semibold">
                                    {date}
                                </span>

                                <div className="flex flex-col mt-8">
                                    <h3 className="text-[#191919] text-xl font-bold">{name}</h3>
                                    <h3 className="text-[#00000080] text-lg font-semibold">{title}</h3>
                                </div>

                                {/* Smooth hover expand using grid-rows */}
                                <div className="mt-2 grid transition-[grid-template-rows] duration-300 ease-out grid-rows-[0fr] group-hover:grid-rows-[1fr]">
                                    <div className="overflow-hidden">
                                        <div className="space-y-1 text-xs">
                                            <p className="text-gray-900">
                                                <span className="font-semibold">Website:</span>{" "}
                                                <a
                                                    href={website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-[#007FA3] underline"
                                                >
                                                    {new URL(website).hostname}
                                                </a>
                                            </p>
                                            <p className="text-gray-900">
                                                <span className="font-semibold">Office Address:</span>{" "}
                                                <span className="text-gray-700">{address}</span>
                                            </p>
                                            <div className="w-full mt-5 px-4">
                                                <Button size="lg" className="w-full bg-[#76A0B5] cursor-pointer">
                                                    <Mail size={16} />
                                                    Contact
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Bottom panel */}
                        </div>
                    </section>

                    {/* BACK */}
                    <section className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] h-full">
                        <div className="flex flex-col h-full">
                            <div className="flex-1 relative">
                                <div className="h-full w-full">
                                    <img src={photoUrl} className="w-full h-full object-cover" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFlipped(false)}
                                    className="absolute top-3 right-3 h-8 w-8 inline-flex items-center gap-1 rounded-full bg-black/40 justify-center text-xs font-medium shadow hover:bg-black/50 text-white cursor-pointer"
                                    aria-label="Flip"
                                >
                                    <Repeat2 size={14} />
                                </button>

                                {/* Floating media buttons */}
                                <button
                                    type="button"
                                    className="absolute bottom-14 right-3 h-8 w-8 inline-flex items-center gap-1 rounded-full bg-black/40 justify-center text-xs font-medium shadow hover:bg-black/50 text-white cursor-pointer"
                                    aria-label="Play"
                                >
                                    <Play size={14} />
                                </button>
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 h-8 w-8 inline-flex items-center gap-1 rounded-full bg-black/40 justify-center text-xs font-medium shadow hover:bg-black/50 text-white cursor-pointer"
                                    aria-label="Volume"
                                >
                                    <Volume2 size={14} />
                                </button>
                            </div>

                            {/* Bottom panel (group for hover) */}
                            <div className="p-5 bg-white group h-64 flex flex-col">
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <h3 className="text-[#191919] text-xl font-bold">{name}</h3>
                                        <h3 className="text-[#00000080] text-lg font-semibold">{title}</h3>
                                    </div>
                                    <span className="text-xs text-[#00000080] font-semibold">
                                        {date}
                                    </span>
                                </div>

                                {/* Smooth hover expand using grid-rows */}
                                <div className="mt-2 flex-1 overflow-auto">
                                    <div className="h-full text-sm">
                                        {intro}
                                    </div>
                                </div>
                            </div>
                            {/* /Bottom panel */}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
