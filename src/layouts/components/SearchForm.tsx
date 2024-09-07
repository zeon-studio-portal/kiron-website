"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import AccessModal from "./AccessModal";

const SearchForm = ({ lang }: { lang: string }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setIsVisible(true);
    } else {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const search = formData.get("search");

      if (search) {
        const searchParams = new URLSearchParams();
        searchParams.append("q", search.toString());
        router.push(`/${lang}/kiron?${searchParams.toString()}`);

        setTimeout(() => {
          router.replace(`/${lang}/kiron`);
        }, 1000);
      }
    }
  };

  return (
    <>
      {!isAuthenticated && (
        <AccessModal
          isModalVisible={isVisible}
          handleCloseModal={() => {
            setIsVisible(false);
          }}
        />
      )}
      <form className="relative" onSubmit={handleSubmit}>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Enter a prompt here"
          className={`w-full bg-transparent "border-border focus:border-border text-text placeholder:text-light p-4 pr-16 lg:px-10 lg:pr-80 lg:py-[30px] rounded-lg focus:outline-none focus:ring-0 focus:shadow-none lg:text-2xl`}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center btn btn-secondary p-3 lg:px-9 lg:py-5 text-lg lg:text-3xl`}
        >
          <FaMagnifyingGlass className="inline-block align-baseline lg:mr-3" />
          <span className="hidden lg:block">Search Here</span>
        </button>
      </form>
    </>
  );
};

export default SearchForm;
