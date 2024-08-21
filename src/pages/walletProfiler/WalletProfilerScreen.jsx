
import ProLanding from "../../components/Pro/ProLanding"
import StakeInput from "../../components/AddedComponents/ProComponents/StakeWalletProfilerInput/StakeInput"
import { useSelector } from "react-redux";
import useMedia from "../../common/mediaQuery";

const WalletProfilerScreen = () => {
  const { isPro } = useSelector((state) => state.walletProfilerReducer);
  
  //Allow access for profiler in small screen without wallet connect
  const useMediaQuery = useMedia()
  const { screenAllowProfiler } = useMediaQuery
  return (
    <>
      {
        isPro || screenAllowProfiler ? 
          <StakeInput /> : <ProLanding text="Wallet Watch" />
      }
    </>
  )
}

export default WalletProfilerScreen;