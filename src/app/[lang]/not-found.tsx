"use client";

import { useTranslate } from "@/hooks/useTranslate";
import Link from "next/link";

export default function NotFound() {
  const {
    page_not_found,
    page_not_found_content,
    back_to_home,
    lang,
    main,
    footer,
  } = useTranslate();

  return (
    <section className="section-sm text-center">
      <div className="container">
        <div className="row justify-center">
          <div className="sm:col-10 md:col-8 lg:col-6">
            <span className="text-[8rem] block font-bold text-dark ">404</span>
            <h1 className="h2 mb-4">{page_not_found}</h1>
            <div className="content">
              <p>{page_not_found_content}</p>
            </div>
            <Link href="/" className="btn btn-primary mt-8">
              {back_to_home}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
