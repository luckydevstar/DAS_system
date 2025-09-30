import { Card } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const DigitalBadegs = () => {
    const badgeData = [
        {
            image: "/images/badge/driver-load-safety.png",
            title: "Driver Load Safety",
            date: "02 Feb 2024",
            name: "Melanie Richmond FCIPD",
            position: "Training Manager Asda Logistic Services",
            type: "In-person",
            hours: "8hrs",
            provider: "Heads Of The Valleys Training",
            link: "https://hovtraining.com/hiab/"
        },
        {
            image: "/images/badge/emergency.png",
            title: "Frist Aid",
            date: "02 Feb 2024",
            name: "Melanie Richmond FCIPD",
            position: "Training Manager Asda Logistic Services",
            type: "In-person",
            hours: "8hrs",
            provider: "Heads Of The Valleys Training",
            link: "https://hovtraining.com/hiab/"
        },
        {
            image: "/images/badge/safe-driving.png",
            title: "Safe Driving",
            date: "02 Feb 2024",
            name: "Melanie Richmond FCIPD",
            position: "Training Manager Asda Logistic Services",
            type: "In-person",
            hours: "8hrs",
            provider: "Heads Of The Valleys Training",
            link: "https://hovtraining.com/hiab/"
        },
        {
            image: "/images/badge/lorry-loader.png",
            title: "HIAB",
            date: "02 Feb 2024",
            name: "Melanie Richmond FCIPD",
            position: "Training Manager Asda Logistic Services",
            type: "In-person",
            hours: "8hrs",
            provider: "Heads Of The Valleys Training",
            link: "https://hovtraining.com/hiab/"
        },
        {
            image: "/images/badge/truck-mounted.png",
            title: "FORK LIFT",
            date: "02 Feb 2024",
            name: "Melanie Richmond FCIPD",
            position: "Training Manager Asda Logistic Services",
            type: "In-person",
            hours: "8hrs",
            provider: "Heads Of The Valleys Training",
            link: "https://hovtraining.com/hiab/"
        },
    ]

    return (
        <Card className="p-8 rounded-2xl gap-2">
            <h3 className="text-2xl font-bold mt-4">My Digital Badges</h3>
            <div className="py-4 px-10 flex flex-wrap gap-4">
                {
                    badgeData.map((item, idx) => {
                        return (
                            <HoverCard key={idx} openDelay={100} closeDelay={100}>
                                <HoverCardTrigger>
                                    <div className="">
                                        <img src={item.image} className="w-32 h-32 object-center object-cover" />
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent side="right" className="w-max">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <div className="text-base">{item.title}</div>
                                            <div className="text-sm">
                                                <span className="font-bold">Date: </span>
                                                <span>{item.date}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-bold">Name: </span>
                                                <span>{item.name}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-bold">Position: </span>
                                                <span>{item.position}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm">
                                                <span className="font-bold">{item.type}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-bold">Hours: </span>
                                                <span>{item.hours}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-bold">Provider: </span>
                                                <span>{item.provider}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm">
                                                <span className="font-bold">{item.link}</span>
                                            </div>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        )
                    })
                }
            </div>
        </Card>
    )
}

export default DigitalBadegs;
