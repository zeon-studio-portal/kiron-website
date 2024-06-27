import ImageFallback from "@/helpers/ImageFallback";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

const AccessModal = ({
  isModalVisible,
  handleCloseModal,
}: {
  isModalVisible: any;
  handleCloseModal: any;
}) => {
  if (!isModalVisible) return null;
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const wrongKey = () => toast.error("Incorrect secret key");

  const submitKey = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const secret = formData.get("secret");
    if (secret === process.env.NEXT_PUBLIC_SECRET_KEY) {
      handleCloseModal();
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      router.push("/kiron");
    } else {
      wrongKey();
    }
  };

  return (
    <div className="fixed inset-0 z-50 transform translate-x-[4%] md:translate-x-[16%] lg:translate-x-1/2 translate-y-1/4 w-11/12 md:w-3/4 lg:w-2/4 h-3/4">
      <FaXmark
        className="absolute cursor-pointer top-5 right-5 z-20 text-red-600"
        onClick={handleCloseModal}
      />

      <div className="flex flex-col justify-center items-center text-center p-[5%] h-auto bg-body shadow-lg rounded-lg">
        <ImageFallback
          className="mb-6 w-1/2"
          src="/images/kiron.svg"
          fallback="/images/kiron.svg"
          alt="kiron logo"
          width={0}
          height={0}
          priority
        />
        <h3 className="h3 mb-14">Welcome to KIRON AI</h3>

        <h5 className="h5 mb-6">Enter Your Secret Key to Access the ChatBot</h5>
        <form onSubmit={submitKey}>
          <input
            type="text"
            placeholder="*****"
            name="secret"
            autoComplete="off"
            className="mb-6 w-full bg-transparent border-primary text-dark px-6 py-[20px] rounded-lg focus:outline-none focus:ring-0 focus:shadow-none focus:border-primary"
          />
          <button className="btn btn-secondary w-full py-[18px]" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccessModal;
