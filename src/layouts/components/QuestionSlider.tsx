"use client";

import { markdownify } from "@/lib/utils/textConverter";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const QuestionSlider = ({ kiron }: { kiron: any }) => {
  return (
    <>
      <Swiper
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
          <SwiperSlide key={index}>
            <div
              key={q}
              className="light-questions border border-border-dark rounded-lg bg-accent"
            >
              <p
                className="text-2xl font-medium text-text p-8 xl:p-12"
                dangerouslySetInnerHTML={markdownify(q)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default QuestionSlider;
