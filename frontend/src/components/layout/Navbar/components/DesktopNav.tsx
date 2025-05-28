import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { navigationItems } from "@/constants/navigation";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // Định nghĩa style cho các menu item
  const getMenuItemClass = (isActive: boolean) => {
    return `relative ${
      isSearchVisible ? "py-1 pl-[12px] pr-[15px]" : "px-6 py-2"
    } transition-all duration-300 font-medium tracking-wide ${
      isSearchVisible ? "text-[12.3px]" : "text-[14px]"
    }
      after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:h-[2px]
      after:bg-primary after:transition-transform after:duration-300
      after:origin-center after:transform
      hover:after:scale-x-100 bg-transparent
      ${
        isActive
          ? `${
              isDarkMode
                ? "text-primary after:scale-x-100"
                : "text-primary after:scale-x-100"
            }`
          : `${
              isDarkMode
                ? "text-slate-300 hover:text-white after:scale-x-0"
                : "text-slate-600 hover:text-primary after:scale-x-0"
            }`
      }`;
  };

  return (
    <NavigationMenu
      className={`hidden lg:flex transition-all duration-300 relative ${
        isSearchVisible ? "-translate-x-20" : "translate-x-0"
      }`}
    >
      <NavigationMenuList
        className={`flex transition-all duration-300 ${
          isSearchVisible ? "space-x-0" : "space-x-2"
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
                <div className="relative flex flex-col items-center">
                  <NavigationMenuTrigger
                    className={getMenuItemClass(pathname === item.href)}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (
                        !target.closest('[data-dropdown-indicator="true"]') &&
                        item.href
                      ) {
                        e.preventDefault();
                        router.push(item.href);
                      }
                    }}
                  >
                    {item.name}
                  </NavigationMenuTrigger>
                </div>

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
                                  ? pathname === dropItem.href
                                    ? "text-white bg-slate-800/60"
                                    : "text-slate-200 hover:bg-slate-800/40 hover:text-white"
                                  : pathname === dropItem.href
                                  ? "text-primary bg-slate-50"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                              }
                               `}
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
                className={getMenuItemClass(pathname === item.href)}
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
