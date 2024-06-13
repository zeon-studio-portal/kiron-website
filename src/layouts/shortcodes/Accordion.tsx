"use client";

import { useState } from "react";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

const Accordion = ({ faqs }: { faqs: any }) => {
  const [activeTab, setActiveTab] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      {faqs.map((faq: any, index: number) => (
        <div
          key={index}
          className={`accordion ${activeTab === index && "active"}`}
        >
          <button
            className="accordion-header"
            onClick={() => {
              activeTab === index ? setActiveTab(null) : setActiveTab(index);
            }}
          >
            {faq.title}
            {activeTab === index ? (
              <IoArrowUpCircleOutline className="text-primary flex-shrink-0" />
            ) : (
              <IoArrowDownCircleOutline className="text-primary flex-shrink-0" />
            )}
          </button>
          <div className="accordion-content">{faq.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
