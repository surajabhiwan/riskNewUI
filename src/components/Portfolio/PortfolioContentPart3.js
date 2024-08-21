import PortfolioContentPart3Header from "./PortfolioContentPart3Header";
import PortfolioContentPart3Footer from "./PortfolioContentPart3Footer";
import ChartSwapHeader from "../Charts/ChaerSwapHeader";
const PortfolioContentPart3 = ({portfolioType}) => {
 
  return (
    <div className="w-full flex flex-col  gap-4">
      <PortfolioContentPart3Header />
      {/* <ChartSwapHeader /> */}
      <PortfolioContentPart3Footer portfolioType={portfolioType} />
    </div>
  );
};

export default PortfolioContentPart3;
