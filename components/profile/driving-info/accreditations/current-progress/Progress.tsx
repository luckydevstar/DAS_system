"use client"

import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { useEffect, useId, useState } from "react";

function ProgressRing({
    percent,
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
                            ["--dash-from"]: CIRC,
                            ["--dash-to"]: dashTo,
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

const Progress = ({ setCurrentIndex }: { setCurrentIndex: (i: number) => void }) => {
    const progressData = [

        {
            title: "First Aid",
            progress: 75
        },
        {
            title: "Driver Development",
            progress: 57
        },
        {
            title: "First Safety",
            progress: 89
        },
        {
            title: "Second Aid",
            progress: 65
        },
    ]

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [_, setCount] = useState(0);

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

    useEffect(() => {
        setCurrentIndex(current % progressData.length);
    }, [current, setCurrentIndex])

    return (
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
        </Carousel>
    )
}

export default Progress;
