export const navigationItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "News",
    dropdownItems: [
      { name: "Latest News", href: "/news/latest" },
      { name: "Featured", href: "/news/featured" },
      { name: "Popular", href: "/news/popular" },
      { name: "Categories", href: "/news/categories" },
    ],
  },
  {
    name: "Services",
    dropdownItems: [
      { name: "Content Writing", href: "/services/writing" },
      { name: "Editing", href: "/services/editing" },
      { name: "Publishing", href: "/services/publishing" },
      { name: "Consulting", href: "/services/consulting" },
    ],
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
