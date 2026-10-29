"use client";

import React, { useEffect, useRef, useState } from "react";

interface NeighborhoodMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  score: string;
  featured?: boolean;
}

const NEIGHBORHOOD_PINS: NeighborhoodMarker[] = [
  {
    id: "san-lorenzo",
    name: "San Lorenzo",
    lat: 43.7749,
    lng: 11.2533,
    score: "9.3 / 10",
  },
  {
    id: "santa-croce",
    name: "Santa Croce",
    lat: 43.7687,
    lng: 11.2625,
    score: "9.5 / 10",
    featured: true,
  },
  {
    id: "santo-spirito",
    name: "Santo Spirito",
    lat: 43.7672,
    lng: 11.2479,
    score: "9.0 / 10",
  },
  {
    id: "oltrarno",
    name: "Oltrarno",
    lat: 43.7655,
    lng: 11.2530,
    score: "9.2 / 10",
  },
  {
    id: "campo-di-marte",
    name: "Campo di Marte",
    lat: 43.7785,
    lng: 11.2785,
    score: "9.4 / 10",
  },
];

interface FlorenceSafetyMapProps {
  selectedId?: string;
  onSelectNeighborhood?: (id: string) => void;
}

export default function FlorenceSafetyMap({
  selectedId,
  onSelectNeighborhood,
}: FlorenceSafetyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [activePin, setActivePin] = useState<string>(selectedId || "santa-croce");

  useEffect(() => {
    let isMounted = true;

    // Inject leaflet css tag if not present
    if (typeof document !== "undefined" && !document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Dynamically require Leaflet on client side
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Prevent re-initialization
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Center of Florence historic center
      const centerLat = 43.7705;
      const centerLng = 11.2570;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // High quality CartoDB Positron light pastel tiles matching screenshot perfectly
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(map);

      // Create pins
      NEIGHBORHOOD_PINS.forEach((pin) => {
        const isFeatured = pin.id === activePin || pin.featured;

        const html = isFeatured
          ? `<div class="px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-emerald-500 shadow-xl flex flex-col items-start gap-0.5 whitespace-nowrap cursor-pointer transform hover:scale-105 transition-all">
               <div class="flex items-center gap-1.5">
                 <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <span class="font-extrabold text-[12px] text-slate-900 leading-tight">${pin.name}</span>
               </div>
               <span class="text-[10px] font-bold text-emerald-600 pl-3.5 leading-tight">Safety Score ${pin.score}</span>
             </div>`
          : `<div class="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:border-emerald-500 hover:scale-105 transition-all">
               <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
               <span class="font-bold text-[12px] text-slate-900 leading-tight">${pin.name}</span>
             </div>`;

        const icon = L.divIcon({
          className: "custom-florence-pin",
          html,
          iconSize: isFeatured ? [150, 48] : [110, 32],
          iconAnchor: isFeatured ? [75, 24] : [55, 16],
        });

        const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);

        marker.on("click", () => {
          setActivePin(pin.id);
          if (onSelectNeighborhood) {
            onSelectNeighborhood(pin.id);
          }
        });

        markersRef.current[pin.id] = marker;
      });

      // Fly to selection if provided
      if (selectedId && markersRef.current[selectedId]) {
        const target = NEIGHBORHOOD_PINS.find((p) => p.id === selectedId);
        if (target) {
          map.flyTo([target.lat, target.lng], 15, { duration: 1.2 });
        }
      }
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update selection when prop changes
  useEffect(() => {
    if (selectedId && mapInstanceRef.current) {
      setActivePin(selectedId);
      const target = NEIGHBORHOOD_PINS.find((p) => p.id === selectedId);
      if (target) {
        mapInstanceRef.current.flyTo([target.lat, target.lng], 15, { duration: 1.2 });
      }
    }
  }, [selectedId]);

  return (
    <div className="relative w-full h-full min-h-[350px] lg:min-h-[420px] rounded-2xl overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full min-h-[350px] lg:min-h-[420px] z-10" />
      {/* Map Interactive Badge */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider shadow-xs flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Live Interactive Florence Map</span>
      </div>
    </div>
  );
}
