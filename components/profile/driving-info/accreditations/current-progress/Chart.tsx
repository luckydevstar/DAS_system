import { Fragment } from "react"
import GradientAreaChart from "./GradientAreaChart"

const StatisticsChart = () => {
    return (
        <Fragment>
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
        </Fragment>
    )
}

export default StatisticsChart;
