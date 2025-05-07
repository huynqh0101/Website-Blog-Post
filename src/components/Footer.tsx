import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineGithub,
  AiFillLinkedin,
  AiFillFacebook,
} from "react-icons/ai";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
              📰 Daily News
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Delivering the latest and most relevant news to your doorstep.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <MdLocationOn className="text-base" />
                <span>123 News Street, City</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <MdPhone className="text-base" />
                <span>+1 234 567 890</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-800 dark:text-gray-200">
              Quick Links
            </h3>
            <ul className="space-y-1.5">
              {["About Us", "Services", "News", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-800 dark:text-gray-200">
              Categories
            </h3>
            <ul className="space-y-1.5">
              {["World News", "Technology", "Business", "Sports"].map(
                (category) => (
                  <li key={category}>
                    <a
                      href={`/category/${category
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors duration-200"
                    >
                      {category}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-800 dark:text-gray-200">
              Newsletter
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Subscribe for daily updates.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-sm h-9"
              />
              <Button className="w-full h-9 text-sm font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex space-x-4">
              {[
                { icon: AiFillFacebook, href: "https://facebook.com" },
                { icon: AiOutlineTwitter, href: "https://twitter.com" },
                { icon: AiOutlineInstagram, href: "https://instagram.com" },
                { icon: AiOutlineGithub, href: "https://github.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Daily News. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
