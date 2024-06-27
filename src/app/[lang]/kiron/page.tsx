import QuestionSection from "@/components/QuestionSection";
import languages from "@/config/language.json";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import path from "path";

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
    <div className="container px-6 p-24 xl:px-[140px] py-[50px] kiron-container rounded-lg">
      <div className="text-center mb-14 mx-5 lg:mx-0">
        <h2
          className="text-[20px] lg:text-5xl font-medium leading-tight mb-6"
          dangerouslySetInnerHTML={markdownify(kiron.title)}
        />
        <p
          className="text-[12px] lg:text-xl font-normal text-dark-light"
          dangerouslySetInnerHTML={markdownify(kiron.subtitle)}
        />
      </div>
      <div className="px-4 py-5 lg:p-14 border rounded-lg border-[#C6C6C6] bg-body-light mb-14">
        <h3
          className="text-[14px] lg:text-3xl font-medium leading-tight mb-10 text-dark-text"
          dangerouslySetInnerHTML={markdownify(kiron.discussion.title)}
        />

        {kiron.discussion.chat.map((chat) => (
          <p
            key={chat}
            className="text-[12px] lg:text-2xl font-normal text-dark-light mb-6 chat-light"
            dangerouslySetInnerHTML={markdownify(chat)}
          />
        ))}
      </div>

      <QuestionSection kiron={kiron} variant="light" />
    </div>
  );
};

export default page;
