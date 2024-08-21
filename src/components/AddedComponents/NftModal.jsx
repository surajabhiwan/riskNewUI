/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import * as SVG from "../../common/Icons";
import {
    chartsModalAction
} from "../../store/slices/chartsData";
import { getImage, getImageNft } from "../../baseurl/baseurl";
import { Link } from "react-router-dom";

import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useState } from "react";

const NftModal = ({ type, handleClick }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const handleShowModalDesk = () => {
        dispatch(chartsModalAction.getModalOpen(false));
    };
    const handleShowModalMobile = (token, unit) => {
        dispatch(chartsModalAction.getModalOpen());
        if (type === 'multi') {
            handleClick(token, unit)
        }
    };
    const nftData = useSelector((state) => state.tableREducer.nftTableData);
    const localData = JSON.parse(sessionStorage.getItem('cachedNftTableData'))

    useEffect(() => {
        if (localData) {
            setData(localData);
        }
        else {
            setData(nftData);
        }
    }, [])


    return (
        <div className="">
            <div className="relative flex flex-col items-center gap-2 md:w-[400px] overflow-x-auto md:h-fit w-full h-full bg-[#142028] bg-opacity-100 shadow-lg rounded-xl p-8">
                <div
                    onClick={handleShowModalDesk}
                    className="absolute top-3 right-3 flex items-center justify-center p-3 bg-black rounded-full"
                >
                    <SVG.Close />
                </div>
                <div className="w-full mb-4">
                    <span className="text-white text-lg font-semibold">
                        NFTs
                    </span>
                </div>
                <SimpleBarReact className='h-[400px]'>
                    <div className=" -modal space-y-2 " >
                        {
                            data?.map((data, idx) => (
                                <>
                                    <Link to={data?.policy ? `/charts?token=${data?.name}&unit=${data?.policy}&pairID=${data?.policy}&type=nft#chartTop` : '#'}>
                                        <div
                                            className="flex items-center w-[335px] h-[70px] bg-[#3a4956] rounded-lg cursor-pointer mb-2"
                                            onClick={() => handleShowModalMobile(data?.name, data?.unit)}
                                        >
                                            {data?.image ?
                                                <img
                                                    width={40}
                                                    height={40}
                                                    style={{ borderRadius: '50%' }}
                                                    src={getImageNft + `/${data?.image}`}
                                                    className="ml-2 logo"
                                                    alt="riskWise"
                                                />
                                                : (<div className="xl:w-10 sm:w-7 w-6 xl:h-10 sm:h-7 h-6 ml-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00008B' }}>
                                                    <span className="text-white font-medium">{data?.name?.split('')[0]}</span>
                                                </div>)
                                            }
                                            <div>
                                                <span className="text-white ml-6 trucate" title={data?.name}>{data?.name?.length > 15 ? data?.name?.slice(0, 15) + '...' : data?.name}</span> <br />
                                                <span className="text-zinc-400 text-[.8rem] ml-6">{data?.price} ₳</span>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            ))
                        }

                    </div>
                </SimpleBarReact>
            </div>
        </div>
    );
};

export default NftModal;
