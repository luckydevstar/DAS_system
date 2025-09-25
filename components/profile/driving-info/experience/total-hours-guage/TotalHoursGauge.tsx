"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = { day: number; night: number; title?: string };

export default function TotalHoursGaugeApex({ day, night, title = "Total Hours" }: Props) {
  const [series, setSeries] = useState<number[]>([0, 0]);
  const [showLabels, setShowLabels] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Kick off the entry animation
  useEffect(() => {
    const id = requestAnimationFrame(() => setSeries([Math.max(0, day), Math.max(0, night)]));
    return () => cancelAnimationFrame(id);
  }, [day, night]);

  const total = Math.max(0, day) + Math.max(0, night);

  const options: ApexOptions = useMemo(() => ({
    chart: {
      type: "donut",
      toolbar: { show: false },
      sparkline: { enabled: true },
      foreColor: "#374151",
      height: 220,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 900,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: true, speed: 500 },
      },
      events: {
        animationEnd: () => {
          if (!hasAnimated) {
            // tiny delay to ensure final frame is painted
            requestAnimationFrame(() => setShowLabels(true));
            setHasAnimated(true);
          }
        },
      },
    },
    labels: ["Day Driving", "Night Driving"],
    colors: ["#E5E7EB", "#6B95A5"],
    stroke: { show: false, width: 0 },
    dataLabels: {
      enabled: showLabels, // ← only after first animation
      formatter: (_val, opts) =>
        (opts?.w?.globals?.series?.[opts.seriesIndex] ?? 0).toLocaleString(),
      style: { fontSize: "12px", fontWeight: 600, colors: ["#374151"], },
      dropShadow: { enabled: false },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      markers: { size: 8, strokeWidth: 0, offsetX: -8 },
      itemMargin: { horizontal: 20, vertical: 4 },
      offsetY: -120
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,              // half donut
        expandOnClick: false,
        customScale: 0.9,
        donut: {
          size: "70%",
          labels: { show: false }, // using our own center overlay
        },
      },
    },
    tooltip: { enabled: false },
    grid: { padding: { top: 0, bottom: 0 } },
    states: {
      normal: { filter: { type: "none", value: 0 } },
      hover: { filter: { type: "none", value: 0 } },
      active: { filter: { type: "none", value: 0 } },
    },
  }), [showLabels, hasAnimated]);

  const fmt = (n: number) => n.toLocaleString();

  return (
    <div className="rounded-2xl shadow-sm p-6 bg-white w-[360px] h-[460px]">
      <div className="text-2xl mt-4 font-bold mb-16">{title}</div>

      <div className="relative w-full h-full legend-round">
        {/* center total */}
        <div className="absolute left-1/2 top-1/2 -mt-16 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none flex">
          <div className="text-4xl font-bold leading-none">{fmt(total)}</div>
          <div className="text-xs text-gray-500 mt-1 self-end ml-1">hours</div>
        </div>

        <ReactApexChart options={options} series={series} type="donut" height="100%" />
      </div>
    </div>
  );
}
