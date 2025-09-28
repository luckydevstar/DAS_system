"use client"

import { useEffect, useId, useState } from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import GradientAreaChart from "./GradientAreaChart";

function ProgressRing({
    percent,
    idx,
    animateOnMount,
    size = 44,
    trackColor = "#E5E7EB",
}: {
    percent: number;
    idx: number;
    animateOnMount: boolean;
    size?: number;
    trackColor?: string;
}) {
    const R = 16;
    const CIRC = 2 * Math.PI * R;                 // ~100.53
    const dashTo = CIRC * (1 - percent / 100);
    const gradientId = useId();

    // Add the animation class *after* the first paint
    const [run, setRun] = useState(false);
    useEffect(() => {
        if (!animateOnMount) return;
        const raf = requestAnimationFrame(() => setRun(true));
        return () => cancelAnimationFrame(raf);
    }, [animateOnMount]);

    return (
        <div className="relative" style={{ width: size * 4, height: size * 4 }}>
            <svg
                className="size-full -rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={`${percent}% progress`}
            >
                <defs>
                    <linearGradient id={`grad-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F8DA5F" />
                        <stop offset="100%" stopColor="#F76E1E" />
                    </linearGradient>
                </defs>

                {/* Track */}
                <circle cx="18" cy="18" r={R} fill="none" stroke={trackColor} strokeWidth="4" opacity="0.35" />

                {/* Progress arc */}
                <circle
                    cx="18"
                    cy="18"
                    r={R}
                    fill="none"
                    stroke={`url(#grad-${gradientId})`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className={run ? "ring-run" : ""}
                    // Use CSS vars + CSS property to ensure animation sees both endpoints
                    style={
                        {
                            // endpoints for keyframes
                            ["--dash-from" as any]: CIRC,
                            ["--dash-to" as any]: dashTo,
                            // set via CSS property (not only SVG attribute)
                            strokeDasharray: CIRC,
                            strokeDashoffset: "var(--dash-from)",
                        } as React.CSSProperties
                    }
                />
            </svg>
        </div>
    );
}

const CurrentProgress = () => {
    const progressData = [
        {
            title: "First Aid",
            progress: 23
        },
        {
            title: "Driver Development",
            progress: 75
        },
        {
            title: "First Safety",
            progress: 57
        },
        {
            title: "First Safety",
            progress: 89
        },
    ]

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api]);

    return (
        <Card className="p-8 rounded-2xl shadow-md pb-12">
            <h3 className="text-2xl font-bold mt-4">My Current Progress</h3>
            <div className="py-4 px-20 flex items-center justify-center">
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "center",
                        loop: true,

                    }}
                >
                    <CarouselContent>
                        {progressData.map((item, idx) => {
                            const isActive = current - 1 === idx;          // your scaling logic
                            const animateOnMount = true;                // first three only

                            return (
                                <CarouselItem key={idx} className="basis-1/3 flex justify-center">
                                    <div className={`relative w-max transition-transform duration-500 ${isActive ? "scale-100 z-10" : "scale-80 opacity-70"}`}>
                                        <div className="relative size-44">
                                            <ProgressRing percent={item.progress} idx={idx} animateOnMount={animateOnMount} />
                                        </div>

                                        <Card className="select-none absolute shadow-md rounded-full w-32 h-32 p-1 flex items-center justify-center flex-col gap-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mb-4">
                                            <img src="/images/logo-small.png" className="w-4 h-auto" />
                                            <Separator className="w-8!" />
                                            <h3 className="text-xs wrap-break-word text-center">{item.title}</h3>
                                            <Separator className="w-8!" />
                                            <div className="text-center">
                                                <span className="text-lg font-bold">{item.progress}</span>
                                                <span className="text-sm font-semibold">%</span>
                                            </div>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className="px-4 mt-8 flex items-center border-b-2 border-[#A2BECD]">
                <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-semibold text-center">YOUR TUTOR</h3>
                    <div className="border-3 border-white transform rotate-45 w-24 h-24 overflow-hidden rounded-xl shadow-xl">
                        <img src={'/images/avatar/tutor.jpg'} className="transform -rotate-45 scale-150 w-full h-full object-cover" />
                    </div>
                    <h3 className="text-base font-semibold text-center">Lisa Maynard</h3>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="w-full flex justify-around items-center">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-sm font-semibold">LEARNING HOURS</h1>
                            <h2 className="text-xs font-bold">SINCE START OF COURSE</h2>
                        </div>
                        <div className="">
                            <h2>
                                <span className="text-6xl font-bold">26</span>
                                <span className="text-xs font-bold">HRS</span>
                            </h2>
                        </div>
                    </div>
                    <div className="flex-1 pl-12 pr-6">
                        <GradientAreaChart />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold mb-2">WORKBOOK PROGRESS</h3>
                    <h3 className="text-center">
                        <span className="text-4xl font-bold mr-2">1</span>
                        <span className="text-xs font-semibold -mt-2">UNITS COMPLETED</span>
                    </h3>
                    <h3 className="text-center">
                        <span className="text-4xl font-bold mr-2">5</span>
                        <span className="text-xs font-semibold -mt-2">UNITS REMAINING</span>
                    </h3>
                </div>
            </div>
            <div className="flex justify-around items-center px-4 gap-4">
                <span className="text-xs font-semibold">STARTED ON 27th MAR 2025</span>
                <div className="flex items-center justify-around flex-1">
                    {
                        ["", "", "", "", "", "", "", "", "", "", ""].map((_, idx) => {
                            return (
                                <div className="w-3 h-3 rounded-full bg-black" key={idx} />
                            )
                        })
                    }
                    {
                        ["", "", "", "", ""].map((_, idx) => {
                            return (
                                <div className="w-2 h-2 rounded-full bg-black/40" key={idx} />
                            )
                        })
                    }
                </div>
                <span className="text-xs font-semibold">EXPECTED GRADUATION IN 30 DAYS</span>
            </div>
            <style jsx global>{`
                @keyframes ringFill {
                    from { stroke-dashoffset: var(--dash-from); }
                    to   { stroke-dashoffset: var(--dash-to); }
                }
                .ring-run {
                    animation: ringFill 900ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    will-change: stroke-dashoffset;
                }
                `}</style>
        </Card>
    )
}

export default CurrentProgress;
