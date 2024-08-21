import { useEffect, useState } from "react";
import moment from "moment";
// import { CryptoNews } from "./CryptoNews";
// import CommingSoon from "../../components/AddedComponents/CommingSoon/CommingSoon";
import { getNewsApi } from "../../baseurl/baseurl";
import axios from "axios";
import { timestampToUTC } from "../../functions/functions";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from "react-router-dom";
import { decryption } from "../../functions/crypto";
const News = () => {
  // const [cryptonews, setCryptoNews] = useState(CryptoNews);
  const [cryptonews, setCryptoNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  // const maxViewsCount = useState(50);

  const getNews = async () =>{
    setIsLoading(true)
    try{
      const response = await axios.get(getNewsApi);
      var resp  = response?.data;
      const result = decryption(resp)?.news
      setCryptoNews(result);
    }
    catch(error){
      console.error('error fetching news:', error)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    getNews()
  },[])


//   return ( <>
//    { isLoading ? <SkeletonTheme baseColor="#142028" highlightColor="#444">
//   <p>
//   <Skeleton count={20} height={30} />
//   </p>
// </SkeletonTheme> :
//     <div className="flex flex-col justify-center w-full h-full p-2 mb-4 overflow-x-auto hideScrollbar">
//       <span className="text-xl font-semibold text-white">
//         Latest Crypto News
//       </span>
//       <div className="min-w-[1024px] mt-4 bg-[#142028] p-4 rounded-2xl">
//         <ul className="flex justify-between text-sm font-semibold text-[#9f9fa8] border-b-[1px] border-[#232323] px-2 pb-2">
//           <li className="w-[65%] truncate">Headline</li>
//           <li className="w-[10%]">Source</li>
//           <li className="w-[10%]">Time</li>
//           <li className="w-[15%] text-end pr-6">Views</li>
//         </ul>
//         <div className="">
//           {cryptonews.map((item, idx) => (
//             <Link target="_blank" to={item?.mainurl}>
//             <ul
//               key={idx}
//               // onClick={() => handleItem(idx)}
//               className="flex justify-between text-sm text-white border-b-[1px] border-[#232323] hover:bg-[#3a4956] cursor-pointer py-1 whitespace-nowrap text-ellipsis "
//             >
//               <li className="w-[65%] truncate">
//                 {item?.headtitle}
//               </li>
//               <li className="w-[10%]">{item?.from}</li>
//               {/* <li className="w-[10%]">{moment(item.time).fromNow()}</li> */}
//               <li className="w-[10%]">{moment(timestampToUTC(item?.time)).fromNow()}</li>
//               <li className="w-[15%]">
//                 <div className="flex items-center gap-3">
//                   <span className="w-[10%] flex justify-end">{item?.count}</span>
//                   <div className="w-full relative">
//                     {item?.count > 0 && (
//                       <div
//                         className={`h-1 bg-yellow-400 rounded-3xl absolute z-10 w-[0%]`}
//                         style={{
//                           width: `${Math.floor(
//                             (item?.count * 100) / 90
//                           )}%`,
//                         }}
//                       ></div>
//                     )}
//                     <div className="w-full h-1 bg-[#4d5359] rounded-3xl"></div>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>}

//   </>
//   );

return(
  <>
  {/* <a href="https://coinmarketcap.com/api/documentation/v1/" target="_blank" rel="noreferrer">
     <span className="text-xl font-semibold text-white">
     https://coinmarketcap.com/api/documentation/v1/
     </span>
  </a> */}
  <div className="w-full">
      <iframe src="https://docs.uniswap.org/sdk/v3/overview" height="900rem" width="100%" title="uniswap"></iframe>
  </div>
  </>
)
};

export default News;
