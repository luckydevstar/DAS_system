import { Fragment, useEffect, useState } from "react";
import GradientAreaChart from "./GradientAreaChart";

const StatisticsChart = ({currentIndex: activeDataIndex}: {currentIndex: number}) => {
    const statisticsData = [
        {
            totalHours: 26,
            numCompltedUnits: 1,
            numRemainingUnits: 5,
            chartData: {
                numbers: [8.3, 9.5, 9.2, 6.2, 3.7],
                labels: ["", "APR", "MAY", "JUN", ""],
            },
            startDate: "27th MAR 2025",
            numGraduationDays: 30,
            numOfDots: 16,
            numOfActiveDots: 10,
        },
        {
            totalHours: 32,
            numCompltedUnits: 2,
            numRemainingUnits: 7,
            chartData: {
                numbers: [8.3, 6.7, 4.2, 8.2, 3.7],
                labels: ["", "APR", "MAY", "JUN", ""],
            },
            startDate: "16th APR 2025",
            numGraduationDays: 20,
            numOfDots: 16,
            numOfActiveDots: 8,
        },
        {
            totalHours: 32,
            numCompltedUnits: 2,
            numRemainingUnits: 7,
            chartData: {
                numbers: [8.8, 9.7, 8.2, 7.4, 5.5],
                labels: ["", "APR", "MAY", "JUN", ""],
            },
            startDate: "16th MAY 2025",
            numGraduationDays: 22,
            numOfDots: 16,
            numOfActiveDots: 9,
        },
        {
            totalHours: 32,
            numCompltedUnits: 1,
            numRemainingUnits: 9,
            chartData: {
                numbers: [4.8, 9.2, 5.2, 6.4, 5.5],
                labels: ["", "APR", "MAY", "JUN", ""],
            },
            startDate: "16th MAY 2025",
            numGraduationDays: 45,
            numOfDots: 16,
            numOfActiveDots: 9,
        },
        // ... more items
    ];

    // const [activeDataIndex, setActiveDataIndex] = useState(0);

    return (
        <Fragment>
            <div
                className="px-4 mt-8 flex items-center border-b-2 border-[#A2BECD]"
            >
                <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-semibold text-center">YOUR TUTOR</h3>
                    <div className="border-3 border-white transform rotate-45 w-24 h-24 overflow-hidden rounded-xl shadow-xl">
                        <img
                            src={"/images/avatar/tutor.jpg"}
                            className="transform -rotate-45 scale-150 w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-base font-semibold text-center">Lisa Maynard</h3>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="w-full flex justify-around items-center">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-sm font-semibold">LEARNING HOURS</h1>
                            <h2 className="text-xs font-bold">SINCE START OF COURSE</h2>
                        </div>
                        <div>
                            <h2>
                                <span className="text-6xl font-bold">{statisticsData[activeDataIndex].totalHours}</span>
                                <span className="text-xs font-bold">HRS</span>
                            </h2>
                        </div>
                    </div>

                    <div className="flex-1 pl-12 pr-6">
                        <GradientAreaChart
                            numbers={statisticsData[activeDataIndex].chartData.numbers}
                            labels={statisticsData[activeDataIndex].chartData.labels}
                        // optional styling overrides:
                        // lineColor="#A2BECD"
                        // gradientTo="#C9D9E2"
                        // height={250}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold mb-2">WORKBOOK PROGRESS</h3>
                    <h3 className="text-center">
                        <span className="text-4xl font-bold mr-2">{statisticsData[activeDataIndex].numCompltedUnits}</span>
                        <span className="text-xs font-semibold -mt-2">UNITS COMPLETED</span>
                    </h3>
                    <h3 className="text-center">
                        <span className="text-4xl font-bold mr-2">{statisticsData[activeDataIndex].numRemainingUnits}</span>
                        <span className="text-xs font-semibold -mt-2">UNITS REMAINING</span>
                    </h3>
                </div>
            </div>

            {/* Footer dots & dates (example uses first item, adapt if per-item) */}
            <div className="flex justify-around items-center px-4 gap-4">
                <span className="text-xs font-semibold">
                    STARTED ON {statisticsData[activeDataIndex].startDate}
                </span>
                <div className="flex items-center justify-around flex-1">
                    {Array.from({ length: statisticsData[activeDataIndex].numOfActiveDots }).map((_, k) => (
                        <div className="w-3 h-3 rounded-full bg-black" key={`a-${k}`} />
                    ))}
                    {Array.from({
                        length: statisticsData[activeDataIndex].numOfDots - statisticsData[activeDataIndex].numOfActiveDots,
                    }).map((_, k) => (
                        <div className="w-2 h-2 rounded-full bg-black/40" key={`i-${k}`} />
                    ))}
                </div>
                <span className="text-xs font-semibold">
                    EXPECTED GRADUATION IN {statisticsData[activeDataIndex].numGraduationDays} DAYS
                </span>
            </div>
        </Fragment>
    );
};

export default StatisticsChart;
