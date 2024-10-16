import React, { useState } from "react";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { Link } from "react-router-dom";

function NavbarMobileCharts() {
  const [open, setopen] = useState(false);

  return (
    <>
      <div className="relative group">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setopen(!open);
          }}
          className={`
           text-gray-300 hover:bg-gray-700 w-10/12 hover:text-white flex gap-x-2 justify-between items-center px-2 py-2 text-md rounded-md font-medium  focus:text-white `}
          //aria-expanded="false"
        >
          {" "}
          <PriceChangeIcon fontSize="small" />
          Charts <i className="fa-solid fa-caret-down" />
        </button>
        <div
          className={`absolute z-10  bg-gray-800 rounded-md mt-0 ${
            open ? "block" : "hidden"
          }`}
          style={{ width: "10rem" }}
        >
          <Link to={"/charts"}>
            {" "}
            <span
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full cursor-pointer"
              style={{ textWrap: "no-wrap !important" }}
            >
              Charts Home
            </span>
          </Link>
          <Link
            to={"/multi"}
            className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
          >
            Cardano MultiChart
          </Link>
          <Link
            to={"/cryptoMultiCharts"}
            className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
          >
            Crypto MultiChart
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavbarMobileCharts;
