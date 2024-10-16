import React, { useState } from "react";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { Link } from "react-router-dom";

function NavbarMobileMining() {
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
          Mining <i className="fa-solid fa-caret-down" />
        </button>
        <div
          className={`absolute z-10  bg-gray-800 rounded-md mt-0 ${
            open ? "block" : "hidden"
          }`}
          style={{ width: "10rem" }}
        >
          <Link to={"/bms"}>
            {" "}
            <span
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full cursor-pointer"
              style={{ textWrap: "no-wrap !important" }}
            >
              BMS
            </span>
          </Link>
          <Link
            to={"/block-miners"}
            className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
          >
            Block Miners
          </Link>
          <Link
            to={"/neo-viking"}
            className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
          >
            Neo Vikings
          </Link>
          <Link
            to={"/goofy"}
            className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
          >
            Goofy Gophers
          </Link>
        </div>
      </div>
    </>
  );
}

export default NavbarMobileMining;
