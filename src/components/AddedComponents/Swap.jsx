import Swap from "@dexhunterio/swaps";
import "@dexhunterio/swaps/lib/assets/style.css";
import useMedia from "../../common/mediaQuery";
import { useSearchParams } from "react-router-dom";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import {
  showWalletConnectModalDesk,
  showWalletConnectModalMobile,
} from "../../store/slices/wallet";
import { useDispatch } from "react-redux";

const SwapDex = () => {
  const useMediaQuery = useMedia();
  const useXlLarge = useMediaQuery.useXlLarge;

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const { isConnected } = useCardano();

  // Extracting values from search params
  const unit = searchParams.get("unit");

  const type = searchParams.get("type");

  //default token
  const agixUnitId =
    "f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc53541474958";

  const connectWallet = () => {
    dispatch(showWalletConnectModalDesk());
    dispatch(showWalletConnectModalMobile());
  };

  return (
    <div>
      <Swap
        partnerCode="riskwisepro.io6164647231717864753672763879396b7561716b33686573666432336173666d636e39743972646e65677278393030353376653064736e3639723572787868366165366e786e7774686c7679757a366b3670757071326677387971653063777973766a7137776ada39a3ee5e6b4b0d3255bfef95601890afd80709"
        partnerName="RiskWisePro.io"
        displayType="FULL"
        width={useXlLarge ? `25rem` : `20rem`}
        orderTypes={["SWAP", "LIMIT"]}
        supportedTokens={[`${unit ? unit : agixUnitId}`]}
        selectedWallet={
          isConnected ? localStorage.getItem("cf-last-connected-wallet") : null
        }
        onClickWalletConnect={() => connectWallet()}
        colors={{
          background: "rgba(33, 30, 30, 0.5)",
          containers: "#595b6282",
          subText: "#88919E",
          mainText: "#FFFFFF",
          buttonText: "#FFFFFF",
          accent: "#007DFF",
        }}
        theme="dark"
      />
    </div>
  );
};

export default SwapDex;
