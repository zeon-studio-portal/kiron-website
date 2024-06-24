"use client";

import AccessModal from "@/app/[lang]/access/page";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Modal = ({ button }: { button: any }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <button
        className="btn max-md:btn-md max-md:w-10/12 mx-4 btn-secondary transition duration-700 ease-in-out"
        rel="noopener"
        onClick={handleOpenModal}
      >
        <FaMagnifyingGlass className="inline-block align-baseline h-full mr-3" />
        {button?.label}
      </button>
      <AccessModal
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Modal;
