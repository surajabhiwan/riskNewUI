import {useState} from "react";
// import { MoonLoader } from "react-spinners";
import PortChart from "./PortChart";
import {coinFlipGame} from "../../common/IMG/Images";
import PortfolioSlick from "../AddedComponents/PortfolioSlick";

const datas = [
    {id: 0, date: "24h", active: true},
    {id: 1, date: "7d", active: false},
    {id: 2, date: "30d", active: false},
    {id: 3, date: "90d", active: false},
    {id: 4, date: "1y", active: false},
    {id: 5, date: "All", active: false},
];

const PortfolioChartContent = () => {
    const [dataItem, setDataItem] = useState(datas);
    const handleClick = (_idx) => {
        const newItem = datas.map((item, idx) => {
            if (_idx === idx) {
                item.active = true;
            } else {
                item.active = false;
            }
        });
        setDataItem(newItem);
    };
    return (
        <div
            style={{
                background: "linear-gradient(1turn, #142028, rgba(18, 18, 24, 0))",
                boxShadow: "rgb(170 169 167) 0px 3px 25px;",
            }}
            className="w-full p-4 rounded-xl h-full"
        >
            <div className="flex sm:gap-14 gap-4 justify-end px-6 pb-2"></div>
            <div className="py-8 ">
                <div className="h-[200px] w-full flex justify-center items-center ">
                    {/* <a href="https://riskycoinflip.com" target="_blank" rel="noreferrer">
              
                        <div className="flex justify-center items-center w-[39rem] md:w-[40rem] lg:w-[40rem] h-[10rem]">
                            <img
                                src={coinFlipGame}
                                alt="ad"
                                className="ad-container w-full rounded-xl"
                                style={{userSelect: "none"}}
                            />
                        </div>
                    </a> */}
                     <PortfolioSlick />
                </div>
            </div>
        </div>
    );
};

export default PortfolioChartContent;
