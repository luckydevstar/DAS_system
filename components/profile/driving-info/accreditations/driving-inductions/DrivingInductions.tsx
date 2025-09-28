"use client"

import { Card } from "@/components/ui/card"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const drivingInductionData = [
    {
        image: "/images/di/di-asda.png",
        company: "ASDA",
        course: "Driver Induction",
        revisionDate: "1 October 2025",
        publishedBy: "Mel Rishmond",
        vechileClass: "C1",
    },
    {
        image: "/images/di/di-royal-mail.png",
        company: "Royal Mail",
        course: "Driver Induction",
        revisionDate: "1 October 2025",
        publishedBy: "Mel Rishmond",
        vechileClass: "C1",
    },
    {
        image: "/images/di/di-gxo.png",
        company: "GXO",
        course: "Driver Induction",
        revisionDate: "1 October 2025",
        publishedBy: "Mel Rishmond",
        vechileClass: "C1",
    },
]

const DrvingInductions = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    return (
        <Card className="p-8 rounded-2xl gap-2">
            <h3 className="text-2xl font-bold mt-4">Driving Inductions</h3>
            <div className="py-4 px-10 grid grid-cols-2">
                <div className="col-span-1">
                    <Carousel
                        opts={{
                            loop: true,
                        }}
                        setApi={setApi}
                    >
                        <CarouselContent>
                            {
                                drivingInductionData.map((item, idx) => {
                                    return (
                                        <CarouselItem className="basis-1/2 px-8 flex justify-center" key={idx}>
                                            <div>
                                                <img src={item.image} className="w-full h-auto object-contain" />
                                            </div>
                                        </CarouselItem>
                                    )
                                })
                            }
                        </CarouselContent>
                    </Carousel>
                    <div className="w-full flex justify-center gap-2 mt-4 -ml-1">
                    {
                        drivingInductionData.map((_, idx) => {
                            return (
                                <div className={`w-2.5 h-2.5 ${idx === current - 1 ? 'bg-black' : 'bg-black/50'} rounded-full`} key={idx} />
                            )
                        })
                    }
                    </div>
                </div>
                <div className="col-span-1 px-8 flex flex-col gap-2">
                    <div className="text-xl">
                        <span className="font-bold mr-2">COMPANY:</span>
                        <span>{drivingInductionData[current - 1]?.company}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-bold mr-2">COURSE:</span>
                        <span>{drivingInductionData[current - 1]?.course}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-bold mr-2">REVISION DATE:</span>
                        <span>{drivingInductionData[current - 1]?.revisionDate}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-bold mr-2">PUBLISHED BY:</span>
                        <span>{drivingInductionData[current - 1]?.publishedBy}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-bold mr-2">VEHICLE CLASS:</span>
                        <span>{drivingInductionData[current - 1]?.vechileClass}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default DrvingInductions;
