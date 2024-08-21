const NavbarHeader = (props) => {
  const { isScale } = props;
  return (
    <>
      <div className="flex">
        <div
          className={` mb-6 mt-3 w-[44px]  h-[44px] cursor-pointer
            `}
        >
          <img
            src="/static/images/icons/Icon.png"
            className=""
            alt="riskwise"
          />
        </div>
        <div
          className={`duration-300 transition-all flex font-semibold text-base items-center ml-1 pb-5 ${
            isScale ? "flex" : "w-0"
          }`}
        >
          <div>
            <span className="text-white">riskwises</span>
            <div className="h-[2px] mt-1 bg-gradient-to-r from-yellow-500 to-yellow-200 "></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavbarHeader;
