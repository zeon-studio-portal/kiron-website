"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import { slugSelector } from "@/lib/utils/slugSelector";
import { markdownify } from "@/lib/utils/textConverter";
import { INavigationLink } from "@/types";
import Link from "next/link";

const Footer = ({
  lang,
  menu,
}: {
  lang: string;
  menu: { footer: INavigationLink[] };
}) => {
  const { copyright } = config.params;

  return (
    <footer className="bg-dark pt-36 lg:pt-56">
      <div className="container">
        <div className="row items-center py-10">
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:text-left">
            <Logo lang={lang} />
          </div>
          <div className="mb-8 lg:col-4 lg:mb-0 lg:mt-0">
            <p className="text-xs lg:text-2xl text-center">
              Get Connected: kiron@secdev.com
            </p>
          </div>
          <div className="mb-8 lg:col-5 lg:mb-0">
            <ul className="text-xs lg:text-xl text-center">
              {menu.footer.map((menu) => (
                <li className="ml-3 inline-block" key={menu.name}>
                  <Link href={slugSelector(lang, menu.url)}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="py-7">
        <div className="container text-center text-light">
          <p
            dangerouslySetInnerHTML={markdownify(copyright)}
            className="text-[10px] lg:text-xl"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
