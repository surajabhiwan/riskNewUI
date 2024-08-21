// import TradingViewWidget from "../../components/AddedComponents/HomeMiniCharts";

const Graphic = (props) => {
  const { menu,timeSeries } = props;
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="158" height="45" style={{ position: 'relative', left: 0, top: 0, userSelect: 'none'}}>
        <rect width="108" height="45" x="0" y="0" id="0" fill="none" fillOpacity="1"></rect>
        <g>
          <g clipPath="url(#zr9-c0)">
          <path d={timeSeries?.d} fill="none" stroke={timeSeries?.stroke} stroke-width="2" stroke-linejoin="bevel"></path>
          </g>
        </g>
        <defs>
          <clipPath id="zr9-c0">
            <path d="M12 1.75l120 0l0 38.5l-120 0Z" fill="#000"></path>
          </clipPath>
        </defs>
      </svg>
      {/* <TradingViewWidget/> */}
    </>
  );
};

export default Graphic;