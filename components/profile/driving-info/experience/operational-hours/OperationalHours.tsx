

'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
    Table,
    TableHeader,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type ColKey = 'total_hours' | 'night_driving' | 'day_driving' | 'motorway' | 'aroad' | 'broad';

type RowNode = {
    id: string;
    category: string;
    iconSrc?: string;
    values: Record<ColKey, number>;
    child?: RowNode[];
    iconSize?: number;
};

// ---------- initial data (with icons) ----------
const DATA: RowNode[] = [
    {
        id: 'c1',
        category: 'Category C1 (Medium Goods Vehicles)',
        iconSrc: '/images/nav/delivery-truck.png',
        values: { total_hours: 413.5, night_driving: 132.5, day_driving: 281, motorway: 243.75, aroad: 68, broad: 101.75 },
        child: [
            {
                id: 'c1-mercedes',
                category: 'Mercedes',
                iconSrc: '/images/nav/mercedes.png',
                values: { total_hours: 235.5, night_driving: 80, day_driving: 155.5, motorway: 145.5, aroad: 36, broad: 54 },
                child: [
                    {
                        id: 'c1-mercedes-atego816',
                        category: 'Atego 816',
                        iconSrc: '',
                        values: { total_hours: 123.75, night_driving: 60.5, day_driving: 63.25, motorway: 60.5, aroad: 15, broad: 48.25 },
                    },
                    {
                        id: 'c1-mercedes-2013gf62',
                        category: 'Mercedes Atego 816 7.5-tonne curtainsider 2013 GF62 NLN',
                        iconSrc: '',
                        values: { total_hours: 54.25, night_driving: 19.5, day_driving: 34.75, motorway: 28, aroad: 12.25, broad: 14 },
                    },
                ],
            },
            {
                id: 'c1-volvo',
                category: 'VOLVO',
                iconSrc: '/images/nav/volvo.png',
                values: { total_hours: 123.75, night_driving: 45.25, day_driving: 78.5, motorway: 82, aroad: 15, broad: 26.75 },
            },
            {
                id: 'c1-iveco',
                category: 'IVECO',
                iconSrc: '/images/nav/iveco.png',
                values: { total_hours: 54.25, night_driving: 7.25, day_driving: 47, motorway: 16.25, aroad: 17, broad: 21 },
            },
        ],
    },
    {
        id: 'c',
        category: 'Category C (Heavy Goods Vehicles)',
        iconSrc: '/images/nav/lorry.png',
        values: { total_hours: 473.5, night_driving: 149.5, day_driving: 324, motorway: 98.5, aroad: 265, broad: 110 },
    },
    {
        id: 'ce',
        category: 'Category C+E (Articulated Vehicles and Drawbar Combinations)',
        iconSrc: '/images/nav/double-lorry.png',
        values: { total_hours: 160, night_driving: 89, day_driving: 71, motorway: 45, aroad: 89, broad: 26 },
    },
];

const COLS: { key: ColKey; label: string }[] = [
    { key: 'total_hours', label: 'Total Operational Hours' },
    { key: 'night_driving', label: 'Night Driving' },
    { key: 'day_driving', label: 'Day Driving' },
    { key: 'motorway', label: 'Motorway' },
    { key: 'aroad', label: 'A Road' },
    { key: 'broad', label: 'B Road' },
];

const VEHICLE_TABS: { id: string; label: string; icon?: string, width: number }[] = [
    { width: 30, id: 'motorcycle', label: 'Motorcycle', icon: '/images/nav/motorcycle.png' },
    { width: 30, id: 'car', label: 'Car', icon: '/images/nav/car.png' },
    { width: 26, id: 'delivery-truck', label: 'Delivery', icon: '/images/nav/delivery-truck.png' },
    { width: 30, id: 'minibus', label: 'Minibus', icon: '/images/nav/minibus.png' },
    { width: 24, id: 'motor-home', label: 'Motor-home', icon: '/images/nav/motor-home.png' },
    { width: 30, id: 'truck', label: 'Truck', icon: '/images/nav/truck.png' },
    { width: 30, id: 'lorry', label: 'Lorry', icon: '/images/nav/lorry.png' },
    { width: 36, id: 'double-lorry', label: 'Double', icon: '/images/nav/double-lorry.png' },
    { width: 24, id: 'tracktor', label: 'Tractor', icon: '/images/nav/tracktor.png' }, // matches your file name
];


// ---------- helpers ----------
const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.00$/, ''));

function sumTree(rows: RowNode[]): Record<ColKey, number> {
    const acc = { total_hours: 0, night_driving: 0, day_driving: 0, motorway: 0, aroad: 0, broad: 0 } as Record<ColKey, number>;
    const walk = (r: RowNode) => {
        (Object.keys(acc) as ColKey[]).forEach(k => (acc[k] += r.values[k] || 0));
        r.child?.forEach(walk);
    };
    rows.forEach(walk);
    return acc;
}

