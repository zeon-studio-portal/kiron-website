import { markdownify } from "@/lib/utils/textConverter";

import QuestionSlider from "@/components/QuestionSlider";
import languages from "@/config/language.json";
import { getListPage } from "@/lib/contentParser";
import path from "path";
import { FaMagnifyingGlass } from "react-icons/fa6";

const page = ({ params }: { params: { lang: string } }) => {
  const lang = params.lang;
  const language = languages.find(
    (language) => language.languageCode === lang,
  )!;
  const homepage = getListPage(
    path.join(language?.contentDir, "homepage/_index.md"),
  );
  const { frontmatter } = homepage;
  const {
    kiron,
  }: {
    kiron: {
      title: string;
      subtitle: string;
      discussion: { title: string; chat: string[] };
      questions: string[];
    };
  } = frontmatter;

  return (
    <div className="container px-6 lg:px-[140px] py-20 lg:py-[130px] kiron-container rounded-lg">
      <div className="text-center mb-14 mx-5 lg:mx-0">
        <h2
          className="lg:text-5xl h2 font-medium leading-tight mb-6 "
          dangerouslySetInnerHTML={markdownify(kiron.title)}
        />
        <p
          className="lg:text-xl font-normal text-dark-light"
          dangerouslySetInnerHTML={markdownify(kiron.subtitle)}
        />
      </div>
      <div className="px-4 py-5 lg:p-14 border border-[#C6C6C6] rounded-lg bg-body-light mb-14">
        <h3
          className="text-3xl font-medium leading-tight mb-10 text-dark-text"
          dangerouslySetInnerHTML={markdownify(kiron.discussion.title)}
        />

        {kiron.discussion.chat.map((chat) => (
          <p
            key={chat}
            className="text-2xl font-normal text-dark-light mb-6 chat-light"
            dangerouslySetInnerHTML={markdownify(chat)}
          />
        ))}
      </div>
      <div className="mb-14">
        <QuestionSlider kiron={kiron} />
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Enter a prompt here"
          className="w-full bg-transparent border-border-dark lg:px-10 pl-10 pr-32 py-[21px] lg:py-[30px] rounded-lg focus:outline-none focus:ring-0 focus:shadow-none focus:border-border-dark text-text text-2xl placeholder:text-dark-light"
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2
  flex items-center justify-center btn btn-primary"
        >
          <FaMagnifyingGlass className="inline-block align-baseline lg:mr-3" />
          <span className="hidden lg:block">Search Here</span>
        </button>
      </div>
    </div>
  );
};

export default page;
