"use client";

import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type GradientAreaChartProps = {
    numbers: number[];         // e.g. [8.3, 9.5, 9.2, 6.2, 3.7]
    labels: string[];          // e.g. ["", "APR", "MAY", "JUN", ""]
    height?: number;
    lineColor?: string;
    gradientTo?: string;
    markerSize?: number;
};

const GradientAreaChart: React.FC<GradientAreaChartProps> = ({
    numbers,
    labels,
    height = 250,
    lineColor = "#A2BECD",
    gradientTo = "#C9D9E2",
    markerSize = 6,
}) => {
    // middle points only (hide first & last)
    const visibleIdx = useMemo(
        () => labels.map((_, i) => i).slice(1, Math.max(labels.length - 1, 1)),
        [labels]
    );

    const options: ApexOptions = useMemo(
        () => ({
            chart: {
                type: "area",
                toolbar: { show: false },
                zoom: { enabled: false },
                sparkline: { enabled: true }, // compact (no axes/grid)
                animations: { enabled: true, easing: "easeinout", speed: 700 },
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
                size: 0,
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
            dataLabels: { enabled: false },
            tooltip: { enabled: false },
            grid: { show: false },
            xaxis: {
                categories: labels,
                labels: { show: false },
                axisTicks: { show: false },
                axisBorder: { show: false },
            },
            yaxis: { show: false },
        }),
        [labels, visibleIdx, lineColor, gradientTo, markerSize]
    );

    const series = useMemo(
        () => [{ name: "Score", data: numbers }],
        [numbers]
    );

    return (
        <div className="relative w-full pb-4">
            <Chart options={options} series={series} type="area" height={height} />

            {/* Bottom row (values + labels) aligned with visible indices */}
            <div className="flex justify-evenly -mt-20">
                {visibleIdx.map((i) => (
                    <div key={i} className="flex flex-col items-center">
                        <span className="text-xl font-bold">{numbers[i]}</span>
                        <span className="text-xs">{labels[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GradientAreaChart;
