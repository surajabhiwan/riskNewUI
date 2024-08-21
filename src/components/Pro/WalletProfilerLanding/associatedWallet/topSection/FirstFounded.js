import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FirstFounded = () => {
  // const token = "stake1uxdytgqashzgrqnnyhk2q5me27lsfq8vxl56mfe3kpjqp5qg88gw0";
  const { inputOutputData } = useSelector((state) => state.walletProfilerReducer);
  return (
    <div className="flex flex-col space-y-2 md:w-[22%] w-full">
      <Link to="/profiler">
        <div className="md:w-[70%] space-y-2">
          <div className="text-white sm:whitespace-nowrap">
            First Funded by
          </div>
          <div className="h-9 bg-[#142028] rounded-full px-2 pt-[5px] text-white truncate" title={inputOutputData[0]?.stake}>
            {/* {token} */}
            {inputOutputData[inputOutputData.length - 1]?.stake ? inputOutputData[inputOutputData.length - 1]?.stake : '---'}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FirstFounded;
