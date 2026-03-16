'use client'

import { useEffect, useRef } from 'react'

interface Office {
  name: string
  address: string
  lat: number
  lng: number
}

const offices: Office[] = [
  {
    name: "Office Address",
    address: "Phase-5 Aya Nagar, Near CBR Hospital, New Delhi - 110047",
    lat: 28.5494,
    lng: 77.1386,
  },
  {
    name: "Main Address",
    address: "N-346/A Shanti Colony, Mandi Village, New Delhi - 110047",
    lat: 28.5355,
    lng: 77.1276,
  },
]

export function OfficeLocationMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)

  useEffect(() => {
    // Dynamically load Leaflet library
    const loadLeaflet = async () => {
      const L = await import('leaflet')
      
      if (!mapContainer.current) return

      // Initialize map centered on New Delhi
      if (!map.current) {
        map.current = L.map(mapContainer.current).setView([28.5494, 77.1386], 13)

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map.current)
      }

      // Add markers for each office
      offices.forEach((office) => {
        const marker = L.marker([office.lat, office.lng])
          .addTo(map.current)
          .bindPopup(
            `<div class="font-semibold text-sm">${office.name}</div><div class="text-xs text-gray-600">${office.address}</div>`
          )

        // Open popup for the first marker
        if (office.name === "Office Address") {
          marker.openPopup()
        }
      })
    }

    loadLeaflet().catch(console.error)

    return () => {
      // Cleanup
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <div
      ref={mapContainer}
      className="aspect-video w-full rounded-xl border border-border overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  )
}
