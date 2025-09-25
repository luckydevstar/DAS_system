'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { Info } from 'lucide-react';

type Props = {
    title?: string;
    // ISO A2 codes that should appear as “Areas driven in”
    drivenIsoA2?: string[];
    // optional hours per country (ISO A2)
    hoursByCountry?: Record<string, number>;
};

const containerStyle: React.CSSProperties = { width: '100%', flexGrow: 1, borderRadius: 12 };
const defaultCenter = { lat: 50.1109, lng: 8.6821 }; // Frankfurt-ish
const libraries: ('places')[] = ['places'];

// Soft colors like your mock
const COLOR_DRIVEN = '#6B95A5';
const COLOR_NOT_DRIVEN = '#E5E7EB';
const STROKE = '#567889';

export default function DrivingFootprint({
    title = 'Driving Footprint',
    drivenIsoA2 = ['DE', 'FR', 'BE', 'NL', 'LU', 'AT', 'CZ', 'PL', 'HU', 'IT', 'ES', 'PT'],
    hoursByCountry = { DE: 1250, FR: 890, NL: 320, BE: 240, PL: 610, CZ: 420, AT: 300, IT: 730 }
}: Props) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
        libraries
    });

    const mapRef = useRef<google.maps.Map | null>(null);
    const autoRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [selectedIso, setSelectedIso] = useState<string | null>(null);

    const drivenSet = useMemo(() => new Set(drivenIsoA2.map(s => s.toUpperCase())), [drivenIsoA2]);
    const selectedHours = selectedIso ? (hoursByCountry[selectedIso] ?? 0) : 0;

    // useEffect(() => {
    //     if (!isLoaded || !mapRef.current) return;

    //     const map = mapRef.current;

    //     // Load country polygons (Natural Earth via datasets/geo-countries)
    //     // You can host your own GeoJSON if you prefer.
    //     map.data.loadGeoJson(
    //         'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
    //     );

    //     // Style countries by driven/not-driven
    //     map.data.setStyle((feature) => {
    //         const isoA2 =
    //             (feature.getProperty('ISO_A2') || feature.getProperty('ISO3166-1-Alpha-2') || '').toString().toUpperCase();

    //         const driven = drivenSet.has(isoA2);
    //         return {
    //             // Fill
    //             fillColor: driven ? COLOR_DRIVEN : COLOR_NOT_DRIVEN,
    //             fillOpacity: driven ? 0.9 : 0.6,
    //             // Stroke
    //             strokeColor: STROKE,
    //             strokeOpacity: driven ? 0.9 : 0.5,
    //             strokeWeight: driven ? 1 : 0.5,
    //             zIndex: driven ? 2 : 1,
    //         };
    //     });

    //     // Click to select country and show hours
    //     const clickListener = map.data.addListener('click', (e: any) => {
    //         const f = e.feature;
    //         const isoA2 =
    //             (f.getProperty('ISO_A2') || f.getProperty('ISO3166-1-Alpha-2') || '').toString().toUpperCase() || null;
    //         if (!isoA2) return;

    //         setSelectedIso(isoA2);

    //         // Fit bounds to clicked country
    //         const b = new google.maps.LatLngBounds();
    //         f.getGeometry()?.forEachLatLng((ll: any) => b.extend(ll));
    //         if (!b.isEmpty()) map.fitBounds(b, { top: 40, right: 40, bottom: 40, left: 40 });
    //     });

    //     return () => {
    //         clickListener.remove();
    //         map.data.forEach((f) => map.data.remove(f)); // cleanup features
    //     };
    // }, [isLoaded, drivenSet]);

    if (!isLoaded) {
        return (
            <div className="rounded-2xl shadow-sm p-6 bg-white">
                <div className="text-xl font-semibold mb-4">{title}</div>
                <div className="h-[360px] rounded-xl bg-gray-100 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="rounded-2xl shadow-sm px-6 py-8 bg-white">
            <div className="flex gap-8">
                <div className="w-[200px]">
                    <div className="text-2xl font-semibold">{title}</div>
                    <div className="mt-auto space-y-3 px-4 py-8">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="inline-block w-4 h-4 rounded bg-[#E5E7EB] border border-gray-300" />
                            Areas NOT driven in
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="inline-block w-4 h-4 rounded bg-[#6B95A5]" />
                            Areas driven in
                        </div>
                    </div>
                    <div className="rounded-xl border border-[#76A0B5] p-4 h-[360px] flex flex-col mx-4">
                        <div className="text-xs text-gray-500 mb-3">Total hours in selected area:</div>
                    </div>
                </div>

                {/* Right: Map + search */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4 mt-2">
                        <div className='flex items-center gap-2'>
                            <Info size={24} />
                            <h5 className='text-sm'>
                                Click on map for more info
                            </h5>
                        </div>
                        <Autocomplete
                            onLoad={(a) => (autoRef.current = a)}
                            onPlaceChanged={() => {
                                const place = autoRef.current?.getPlace();
                                const map = mapRef.current;
                                if (!place || !place.geometry || !map) return;
                                if (place.geometry.viewport) {
                                    map.fitBounds(place.geometry.viewport);
                                } else if (place.geometry.location) {
                                    map.setCenter(place.geometry.location);
                                    map.setZoom(6);
                                }
                            }}
                        >
                            <input
                                placeholder="Search Country, City, Town"
                                className="w-72 h-9 rounded-md border border-gray-300 px-3 text-sm outline-none"
                                type="text"
                            />
                        </Autocomplete>
                    </div>

                    <GoogleMap
                        onLoad={(map) => {
                            mapRef.current = map;
                            map.setOptions({
                                mapTypeControl: false,
                                fullscreenControl: false,
                                streetViewControl: false,
                                zoomControl: true,
                                zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
                                gestureHandling: 'greedy',
                                backgroundColor: '#ffffff',
                                styles: [
                                    // subtle base style; optional
                                    { featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
                                    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
                                    { featureType: 'road', stylers: [{ visibility: 'off' }] },
                                    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
                                ],
                            } as google.maps.MapOptions);
                        }}
                        mapContainerStyle={containerStyle}
                        center={defaultCenter}
                        zoom={4}
                    />
                </div>
            </div>
        </div>
    );
}