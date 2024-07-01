import Kiron from "@/components/Kiron";
import languages from "@/config/language.json";
import { getListPage } from "@/lib/contentParser";
import SeoMeta from "@/partials/SeoMeta";
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
    <>
      <SeoMeta title="Kiron AI" />
      <Kiron kiron={kiron} />
    </>
  );
};

export default page;
