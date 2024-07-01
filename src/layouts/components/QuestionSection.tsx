"use client";

import { markdownify } from "@/lib/utils/textConverter";
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
  const [message, setMessage] = useState<any[] | undefined>([
    {
      role: "admin",
      content: "What are the most common cyber scams in Bangladesh?",
    },
    {
      role: "user",
      content: "What are the most common cyber scams in Bangladesh?",
    },
    {
      role: "user",
      content: "What are the most common cyber scams in Bangladesh?",
    },
    {
      role: "admin",
      content: "What are the most common cyber scams in Bangladesh?",
    },
    {
      role: "user",
      content: "What are the most common cyber scams in Bangladesh?",
    },
    {
      role: "admin",
      content: "What are the most common cyber scams in Bangladesh?",
    },
    {
      role: "user",
      content: "What are the most common cyber scams in Bangladesh?",
    },
    {
      role: "user",
      content: "What are the most common cyber scams in Bangladesh?",
    },
    {
      role: "user",
      content: "What are the most common cyber scams in Bangladesh?",
    },
    {
      role: "assistant",
      content: "A lots of things happening in bangladesh",
    },
  ]);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const errorAlert = () =>
    toast.error(
      "There was a problem with the request. Please try again later.",
    );

  const askKiron = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

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
              content: search,
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
              onClick={setSearch.bind(this, q)}
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
          ref={chatBoxRef}
          className={`${variant ? "border-[#C6C6C6] bg-body-light" : "border-border-dark bg-accent "} border  rounded-lg mb-6 max-w-[1300px] max-h-[300px] overflow-y-scroll`}
        >
          {message?.map((msg, index) => (
            <p
              key={index}
              className={`${(msg as any).role === "user" ? "text-right text-green-500" : "text-left text-red-500"} message text-[14px] lg:text-2xl font-medium px-4 py-2`}
            >
              {/* <span className="uppercase ">{(msg as any).role}</span> :{" "} */}
              <span>{(msg as any).content}</span>
            </p>
          ))}
        </div>
      )}

      <form onSubmit={askKiron} className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter a prompt here"
          className={`w-full bg-transparent ${variant ? "border-border-dark focus:border-border-dark text-dark placeholder:text-dark-light" : "border-border focus:border-border text-text placeholder:text-light"} p-4 pr-16 lg:px-10 lg:pr-80 lg:py-[30px] rounded-lg focus:outline-none focus:ring-0 focus:shadow-none lg:text-2xl`}
        />
        <button
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center btn ${variant ? "btn-primary" : "btn-secondary"}  p-3 lg:px-9 lg:py-5 text-lg lg:text-3xl`}
          type="submit"
        >
          <FaMagnifyingGlass className="inline-block align-baseline lg:mr-3" />
          <span className="hidden lg:block">Search Here</span>
        </button>
      </form>
    </>
  );
};

export default QuestionSection;
