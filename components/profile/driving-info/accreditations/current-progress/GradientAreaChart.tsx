"use client";

import React, { useMemo, useId } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

type GradientAreaChartProps = {
    numbers: number[];
    labels: string[];
    height?: number;
    lineColor?: string;   // keeps API; defaults tuned for the gray look
    gradientTo?: string;  // not used directly now, but kept for API parity
    markerSize?: number;
};

const GradientAreaChart: React.FC<GradientAreaChartProps> = ({
    numbers,
    labels,
    height = 250,
    lineColor = "#222222",    // darker stroke like the reference
    gradientTo = "#FFFFFF",
    markerSize = 6,
}) => {
    const visibleIdx = useMemo(
        () => labels.map((_, i) => i).slice(1, Math.max(labels.length - 1, 1)),
        [labels]
    );
    const visibleSet = useMemo(() => new Set(visibleIdx), [visibleIdx]);

    const data = useMemo(
        () => labels.map((label, i) => ({ label, value: numbers[i], _i: i })),
        [labels, numbers]
    );

    const gradId = useId();

    // black dots like the screenshot
    const Dot = (props: any) => {
        const { cx, cy, index } = props;
        if (index == null || !visibleSet.has(index)) return null;
        return (
            <circle
                cx={cx}
                cy={cy}
                r={markerSize}
                fill="#111111"
                stroke="#111111"
                strokeWidth={3}
            />
        );
    };

    return (
        <div className="relative w-full pb-4 overflow-hidden">
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                        {/* Radial gradient: dark near the top, fades to near-white at the bottom */}
                        <radialGradient
                            id={gradId}
                            gradientUnits="objectBoundingBox"
                            cx="50%" cy="40%" r="150%"
                            fx="50%" fy="50%"
                        >
                            {/* top cap darkness */}
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.1} />
                            <stop offset="40%" stopColor="#5F5F5F" stopOpacity={0.9} />
                            <stop offset="85%" stopColor="#E9E9E9" stopOpacity={0.7} />
                            <stop offset="100%" stopColor="#2F2F2F" stopOpacity={1} />
                        </radialGradient>
                    </defs>

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={lineColor}
                        strokeWidth={2}
                        fill={`url(#${gradId})`}   // ← radial gradient
                        isAnimationActive
                        animationDuration={700}
                        dot={<Dot />}
                        activeDot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* bottom values + labels (unchanged) */}
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
