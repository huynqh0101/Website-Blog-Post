import { ReactNode } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

interface LinkItem {
  title: string;
  href: string;
}

interface SocialLinkItem extends LinkItem {
  icon: ReactNode;
}

export const contentLinks: LinkItem[] = [
  { title: "Latest Articles", href: "/articles" },
  { title: "Featured Stories", href: "/featured" },
  { title: "Opinion Pieces", href: "/opinion" },
  { title: "News Analysis", href: "/analysis" },
  { title: "Interviews", href: "/interviews" },
];

export const resourceLinks: LinkItem[] = [
  { title: "Help Center", href: "/help" },
  { title: "Writing Guidelines", href: "/guidelines" },
  { title: "Submission Policy", href: "/submission-policy" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact Us", href: "/contact" },
];

export const companyLinks: LinkItem[] = [
  { title: "About Us", href: "/about" },
  { title: "Our Team", href: "/team" },
  { title: "Careers", href: "/careers" },
  { title: "Press Kit", href: "/press" },
  { title: "Privacy Policy", href: "/privacy" },
];

export const socialLinks: SocialLinkItem[] = [
  { title: "Facebook", href: "#", icon: <FaFacebook className="w-5 h-5" /> },
  { title: "Twitter", href: "#", icon: <FaTwitter className="w-5 h-5" /> },
  { title: "Instagram", href: "#", icon: <FaInstagram className="w-5 h-5" /> },
  { title: "LinkedIn", href: "#", icon: <FaLinkedin className="w-5 h-5" /> },
  { title: "GitHub", href: "#", icon: <FaGithub className="w-5 h-5" /> },
];
