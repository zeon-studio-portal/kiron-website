import { FaArrowRight } from "react-icons/fa6";

const CallToAction = () => {
  return (
    <div className="container bg-primary text-center py-9 lg:py-28 rounded-lg banner-section translate-y-1/2">
      <h1 className="text-5xl font-medium leading-tight mb-2 text-text">
        Stay Up-to date
      </h1>
      <p className="text-2xl mb-10">
        Never miss an update—every new post is sent directly to your email inbox
      </p>
      <button className="flex items-center btn btn-md btn-secondary mx-auto">
        <FaArrowRight className="mr-3" />
        See More
      </button>
    </div>
  );
};

export default CallToAction;
