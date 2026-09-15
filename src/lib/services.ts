export interface ServiceCard {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export const services: ServiceCard[] = [
  {
    id: "wedding-photography",
    title: "Wedding Photography",
    category: "Photography",
    imageUrl: "/images/gallery-02.jpg",
  },
  {
    id: "pre-wedding",
    title: "Pre-Wedding Shoots",
    category: "Photography",
    imageUrl: "/images/gallery-03.jpg",
  },
  {
    id: "engagement",
    title: "Engagement Shoots",
    category: "Photography",
    imageUrl: "/images/gallery-04.jpg",
  },
  {
    id: "newborn",
    title: "Newborn Photography",
    category: "Photography",
    imageUrl: "/images/gallery-05.jpg",
  },
  {
    id: "maternity",
    title: "Maternity & Baby",
    category: "Photography",
    imageUrl: "/images/gallery-06.jpg",
  },
  {
    id: "portrait",
    title: "Portrait Studio",
    category: "Photography",
    imageUrl: "/images/gallery-07.jpg",
  },
  {
    id: "family-shoots",
    title: "Family Shoots",
    category: "Photography",
    imageUrl: "/images/gallery-08.jpg",
  },
  {
    id: "reception",
    title: "Wedding Receptions",
    category: "Events",
    imageUrl: "/images/gallery-09.jpg",
  },
  {
    id: "sangeet",
    title: "Haldi & Sangeet",
    category: "Events",
    imageUrl: "/images/gallery-10.jpg",
  },
];