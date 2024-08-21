import { useEffect, useState } from 'react';
import './stakeInput.css'
import * as SVG from "../../../../common/Icons";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setHoldingNft, setInputOutputData, setTransactions, setWalletProfilerBalance, setWalletTradeHistory } from '../../../../store/slices/walltProfiler';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAddressHandler from '../../../../customHook/adressConvert';

const StakeInput = () => {
 const [inputValue, setInputValue] = useState('')
 const [searchParams] = useSearchParams();

 const [visible, setVisible] = useState(false);
 const navigate = useNavigate()
const dispatch = useDispatch();

 const stakeParamsData = searchParams.get('stake');
 const { isSearching, handleAddresses } = useAddressHandler();

 useEffect(()=>{
    dispatch(setInputOutputData([]))
    dispatch(setWalletTradeHistory([]))
    dispatch(setHoldingNft([]));
    dispatch(setTransactions([]))
    dispatch(setWalletProfilerBalance([]));
 },[])

 const handleSubmit = async () => {
if(inputValue?.length > 0){
    handleAddresses(inputValue);
}
};


 useEffect(()=>{
    if(stakeParamsData){
        navigate('/profiler')
    }
 },[])


//For hover info
 const handleShow = () => {
   setVisible(!visible);
 };


    return (
        <>
        <div className='p-2 lg:p-32 pt-40 md:pt-28 2xl:pt-40'>

            <div className='input-container flex flax-col w-full justify-center items-center gap-4 p-0 md:p-28 pb-32 px-2 '>
            <div className="relative hidden sm:block">
            <div
              className="absolute -bottom-[2px] px-2 cursor-pointer"
              onMouseEnter={handleShow}
              onMouseLeave={handleShow}
            >
              <SVG.Notification />
            </div>
          
              <div className={`${visible ? 'block' : 'hidden'} absolute -top-14 p-[6px] rounded-[10px] bg-[rgba(92,94,105,.3)] backdrop-blur-[10px] text-sm text-[#fff] whitespace-nowrap z-[100] `}>
                <span className="">$Handles are not supported at this time.</span>
              </div>
           
          </div>&nbsp;<p className='text-white font-bold text-lg'>Enter wallet address : <span className='text-sm font-medium text-gray-600 block sm:hidden'>
          $Handles are not supported at this time.
          </span> 
           
                    </p>
    
                <div className="flex w-full">
                    <input type="text" placeholder="Enter here" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} required />
                    <button className="text-black" onClick={()=>handleSubmit()}>{isSearching ? 'searching' : <SearchIcon/>}</button>
         
                </div>
            </div>
        </div>
        </>
    )
}

export default StakeInput;