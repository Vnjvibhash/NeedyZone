import fs from "fs"
import path from "path"

export interface Product {
  id: string
  name: string
  category: "cctv" | "switchboard"
  description: string
  image: string
  price: string
  badge?: string
  specs: {
    label: string
    value: string
  }[]
  features: string[]
}

const defaultCctvProducts: Product[] = [
  {
    id: "sv-dome-4k",
    name: "SV-Dome 4K Pro",
    category: "cctv",
    description:
      "Premium 4K dome camera with 360° coverage, perfect for indoor surveillance in offices and retail spaces.",
    image: "/professional-dome-cctv-camera-white-background.jpg",
    price: "$299",
    badge: "Best Seller",
    specs: [
      { label: "Resolution", value: "4K (8MP)" },
      { label: "Field of View", value: "360°" },
      { label: "Night Vision", value: "30m IR" },
      { label: "Storage", value: "Up to 256GB SD" },
      { label: "Power", value: "PoE / 12V DC" },
      { label: "Weather Rating", value: "IP66" },
    ],
    features: [
      "AI-powered motion detection",
      "Two-way audio communication",
      "Remote pan/tilt/zoom control",
      "Smart phone notifications",
      "Cloud & local storage options",
      "Easy ceiling mount installation",
    ],
  },
  {
    id: "sv-bullet-4k",
    name: "SV-Bullet 4K Ultra",
    category: "cctv",
    description:
      "Rugged outdoor bullet camera with advanced night vision and weatherproof design for perimeter security.",
    image: "/outdoor-bullet-cctv-camera-white-background.jpg",
    price: "$349",
    badge: "New",
    specs: [
      { label: "Resolution", value: "4K (8MP)" },
      { label: "Field of View", value: "110°" },
      { label: "Night Vision", value: "50m IR" },
      { label: "Storage", value: "Up to 512GB SD" },
      { label: "Power", value: "PoE / 12V DC" },
      { label: "Weather Rating", value: "IP67" },
    ],
    features: [
      "50m infrared night vision",
      "Vehicle & license plate detection",
      "Vandal-resistant metal housing",
      "Built-in heater for cold weather",
      "Adjustable motion zones",
      "H.265+ video compression",
    ],
  },
  {
    id: "sv-ptz-8k",
    name: "SV-PTZ 8K Industrial",
    category: "cctv",
    description:
      "Industrial-grade PTZ camera with 36x optical zoom, designed for factories and large commercial areas.",
    image: "/ptz-industrial-cctv-camera-white-background.jpg",
    price: "$899",
    specs: [
      { label: "Resolution", value: "8K (32MP)" },
      { label: "Optical Zoom", value: "36x" },
      { label: "Night Vision", value: "200m IR" },
      { label: "Storage", value: "NVR Compatible" },
      { label: "Power", value: "PoE++ / 24V AC" },
      { label: "Weather Rating", value: "IP68" },
    ],
    features: [
      "36x optical zoom capability",
      "Auto-tracking of moving objects",
      "360° continuous rotation",
      "Wiper for lens cleaning",
      "Preset patrol routes",
      "Industrial temperature range",
    ],
  },
  {
    id: "sv-mini-2k",
    name: "SV-Mini 2K Compact",
    category: "cctv",
    description: "Compact indoor camera ideal for home monitoring and small retail stores with discreet installation.",
    image: "/mini-compact-indoor-camera-white-background.jpg",
    price: "$149",
    specs: [
      { label: "Resolution", value: "2K (4MP)" },
      { label: "Field of View", value: "140°" },
      { label: "Night Vision", value: "10m IR" },
      { label: "Storage", value: "Up to 128GB SD" },
      { label: "Power", value: "USB-C / 5V DC" },
      { label: "Weather Rating", value: "Indoor Only" },
    ],
    features: [
      "Ultra-compact design",
      "Magnetic mount included",
      "Person detection AI",
      "Baby/pet monitoring mode",
      "Two-way audio",
      "Privacy mode scheduling",
    ],
  },
  {
    id: "sv-fisheye-6mp",
    name: "SV-Fisheye 6MP Panoramic",
    category: "cctv",
    description: "360° panoramic fisheye camera providing complete room coverage with a single installation point.",
    image: "/fisheye-panoramic-cctv-camera-white-background.jpg",
    price: "$449",
    badge: "Popular",
    specs: [
      { label: "Resolution", value: "6MP" },
      { label: "Field of View", value: "360° Panoramic" },
      { label: "Night Vision", value: "15m IR" },
      { label: "Storage", value: "Up to 256GB SD" },
      { label: "Power", value: "PoE / 12V DC" },
      { label: "Weather Rating", value: "IP65" },
    ],
    features: [
      "Single camera, full room coverage",
      "Dewarping view modes",
      "People counting analytics",
      "Heat mapping capability",
      "Virtual PTZ function",
      "Flush ceiling mount",
    ],
  },
  {
    id: "sv-nvr-16ch",
    name: "SV-NVR 16-Channel",
    category: "cctv",
    description: "Professional 16-channel network video recorder with RAID storage and enterprise management features.",
    image: "/network-video-recorder-nvr-device-white-background.jpg",
    price: "$699",
    specs: [
      { label: "Channels", value: "16 IP Cameras" },
      { label: "Max Resolution", value: "8K Recording" },
      { label: "Storage", value: "Up to 40TB" },
      { label: "RAID Support", value: "RAID 0/1/5/10" },
      { label: "Bandwidth", value: "320Mbps" },
      { label: "Form Factor", value: "2U Rack Mount" },
    ],
    features: [
      "16 simultaneous 4K streams",
      "Redundant power supply option",
      "Remote viewing apps",
      "ONVIF compatible",
      "Smart search & playback",
      "Failover recording support",
    ],
  },
]

