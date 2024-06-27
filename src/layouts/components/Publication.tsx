"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { useEffect } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
import Shuffle from "shufflejs";

interface PublicationProps {
  publicationIndex: {
    frontmatter: {
      title: string;
      subtitle: string;
    };
  };
  categories: string[];
  publications: {
    frontmatter: {
      title: string;
      description: string;
      image: string;
      categories: string[];
    };
  }[];
}

const Publication = ({
  publicationIndex,
  categories,
  publications,
}: PublicationProps) => {
  useEffect(() => {
    const element = document.querySelector(".shuffle-container") as HTMLElement;
    const shuffleInstance = new Shuffle(element, {
      itemSelector: ".shuffle-item",
    });

    const filter = document.querySelector(".shuffle-filter");
    const filterLists = Array.from(filter?.children || []);

    filterLists.forEach((list) => {
      const button = list.querySelector("button");

      const handleClick = () => {
        filterLists.forEach((list) => list.classList.remove("selected"));
        list.classList.add("selected");
        const keyword = list.getAttribute("data-target");

        shuffleInstance.filter(keyword!);
      };

      button?.addEventListener("click", handleClick);
    });
  }, []);

  const { title, subtitle } = publicationIndex.frontmatter;

  return (
    <section id="publications" className="section">
      <div className="container px-4 lg:p-24   xl:px-[140px] py-12 xl:py-[130px] bg-primary kiron-container rounded-lg">
        <div className="text-center mb-14">
          <h2
            className="text-[20px] lg:text-5xl font-medium leading-tight mb-6 text-text"
            dangerouslySetInnerHTML={markdownify(title)}
          />
          <p
            className="text-[12px] lg:text-xl font-normal text-light"
            dangerouslySetInnerHTML={markdownify(subtitle)}
          />
        </div>

        <div className="shuffle-filter flex flex-wrap md:items-center justify-center gap-5 mb-14">
          {categories.map((group, i) => (
            <div key={i} data-target={group}>
              <button
                type="button"
                className={`inline-block btn btn-sm btn-primary-light text-[10px] lg:text-xl px-3 lg:px-9 py-[6px] lg:py-5`}
              >
                {group}
              </button>
            </div>
          ))}
        </div>

        <div className="row g-4 justify-center shuffle-container mb-14">
          {publications.map((publication, i) => (
            <div
              key={i}
              className="col-12 md:col-6 lg:col-4 shuffle-item"
              data-groups={`["All", "${publication.frontmatter.categories}"]`}
            >
              <div className="flex flex-col justify-between h-full p-4 xl:p-8 bg-body rounded-lg">
                <div>
                  <ImageFallback
                    className="rounded-lg mb-6 w-full"
                    src={publication.frontmatter.image}
                    width={360}
                    height={224}
                    alt="publication image"
                  />
                  <h5
                    className="text-base lg:text-2xl font-medium text-dark mb-4"
                    dangerouslySetInnerHTML={markdownify(
                      publication.frontmatter.title,
                    )}
                  />
                  <p
                    className="text-[11px] lg:text-lg text-dark-light mb-8"
                    dangerouslySetInnerHTML={markdownify(
                      publication.frontmatter.description,
                    )}
                  />
                </div>
                <button className="flex items-center btn btn-md btn-outline-primary w-fit">
                  <FaArrowRight className="mr-3" />
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="flex items-center btn btn-md btn-secondary mx-auto">
          <FaArrowDown className="mr-3" />
          See More
        </button>
      </div>
    </section>
  );
};

export default Publication;
