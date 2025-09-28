"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GradientAreaChart: React.FC = () => {
    // === Config you can tweak ===
    const data = [8.3, 9.5, 9.2, 6.2, 3.7];
    const categories = ["", "APR", "MAY", "JUN", ""];
    const visibleIdx = [1, 2, 3];       // only show APR, MAY, JUN markers/labels
    const height = 250;
    const lineColor = "#A2BECD";
    const gradientTo = "#C9D9E2";
    const markerSize = 6;
    const bottomInsetPx = 10;           // distance from bottom for the overlay
    // ============================

    const options: ApexOptions = {
        chart: {
            type: "area",
            toolbar: { show: false },
            zoom: { enabled: false },
            sparkline: { enabled: true }, // compact: hides axes/grid
        },
        stroke: { curve: "smooth", width: 2, colors: [lineColor] },
        colors: [lineColor],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 0.4,
                opacityFrom: 0.65,
                opacityTo: 0.15,
                stops: [0, 80, 100],
                gradientToColors: [gradientTo],
            },
        },
        markers: {
            size: 0, // hide all by default
            discrete: visibleIdx.map((i) => ({
                seriesIndex: 0,
                dataPointIndex: i,
                size: markerSize,
                fillColor: "#fff",
                strokeColor: lineColor,
                strokeWidth: 3,
            })),
            hover: { size: markerSize + 2 },
        },
        dataLabels: { enabled: false }, // we'll draw our own at the bottom
        tooltip: { enabled: false },
        grid: { show: false },
        xaxis: {
            categories,
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false },
        },
        yaxis: { show: false },
    };

    const series = [{ name: "Score", data }];

    return (
        <div className="relative w-full pb-4">
            <Chart options={options} series={series} type="area" height={height} />
            <div className="flex justify-evenly -mt-20">
            {
                categories.slice(1, 4).map((item, idx) => {
                    return (
                        <div className="flex flex-col items-center" key={idx}>
                            <span className="text-xl font-bold">{data[idx + 1]}</span>
                            <span className="text-xs">{item}</span>
                        </div>
                    )
                })
            }
            </div>
        </div>
    );
};

export default GradientAreaChart;
