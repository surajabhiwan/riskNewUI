import * as SVG from "../../common/Icons";
import { Link } from "react-router-dom";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useState } from "react";
import { decryption, encryption } from "../../functions/crypto";
import { getNftTopHoldersApi } from "../../baseurl/baseurl";
import axios from "axios";
import useAddressHandler from "../../customHook/adressConvert";

const TopHoldersNft = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { isSearching, handleAddresses } = useAddressHandler();


    const getNftTopHolders = async () => {
        setIsLoading(true)
        const data = {
            "policyId": "e3ff4ab89245ede61b3e2beab0443dbcc7ea8ca2c017478e4e8990e2",
            "name": "EarthNode692"
        }
        const encryptedData = {
            key: encryption(data)
        }
        try {
            const response = await axios.post(getNftTopHoldersApi, encryptedData);
            const result = decryption(response?.data);
            console.log('getNftTopHolders', result)
            setData(result?.NFTTopHolder)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getNftTopHolders()
    }, [])



    const handleSubmit = async (inputValue) => {
      if(inputValue?.length > 0){
          handleAddresses(inputValue);
      }
      else{
        return null
      }
      };

    return (
        <div>
            <h1 className="text-white p-0 flex pb-2"><span className="p-[2px]"><SVG.HotWallets /></span>&nbsp; <span>Top holders</span> </h1>
            <SimpleBarReact className='h-[27rem]'>
                <div className="scrollbarr w-full mb-4 rounded-xl">
                    {
                        isLoading ?
                            <SkeletonTheme baseColor="#142028" highlightColor="#444">
                                <p>
                                    <Skeleton count={10} height={50} />
                                </p>
                            </SkeletonTheme> :
                            <div
  class="cursor-pointer group overflow-hidden p-5 duration-1000 hover:duration-1000 relative w-full h-full bg-neutral-800 rounded-xl"
>
  <div
    class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"
  ></div>
  <div
    class="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-44 left-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"
  ></div>
  <div
    class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-24 h-24"
  ></div>
  <div
    class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-12 h-12"
  ></div>
  <div
    class="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-44 h-44"
  ></div>
  <div
    class="group-hover:rotate-45 bg-transparent group-hover:scale-150 -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-64 h-64"
  ></div>
  <div
    class="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-1000 duration-1000 w-4 h-4"
  ></div>
  <div
    class="w-full h-full shadow-xl shadow-neutral-900 p-3 bg-black opacity-50 rounded-xl flex-col gap-2 flex justify-center"
  >
 <div className="pt-4 pb-4 ">
                                {
                                    data?.map((data, idx) => (
                                        <div
                                            className={`cursor-pointer h-full  overflow-x-hidden `}
                                            key={data?.idx}
                                        >
                                            <div className="flex  px-2 mb-2" >
                                                <div className="flex items-center xl:w-1/2 w-1/2">
                                                    <div className="flex w-3 h-3 items-center justify-center sm:text-sm text-xs">
                                                        <SVG.WatchList />
                                                    </div>
                                                    <div className="text-white font-semibold flex justify-center items-center ml-4 sm:text-sm text-xs">
                                                        {idx + 1}
                                                    </div>

                                                    <div>

                                                        <div className="text-white font-normal flex justify-start items-center ml-4 sm:text-sm text-xs truncate w-[3rem] md:w-full lg:full xl:full hover:text-white" onClick={()=>handleSubmit(data?.address)}>
                                                            {data?.amount} NFTs

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end justify-center xl:w-[80%] sm:w-[10%] w-[20%]">
                                                    <div className="flex text-white font-normal  sm:text-sm text-xs cursor-pointer" onClick={()=>handleSubmit(data?.address)}>
                                                        {data?.address?.slice(0, 8) + '...' + data?.address?.slice(-5)}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

  </div>
</div>

                           
                    }
                </div>
            </SimpleBarReact>
        </div>
    )
};

export default TopHoldersNft;