import ProLanding from "../../components/Pro/ProLanding";
import StakeInput from "../../components/AddedComponents/ProComponents/StakeWalletProfilerInput/StakeInput";
import { useSelector } from "react-redux";
import useMedia from "../../common/mediaQuery";
import { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { useNavigate, useSearchParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
const WalletProfilerScreen = () => {
  const { isPro } = useSelector((state) => state.walletProfilerReducer);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // State to track authentication
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthentication = () => {
      const walletAddress = localStorage.getItem("wallet_address");
      const authenticatedUser = localStorage.getItem("authenticated_user_pro");
      const authenticatedUserFinal = JSON.parse(authenticatedUser);
      console.log(
        "walletWatchPro authentication",
        JSON.parse(authenticatedUser)
      );
      if (!walletAddress) {
        console.log("walletAddress iamsun", walletAddress);
        toast.error("Please connect to the wallet first.");
        navigate("/login");
        return false;
      } else if (!authenticatedUserFinal?.access?.walletWatchPro) {
        setIsAuthenticated(false);
        return false;
      }

      // const user = JSON.parse(authenticatedUserFinal);
      // if (user.success !== true) {
      //   toast.error("User authentication failed. Redirecting to login.");
      //   navigate("/login");
      //   return false;
      // }

      return true;
    };
    checkAuthentication();
    const handleWalletDisconnect = () => {
      if (!checkAuthentication()) {
        toast.error("Wallet disconnected. Redirecting to home.");
      }
    };

    window.addEventListener("walletDisconnect", handleWalletDisconnect);

    return () => {
      window.removeEventListener("walletDisconnect", handleWalletDisconnect);
    };
  }, [navigate]);

  const useMediaQuery = useMedia();
  if (!isAuthenticated) {
    return <ProLanding></ProLanding>;
  }
  //Allow access for profiler in small screen without wallet connect
  const { screenAllowProfiler } = useMediaQuery;
  return (
    <>
      {isPro || screenAllowProfiler ? (
        <StakeInput />
      ) : (
        <ProLanding text="Wallet Watch" />
      )}
    </>
  );
};

export default WalletProfilerScreen;
