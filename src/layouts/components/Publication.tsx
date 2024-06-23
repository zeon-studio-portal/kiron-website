"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";

const Publication = ({
  publicationIndex,
  categories,
  publications,
}: {
  publicationIndex: any;
  categories: any;
  publications: any;
}) => {
  return (
    <section id="publications" className="section">
      <div className="container px-4 lg:px-[140px] py-12 lg:py-[130px] bg-primary kiron-container rounded-lg">
        <div className="text-center mb-14">
          <h2
            className="text-[20px] lg:text-5xl font-medium leading-tight mb-6 text-text"
            dangerouslySetInnerHTML={markdownify(
              publicationIndex.frontmatter.title,
            )}
          />
          <p
            className="text-[12px] lg:text-xl font-normal text-light"
            dangerouslySetInnerHTML={markdownify(
              publicationIndex.frontmatter.subtitle,
            )}
          />
        </div>

        <div className="shuffle-filter flex flex-wrap md:items-center justify-center gap-5 mb-14">
          {categories.map((group: any, i: number) => (
            <button
              key={i}
              data-target={group}
              type="button"
              className={`inline-block btn btn-sm btn-primary-light text-[10px] lg:text-xl px-3 lg:px-9 py-[6px] lg:py-5`}
            >
              {group}
            </button>
          ))}
        </div>

        <div className="row g-4 justify-center shuffle-container mb-14">
          {publications.map((publication: any, i: number) => (
            <div
              key={i}
              className="col-12 lg:col-4"
              data-groups={`["${publication.frontmatter.categories}"]`}
            >
              <div className="flex flex-col justify-between h-full p-4 lg:p-8 bg-body rounded-lg">
                <div>
                  <ImageFallback
                    className="rounded-lg mb-6"
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
