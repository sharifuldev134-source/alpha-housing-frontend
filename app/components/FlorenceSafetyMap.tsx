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
  const [engine, setEngine] = useState<"google" | "leaflet">("google");

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    let isMounted = true;

    // Helper: Initialize Leaflet Map
    const initLeafletMap = () => {
      if (!isMounted || !mapContainerRef.current) return;

      // Inject Leaflet CSS
      if (typeof document !== "undefined" && !document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      import("leaflet").then((L) => {
        if (!isMounted || !mapContainerRef.current) return;

        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.remove();
          } catch {
            // ignore
          }
          mapInstanceRef.current = null;
        }

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
        setEngine("leaflet");

        // CartoDB Positron clean light pastel tiles matching screenshot
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            maxZoom: 19,
            subdomains: "abcd",
          }
        ).addTo(map);

        // Add custom styled pins
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

        if (selectedId && markersRef.current[selectedId]) {
          const target = NEIGHBORHOOD_PINS.find((p) => p.id === selectedId);
          if (target) {
            map.flyTo([target.lat, target.lng], 15, { duration: 1.2 });
          }
        }
      });
    };

    // Helper: Initialize Google Maps
    const initGoogleMap = () => {
      const g = (window as any).google;
      if (!g || !g.maps || !mapContainerRef.current) {
        initLeafletMap();
        return;
      }

      if (mapInstanceRef.current) {
        try {
          if (typeof mapInstanceRef.current.remove === "function") {
            mapInstanceRef.current.remove();
          }
        } catch {
          // ignore
        }
        mapInstanceRef.current = null;
      }

      try {
        const center = { lat: 43.7705, lng: 11.2570 };

        const map = new g.maps.Map(mapContainerRef.current, {
          center,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#f8f9fa" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#525252" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#f8f9fa" }] },
            { featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{ color: "#0f172a" }, { weight: 1.5 }] },
            { featureType: "poi", stylers: [{ visibility: "simplified" }] },
            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dcfce7" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
            { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#f1f5f9" }] },
            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e2e8f0" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#c7d2fe" }] },
          ],
        });

        mapInstanceRef.current = map;
        setEngine("google");

        // Add Google Maps markers for each neighborhood
        NEIGHBORHOOD_PINS.forEach((pin) => {
          const isFeatured = pin.id === activePin || pin.featured;

          const marker = new g.maps.Marker({
            position: { lat: pin.lat, lng: pin.lng },
            map,
            title: `${pin.name} (Safety: ${pin.score})`,
            icon: {
              path: g.maps.SymbolPath.CIRCLE,
              scale: isFeatured ? 9 : 7,
              fillColor: isFeatured ? "#059669" : "#10B981",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2.5,
            },
          });

          const infoWindow = new g.maps.InfoWindow({
            content: `
              <div style="font-family: inherit; padding: 4px; min-width: 130px; text-align: left;">
                <div style="font-weight: 800; font-size: 13px; color: #0f172a; margin-bottom: 2px;">${pin.name}</div>
                <div style="font-size: 11px; font-weight: 700; color: #059669;">Safety Score: ${pin.score}</div>
              </div>
            `,
          });

          if (isFeatured) {
            infoWindow.open(map, marker);
          }

          marker.addListener("click", () => {
            setActivePin(pin.id);
            infoWindow.open(map, marker);
            if (onSelectNeighborhood) {
              onSelectNeighborhood(pin.id);
            }
          });

          markersRef.current[pin.id] = { marker, infoWindow };
        });
      } catch (err) {
        console.warn("Google Maps init exception, fallback to Leaflet:", err);
        initLeafletMap();
      }
    };

    // Catch Google Maps auth or billing failures gracefully
    (window as any).gm_authFailure = () => {
      console.warn("Google Maps authentication failure. Smoothly switching to CartoDB tiles.");
      initLeafletMap();
    };

    // Attempt to load Google Maps script with the user's API Key
    if (apiKey) {
      if ((window as any).google && (window as any).google.maps) {
        initGoogleMap();
      } else {
        const existingScript = document.getElementById("google-maps-script");
        if (!existingScript) {
          const script = document.createElement("script");
          script.id = "google-maps-script";
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            if (isMounted) initGoogleMap();
          };
          script.onerror = () => {
            console.warn("Google Maps script load error, falling back to Leaflet.");
            if (isMounted) initLeafletMap();
          };
          document.head.appendChild(script);
        } else {
          existingScript.addEventListener("load", () => {
            if (isMounted) initGoogleMap();
          });
        }
      }
    } else {
      initLeafletMap();
    }

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        try {
          if (typeof mapInstanceRef.current.remove === "function") {
            mapInstanceRef.current.remove();
          }
        } catch {
          // ignore
        }
        mapInstanceRef.current = null;
      }
    };
  }, [apiKey]);

  // Handle selectedId update
  useEffect(() => {
    if (selectedId && mapInstanceRef.current) {
      setActivePin(selectedId);
      const target = NEIGHBORHOOD_PINS.find((p) => p.id === selectedId);
      if (target) {
        if (engine === "google" && mapInstanceRef.current.panTo) {
          mapInstanceRef.current.panTo({ lat: target.lat, lng: target.lng });
          mapInstanceRef.current.setZoom(15);
          const item = markersRef.current[selectedId];
          if (item && item.infoWindow && item.marker) {
            item.infoWindow.open(mapInstanceRef.current, item.marker);
          }
        } else if (engine === "leaflet" && mapInstanceRef.current.flyTo) {
          mapInstanceRef.current.flyTo([target.lat, target.lng], 15, { duration: 1.2 });
        }
      }
    }
  }, [selectedId, engine]);

  return (
    <div className="relative w-full h-full min-h-[340px] lg:min-h-[420px] rounded-2xl overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full min-h-[340px] lg:min-h-[420px] z-10" />

      {/* Map Badge with Google Maps Brand / Status */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none px-3 py-1 rounded-xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-[10.5px] font-bold text-slate-800 dark:text-slate-100 shadow-sm flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>
          {engine === "google"
            ? "Google Maps API • Florence, Italy"
            : "Florence Safety & Location Map"}
        </span>
      </div>
    </div>
  );
}
