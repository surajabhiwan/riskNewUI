/* eslint-disable react-hooks/exhaustive-deps */
// import Countdown from "react-countdown";
import * as SVG from "../../common/Icons";
import { useEffect, useState } from "react";
import { cardanoPriceApi } from "../../baseurl/baseurl";
import axios from "axios";
import { decryption } from "../../functions/crypto";
import { tableAction } from "../../store/slices/TableData";
import { useDispatch } from "react-redux";

const HeaderData = () => {
const [adaPrice, setAdaPrice] = useState('')
const [changePercent, setChangePercent] = useState('')

const dispatch = useDispatch()

//APi for live ADA price at homepage
  const fetchCardanoPrice = async () => {
    try {
      const response = await axios.get(cardanoPriceApi);
      const result = decryption(response?.data)
      const cardanoPrice = result?.price;
      const changepercent = result?.changeinday;
      setAdaPrice(cardanoPrice)
      dispatch(tableAction.getAdaLive(cardanoPrice))
      setChangePercent(changepercent)
      console.log('Current Cardano Price (USD):', cardanoPrice);
    } catch (error) {
      console.error('Error fetching Cardano price:', error);
    }
  };

  //Call Live ADA price api at homepage only
  useEffect(() => {
    if (window.location.pathname === "/") {
      fetchCardanoPrice();
    } 
  }, [window.location.pathname]);


  return (
    <div className="flex justify-start items-center w-full lg:gap-1 gap-4 text-lg whitespace-nowrap overflow-x-scroll scrollable-invisible">
     
        <div className="flex gap-1">
          <span className="text-[#9f9fa8]">{`ADA Price`}:</span>
          <span className= "text-[#70f7ff]" >{adaPrice}</span> &nbsp;
          <span className="">
            <div className="flex place-items-baseline">
              {changePercent > 0  ? <SVG.GoUp /> : <SVG.GoDown />} &nbsp; 
              <span
                style={changePercent > 0 ? {color: '#20eb7a'} : {color: '#ff422b'}}
              >
                {changePercent > 0 ? changePercent : changePercent * -1}%
              </span>
            </div>
          </span>
        </div>

    </div>
  );
};

export default HeaderData;


