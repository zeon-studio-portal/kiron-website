import Publication from "@/components/Publication";
import config from "@/config/config.json";
import languages from "@/config/language.json";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getActiveLanguages } from "@/lib/languageParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import Accordion from "@/shortcodes/Accordion";
import { Button } from "@/types";
import Link from "next/link";
import path from "path";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoArrowUpCircleOutline } from "react-icons/io5";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}

const Home = ({ params }: { params: { lang: string } }) => {
  const lang = params.lang;
  const language = languages.find(
    (language) => language.languageCode === lang,
  )!;
  const { category } = config;
  const homepage = getListPage(
    path.join(language?.contentDir, "homepage/_index.md"),
  );
  const { frontmatter } = homepage;
  const {
    banner,
    partner,
    kiron,
    about,
    faq,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    partner: { title: string; companyLogo: string; partnerLogo: string };
    kiron: {
      title: string;
      subtitle: string;
      discussion: { title: string; chat: string[] };
      questions: string[];
    };
    about: { title: string; content1: string; content2: string; image: string };
    faq: {
      enable: boolean;
      title: string;
      accordion: { title: string; description: string }[];
    };
  } = frontmatter;

  const publicationIndex = getListPage(
    path.join(language?.contentDir, "publications/_index.md"),
  );
  const publications = getSinglePage(
    path.join(language.contentDir, "publications"),
  );

  const categories = category.categories;

  return (
    <>
      <SeoMeta />
      {/* header */}
      <section className="section bg-primary banner-section mb-24">
        <div className="bg-top-left">
          <ImageFallback src="/images/banner-l-bg.svg" width={255} height={0} />
        </div>
        <div className="bg-top-right">
          <ImageFallback src="/images/banner-r-bg.svg" width={255} height={0} />
        </div>

        <div className="container-sm relative">
          <div className="row justify-center items-center pb-10">
            <div className="col-8">
              <h1
                className="mb-4 text-h1 lg:text-[81px] font-semibold text-text"
                dangerouslySetInnerHTML={markdownify(banner.title)}
              />
              <p
                className="mb-8 text-text"
                dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
              />
              {banner.button!.enable && (
                <Link
                  className="btn btn-secondary"
                  href={banner.button!.link}
                  target={
                    banner.button!.link.startsWith("http") ? "_blank" : "_self"
                  }
                  rel="noopener"
                >
                  <FaMagnifyingGlass
                    className="inline-block align-baseline h-full
                   mr-3"
                  />
                  {banner.button!.label}
                </Link>
              )}
            </div>
            {banner.image && (
              <ImageFallback
                src={banner.image}
                className="col-4 lg:translate-x-10 lg:scale-110"
                width="489"
                height="676"
                alt="banner image"
                priority
              />
            )}
          </div>

          <div className="row justify-between items-center mx-auto bg-body rounded-lg px-[112px] py-16 absolute w-full shadow">
            <div className="col-6">
              <h5
                className="h5 pr-10 w-fit text-primary border-r border-primary"
                dangerouslySetInnerHTML={markdownify(partner.title)}
              />
            </div>
            <div className="col-6">
              <div className="flex items-baseline justify-end">
                <ImageFallback
                  className="mr-12"
                  src={partner.companyLogo}
                  width={166}
                  height={65}
                  alt="company logo"
                />
                <ImageFallback
                  src={partner.partnerLogo}
                  width={209}
                  height={73}
                  alt="partnership logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* kiron */}
      <section className="section">
        <div className="container px-[140px] py-[130px] bg-primary kiron-container rounded-lg">
          <div className="text-center mb-14">
            <h2
              className="text-5xl font-medium leading-tight mb-6 text-text"
              dangerouslySetInnerHTML={markdownify(kiron.title)}
            />
            <p
              className="text-xl font-normal text-light"
              dangerouslySetInnerHTML={markdownify(kiron.subtitle)}
            />
          </div>
          <div className="p-14 border border-border rounded-lg bg-accent mb-14">
            <h3
              className="text-3xl font-medium leading-tight mb-10 text-text"
              dangerouslySetInnerHTML={markdownify(kiron.discussion.title)}
            />

            {kiron.discussion.chat.map((chat) => (
              <p
                key={chat}
                className="text-2xl font-normal text-light mb-6 chat"
                dangerouslySetInnerHTML={markdownify(chat)}
              />
            ))}
          </div>
          <div className="row justify-center mb-14">
            {kiron.questions.map((q) => (
              <div className="col-4" key={q}>
                <div className="border h-full border-border-dark rounded-lg bg-accent">
                  <p
                    className="text-2xl font-medium text-text p-12"
                    dangerouslySetInnerHTML={markdownify(q)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Enter a prompt here"
              className="w-full bg-transparent border-border px-10 py-[30px] rounded-lg focus:outline-none focus:ring-0 focus:shadow-none focus:border-border text-text text-2xl placeholder:text-light"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2
 flex items-center justify-center btn btn-secondary"
            >
              <FaMagnifyingGlass className="inline-block align-baseline mr-3" />
              Search Here
            </button>
          </div>
        </div>
      </section>

      {/* about */}
      <section className="section ">
        <div className="container-sm text-dark-light">
          <div className="row items-center gx-5">
            <div className="col-6">
              <ImageFallback
                src={about.image}
                width={535}
                height={532}
                alt="about kiron image"
              />
            </div>
            <div className="col-6">
              <h2
                className="text-5xl font-medium leading-tight mb-4"
                dangerouslySetInnerHTML={markdownify(about.title)}
              />
              <p
                className="mb-6 text-2xl leading-9"
                dangerouslySetInnerHTML={markdownify(about.content1)}
              />
              <p
                className="mb-6 text-2xl leading-9"
                dangerouslySetInnerHTML={markdownify(about.content2)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* publications */}
      <Publication
        publicationIndex={publicationIndex}
        categories={categories}
        publications={publications}
      />

      {/* faq */}
      <section className="section">
        <div className="container">
        <Accordion faqs={faq.accordion} />
          {/* {faq.accordion.map((item: any, index: number) => (
            <div
              key={index}
              className={"accordion" + (index === 0 ? " active" : "")}
            >
              <button className="accordion-header" data-accordion>
                {item.title}
                <IoArrowUpCircleOutline className="accordion-icon" />
              </button>
              <div className="accordion-content">
                <p>{item.description}</p>
              </div>
            </div>
          ))} */}
        </div>
      </section>
    </>
  );
};

export default Home;
