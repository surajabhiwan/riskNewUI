import { useDispatch, useSelector } from "react-redux";
import * as SVG from "../../../common/Icons";
import { useState } from "react";
import { tableAction } from "../../../store/slices/TableData";

const Header = ({ tab }) => {
    const { data } = useSelector((state) => state.tableREducer)
    const [rotation, setRotation] = useState(false);
    const [rotationd, setRotationd] = useState(false);
    const [rotationm, setRotationm] = useState(false);
    const [rotationMarket, setRotationMarket] = useState(false);
    const [rotationVolume, setRotationVolume] = useState(false);
    const [rotationLiquidity, setRotationLiquidity] = useState(false);

    const dispatch = useDispatch();
    const rotateComponent = () => {
        setRotation(!rotation)
    };

    const rotatedComponent = () => setRotationd(!rotationd);
    const rotatemComponent = () => setRotationm(!rotationm);
    const rotateMarketComponent = () => setRotationMarket(!rotationMarket)
    const rotateVloumeComponent = () => setRotationVolume(!rotationVolume)
    const rotateLiquidityComponent = () => setRotationLiquidity(!rotationLiquidity);

    const handleSortThirty = (sortType) => {
        if (data) {
            const sortData = data?.slice()?.sort((a, b) => {
                if (sortType === 'asc') {
                    return a.thirty - b.thirty;
                } else {
                    return b.thirty - a.thirty;
                }
            });
            dispatch(tableAction.getTableData(sortData))
        }
    }

    const handleSortTwoFour = (sortType) => {
        if (data) {
            const sortData = data.slice()?.sort((a, b) => {
                if (sortType === 'asc') {
                    return a.twofourHr - b.twofourHr;
                } else {
                    return b.twofourHr - a.twofourHr;
                }
            });
            dispatch(tableAction.getTableData(sortData))
        }
    }

    const handleSortSeven = (sortType) => {
        if (data) {
            const sortData = data.slice()?.sort((a, b) => {
                if (sortType === 'asc') {
                    return a.sevenday - b.sevenday;
                } else {
                    return b.sevenday - a.sevenday;
                }
            });
            dispatch(tableAction.getTableData(sortData))
        }
    }

    const handleSortMarket = (sortType) => {
        if (data) {
            const sortData = data.slice()?.sort((a, b) => {
                if (sortType === 'asc') {
                    return a.marketCapADA - b.marketCapADA;
                } else {
                    return b.marketCapADA - a.marketCapADA;
                }
            });
            dispatch(tableAction.getTableData(sortData))
        }
    }

    const handleSortVolume = (sortType) => {
        if (data) {
            const sortData = data.slice()?.sort((a, b) => {
                if (sortType === 'asc') {
                    return a.volumeADA - b.volumeADA;
                } else {
                    return b.volumeADA - a.volumeADA;
                }
            });
            dispatch(tableAction.getTableData(sortData))
        }
    }

    const handleSortLiquidity = (sortType) => {
        if (data) {
            const sortData = data.slice()?.sort((a, b) => {
                if (sortType === 'asc') {
                    return a.totalLiquidityADA - b.totalLiquidityADA;
                } else {
                    return b.totalLiquidityADA - a.totalLiquidityADA;
                }
            });
            dispatch(tableAction.getTableData(sortData))
        }
    }

    return (
        <div>
            <div className="flex mt-3 px-2  w-full">
                <div className="flex items-center xl:w-1/5 w-3/5  ">
                    {/* <div className="flex w-3 h-3 items-center justify-center" >
            <SVG.WatchList />
          </div> */}
                    <div className="text-white font-semibold flex justify-center items-center ml-4 sm:text-sm text-xs">#</div>
                    <div className="text-white font-normal flex justify-center items-center ml-4 sm:text-sm text-xs">Name</div>
                </div>
                {/* Price */}
                <div className="flex items-center justify-end xl:w-[7%] sm:w-[10%] w-[20%]">
                    <div className="text-white font-normal flex justify-cenetr items-center ml-4 sm:text-sm text-xs">Price </div>
                </div>
                {/* 24hr */}
                <div
                    id="24h"
                    onClick={() => { rotateComponent(); handleSortTwoFour(rotation ? 'asc' : 'dsc') }}
                    className={`flex items-center  justify-end cursor-pointer transition-all duration-300 hover:mt-[-8px] xl:w-[7%] sm:w-[10%] w-[20%]`}>
                    <div className="text-white font-normal sm:text-sm text-xs">1h </div>
                    {/* <div
                        className={`text-white font-normal ml-1 transition-all duration-300 ${rotation ? " rotate-180" : ""}`}><SVG.Arrow /> </div> */}
                </div>
                {/* 7 days */}
                <div
                    onClick={() => { rotatemComponent(); handleSortSeven(rotationm ? 'asc' : 'dsc') }}
                    id="7d"
                    className={`sm:flex sm:items-center hidden justify-end cursor-pointer transition-all duration-300 xl:w-[7%] sm:w-[10%] w-0 hover:mt-[-8px]`}
                >
                    <div className="text-white font-normal flex justify-center items-center sm:text-sm text-xs">24h </div>
                    {/* <div
                        className={`text-white font-normal flex justify-center items-center ml-1 transition-all duration-300 ${rotationm ? " rotate-180" : ""}`}><SVG.Arrow /> </div> */}
                </div>
                {/* 30days */}
                <div
                    onClick={() => { rotatedComponent(); handleSortThirty(rotationd ? 'asc' : 'dsc') }}
                    id="30d"
                    className={`sm:flex sm:items-center hidden justify-end cursor-pointer  transition-all duration-300 xl:w-[7%] sm:w-[10%] w-0 hover:mt-[-8px]`}>
                    <div className="text-white font-normal flex justify-center items-center sm:text-sm text-xs">7d </div>
                    {/* <div className={`text-white font-normal flex justify-center items-center ml-1 transition-all duration-300 ${rotationd ? " rotate-180" : ""}`}><SVG.Arrow /> </div> */}
                </div>

                {/* MarketCap */}
                <div
                    onClick={() => { rotateMarketComponent(); handleSortMarket(rotationMarket ? 'asc' : 'dsc') }}
                    id="marketCap"
                    className={`xl:flex xl:items-center hidden justify-end transition-all duration-300 cursor-pointer  w-[12%]  gap-2 hover:mt-[-8px]`}>
                    <div className="text-white font-normal flex justify-center items-center ">MarketCap </div>
                    {/* <div className="text-white font-normal flex justify-center items-center" title={"The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market. Market Cap = Current Price x Circulating Supply"}><SVG.Alert /> </div>
                    <div className={`text-white font-normal flex justify-center items-center ml-1 transition-all duration-300 ${rotationMarket ? " rotate-180" : ""}`}><SVG.Arrow /> </div> */}
                </div>
                {/* Volume */}
                <div
                    onClick={() => { rotateVloumeComponent(); handleSortVolume(rotationVolume ? 'asc' : 'dsc') }}
                    id="volume"
                    className={`xl:flex xl:items-center hidden justify-end  cursor-pointer transition-all duration-300  w-[12%] gap-2 hover:mt-[-8px]`}>
                    <div className="text-white font-normal flex justify-center items-center ">Volume(24h)</div>
                    {/* <div className="text-white font-normal flex justify-center items-center" title={"The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market. Market Cap = Current Price x Circulating Supply."}><SVG.Alert /> </div>
                    <div className={`text-white font-normal flex justify-center items-center ml-1 transition-all duration-300  ${rotationVolume ? " rotate-180" : ""}`}><SVG.Arrow /> </div> */}
                </div>
                {/* Liquid */}
                <div
                    onClick={() => { rotateLiquidityComponent(); handleSortLiquidity(rotationLiquidity ? 'asc' : 'dsc') }}
                    id="liquididy"
                    className={`xl:flex xl:items-center hidden  justify-end cursor-pointer  transition-all duration-300 w-[21%] gap-2 hover:mt-[-8px]  `}>
                    <div className="text-white font-normal flex justify-center items-center ">{"Circulating Supply"} </div>
                    {/* <div className="text-white font-normal flex justify-center items-center " title={"The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market."}><SVG.Alert />  </div> */}
                    {/* <div className={`text-white font-normal flex justify-center items-center ml-1 transition-all duration-300  ${rotationLiquidity ? " rotate-180" : ""}`}><SVG.Arrow /> </div> */}

                </div>
                {/* <div className="xl:flex xl:items-center hidden justify-end   gap-2 w-1/5">
                    <div className="text-white font-normal flex justify-center items-center  ">Last 7 Days </div>
                </div> */}
            </div>
            <div className="w-full h-[1px] mt-2 bg-[#232323]"></div>
        </div>
    )
}

export default Header;