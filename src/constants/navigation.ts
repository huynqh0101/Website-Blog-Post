export const navigationItems = [
  {
    name: "About",
    href: "/about",
  },
  // Add this to your navigation items
  {
    name: "News",
    href: "/news",
    dropdownItems: [
      { name: "Latest News", href: "/articles" },
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
