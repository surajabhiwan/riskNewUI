import { Link } from "react-router-dom";

import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
const NavbarNftMarketplaceLarge = (props) => {
  
  const { menu } = props;

  return (
    <>
      <div
        className={`h-9 px-2 rounded-xl  flex items-center mt-2
            ${menu === "nftMarketplacehome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400" : ""}    `}  >
        <Link to="/nftmarketplace" className="flex items-center cursor-pointer">
          <div className={`flex justify-center items-center ${menu === "nftMarketplacehome" ? "" : "text-white"} `}>
            <CurrencyExchangeOutlinedIcon fontSize="small" />
          </div>
          <div
            className={`transition-all duration-300  ${menu === "nftMarketplacehome" ? "text-black" : "text-white"}`} >
            <span className={`font-normal ml-2 text-sm hover:opacity-80`} style={{textWrap: 'nowrap'}}>NFT Marketplace</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarNftMarketplaceLarge;
