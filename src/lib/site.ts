export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://passionphotography.in");

export const studio = {
  name: "Passion Photography",
  tagline: "Wedding & Newborn Studio · Kurnool",
  rating: 5.0,
  reviews: 104,
  phone: "+91 99599 90503",
  phoneRaw: "919959990503",
  address:
    "Shop Number 8, 1st Floor, TJ Shopping Mall, Mine SBI Circle, opp. SV Complex, Gandhi Nagar, Kurnool, Andhra Pradesh 518001",
  hours: "Open 24 hours",
  areasServed: "Kurnool and nearby areas",
  instagram: "",
};