/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";

// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import { useDispatch, useSelector } from "react-redux";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { isProApi } from "../../baseurl/baseurl";
import axios from "axios";
import { decryption, encryption } from "../../functions/crypto";
import { useEffect, useState } from "react";
import { setIsProRedux } from "../../store/slices/walltProfiler";
const NavbarAccountLarge = (props) => {
  const { menu } = props;
  const { signedMessage } = useSelector((state) => state.wallet);
console.log(signedMessage,'NQV-----');
const { isConnected, stakeAddress } = useCardano();
const [isPro, setIsPro] = useState(false)
const dispatch = useDispatch()

// API to check account is PRO or NOT
const isProFetch = async()=>{
  const data = {
    address : stakeAddress
}
const encryptedData = {
    key: encryption(data)
};

try{
  const response = await axios.post(isProApi, encryptedData);
  const result = decryption(response?.data);
  setIsPro(result?.isPro)
  //Stake set to pro for testing
  if( stakeAddress === 'stake1u8ns9la8s4u3t6898ma4uxfxm08ec2ygvds2d0e76dmfznque8xdf'){
    dispatch(setIsProRedux(true))
  }
  else{
    dispatch(setIsProRedux(result?.isPro))
  }
}
catch(err){
  console.log(err)
}
}

// If PRO set true else false
useEffect(()=>{
  if(!isConnected){
    setIsPro(false);
    dispatch(setIsProRedux(false))
  }
  else{
    isProFetch();
  }
},[stakeAddress, isConnected])

  return (
    <>
      <div
        className={`h-9 px-2 items-center rounded-xl flex
            ${menu === "accounthome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400 p-[1.7rem] mb-2"
            : ""
          }`} >
            {signedMessage &&
            <div style={{cursor:"pointer"}}>
             <div className={`flex justify-center items-center ${menu === "accounthome" ? "" : "text-white"} `}>
            <ManageAccountsSharpIcon fontSize="small" />
          </div>
          <div
          onClick={()=>{
            localStorage.removeItem('wallet_sign')
            window.location.reload()

          }}
            className={`transition-all duration-300
                 ${menu === "accounthome" ? "text-black" : "text-white"}`} >
            <span className={`font-normal ml-2 text-sm hover:opacity-80`}>{signedMessage && signedMessage?.substring(0,6)+"..."} </span>
          </div>
            </div>
}    
          <Link to="/account" className="flex cursor-pointer">
            <div className="flex flex-col">

          <div className={`flex justify-center items-center ${menu === "accounthome" ? "" : "text-white"} `}>
            <ManageAccountsSharpIcon fontSize="medium" />
          </div>
          
          <div
            className={`transition-all duration-300
                 ${menu === "accounthome" ? "text-black" : "text-white"}`} >
            <span className={`font-normal ml-2 text-sm hover:opacity-80`}>Account <span className="text-green-400 text-bold">{isPro ? "PRO": ""}</span></span>
          </div>
            </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarAccountLarge;
