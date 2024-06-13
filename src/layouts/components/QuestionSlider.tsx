"use client";

import { markdownify } from "@/lib/utils/textConverter";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const QuestionSlider = ({ kiron }: { kiron: any }) => {
  return (
    <>
      <Swiper
        loop={true}
        centeredSlides={true}
        spaceBetween={24}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }}
      >
        {kiron.questions.map((q: any, index: number) => (
          <SwiperSlide className="" key={index}>
            <div
              key={q}
              className="border border-border-dark rounded-lg bg-accent"
            >
              <p
                className="text-2xl font-medium text-text p-12"
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
