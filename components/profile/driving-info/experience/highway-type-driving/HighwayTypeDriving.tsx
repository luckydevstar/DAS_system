"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = { day: number; night: number; title?: string };

export default function HighwayTypeDriving({ day: _day, night: _night, title = "Highway Type Driving" }: Props) {
    // Demo series (grouped columns)
    const series: ApexAxisChartSeries = useMemo(
        () => [
            { name: "Day Driving", data: [110, 80, 7] },
            { name: "Night Driving", data: [9, 40, 20] },
        ],
        []
    );

    // Show numeric labels only after initial animation completes
    const [showLabels, setShowLabels] = useState(false);
    useEffect(() => {
        // if labels toggle causes a re-render, keep it to one-time
        const t = setTimeout(() => setShowLabels(true), 900 + 150); // animation speed + tiny buffer
        return () => clearTimeout(t);
    }, []);

    const options: ApexOptions = useMemo(
        () => ({
            chart: {
                type: "bar",
                height: 420,
                toolbar: { show: false },
                foreColor: "#374151",
                animations: {
                    enabled: true,
                    easing: "easeinout",
                    speed: 900,
                    animateGradually: { enabled: true, delay: 120 },
                    dynamicAnimation: { enabled: true, speed: 500 },
                },
                sparkline: { enabled: false },
            },
            colors: ["#E5E7EB", "#6B95A5"],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    borderRadius: 6,
                    borderRadiusApplication: "end",
                },
            },
            dataLabels: {
                enabled: showLabels,
                position: "top",
                offsetY: -8,
                style: { fontSize: "12px", fontWeight: 600, colors: ["#111827"] },
                formatter: (val: number) => (val ?? 0).toLocaleString(),
            },
            stroke: { show: false, width: 0 },
            xaxis: {
                categories: ["Motorway", "A Road", "B Road"],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { style: { fontSize: "12px" } },
            },
            yaxis: {
                labels: {
                    formatter: (v: number) => v.toLocaleString(),
                },
            },
            grid: {
                padding: { top: 8, right: 8, bottom: 8, left: 8 },
                strokeDashArray: 4,
            },
            legend: {
                show: true,
                position: "bottom",
                horizontalAlign: "center",
                fontSize: "12px",
                markers: { size: 8, strokeWidth: 0, offsetX: -8 },
                itemMargin: { horizontal: 20, vertical: 4 },
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: { formatter: (v: number) => (v ?? 0).toLocaleString() },
            },
            states: {
                normal: { filter: { type: "none", value: 0 } },
                hover: { filter: { type: "none", value: 0 } },
                active: { filter: { type: "none", value: 0 } },
            },
        }),
        [showLabels]
    );

    return (
        <div className="rounded-2xl shadow-sm p-6 bg-white flex-1 h-[460px]">
            <div className="text-2xl mt-4 font-bold mb-6">{title}</div>

            <div className="flex items-stretch">
                <div className="pr-3 flex items-center">
                    <span className="text-xs text-black font-bold">Hrs</span>
                </div>
                <div className="relative w-full h-[360px] overflow-hidden -mt-6">
                    <ReactApexChart options={options} series={series} type="bar" width="100%" height="100%" />
                </div>
            </div>
        </div>
    );
}
