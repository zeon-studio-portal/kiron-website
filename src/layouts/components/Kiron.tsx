"use client";

import { markdownify } from "@/lib/utils/textConverter";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import QuestionSection from "./QuestionSection";

const Kiron = ({ kiron }: { kiron: any }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="container px-6 p-24 xl:px-[140px] py-[50px] kiron-container rounded-lg">
        <div className="text-center mb-14 mx-5 lg:mx-0">
          <h2 className="text-[20px] lg:text-5xl font-medium leading-tight mb-6">
            Your secret is invalid.
          </h2>
        </div>
      </div>
    );
  }

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
      <QuestionSection kiron={kiron} variant="light" />
    </div>
  );
};

export default Kiron;
