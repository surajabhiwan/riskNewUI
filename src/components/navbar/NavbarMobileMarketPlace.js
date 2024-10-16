import React, { useState } from "react";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { Link } from "react-router-dom";

function NavbarMobileMarketPlace() {
  const [open, setopen] = useState(false);

  return (
    <>
      <div className="relative group">
        <button
          onClick={(e) => {
             e.stopPropagation();
             setopen(!open)
          }}
          className={`
           text-gray-300 hover:bg-gray-700 w-10/12 hover:text-white flex gap-x-2 justify-between items-center px-2 py-2 text-md rounded-md font-medium  focus:text-white `}
            //aria-expanded="false"
        >
          {" "}
          <PriceChangeIcon fontSize="small" />
          Marketplace <i className="fa-solid fa-caret-down" />
        </button>
        <div
          className={`absolute z-10  bg-gray-800 rounded-md mt-0 ${
            open ? "block" : "hidden"
          }`}
          style={{ width: "10rem" }}
        >
          {/* <Link to={"/nftcrasher"}>
            {" "}
            <span
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full cursor-pointer"
              style={{ textWrap: "no-wrap !important" }}
            >
              NFT-Crashr
            </span>
          </Link> */}
          <Link
            to={"/nftjpgstore"}
            className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
          >
            NFT-Jpg.Store
          </Link>
          <Link
            to={"/nftcswap"}
            className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
          >
            NFT-Cswap
          </Link>
          <Link
            to={"/poolpm"}
            className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
          >
            Pool.pm
          </Link>
          {/* <Link
            to={"/cardanoScan"}
            className="block px-4 py-2 text-sm text-gray-300 text-nowrap hover:bg-gray-700"
          >
            Cardano Scan
          </Link> */}
          {/* <Link
                        to={"/lending"}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Lending
                      </Link> */}
          {/* <Link to={'/bubbles'} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Bubbles</Link> */}

          <Link to={"/gaming"}>
                        {" "}
                        <span
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full cursor-pointer"
                          style={{ textWrap: "no-wrap !important" }}
                        >
                          Gaming
                        </span>
                      </Link>
          <Link
            to={"/market-overview"}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Market Data
          </Link>
          {/* <Link
            to={"/DexScreener"}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            DexScreener
          </Link> */}
        </div>
      </div>
    </>
  );
}

export default NavbarMobileMarketPlace;
