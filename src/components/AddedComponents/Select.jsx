import axios from "axios"
import DateButtonGroupTable from "../Charts/Volume/DateButtonGroupTable"
import { useCallback, useEffect, useState } from "react"
import { buySellDataApi } from "../../baseurl/baseurl"
import { useParams, useSearchParams } from "react-router-dom"
import { convertMillion } from "../../functions/functions"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { decryption, encryption } from "../../functions/crypto"

const dateData = [
    {
        id: 0,
        date: "1h",
        active: true
    },
    {
        id: 1,
        date: "4h",
        active: false
    },
    {
        id: 3,
        date: "24h",
        active: false
    },
    {
        id: 4,
        date: "7d",
        active: false
    },
    {
        id: 5,
        date: "30d",
        active: false
    }
]

const SelectComp = () => {
    const [buyData, setBuyData] = useState();
    const [interval, setInterval] = useState('1h');

    const [datas, setDatas] = useState(dateData);
    const [isLoading, setIsLoading] = useState(false);
    const [cachedData, setCachedData] = useState({});
    const [searchParams] = useSearchParams();
    // Extracting values from search params
    const unit = searchParams.get('unit');
    const token = searchParams.get('token');

    const handleClick = useCallback((_idx) => {
        const newData = dateData.map((item, idx) => {
            if (idx === _idx) {
                return { ...item, active: true };
            } else {
                return { ...item, active: false };
            }
        });
        let newInterval;
        if (_idx === 0) {
            newInterval = '1h';
        } else if (_idx === 1) {
            newInterval = '4h';
        } else if (_idx === 2) {
            newInterval = '24h';
        } else if (_idx === 3) {
            newInterval = '7d';
        } else if (_idx === 4) {
            newInterval = '30d';
        }
        setDatas(newData);
        setInterval(newInterval);
    }, []);

    const fetchBuySell = useCallback(async () => {
        setIsLoading(true);
        try {
            // Check if data is already cached
            if (cachedData[interval]) {
                setBuyData(cachedData[interval]);
            } else {
                const data = {
                    unit: unit ? unit : 'f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc53541474958',
                    interval: interval
                }
                const encryptedData = {
                    key: encryption(data)
                }
                const response = await axios.post(buySellDataApi, encryptedData);
                const result = decryption(response?.data);
                console.log('BuySell', result);
                // Cache fetched data
                // setCachedData(prevState => ({
                //     ...prevState,
                //     [interval]: result?.stats
                // }));
                setBuyData(result?.stats);
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }, [interval, cachedData, unit]);

    useEffect(() => {
        fetchBuySell();
    }, [interval, unit, token, fetchBuySell]);
    
    return (
        <div
            style={{ "background": "linear-gradient(rgb(20, 32, 40), rgb(0, 0, 0)) 0px 0px no-repeat padding-box padding-box transparent" }}
            className="lg:flex lg:flex-col hidden gap-4 w-auto rounded-2xl h-auto p-4">
            {/* <DateButtonGroupTable dateData={dateData} /> */}
            <div
                className={`flex items-center justify-between   w-[250px] h-[25px] bg-[#142028] rounded-lg `}>
                {datas.map((item, idx) => {
                    return (
                        <span
                            onClick={() => handleClick(idx)}
                            key={idx}
                            className={`flex justify-center items-center w-10 h-[25px] text-xs cursor-pointer hover:text-white ${item.active ? "bg-[#3a4956] rounded-lg text-white" : "text-[#9f9fa8]"}`}>{item?.date}</span>
                    )
                })}
            </div>

            {/* Part 1 */}
            {isLoading ? <SkeletonTheme baseColor="#142028" highlightColor="#444">
                <p>
                    <Skeleton count={3} height={100} />
                </p>
            </SkeletonTheme> :
                <>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3 w-full bg-[#0b1217] rounded-xl p-3">
                            <div className="flex justify-between items-center w-full">
                                <p className="text-[#9f9fa8] text-base inline-block whitespace-normal overflow-hidden text-ellipsis">Buys / Sells</p>
                            </div>
                            <div className=" flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <p className="text-green-400 font-normal text-sm">{convertMillion(buyData?.buys)}
                                    </p>
                                    <p className="text-red-400 font-normal text-sm">{convertMillion(buyData?.sells)}
                                    </p>
                                </div>
                                <div className="flex w-full">
                                    {/* <div className={`w-[${lengthToken}%]`}> */}
                                    <div className="w-full h-1 bg-gradient-to-r from-green-500 via-
                                    
                                    to-[#0b1217] rounded-full"></div>
                                    {/* </div> */}
                                    <div className="w-full h-1 bg-gradient-to-l from-red-500 via-red-500 to-[#0b1217] rounded-full"></div>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-white font-normal text-sm">
                                    </p>
                                    <p className="text-white font-normal text-sm">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3 w-full bg-[#0b1217] rounded-xl p-3">
                            <div className="flex justify-between items-center w-full">
                                <p className="text-[#9f9fa8] text-base inline-block whitespace-normal overflow-hidden text-ellipsis">Buy Volume / Sell Volume</p>
                            </div>
                            <div className=" flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <p className="text-green-400 font-normal text-sm">{convertMillion(buyData?.buyVolume)}
                                    </p>
                                    <p className="text-red-400 font-normal text-sm">{convertMillion(buyData?.sellVolume)}
                                    </p>
                                </div>
                                <div className="flex w-full">
                                    {/* <div className={`w-[${lengthToken}%]`}> */}
                                    <div className="w-full h-1 bg-gradient-to-r from-green-500 via-green-500 to-[#0b1217] rounded-full"></div>
                                    {/* </div> */}
                                    <div className="w-full h-1 bg-gradient-to-l from-red-500 via-red-500 to-[#0b1217] rounded-full"></div>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-white font-normal text-sm">
                                    </p>
                                    <p className="text-white font-normal text-sm">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3 w-full bg-[#0b1217] rounded-xl p-3">
                            <div className="flex justify-between items-center w-full">
                                <p className="text-[#9f9fa8] text-base inline-block whitespace-normal overflow-hidden text-ellipsis">Buyers /Sellers</p>
                            </div>
                            <div className=" flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <p className="text-green-400 font-normal text-sm">{convertMillion(buyData?.buyers)}
                                    </p>
                                    <p className="text-red-400 font-normal text-sm">{convertMillion(buyData?.sellers)}
                                    </p>
                                </div>
                                <div className="flex w-full">
                                    {/* <div className={`w-[${lengthToken}%]`}> */}
                                    <div className="w-full h-1 bg-gradient-to-r from-green-500 via-green-500 to-[#0b1217] rounded-full"></div>
                                    {/* </div> */}
                                    <div className="w-full h-1 bg-gradient-to-l from-red-500 via-red-500 to-[#0b1217] rounded-full"></div>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-white font-normal text-sm">
                                    </p>
                                    <p className="text-white font-normal text-sm">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default SelectComp;

