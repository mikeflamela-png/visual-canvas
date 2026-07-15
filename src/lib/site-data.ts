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
import male01 from "@/assets/talent-male-01.jpg";
import male02 from "@/assets/talent-male-02.jpg";
import male03 from "@/assets/talent-male-03.jpg";
import male04 from "@/assets/talent-male-04.jpg";
import male05 from "@/assets/talent-male-05.jpg";
import male06 from "@/assets/talent-male-06.jpg";
import male07 from "@/assets/talent-male-07.jpg";
import male08 from "@/assets/talent-male-08.jpg";
import female01 from "@/assets/talent-female-01.jpg";
import female02 from "@/assets/talent-female-02.jpg";
import female03 from "@/assets/talent-female-03.jpg";
import female04 from "@/assets/talent-female-04.jpg";
import female05 from "@/assets/talent-female-05.jpg";
import female06 from "@/assets/talent-female-06.jpg";
import female07 from "@/assets/talent-female-07.jpg";
import female08 from "@/assets/talent-female-08.jpg";
import couple02 from "@/assets/talent-couple-02.jpg";
import family02 from "@/assets/talent-family-02.jpg";
import friends02 from "@/assets/talent-friends-02.jpg";

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

export type RosterTalent = {
  name: string;
  src: string;
  category: "Male" | "Female" | "Couple & Family";
  location: string;
};

export const roster: RosterTalent[] = [
  // 10 male
  { name: "Micah", src: micah, category: "Male", location: "Los Angeles" },
  { name: "Nile", src: nile, category: "Male", location: "New York" },
  { name: "August", src: male01, category: "Male", location: "San Francisco" },
  { name: "Theo", src: male02, category: "Male", location: "Brooklyn" },
  { name: "Elio", src: male03, category: "Male", location: "Milan" },
  { name: "Kenji", src: male04, category: "Male", location: "Tokyo" },
  { name: "Arlo", src: male05, category: "Male", location: "Copenhagen" },
  { name: "Amari", src: male06, category: "Male", location: "London" },
  { name: "Rafael", src: male07, category: "Male", location: "Mexico City" },
  { name: "Finn", src: male08, category: "Male", location: "Malibu" },
  // 10 female
  { name: "Natalia", src: natalia, category: "Female", location: "Paris" },
  { name: "Rachel", src: rachel, category: "Female", location: "New York" },
  { name: "Ashley", src: ashley, category: "Female", location: "Los Angeles" },
  { name: "Mei", src: female01, category: "Female", location: "Seoul" },
  { name: "Imani", src: female02, category: "Female", location: "London" },
  { name: "Yuki", src: female03, category: "Female", location: "Kyoto" },
  { name: "Camila", src: female05, category: "Female", location: "Barcelona" },
  { name: "Sylvie", src: female06, category: "Female", location: "Dublin" },
  { name: "Margaux", src: female07, category: "Female", location: "Paris" },
  { name: "Nia", src: female08, category: "Female", location: "Brooklyn" },
  // 6 couple / family
  { name: "The Wrenn Couple", src: couple, category: "Couple & Family", location: "Big Sur" },
  { name: "The Ivers", src: family, category: "Couple & Family", location: "Ojai" },
  { name: "The Fielders", src: friends, category: "Couple & Family", location: "Austin" },
  { name: "Sam & Rae", src: couple02, category: "Couple & Family", location: "Joshua Tree" },
  { name: "The Halden Family", src: family02, category: "Couple & Family", location: "Portland" },
  { name: "The Coastline Trio", src: friends02, category: "Couple & Family", location: "San Diego" },
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