type FlatRow = { node: RowNode; depth: number; key: string; hasChildren: boolean };
const keyOf = (path: number[]) => path.join('-');

function flatten(rows: RowNode[], expanded: Set<string>, parentPath: number[] = []): FlatRow[] {
    const out: FlatRow[] = [];
    rows.forEach((r, i) => {
        const path = [...parentPath, i];
        const k = keyOf(path);
        const hasChildren = !!r.child?.length;
        out.push({ node: r, depth: path.length - 1, key: k, hasChildren });
        if (hasChildren && expanded.has(k)) {
            out.push(...flatten(r.child!, expanded, path));
        }
    });
    return out;
}

// ---------- component ----------
export default function OperationalHoursLegacy() {
    const [expanded, setExpanded] = useState<Set<string>>(new Set());

    const totals = useMemo(() => sumTree(DATA), []);
    const flat = useMemo(() => flatten(DATA, expanded), [expanded]);

    const headerBg = '';
    const headerText = 'text-white/95';

    return (
        <div className="rounded-2xl shadow-sm bg-white p-4 md:p-6 mt-8">
            <div className="flex justify-between items-center my-6">
                <h4 className="text-lg font-bold">Breakdown of Operational Hours</h4>
                <div className="flex items-center justify-end gap-6">
                    <div className='relative'>
                        <Button variant="outline" className="text-xs h-6 cursor-pointer">
                            All
                        </Button>
                        <div className='border-b-3 border-black/80 absolute -bottom-3 w-full' />
                    </div>
                    {
                        VEHICLE_TABS.map((item) => {
                            return (
                                <div className="cursor-pointer" key={item.id}>
                                    <img src={item.icon} className="h-6 w-auto" style={{ width: item.width, height: 'auto' }} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="overflow-auto border border-gray-200">
                <Table className="min-w-[900px] w-full">
                    {/* Header */}
                    <TableHeader>
                        <TableRow className={`bg-[#6B95A5] hover:bg-[#6B95A5] border-none`}>
                            <TableHead className="text-left font-medium text-white pt-5 px-5 pb-2">Class/Category</TableHead>
                            {COLS.map((c, i) => (
                                <TableHead key={c.key} className={`text-right font-medium text-white`}>
                                    {c.label}
                                </TableHead>
                            ))}
                            <TableHead className="w-12" />
                        </TableRow>
                        {/* Summary row under header with same bg */}
                        <TableRow className={`bg-[#6B95A5] hover:bg-[#6B95A5] ${headerText}`}>
                            <TableHead className="font-medium text-right">Total:</TableHead>
                            {COLS.map(c => (
                                <TableHead key={`sum-${c.key}`} className="text-center font-semibold">
                                    {fmt(totals[c.key])}
                                </TableHead>
                            ))}
                            <TableHead />
                        </TableRow>
                    </TableHeader>

                    {/* Body */}
                    <TableBody>
                        {flat.map(({ node, depth, key, hasChildren }) => {
                            const isOpen = expanded.has(key);
                            const bg =
                                depth === 0 ? 'bg-gray-200' :
                                    depth === 1 ? 'bg-gray-100' : 'bg-white';

                            return (
                                <TableRow key={key} className={`${bg} border-b border-white`}>
                                    {/* first col: icon + label with indent */}
                                    <TableCell className='px-8'>
                                        <div className="flex items-center gap-3" style={{ paddingLeft: depth * 24 }}>
                                            {node.iconSrc && (
                                                <Image
                                                    src={node.iconSrc}
                                                    alt=""
                                                    width={node.iconSize ?? 20}
                                                    height={node.iconSize ?? 20}
                                                    className="opacity-90"
                                                />
                                            )}
                                            <span className={depth === 0 ? 'font-semibold' : depth === 1 ? 'font-medium' : 'text-gray-800'}>
                                                {node.category}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* metrics */}
                                    {COLS.map((c) => (
                                        <TableCell key={`${key}-${c.key}`} className="text-center px-4 py-2">
                                            {c.key === 'total_hours' ? (
                                                <span className="inline-flex items-center justify-center min-w-[76px] px-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 text-gray-900 font-medium">
                                                    {fmt(node.values[c.key])}
                                                </span>
                                            ) : (
                                                <span className="text-gray-900">{fmt(node.values[c.key])}</span>
                                            )}
                                        </TableCell>
                                    ))}

                                    {/* right-side expand button */}
                                    <TableCell className="text-right">
                                        {hasChildren ? (
                                            <button
                                                onClick={() =>
                                                    setExpanded(prev => {
                                                        const next = new Set(prev);
                                                        next.has(key) ? next.delete(key) : next.add(key);
                                                        return next;
                                                    })
                                                }
                                                aria-expanded={isOpen}
                                                className="ml-auto w-7 h-7 rounded-md border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50"
                                                title={isOpen ? 'Collapse' : 'Expand'}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                                    <path
                                                        d={isOpen ? 'M5 12l5-5 5 5' : 'M5 8l5 5 5-5'}
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
