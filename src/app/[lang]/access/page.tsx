import ImageFallback from "@/helpers/ImageFallback";
import { FaXmark } from "react-icons/fa6";

const AccessModal = ({
  isModalVisible,
  handleCloseModal,
}: {
  isModalVisible: any;
  handleCloseModal: any;
}) => {
  if (!isModalVisible) return null;

  return (
    <div className="fixed inset-0 z-30 transform translate-x-[4%] md:translate-x-[16%] lg:translate-x-1/2 translate-y-1/4 bg-body shadow-lg rounded-lg w-11/12 md:w-3/4 lg:w-2/4 h-3/4">
      <FaXmark
        className="absolute cursor-pointer top-5 right-5 z-20 text-red-600"
        onClick={handleCloseModal}
      />

      <div className="flex flex-col justify-center items-center text-center p-[10%] h-full">
        <ImageFallback
          className="mb-10"
          src="/images/kiron.svg"
          fallback="/images/kiron.svg"
          alt="kiron logo"
          width={442}
          height={217}
        />
        <h3 className="h3 mb-14">Welcome to KIRON AI</h3>

        <h5 className="h5 mb-6">Enter Your Secret Key to Access the ChatBot</h5>
        <input
          type="text"
          placeholder="*****"
          className="mb-8 w-full bg-transparent border-primary text-dark px-6 py-[20px] rounded-lg focus:outline-none focus:ring-0 focus:shadow-none focus:border-primary"
        />
        <button className="btn btn-secondary w-full py-[18px]">Submit</button>
      </div>
    </div>
  );
};

export default AccessModal;
