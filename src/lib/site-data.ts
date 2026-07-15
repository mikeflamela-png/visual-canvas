import heroTahoe from "@/assets/hero-tahoe.jpg";
import heroYosemite from "@/assets/hero-yosemite.jpg";
import heroSailboat from "@/assets/hero-sailboat.jpg";
import heroPadel from "@/assets/hero-padel.jpg";
import heroBigsur from "@/assets/hero-bigsur.jpg";
import heroGgb from "@/assets/hero-ggb.jpg";

import taosP from "@/assets/campaign-taos-preview.jpg";
import taosF from "@/assets/campaign-taos-final.jpg";
import thermosP from "@/assets/campaign-thermos-preview.jpg";
import thermosF from "@/assets/campaign-thermos-final.jpg";
import kohanaP from "@/assets/campaign-kohana-preview.jpg";
import kohanaF from "@/assets/campaign-kohana-final.jpg";
import boteP from "@/assets/campaign-bote-preview.jpg";
import boteF from "@/assets/campaign-bote-final.jpg";
import clutchP from "@/assets/campaign-clutch-preview.jpg";
import clutchF from "@/assets/campaign-clutch-final.jpg";
import desoiP from "@/assets/campaign-desoi-preview.jpg";
import desoiF from "@/assets/campaign-desoi-final.jpg";

import micah from "@/assets/talent-micah.jpg";
import natalia from "@/assets/talent-natalia.jpg";
import nile from "@/assets/talent-nile.jpg";
import rachel from "@/assets/talent-rachel.jpg";
import ashley from "@/assets/talent-ashley.jpg";
import couple from "@/assets/talent-couple.jpg";
import friends from "@/assets/talent-friends.jpg";
import family from "@/assets/talent-family.jpg";

export const heroSlides = [
  { src: heroTahoe, label: "Lake Tahoe" },
  { src: heroYosemite, label: "Yosemite" },
  { src: heroSailboat, label: "Sailboat" },
  { src: heroPadel, label: "Padel" },
  { src: heroBigsur, label: "Big Sur" },
  { src: heroGgb, label: "Golden Gate Bridge" },
];

export type Campaign = {
  slug: string;
  brand: string;
  tagline: string;
  location: string;
  preview: string;
  final: string;
  story: string;
};

export const campaigns: Campaign[] = [
  { slug: "taos", brand: "Taos", tagline: "Morning ritual, high desert.", location: "Taos, New Mexico", preview: taosP, final: taosF, story: "A slow-morning campaign built around handmade ceramics and the quiet of a mountain cabin." },
  { slug: "thermos", brand: "Thermos", tagline: "Kept cold for the climb.", location: "Alpine Sierra", preview: thermosP, final: thermosF, story: "Product-forward outdoor storytelling shot at first light, before the crews arrived." },
  { slug: "kohana", brand: "Kohana", tagline: "Warm water, quiet linen.", location: "Tahiti", preview: kohanaP, final: kohanaF, story: "An understated swimwear film letting light and horizon do the work." },
  { slug: "bote", brand: "BŌTE", tagline: "First paddle. Glass water.", location: "Lake Tahoe", preview: boteP, final: boteF, story: "A single-hero campaign, one board, one dock, one morning." },
  { slug: "clutch", brand: "Clutch", tagline: "A city, softly held.", location: "Manhattan", preview: clutchP, final: clutchF, story: "Editorial still-life at home, positioning leather goods as everyday luxury." },
  { slug: "de-soi", brand: "De Soi", tagline: "Golden hour, olive shade.", location: "Napa Valley", preview: desoiP, final: desoiF, story: "A slow aperitivo world, film-warm and unhurried." },
];

export const talent = [
  { name: "Micah", src: micah },
  { name: "Natalia", src: natalia },
  { name: "Nile", src: nile },
  { name: "Rachel", src: rachel },
  { name: "Ashley", src: ashley },
  { name: "Couple", src: couple },
  { name: "Friends", src: friends },
  { name: "Family", src: family },
];

export const locations = [
  { name: "Yosemite", src: heroYosemite },
  { name: "Lake Tahoe", src: heroTahoe },
  { name: "Big Sur", src: heroBigsur },
  { name: "Redwoods", src: heroYosemite },
  { name: "Tahiti", src: kohanaF },
  { name: "Ibiza", src: heroSailboat },
  { name: "San Francisco Bay", src: heroGgb },
  { name: "Bay Padel", src: heroPadel },
  { name: "Napa Valley", src: desoiF },
  { name: "Malibu", src: heroBigsur },
  { name: "Japan", src: heroYosemite },
  { name: "Europe", src: clutchF },
];

export const stories = [
  "Weekend Adventure",
  "Luxury Coastal",
  "Modern Racquet Club",
  "Cabin Escape",
  "Road Trip",
  "Wellness",
  "Urban Adventure",
  "Coffee Culture",
];

export const seasons = [
  { name: "Spring", src: heroTahoe },
  { name: "Summer", src: heroPadel },
  { name: "Fall", src: heroBigsur },
  { name: "Winter", src: heroYosemite },
];

export const moods = [
  "Warm & Authentic",
  "Luxury Editorial",
  "Premium & Minimal",
  "Adventure",
  "Bright & Playful",
  "Bold",
  "Calm",
];

export const deliverables = [
  { name: "Photography", desc: "Editorial still image set" },
  { name: "Photography + Video", desc: "Motion & stills bundle" },
  { name: "Commercial Package", desc: "Full campaign, all channels" },
  { name: "Social Package", desc: "Short-form, platform native" },
  { name: "Custom", desc: "Scoped to your brand" },
];

export const productions = [
  { location: "Tahoe", month: "March", season: "Spring", spots: 3, brands: "Outdoor, Wellness, Beverage", src: heroTahoe },
  { location: "Yosemite", month: "May", season: "Spring", spots: 2, brands: "Apparel, Outdoor, Fragrance", src: heroYosemite },
  { location: "Bay Padel", month: "June", season: "Summer", spots: 4, brands: "Sport, Apparel, Beverage", src: heroPadel },
  { location: "Tahiti", month: "September", season: "Summer", spots: 2, brands: "Swimwear, Beauty, Travel", src: kohanaF },
  { location: "Ibiza", month: "October", season: "Fall", spots: 3, brands: "Fashion, Beverage, Lifestyle", src: heroSailboat },
];

export const loadingMessages = [
  "Analyzing product…",
  "Planning story…",
  "Matching talent…",
  "Planning production…",
  "Building campaign…",
  "Rendering preview…",
];
