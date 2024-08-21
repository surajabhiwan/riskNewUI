import { Link } from "react-router-dom";

import * as SVG from "../../common/Icons";

const NavbarMulti = (props) => {
  const { menu } = props;

  return (
    <>
      <div
        className={`h-9  px-2 rounded-xl flex items-center mt-2
            ${menu === "unithome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400" : ""} `}  >
        <Link to="/multi" className="flex items-center cursor-pointer gap-4">
          <SVG.multiChart menu={menu} />
          <div
            className={`transition-all duration-300
                 ${menu === "unithome" ? "text-black" : "text-white"} `} >
            <span className={`font-normal ml-1 text-sm hover:opacity-80`}>&nbsp;&nbsp;Cardano Multichart</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarMulti;
