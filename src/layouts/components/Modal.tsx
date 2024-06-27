"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import AccessModal from "./AccessModal";

const Modal = ({
  button,
  className,
  icon,
}: {
  button: any;
  className: any;
  icon: boolean;
}) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleOpenModal = () => {
    if (isAuthenticated) {
      router.push("/kiron");
    } else {
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <button
        className={`${className} max-md:btn-md max-md:w-10/12 mx-4 transition duration-700 ease-in-out`}
        rel="noopener"
        onClick={handleOpenModal}
      >
        {icon && (
          <FaMagnifyingGlass className="inline-block align-baseline h-full mr-3" />
        )}
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
