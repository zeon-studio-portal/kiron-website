"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import { getActiveLanguages } from "@/lib/languageParser";
import { slugSelector } from "@/lib/utils/slugSelector";
import { INavigationLink } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = ({
  lang,
  menu,
}: {
  lang: string;
  menu: { main: INavigationLink[] };
}) => {
  const activeLanguages = getActiveLanguages();
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  const pathname = usePathname();

  const [hash, setHash] = useState("");

  const [navLinks, setNavLinks] = useState<HTMLElement[]>([]);

  useEffect(() => {
    setHash(window.location.hash);
    setNavLinks(document.querySelectorAll(".nav-link") as any);
  }, []);

  const isActive = (url: string) => {
    const lastSegment = url.split("/").pop() || "";

    return pathname === url || pathname === `${url}/` || hash === lastSegment;
  };

  return (
    <header
      className={`header z-30 ${settings.sticky_header ? "sticky top-0" : ""}`}
    >
      <nav className="navbar max-md:px-5 container">
        {/* logo */}
        <div className="order-0">
          <Logo lang={lang} />
        </div>
        {/* navbar toggler */}
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          htmlFor="nav-toggle"
          className="order-3 cursor-pointer flex items-center lg:hidden text-dark lg:order-1"
        >
          <svg
            id="show-button"
            className="h-6 fill-primary block"
            viewBox="0 0 20 20"
          >
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0V15z"></path>
          </svg>
          <svg
            id="hide-button"
            className="h-6 fill-red-500 hidden"
            viewBox="0 0 20 20"
          >
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>
        {/* /navbar toggler */}

        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              <li className="nav-item">
                <Link
                  href={slugSelector(lang, menu.url)}
                  onClick={() => setHash(menu.url.split("/").pop() as any)}
                  className={`nav-link block ${isActive(menu.url) ? "text-primary" : ""}`}
                >
                  {menu.name}
                </Link>
              </li>
            </React.Fragment>
          ))}
          {navigation_button.enable && (
            <li className="mt-4 inline-block lg:hidden">
              <Link
                className="btn btn-primary btn-sm"
                href={navigation_button.link}
              >
                {navigation_button.label}
              </Link>
            </li>
          )}
        </ul>
        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
          {navigation_button.enable && (
            <Link
              className="btn btn-primary px-[26px] py-[13px] hidden lg:inline-block"
              href={navigation_button.link}
            >
              {navigation_button.label}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
