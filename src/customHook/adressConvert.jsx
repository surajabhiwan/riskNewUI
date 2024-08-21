import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setStakeAddress, setWalletAddress } from '../store/slices/walltProfiler';
import { encryption, decryption } from '../functions/crypto'
import { getAddress, staketoad } from '../baseurl/baseurl.js'
import { setwalletprofilermenuitems } from '../store/slices/wallet.js';

const useAddressHandler = () => {
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddresses = async (inputValue) => {
        setIsSearching(true);
        if (inputValue?.startsWith("addr") && inputValue?.length > 10) {
            dispatch(setWalletAddress(inputValue));
            
            // API to convert wallet to stake
            const data = { address: inputValue };
            const encryptedData = { key: encryption(data) };

            try {
                const response = await axios.post(getAddress, encryptedData);
                const result = decryption(response?.data);
                if (result?.success) {
                    dispatch(setStakeAddress(result?.stakeAddress));
                    dispatch(setwalletprofilermenuitems(0))
                    navigate('/profiler');
                } else {
                    console.log('Failed to convert wallet to stake address');
                }
            } catch (error) {
                console.error('Error converting wallet to stake:', error);
                toast.error('Server error');
            } finally {
                setIsSearching(false);
            }
        } else if (inputValue?.startsWith("stake") && inputValue?.length > 8) {
            dispatch(setStakeAddress(inputValue));
            
            // API to convert stake to wallet
            try {
                const data = { StackAddress: inputValue };
                const enc = { key: encryption(data) };
                const response = await axios.post(staketoad, enc);
                const result = decryption(response?.data);
                const walletAdd = result?.addresses[0]?.address;
            
                if (result?.success) {
                    dispatch(setWalletAddress(walletAdd));
                    dispatch(setwalletprofilermenuitems(0))
                    navigate('/profiler');
                } else {
                    console.log('Failed to convert stake to wallet address');
                    toast.error('Error, please try again');
                }
            } catch (error) {
                console.error('Error converting stake to wallet:', error);
                toast.error('server error');
            } finally {
                setIsSearching(false);
            }
        } else {
            setIsSearching(false);
            toast.error('Enter a valid address');
        }
    };
    return { isSearching, handleAddresses };
};

export default useAddressHandler;
