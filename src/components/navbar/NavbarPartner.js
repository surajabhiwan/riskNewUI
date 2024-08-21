import { Link } from "react-router-dom";

import * as SVG from "../../common/Icons";

const NavbarPartner = (props) => {
  const { menu } = props;

  return (
    <>
      <div
        className={`h-9  px-2 rounded-xl flex items-center mt-2
            ${
              menu === "partnerhome"
                ? "bg-gradient-to-r from-yellow-200 to-yellow-400"
                : ""
            } `}
      >
        <Link to="/partner" className="flex items-center cursor-pointer gap-4">
          <SVG.Parthner menu={menu} />
          <div
            className={`transition-all duration-300
                 ${menu === "partnerhome" ? "text-black" : "text-white"}  `}
          >
            <span className={`font-normal ml-1 text-sm hover:opacity-80`}>
              Education<sup className="text-yellow-400 text-[10px]">pro</sup>
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarPartner;
