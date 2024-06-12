"use client";

import { useState } from "react";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

const Accordion = ({ faqs }: { faqs: any }) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

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
              <IoArrowUpCircleOutline />
            ) : (
              <IoArrowDownCircleOutline />
            )}
          </button>
          <div className="accordion-content">{faq.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
