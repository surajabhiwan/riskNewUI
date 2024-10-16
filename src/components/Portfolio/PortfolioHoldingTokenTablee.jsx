import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getImage, getImageNft, ip } from "../../baseurl/baseurl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const tableCustomStyles = {
  table: {
    style: {
      borderRadius: "10px 10px 10px 10px",
      backgroundColor: "#142028",
      overflowY: "scroll",
      textOverflow: "hidden",
      height: "100%",
      width: "100%",
      borderBottom: "1px solid #56577A !important ",
      whiteSpace: "nowrap",
    },
  },
  tableWrapper: {
    style: {
      display: "table",
      backgroundColor: "#142028",
      borderRadius: "10px 10px 10px 10px",
      padding: ".8rem",
      height: "79vh",
    },
  },
  headRow: {
    style: {
      borderBottom: "1px solid #56577A !important ",
      borderRadius: "18px 18px 0 0",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#142028",
      fontSize: "1.1rem",
      color: "#A0AEC0",
      fontWeight: "bold",
      paddingLeft: "0 8px",
      // justifyContent: "center",
      textOverflow: "hidden",
    },
  },
  cells: {
    style: {
      fontSize: "1rem",
      // justifyContent: "center",
      fontWeight: "bold",
    },
  },
  rows: {
    style: {
      backgroundColor: "#142028",
      color: "white",
      borderRadius: "18px 18px 0 0",
    },
  },
  noData: {
    style: {
      color: "white",
      backgroundColor: "transparent",
      fontSize: "1.4rem",
    },
  },
  pagination: {
    style: {
      color: "#A0AEC0",
      backgroundColor: "#142028",
      borderRadius: "0 0 18px 18px",
      fontWeight: "700",
      borderTop: "0px ",
    },
    pageButtonsStyle: {
      borderRadius: "40%",
      height: "40px",
      width: "40px",
      cursor: "pointer",
      transition: "0.4s",
      color: "white !important",
      fill: "#A0AEC0",
      "&:disabled": {
        cursor: "unset",
        fill: "#8993a1",
      },
      "&:hover:not(:disabled)": {},
      "&:focus": {
        outline: "none",
      },
    },
  },
};

const PortfolioHoldingTokenTablee = () => {
  const { walletProfilerBalance } = useSelector(
    (state) => state.walletProfilerReducer
  );

  const { walletPosition } = useSelector((state) => state.wallet);
  console.log("walletProfilerBalance iamsun", walletProfilerBalance);
  console.log("walletPosition iamsun", walletPosition);

  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Add useNavigate hook
  const { assetType } = useSelector((state) => state.walletProfilerReducer);
  const fetchImage = async (unit) => {
    console.log("unit receiving fetch image portfolio iamsun");
    try {
      const response = await axios.get(
        `${ip}/api/assets-image/${unit}?hash=${unit}`
      );
      if (response.status === 200) {
        return response.data.image; // Assuming image URL is in `data.image`
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      return ""; // Return empty string on error
    }
  };
  useEffect(() => {
    if (location.pathname === "/portfolio") {
      setData(walletPosition);
    } else if (location.pathname === "/profiler") {
      setData(walletProfilerBalance);
    }
  }, [location.pathname, walletPosition, walletProfilerBalance]);

  const handleRowClick = (row) => {
    const link =
      row?.unit || row?.policy
        ? `/charts?token=${
            assetType === "nft" ? row?.name : row?.ticker
          }&unit=${assetType === "nft" ? row?.policy : row?.unit}&pairID=${
            row?.policy
          }&type=${assetType}`
        : "#";

    navigate(link); // Navigate to the constructed link
  };

  const columnsNft = [
    {
      name: "Name",
      width: "200px",
      selector: (row) => (
        <div className="flex gap-4 items-center w-full">
          <Link
            to="#"
            className="flex gap-4 items-center w-full"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event
            }}
          >
            <div>
              <img
                src={row?.image} // Fetch image based on `unit`
                // src={getImageNft + `/${row?.image}`}
                alt="img"
                height={30}
                width={30}
                className="w-10 rounded-full"
              />
            </div>
            <span
              className="w-full truncate inline-block whitespace-nowrap"
              title={assetType === "token" ? row?.ticker : row.name}
            >
              {assetType === "token" ? row?.ticker : row.name}
            </span>
          </Link>
        </div>
      ),
    },
    {
      name: "24h",
      selector: (row) => (
        <p
          className={`${row?.["24h"] > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {row?.["24h"]?.toFixed(2)}
        </p>
      ),
    },
    {
      name: "30d",
      selector: (row) => (
        <p
          className={`${row?.["30d"] > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {row?.["30d"]?.toFixed(2)}
        </p>
      ),
    },
    {
      name: "7d",
      selector: (row) => (
        <p className={`${row?.["7d"] > 0 ? "text-green-500" : "text-red-500"}`}>
          {row?.["7d"]?.toFixed(2)}
        </p>
      ),
    },
    {
      name: "Floor Price",
      selector: (row) => <p>{row?.floorPrice + " ₳"}</p>,
    },
    {
      name: "NFTs Held",
      selector: (row) => <p>{row?.balance}</p>,
    },
    {
      name: "Value",
      selector: (row) => <p>{row?.adaValue?.toFixed() + " ₳"}</p>,
    },
  ];

  const columnsToken = [
    {
      name: "Name",
      selector: (row) => (
        <div className="flex gap-4 items-center w-full">
          <div className="flex items-center w-[40%]">
            <img
              src={row?.image || '/ada.jpg'} // Fetch image based on `unit`
              // src={getImageNft + `/${row?.image}`}
              alt="img"
              height={30}
              width={30}
              className="w-10 rounded-full"
            />
          </div>
          <span
            className="w-full truncate inline-block whitespace-nowrap"
            title={assetType === "token" ? row?.ticker : row.name}
          >
            {assetType === "token" ? row?.ticker : row.name}
          </span>
        </div>
      ),
    },
    {
      name: "24h",
      selector: (row) => (
        <p
          className={`${row?.["24h"] > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {row?.["24h"]?.toFixed(2)}
        </p>
      ),
    },
    {
      name: "30d",
      selector: (row) => (
        <p
          className={`${row?.["30d"] > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {row?.["30d"]?.toFixed(2)}
        </p>
      ),
    },
    {
      name: "7d",
      selector: (row) => (
        <p className={`${row?.["7d"] > 0 ? "text-green-500" : "text-red-500"}`}>
          {row?.["7d"]?.toFixed(2)}
        </p>
      ),
    },
    {
      name: "Value",
      selector: (row) => <p>{row?.adaValue?.toFixed() + " ₳"}</p>,
    },
  ];

  return (
    <div className="pt-4 ">
      <DataTable
        columns={assetType === "token" ? columnsToken : columnsNft}
        data={
          assetType === "token"
            ? data?.walletPosition?.positionsFt
            : data?.walletPosition?.positionsNft
        }
        pagination={false}
        customStyles={tableCustomStyles}
        noDataComponent={
          assetType === "token" ? "No tokens found" : "No NFTs found"
        }
        pointerOnHover
        responsive
        fixedHeaderScrollHeight="300px"
        subHeaderWrap
        onRowClicked={handleRowClick} // Handle row click for navigation
      />
    </div>
  );
};

export default PortfolioHoldingTokenTablee;
