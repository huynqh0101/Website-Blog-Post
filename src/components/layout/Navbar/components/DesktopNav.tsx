import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { navigationItems } from "@/constants/navigation";

interface DesktopNavProps {
  isDarkMode: boolean;
  isSearchVisible: boolean;
  pathname: string;
  getNavItemStyles: (isActive: boolean) => string;
}

export const DesktopNav = ({
  isDarkMode,
  isSearchVisible,
  pathname,
  getNavItemStyles,
}: DesktopNavProps) => {
  return (
    <NavigationMenu
      className={`hidden lg:flex transition-all duration-300 ${
        isSearchVisible ? "-translate-x-20" : "translate-x-0"
      }`}
    >
      <NavigationMenuList
        className={`flex transition-all duration-300 ${
          isSearchVisible ? "space-x-1" : "space-x-6"
        }`}
      >
        {navigationItems.map((item) => (
          <NavigationMenuItem
            key={item.name}
            className={`group px-1 transition-all duration-300 ${
              isSearchVisible ? "scale-90" : "scale-100"
            }`}
          >
            {item.dropdownItems ? (
              <>
                <NavigationMenuTrigger
                  className={`relative px-6 py-2 transition-colors duration-300 font-medium tracking-wide text-[15px]
                  after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:h-[2px]
                  after:bg-primary after:transition-all after:duration-300
                  after:origin-center after:transform after:scale-x-0
                  hover:after:scale-x-100 data-[state=open]:bg-transparent
                  ${
                    isDarkMode
                      ? "text-slate-300 hover:text-white data-[state=open]:text-white bg-transparent"
                      : "text-slate-600 hover:text-primary data-[state=open]:text-primary"
                  }`}
                >
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={`min-w-[180px] p-2 space-y-1 rounded-md shadow-lg backdrop-blur-sm
                    transition-colors duration-300
                    ${
                      isDarkMode
                        ? "bg-slate-900/95 border border-slate-700/50"
                        : "bg-white/95 border border-slate-200"
                    }`}
                  >
                    {item.dropdownItems.map((dropItem) => (
                      <li key={dropItem.name}>
                        <Link
                          href={dropItem.href}
                          className={`block px-4 py-2 rounded-md text-[14px] transition-colors duration-300
                          ${
                            isDarkMode
                              ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                              : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                          }`}
                        >
                          {dropItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link
                href={item.href}
                className={getNavItemStyles(pathname === item.href)}
              >
                {item.name}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
