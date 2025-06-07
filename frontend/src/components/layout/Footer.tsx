"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import Link from "next/link";
import { Logo } from "./Navbar/components/Logo";
import BannerSlider from "../home/BannerSlider";
import {
  contentLinks,
  resourceLinks,
  companyLinks,
  socialLinks,
} from "@/constants/footerLinks";
import Image from "next/image";
import { UnderlineDecoration } from "../ui/underLine";

const Footer = (): JSX.Element => {
  const themeContext = useContext(ThemeContext);
  const { isDarkMode } = themeContext || { isDarkMode: false };

  return (
    <>
      <div
        className={`mt-12 pt-8 border-t text-center ${
          isDarkMode
            ? "border-gray-700 text-gray-400"
            : "border-gray-200 text-gray-500"
        }`}
      >
        <BannerSlider height="15rem" />
      </div>
      <footer
        className={`w-full py-16 relative overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900"
            : "bg-gradient-to-br from-blue-50 to-gray-100"
        }`}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 bg-repeat ${
              isDarkMode ? "opacity-5" : "opacity-10"
            }`}
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%234a90e2" fill-opacity="0.4" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E\')',
            }}
          ></div>
          <div
            className={`absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t to-transparent ${
              isDarkMode ? "from-gray-900/50" : "from-white/50"
            }`}
          ></div>
          <div
            className={`absolute top-0 right-0 w-64 h-64 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4 ${
              isDarkMode ? "bg-blue-600" : "bg-blue-200"
            }`}
          ></div>
          <div
            className={`absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4 ${
              isDarkMode ? "bg-indigo-600" : "bg-indigo-200"
            }`}
          ></div>
        </div>

        {/* Content with increased z-index to appear above the background */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo and description column */}
            <div className="flex flex-col space-y-4 lg:col-span-1">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <Logo />
                </div>
              </div>
              <div
                className={`border-l-2 pl-4 ${
                  isDarkMode ? "border-blue-400" : "border-blue-600"
                }`}
              >
                <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  <span className="font-medium">Journalism with purpose.</span>
                  <span
                    className={`block text-sm mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Since 2025
                  </span>
                </p>
              </div>
              <div className="flex space-x-3 mt-10">
                <a
                  href="#"
                  className={`transition-all ${
                    isDarkMode
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className={`transition-all ${
                    isDarkMode
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className={`transition-all ${
                    isDarkMode
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Content column */}
            <div className="flex flex-col space-y-4 md:items-start">
              <div className="space-y-2">
                <h3
                  className={`font-bold text-xl ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Content
                </h3>
                <UnderlineDecoration />
              </div>
              <ul className="space-y-3">
                {contentLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`hover:underline transition-colors ${
                        isDarkMode
                          ? "text-gray-300 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources column */}
            <div className="flex flex-col space-y-4 md:items-start">
              <div className="space-y-2">
                <h3
                  className={`font-bold text-xl ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Resources
                </h3>
                <UnderlineDecoration />
              </div>
              <ul className="space-y-3">
                {resourceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`transition-colors ${
                        isDarkMode
                          ? "text-gray-300 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div className="flex flex-col space-y-4 md:items-start">
              <div className="space-y-2">
                <h3
                  className={`font-bold text-xl ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Company
                </h3>
                <UnderlineDecoration />
              </div>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`transition-colors ${
                        isDarkMode
                          ? "text-gray-300 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us column */}
            <div className="flex flex-col space-y-4 md:items-start">
              <div className="space-y-2">
                <h3
                  className={`font-bold text-xl ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Connect
                </h3>
                <UnderlineDecoration />
              </div>
              <ul className="space-y-3">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={`flex items-center gap-2 hover:underline transition-colors ${
                        isDarkMode
                          ? "text-gray-300 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span
                        className={
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }
                      >
                        {link.icon}
                      </span>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom decorative border */}
        <div
          className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-transparent opacity-30 ${
            isDarkMode ? "via-blue-400" : "via-blue-500"
          }`}
        ></div>
      </footer>
    </>
  );
};

export default Footer;
