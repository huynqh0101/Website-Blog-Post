export const navigationItems = [
  // Add this to your navigation items
  {
    name: "NEWS",
    href: "/articles",
    dropdownItems: [
      { name: "Latest News", href: "/articles" },
      { name: "Featured", href: "/news/featured" },
      { name: "Popular", href: "/news/popular" },
      { name: "Categories", href: "/news/categories" },
    ],
  },
  {
    name: "BLOG",
    href: "/blogs",
    dropdownItems: [
      { name: "All Posts", href: "/blogs" },
      { name: "Categories", href: "/blogs/categories" },
      { name: "Popular Topics", href: "/blogs/popular" },
      { name: "Archives", href: "/blogs/archives" },
      { name: "Authors", href: "/blogs/authors" },
    ],
  },
  {
    name: "SERVICES",
    dropdownItems: [
      { name: "Content Writing", href: "/services/writing" },
      { name: "Editing", href: "/services/editing" },
      { name: "Publishing", href: "/services/publishing" },
      { name: "Consulting", href: "/services/consulting" },
    ],
  },
  {
    name: "CONTACT",
    href: "/contact",
  },
  {
    name: "ABOUT",
    href: "/about",
  },
];