const defaultSwitchboardProducts: Product[] = [
  {
    id: "sb-home-8",
    name: "SmartPanel Home 8-Way",
    category: "switchboard",
    description: "8-way smart switchboard for modern homes with app control and energy monitoring capabilities.",
    image: "/smart-home-switchboard-panel-white-background.jpg",
    price: "$399",
    badge: "Best Seller",
    specs: [
      { label: "Circuits", value: "8 Ways" },
      { label: "Max Load", value: "63A" },
      { label: "Connectivity", value: "WiFi / Zigbee" },
      { label: "Display", value: "LCD Energy Monitor" },
      { label: "Compatibility", value: "Alexa / Google" },
      { label: "Installation", value: "Surface / Flush" },
    ],
    features: [
      "Individual circuit control",
      "Real-time energy monitoring",
      "Scheduling & automation",
      "Voice assistant compatible",
      "Surge protection built-in",
      "Mobile app included",
    ],
  },
  {
    id: "sb-pro-16",
    name: "SmartPanel Pro 16-Way",
    category: "switchboard",
    description:
      "Professional 16-way panel for offices and commercial buildings with advanced load management features.",
    image: "/professional-commercial-switchboard-panel-white-ba.jpg",
    price: "$799",
    badge: "New",
    specs: [
      { label: "Circuits", value: "16 Ways" },
      { label: "Max Load", value: "100A" },
      { label: "Connectivity", value: "WiFi / Ethernet / Zigbee" },
      { label: "Display", value: "7-inch Touch Panel" },
      { label: "Compatibility", value: "BMS Integration" },
      { label: "Installation", value: "Surface / Flush" },
    ],
    features: [
      "Load balancing automation",
      "Peak demand management",
      "Multi-zone scheduling",
      "BMS/SCADA integration",
      "Energy reports & analytics",
      "Remote diagnostics",
    ],
  },
  {
    id: "sb-industrial-32",
    name: "SmartPanel Industrial 32-Way",
    category: "switchboard",
    description: "Industrial-grade 32-way panel designed for factories with heavy machinery load management.",
    image: "/industrial-electrical-switchboard-panel-white-back.jpg",
    price: "$1,499",
    specs: [
      { label: "Circuits", value: "32 Ways" },
      { label: "Max Load", value: "200A" },
      { label: "Connectivity", value: "Industrial Ethernet" },
      { label: "Display", value: "10-inch HMI Panel" },
      { label: "Compatibility", value: "PLC / SCADA" },
      { label: "Installation", value: "Panel / Cabinet" },
    ],
    features: [
      "Motor starter integration",
      "Predictive maintenance alerts",
      "Power factor correction",
      "Harmonic filtering",
      "Industrial protocol support",
      "Redundant communication",
    ],
  },
  {
    id: "sb-retail-12",
    name: "SmartPanel Retail 12-Way",
    category: "switchboard",
    description: "Perfect for retail stores and restaurants with lighting scenes and HVAC integration.",
    image: "/retail-store-switchboard-panel-white-background.jpg",
    price: "$599",
    badge: "Popular",
    specs: [
      { label: "Circuits", value: "12 Ways" },
      { label: "Max Load", value: "80A" },
      { label: "Connectivity", value: "WiFi / LoRa" },
      { label: "Display", value: "5-inch Color LCD" },
      { label: "Compatibility", value: "POS Integration" },
      { label: "Installation", value: "Surface / Flush" },
    ],
    features: [
      "Lighting scene control",
      "HVAC scheduling",
      "Occupancy-based automation",
      "Energy cost tracking",
      "Multi-location management",
      "Alarm & notification system",
    ],
  },
  {
    id: "sb-module-wifi",
    name: "SmartModule WiFi Relay",
    category: "switchboard",
    description:
      "Add-on WiFi relay module to retrofit existing switchboards with smart capabilities circuit by circuit.",
    image: "/wifi-relay-module-electrical-device-white-backgrou.jpg",
    price: "$49",
    specs: [
      { label: "Circuits", value: "1 Way" },
      { label: "Max Load", value: "16A" },
      { label: "Connectivity", value: "WiFi 2.4GHz" },
      { label: "Display", value: "LED Status" },
      { label: "Compatibility", value: "Universal" },
      { label: "Installation", value: "DIN Rail" },
    ],
    features: [
      "Retrofit any switchboard",
      "No neutral wire required",
      "Power consumption monitoring",
      "Timer & countdown",
      "Works with smart home apps",
      "Easy DIN rail mount",
    ],
  },
  {
    id: "sb-gateway",
    name: "SmartHub Gateway",
    category: "switchboard",
    description: "Central hub that connects all smart switchboard modules and provides unified control and monitoring.",
    image: "/smart-home-gateway-hub-device-white-background.jpg",
    price: "$199",
    specs: [
      { label: "Devices", value: "Up to 100" },
      { label: "Range", value: "30m Indoor" },
      { label: "Connectivity", value: "WiFi / Ethernet / Zigbee" },
      { label: "Display", value: "Status LEDs" },
      { label: "Compatibility", value: "All SmartPanel" },
      { label: "Installation", value: "Wall / Desktop" },
    ],
    features: [
      "Central device management",
      "Cross-device automation",
      "Local processing",
      "Cloud backup",
      "API for developers",
      "Multi-user access control",
    ],
  },
]

