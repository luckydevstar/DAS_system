"use client"

import { Card } from "@/components/ui/card";
import Progress from "./Progress";
import StatisticsChart from "./Chart";

const CurrentProgress = () => {
    return (
        <Card className="p-8 rounded-2xl shadow-md pb-12">
            <h3 className="text-2xl font-bold mt-4">My Current Progress</h3>
            <div className="py-4 px-20 flex items-center justify-center">
                <Progress />
            </div>
            <StatisticsChart />
        </Card>
    )
}

export default CurrentProgress;
