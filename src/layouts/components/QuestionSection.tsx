"use client";

import { markdownify } from "@/lib/utils/textConverter";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const QuestionSection = ({
  kiron,
  variant,
}: {
  kiron: any;
  variant: any | undefined;
}) => {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState<any[] | undefined>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const questionParams = useSearchParams();
  const question = questionParams.get("q");
  useEffect(() => {
    if (question) {
      setSearch(question);
      askKiron(question);
    }
  }, [question]);

  const errorAlert = () =>
    toast.error(
      "There was a problem with the request. Please try again later.",
    );

  const askKiron = async (query: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_KIRON_API}/secret`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer abc123",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              role: "user",
              content: query,
            },
          ]),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearch("");
      setMessage((prevMessages) => [...(prevMessages || []), ...data]);
    } catch (error) {
      errorAlert();
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const chatBox = chatBoxRef.current;
    chatBox?.scrollTo({
      top: chatBox?.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [message]);

  return (
    <>
      <Swiper
        className="mb-14"
        loop={true}
        spaceBetween={24}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1025: {
            slidesPerView: 3,
          },
        }}
      >
        {kiron.questions.map((q: any, index: number) => (
          <SwiperSlide key={index} className="!h-auto">
            <div
              key={q}
              onClick={() => setSearch(q)}
              className={`!min-h-full ${variant ? "bg-body-light text-dark" : "bg-accent text-text"} border border-border-dark rounded-lg cursor-pointer`}
            >
              <p
                className="text-[14px] lg:text-2xl font-medium p-8 xl:p-12"
                dangerouslySetInnerHTML={markdownify(q)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {message?.length! > 0 && (
        <div
          id="chatBox"
          className={`${variant ? "border border-[#C6C6C6] bg-body-light" : "border-border-dark bg-accent "} rounded-lg py-5 pl-5 pr-2 mb-6`}
        >
          <div
            ref={chatBoxRef}
            className={`max-w-[1300px] max-h-[500px] overflow-y-auto`}
          >
            {message?.map((msg, index) => (
              <div
                key={index}
                className={`${(msg as any).role === "user" && "p-5 bg-[#e6e6e6] rounded-lg w-3/4 ml-auto"} message text-dark text-[14px] lg:text-2xl px-4 py-2`}
                dangerouslySetInnerHTML={markdownify(msg.content, true)}
              />
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          askKiron(search);
        }}
        className="relative"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter a prompt here"
          className={`w-full bg-transparent ${variant ? "border-border-dark focus:border-border-dark text-dark placeholder:text-dark-light" : "border-border focus:border-border text-text placeholder:text-light"} p-4 pr-16 lg:px-10 lg:pr-80 lg:py-[30px] rounded-lg focus:outline-none focus:ring-0 focus:shadow-none lg:text-2xl`}
          disabled={isLoading}
        />
        <button
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center btn ${variant ? "btn-primary" : "btn-secondary"}  p-3 lg:px-9 lg:py-5 text-lg lg:text-3xl`}
          type="submit"
          disabled={!search || isLoading}
        >
          {isLoading ? (
            <div className="flex items-baseline">
              <p className="mr-2">Searching</p>
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <FaMagnifyingGlass className="inline-block align-baseline lg:mr-3" />
              <span className="hidden lg:block">Search Here</span>
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default QuestionSection;