const productsFilePath = path.join(process.cwd(), "data", "products.json")

export function getStoredProducts(): { cctv: Product[]; switchboard: Product[] } {
  try {
    if (fs.existsSync(productsFilePath)) {
      const data = fs.readFileSync(productsFilePath, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Failed to read products file, falling back to defaults", error)
  }
  return { cctv: defaultCctvProducts, switchboard: defaultSwitchboardProducts }
}

export function writeStoredProducts(data: { cctv: Product[]; switchboard: Product[] }) {
  try {
    const dir = path.dirname(productsFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2), "utf8")
    reloadProducts()
  } catch (error) {
    console.error("Failed to write products file", error)
  }
}

export const cctvProducts: Product[] = []
export const switchboardProducts: Product[] = []

export function reloadProducts() {
  const data = getStoredProducts()
  cctvProducts.length = 0
  cctvProducts.push(...data.cctv)
  switchboardProducts.length = 0
  switchboardProducts.push(...data.switchboard)
}

// Initial load
reloadProducts()

export function getProductById(id: string): Product | undefined {
  const data = getStoredProducts()
  return [...data.cctv, ...data.switchboard].find((p) => p.id === id)
}

export function getProductsByCategory(category: "cctv" | "switchboard"): Product[] {
  const data = getStoredProducts()
  return category === "cctv" ? data.cctv : data.switchboard
}
