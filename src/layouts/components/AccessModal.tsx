import ImageFallback from "@/helpers/ImageFallback";

const AccessModal = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
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
        className="mb-8 w-full bg-transparent border-primary text-dark px-6 py-[14px] rounded-lg focus:outline-none focus:ring-0 focus:shadow-none focus:border-primary"
      />
      <button className="btn btn-secondary w-full py-[18px]">Submit</button>
    </div>
  );
};

export default AccessModal;
