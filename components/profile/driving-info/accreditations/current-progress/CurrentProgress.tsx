"use client"

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

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
        <Card className="p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold mt-4">My Current Progress</h3>
            <div className="py-4 px-10 flex items-center justify-center">
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "center",
                        loop: true,

                    }}
                >
                    <CarouselContent>
                        {
                            progressData.map((item, idx) => {
                                const isActive = current - 1 === idx;
                                return (
                                    <CarouselItem key={idx} className="basis-1/3 flex justify-center">
                                        <div className={`relative w-max transition-transform duration-500 ${isActive ? "scale-100 z-10" : "scale-80 opacity-70"}`}>
                                            <div className="relative size-44">
                                                <svg
                                                    className="size-full -rotate-90"
                                                    viewBox="0 0 36 36"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <defs>
                                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                            <stop offset="0%" stopColor="#F8DA5F" />   {/* blue-500 */}
                                                            <stop offset="100%" stopColor="#F76E1E" /> {/* cyan-500 */}
                                                        </linearGradient>
                                                    </defs>

                                                    {/* progress circle with gradient stroke */}
                                                    <circle
                                                        cx="18"
                                                        cy="18"
                                                        r="16"
                                                        fill="none"
                                                        stroke="url(#gradient)"
                                                        strokeWidth="4"
                                                        strokeDasharray={100}
                                                        strokeDashoffset={100 - item.progress}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
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
                                )
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </Card>
    )
}

export default CurrentProgress;
