import CallToAction from "@/components/CallToAction";
import Modal from "@/components/Modal";
import Publication from "@/components/Publication";
import QuestionSection from "@/components/QuestionSection";
import config from "@/config/config.json";
import languages from "@/config/language.json";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getActiveLanguages } from "@/lib/languageParser";
import { markdownify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import Accordion from "@/shortcodes/Accordion";
import { Button } from "@/types";
import path from "path";
import "swiper/css";

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
      <section className="section pb-0 bg-primary banner-section mb-24">
        {/* bg top left and right */}
        <div className="bg-top-left">
          <ImageFallback
            src="/images/banner-l-bg.svg"
            alt="banner left bg"
            width={230}
            height={0}
            className="lg:block hidden"
          />
        </div>
        <div className="bg-top-right">
          <ImageFallback
            src="/images/banner-r-bg.svg"
            alt="banner right bg"
            width={270}
            height={0}
            className="lg:block hidden"
          />
        </div>

        <div className="container-sm relative z-30">
          <div className="row justify-center items-center pb-10">
            <div className="col-12 lg:col-8 max-md:order-1 text-center lg:text-left mb-8 md:mb-16 lg:mb-0">
              <h1
                className="mb-8 md:mb-4 h1 text-[28px] md:text-[52px] lg:text-[52px] xl:text-[72px] 2xl:text-[81px] font-semibold text-text px-[5%] xl:px-0"
                dangerouslySetInnerHTML={markdownify(banner.title)}
              />
              {banner?.button?.enable && <Modal button={banner.button} className="btn btn-lg btn-secondary" icon={true}/>}
            </div>
            {banner.image && (
              <ImageFallback
                src={banner.image}
                className="col-8 lg:col-4 max-md:order-2 lg:scale-125 xl:scale-110 2xl:scale-110 lg:-translate-x-10 2xl:translate-x-10"
                width="489"
                height="676"
                alt="banner image"
                priority
              />
            )}
          </div>
          <div className="row justify-center lg:justify-between items-center bg-body rounded-lg md:px-40 lg:px-[112px] py-10 lg:py-16 max-md:mx-5 lg:w-full shadow mx-auto translate-y-1/2">
            <div className="col-11 lg:col-6 mb-6 lg:mb-0">
              <h5
                className="text-[14px] md:text-[22px] font-medium lg:pr-10 lg:w-fit text-primary text-center leading-6 lg:text-left lg:border-r lg:border-primary"
                dangerouslySetInnerHTML={markdownify(partner.title)}
              />
            </div>
            <div className="col-11 lg:col-6">
              <div className="flex items-baseline justify-between lg:justify-end">
                <ImageFallback
                  className="lg:mr-12 w-auto h-12"
                  src={partner.companyLogo}
                  width={166}
                  height={0}
                  alt="company logo"
                />
                <ImageFallback
                  className="w-auto h-12"
                  src={partner.partnerLogo}
                  width={209}
                  height={0}
                  alt="partnership logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* kiron */}
      <section id="kiron" className="section">
        <div className="container px-6 lg:p-24 xl:px-[140px] py-20 xl:py-[130px] bg-primary kiron-container rounded-lg">
          <div className="text-center mb-14 mx-5 lg:mx-0">  
            <h2
              className="text-[20px] lg:text-5xl font-medium leading-tight mb-6 text-text"
              dangerouslySetInnerHTML={markdownify(kiron.title)}
            />
            <p
              className="text-[12px] lg:text-xl font-normal text-light"
              dangerouslySetInnerHTML={markdownify(kiron.subtitle)}
            />
          </div>
          <div className="px-4 py-5 lg:p-14 border border-border rounded-lg bg-accent mb-14">
            <h3
              className="text-[14px] lg:text-3xl font-medium leading-tight mb-10 text-text"
              dangerouslySetInnerHTML={markdownify(kiron.discussion.title)}
            />

            {kiron.discussion.chat.map((chat) => (
              <p
                key={chat}
                className="text-[12px] lg:text-2xl font-normal text-light mb-6 chat"
                dangerouslySetInnerHTML={markdownify(chat)}
              />
            ))}
          </div>

          <QuestionSection kiron={kiron} variant={undefined} />
        </div>
      </section>

      {/* about */}
      <section id="about" className="section">
        <div className="container-sm text-dark-light">
          <div className="row items-center lg:gx-5 gy-4">
            <div className="col-10 md:col-6">
              <ImageFallback
                src={about.image}
                width={535}
                height={532}
                alt="about kiron image"
              />
            </div>
            <div className="col-12 md:col-6">
              <h2
                className="text-[20px] lg:text-5xl font-medium leading-tight mb-4"
                dangerouslySetInnerHTML={markdownify(about.title)}
              />
              <p
                className="mb-6 text-[12px] lg:text-2xl leading-9"
                dangerouslySetInnerHTML={markdownify(about.content1)}
              />
              <p
                className="mb-6 text-[12px] lg:text-2xl leading-9"
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
      <section id="faqs" className="section pb-0">
        <div className="container-sm">
          <div className="text-center mb-14">
            <h2
              className="text-[20px] lg:text-5xl px-12 lg:px-0 font-medium leading-tight mb-6 text-dark"
              dangerouslySetInnerHTML={markdownify(faq.title)}
            />
          </div>

          <Accordion faqs={faq.accordion} />
        </div>
      </section>

      {/* cta */}
      <CallToAction />
    </>
  );
};

export default Home;
