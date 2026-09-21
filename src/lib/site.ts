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
  mapsUrl: "https://maps.app.goo.gl/RdBd4Nj8Q1ZzcGCNA",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Passion%20Photography%20-%20Wedding%20%26%20Newborn%20Studio%2C%20Gandhi%20Nagar%2C%20Kurnool%2015.833278%2C78.040353&z=17&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Passion+Photography+-+Wedding+%26+Newborn+Studio,+Gandhi+Nagar,+Kurnool+518001",
  latitude: 15.833278,
  longitude: 78.040353,
};