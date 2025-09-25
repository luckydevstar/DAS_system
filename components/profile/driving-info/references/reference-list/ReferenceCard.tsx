"use client";

import { useState } from "react";
import { Repeat2, Play, Volume2, Mail } from "lucide-react";
import { ReferenceListItemType } from "./ReferenceListItem";
import { Button } from "@/components/ui/button";

export default function ReferenceCard({
    name,
    title,
    date,
    photoUrl ,
    companyLogoUrl,
    website,
    address,
}: ReferenceListItemType) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="min-w-[340px] w-full">
            <div className="relative [perspective:1200px]">
                {/* Card surface */}
                <div
                    className={`relative h-[500px] w-full rounded-2xl shadow-md transition-transform duration-500 [transform-style:preserve-3d] bg-white`}
                    style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                    {/* FRONT */}
                    <section className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] h-full">
                        <img src={photoUrl} className="w-full h-[500px] object-cover absolute top-0 left-0" />
                        <div className="flex flex-col h-full">
                            <div className="flex-1 relative">
                                <Button
                                    type="button"
                                    onClick={() => setFlipped(true)}
                                    className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs font-medium shadow hover:bg-black/50 text-white cursor-pointer"
                                    aria-label="Flip"
                                    size="icon"
                                >
                                    <Repeat2 size={16} />
                                </Button>
                                <Button
                                    type="button"
                                    className="absolute bottom-15 right-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs font-medium shadow hover:bg-black/50 text-white cursor-pointer"
                                    aria-label="Flip"
                                    size="icon"
                                >
                                    <Play size={16} />
                                </Button>
                                <Button
                                    type="button"
                                    className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs font-medium shadow hover:bg-black/50 text-white cursor-pointer"
                                    aria-label="Flip"
                                    size="icon"
                                >
                                    <Volume2 size={16} />
                                </Button>
                            </div>
                            <div className="relative min-h-44 p-5 bg-white">
                                <div className="absolute rounded-full flex items-center justify-center p-1 border-[#76A0B5] border-2 h-18 w-18 bg-white bottom-full transform translate-y-1/2">
                                    <img src={companyLogoUrl} className="w-full h-full object-contain rounded-full" />
                                </div>
                                <span className="absolute right-5 top-5 text-xs text-[#00000080] font-semibold">{date}</span>
                                <div className="flex flex-col mt-8">
                                    <h3 className="text-[#191919] text-xl font-bold">{name}</h3>
                                    <h3 className="text-[#00000080] text-lg font-semibold">{title}</h3>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* BACK */}
                    <section className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] h-full">
                        <img src={photoUrl} className="w-full h-[500px] object-cover absolute top-0 left-0" />
                        <div className="flex flex-col h-full">
                            <div className="flex-1 relative">
                                <Button
                                    type="button"
                                    onClick={() => setFlipped(false)}
                                    className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs font-medium shadow hover:bg-black/50 text-white cursor-pointer"
                                    aria-label="Flip"
                                    size="icon"
                                >
                                    <Repeat2 size={16} />
                                </Button>
                                <Button
                                    type="button"
                                    className="absolute bottom-15 right-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs font-medium shadow hover:bg-black/50 text-white cursor-pointer"
                                    aria-label="Flip"
                                    size="icon"
                                >
                                    <Play size={16} />
                                </Button>
                                <Button
                                    type="button"
                                    className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs font-medium shadow hover:bg-black/50 text-white cursor-pointer"
                                    aria-label="Flip"
                                    size="icon"
                                >
                                    <Volume2 size={16} />
                                </Button>
                            </div>
                            <div className="relative min-h-44 p-5 bg-white">
                                <div className="absolute rounded-full flex items-center justify-center p-1 border-[#76A0B5] border-2 h-18 w-18 bg-white bottom-full transform translate-y-1/2">
                                    <img src={companyLogoUrl} className="w-full h-full object-contain rounded-full" />
                                </div>
                                <span className="absolute right-5 top-5 text-xs text-[#00000080] font-semibold">{date}</span>
                                <div className="flex flex-col mt-8">
                                    <h3 className="text-[#191919] text-xl font-bold">{name}</h3>
                                    <h3 className="text-[#00000080] text-lg font-semibold">{title}</h3>
                                </div>
                                <div className="mt-2 space-y-1 text-xs">
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
                                    <div className="w-full mt-5 px-4 pb-2">
                                        <Button size="lg" className="w-full bg-[#76A0B5] cursor-pointer">
                                            <Mail size={16} />
                                            Contact
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div >
        </div >
    );
}
