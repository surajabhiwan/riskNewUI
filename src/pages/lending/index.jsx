import { useEffect } from "react";
import { showToast } from "../../functions/showToast";
import { decryption, encryption } from "../../functions/crypto";
import { transactionDetails } from "../../baseurl/baseurl";
import axios from "axios";

const Lending = () => {
 useEffect(()=>{
   showToast()
 },[])

 

 const fetchDetails = async () =>{

    const data = {
        hash : 'ae7231c20edf75f197e8231d2f201144e2a4150fac4c02e94b0d0561eea95212'
    }
    const enc = {
        key : encryption(data)
    }
    try{
        const response =  await axios.post(transactionDetails, enc )  
        const result = decryption(response?.data);
        console.log('CHECK', result)

     }
     catch(err){

        console.log(err)

     }
 }

 useEffect(()=>{
    fetchDetails()
 },[])

    return (
        <>
            <div className="w-full">
                <iframe src="https://levvy.fi/" height="900rem" width="100%" title="uniswap"></iframe>
            </div>
        </>
    )
}
export default Lending;