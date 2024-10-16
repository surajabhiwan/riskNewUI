import { useDispatch } from "react-redux";
import * as SVG from "../../../common/Icons";
import {
  showWalletConnectModalDesk,
  showWalletConnectModalMobile,
  walletSignMessage,
  walletAppName,
} from "../../../store/slices/wallet";
import {
  ConnectWalletButton,
  ConnectWalletList,
  useCardano,
} from "@cardano-foundation/cardano-connect-with-wallet";
import { toastNotification } from "../../ToastNTF";
import { toast } from "react-hot-toast";
import CopyButton from "../../../pages/portfolio/CopyButtonWallet";
import { useEffect } from "react";
import axios from "axios";
import { ip } from "../../../baseurl/baseurl";

const WalletConnectModalDesk = () => {
  const dispatch = useDispatch();

  const handleShowModalDesk = () => {
    dispatch(showWalletConnectModalDesk());
    console.log("clicked");
  };

  const {
    isEnabled,
    isConnected,
    enabledWallet,
    stakeAddress,
    usedAddresses,
    signMessage,
    connect,
    disconnect,
    installedExtensions,
    lastConnectedWallet,
    accountBalance,
  } = useCardano();
  if (usedAddresses[0]) {
    localStorage.setItem(
      "wallet_address",
      usedAddresses[0]
      // "addr1q9v6mz6zt4gynyu5k0kmjc8hu2h2u45z3hrgj6vzszx45sw8mq03lrnqmq6mcpxy6u4g43vqch4tah6d9v5st89e2cus3tncgn"
    );
  }
  console.log("stakeAddress", usedAddresses);

  const onConnectError = () => {
    dispatch(showWalletConnectModalDesk());
    setTimeout(() => {
      toast.error(`Wallet not found`);
    }, 300);
  };
  useEffect(() => {
    if (usedAddresses && usedAddresses.length > 0) {
      // Make an API request when usedAddresses is updated
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${ip}/api/pro/check_pro_authentication`,
            {
              walletAddress: usedAddresses[0], // Assuming you're interested in the first address
              // walletAddress:
              // "addr1q9v6mz6zt4gynyu5k0kmjc8hu2h2u45z3hrgj6vzszx45sw8mq03lrnqmq6mcpxy6u4g43vqch4tah6d9v5st89e2cus3tncgn",
            }
          );
          console.log("authenticated_user_pro", response.data);
          
          localStorage.setItem(
            "authenticated_user_pro",
            JSON.stringify(response?.data)
          );
          localStorage.setItem("isWalletConnected", "true");
          // toast.success("User authenticated and data stored");
        } catch (error) {
          console.error("Error authenticating user:", error);
          // toast.error("Failed to authenticate user");
        }
      };

      fetchData();
    }
  }, [usedAddresses]);

  const handleDisconnect = () => {
    localStorage.removeItem("wallet_address");
    localStorage.removeItem("authenticated_user_pro");

    dispatch(walletSignMessage(null));
    disconnect(); // Call the disconnect function from useCardano
    handleShowModalDesk(); // Optionally show modal or perform other actions on disconnect
    // Dispatch the disconnect event
    const event = new CustomEvent("walletDisconnect");
    window.dispatchEvent(event);
    localStorage.removeItem("isWalletConnected"); // Remove connection status from local storage
  };
  return (
    <div className="">
      <div className="relative flex flex-col items-center gap-2 md:w-[400px] overflow-x-auto md:h-fit w-full h-full bg-[#131118] bg-opacity-100 shadow-lg rounded-xl p-8">
        <div
          onClick={handleShowModalDesk}
          className="absolute top-3 right-3 flex items-center justify-center p-3 bg-black rounded-full"
        >
          <SVG.Close />
        </div>
        <div className="w-full mb-4">
          <span className="text-white text-lg font-semibold">
            {isConnected ? "Connected Wallet" : "Connect a wallet"}
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex flex-col">
            {isConnected ? (
              <div className="flex justify-between items-center w-full gap-4">
                <ConnectWalletButton
                  disabled
                  label="Not connected"
                  message="Please sign Augusta Ada King, Countess of Lovelace"
                  // showAccountBalance={true}
                  alwaysVisibleWallets={["nami", "flint", "eternl", "lace"]}
                  // dAppUrl = {function noRefCheck(e){
                  //   console.log('url',e);
                  // }}

                  onConnect={function noRefCheck(e) {
                    console.log(e);
                  }}
                  onConnectError={function noRefCheck(e) {
                    console.log(e);
                  }}
                  onDisconnect={function noRefCheck() {
                    localStorage.removeItem("wallet_sign");
                    dispatch(walletSignMessage(null));
                    // handleShowModalDesk()
                  }}
                  onSignMessage={function noRefCheck(e) {
                    localStorage.setItem("wallet_sign", e);
                    console.log("walletstored", e);
                    dispatch(walletSignMessage(e));
                    toast.success("connected to wallet");
                    handleShowModalDesk();
                  }}
                  onStakeAddressClick={function noRefCheck(e) {
                    console.log(e);
                    navigator.clipboard.writeText(e);
                    toastNotification(
                      "wallet Address coppied successfully",
                      "success",
                      5000
                    );
                  }}
                />
                &nbsp; &nbsp; &nbsp; &nbsp;
                <button
                  // onClick={disconnect}
                  onClick={handleDisconnect}
                  className="text-red-500 hover:text-gray-700"
                >
                  Disconnect
                </button>
                <div>
                  {" "}
                  <CopyButton contentToCopy={stakeAddress} />
                </div>
              </div>
            ) : (
              <div
                className="flex  items-center w-[335px] rounded-lg cursor-pointer"
                // onClick={handleShowModalMobile}
              >
                <ConnectWalletList
                  alwaysVisibleWallets={["nami", "eternl", "vespr"]}
                  onConnectError={onConnectError}
                  borderRadius={5}
                  gap={10}
                  primaryColor="#fff"
                  // onConnect={onConnectWallet}
                  customCSS={`
        font-family: Poppins,sans-serif;
        font-size: 1.2rem;
        font-weight: 100;
        width: 100%;
        height: 100%;
        border: none;
        cursor: pointer;
        & > span { padding: 1.2rem; width:21rem; background: #1C1924; display:flex; border: none; text-align: right; display: flex; justify-content: space-between; flex-direction: row-reverse};
        & > span:hover {
          background: #1C1938;
        }
        & > span:active {
          scale: .99
        }
    `}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectModalDesk;
