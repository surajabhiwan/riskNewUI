
import { showToast } from "../../functions/showToast";
import { useEffect } from "react";

const NftMarketplace = () => {
    useEffect(()=>{
        showToast()
      },[])
     
    return (
        <div className="w-full">
            <iframe src="https://www.jpg.store/" height="900rem" width="100%" allow="geolocation" title="jpg store"></iframe>
        </div>
    );
};

export default NftMarketplace;
