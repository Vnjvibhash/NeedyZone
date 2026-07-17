# NeedyZone - Smart Home Automation Manufacturer

*A professional website for a smart home automation manufacturer specializing in CCTV cameras and IoT smart switchboards*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://needyzone.vercel.app/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Built with v0](https://img.shields.io/badge/Built%20with-Innovateria.in-black?style=for-the-badge)](https://Innovateria.in)

## Overview

NeedyZone is a comprehensive B2B/B2C website for a smart home automation manufacturer. The site showcases CCTV camera systems and intelligent electrical switchboards for residential, commercial, and industrial applications. Built with Next.js and React, it features an interactive map for office locations, detailed product catalogs, dealer inquiry forms, and manufacturing information.

## Live Demo

Visit the deployed site: **[https://needyzone.vercel.app/](https://needyzone.vercel.app/)**

## Features

- **Homepage** - Professional hero section, trust badges, product categories, statistics, and features showcase
- **CCTV Products** - Browse 6 camera types with detailed specifications and lead inquiry forms
- **Smart Switchboards** - Product listing with platform compatibility information
- **Manufacturing & Quality** - Company certifications (ISO, CE, RoHS, FCC) and production capabilities
- **Dealer Inquiry** - Partnership opportunities with different dealer types and FAQ section
- **Contact Page** - Interactive map with office locations, contact methods, and inquiry forms
- **Responsive Design** - Mobile-first approach with Tailwind CSS styling

## Contact Information

- **Phone**: +91 9717798826
- **Email**: info@needyzone.com
- **Office Address**: Phase-5 Aya Nagar, Near CBR Hospital, New Delhi - 110047, India
- **Main Address**: N-346/A Shanti Colony, Mandi Village, New Delhi - 110047, India

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Maps**: Leaflet for interactive office location display
- **Deployment**: Vercel

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/Vnjvibhash/NeedyZone.git
cd NeedyZone
```

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── contact/              # Contact page with interactive map
│   ├── dealers/              # Dealer inquiry page
│   ├── manufacturing/        # Manufacturing & quality page
│   └── products/             # Product pages
│       ├── cctv/             # CCTV camera products
│       └── switchboards/     # Smart switchboard products
├── components/
│   ├── header.tsx            # Navigation header
│   ├── footer.tsx            # Footer
│   ├── office-location-map.tsx # Interactive map component
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── products-data.ts      # Product catalog data
│   └── utils.ts              # Utility functions
└── public/                   # Static assets and generated images
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Synchronization with Innovateria.in

This repository stays in sync with the Innovateria.in deployment. Changes made in v0 are automatically pushed to this repository.

## License

This project is proprietary and confidential. All rights reserved.
