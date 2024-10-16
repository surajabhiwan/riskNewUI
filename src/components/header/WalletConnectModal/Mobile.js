import {
  showWalletConnectModalDesk,
  showWalletConnectModalMobile,
} from "../../../store/slices/wallet";

import React, { useState, useEffect } from "react";
import { Address } from "@emurgo/cardano-serialization-lib-asmjs"; // Import the library
import { useDispatch } from "react-redux"; // Import useDispatch if you're using Redux
import { toast } from "react-toastify"; // Make sure to import toast
let Buffer = require("buffer/").Buffer;

// List of wallet names to support
const walletList = ["nami", "eternl", "flint", "vespr"];

// Function to connect to a specific wallet
export const connectToAccount = async (
  walletKey,
  setIsConnected,
  setWalletInfo,
  onConnectWallet
) => {
  try {
    if (window.cardano && window.cardano[walletKey]) {
      const wallet = await window.cardano[walletKey].enable();
      const addresses = await wallet.getUsedAddresses(); // Get wallet addresses
      const balance = await wallet.getBalance(); // Get wallet balance

      // Decode the first hex address to bech32
      const hexAddress = addresses[0];
      const decodedAddress = Address.from_bytes(
        Buffer.from(hexAddress, "hex")
      ).to_bech32();

      console.log("decoded address", decodedAddress);
      setIsConnected(true);
      setWalletInfo({
        address: decodedAddress, // Set the decoded bech32 address
        balance: parseInt(balance, 16) / 1000000, // Convert balance from Lovelace to ADA
      });

      // Save connection status and wallet info in local storage
      localStorage.setItem("isWalletConnected", "true");
      localStorage.setItem(
        "walletInfo",
        JSON.stringify({
          address: decodedAddress,
          balance: parseInt(balance, 16) / 1000000,
        })
      );

      // Call onConnectWallet to handle post-connection actions
      onConnectWallet();
    } else {
      alert(
        `${
          walletKey.charAt(0).toUpperCase() + walletKey.slice(1)
        } Wallet is not installed`
      );
    }
  } catch (error) {
    console.error(`Failed to connect to ${walletKey} Wallet:`, error);
  }
};

// Function to disconnect the wallet
export const disconnectWallet = (setIsConnected, setWalletInfo) => {
  setIsConnected(false);
  setWalletInfo(null);
  localStorage.removeItem("isWalletConnected"); // Remove connection status from local storage
  localStorage.removeItem("walletInfo"); // Remove wallet info from local storage
  toast.success(`Wallet disconnected successfully`); // Show success message
};

// React component for Cardano Wallet connection
const WalletConnectModalMobile = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletInfo, setWalletInfo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check local storage for wallet connection status and info on component mount
    const connected = localStorage.getItem("isWalletConnected") === "true";
    setIsConnected(connected);

    // Retrieve wallet information from local storage if connected
    if (connected) {
      const storedWalletInfo = localStorage.getItem("walletInfo");
      if (storedWalletInfo) {
        setWalletInfo(JSON.parse(storedWalletInfo)); // Parse and set wallet info
      }
    }
  }, []);

  const onConnectWallet = () => {
    dispatch(showWalletConnectModalMobile());
    setTimeout(() => {
      toast.success(`Wallet connected successfully`);
    }, 300);
  };

  const handleDisconnect = () => {
    disconnectWallet(setIsConnected, setWalletInfo);
    dispatch(showWalletConnectModalMobile());
  };

  return (
    <div className="bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">Cardano Wallet Connection</h2>

      {isConnected ? (
        <div className="mt-6 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Connected Wallet:</h3>
          <p className="text-sm break-words">
            <strong>Address:</strong> {walletInfo?.address}
          </p>
          <p className="text-sm mt-2">
            <strong>Balance:</strong> {walletInfo?.balance} ADA
          </p>
          <button
            className="mt-4 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition duration-300"
            onClick={handleDisconnect}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Select a wallet to connect:
          </h3>
          <ul className="space-y-4">
            {walletList.map((walletKey) => (
              <li key={walletKey}>
                <button
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
                  onClick={() =>
                    connectToAccount(
                      walletKey,
                      setIsConnected,
                      setWalletInfo,
                      onConnectWallet
                    )
                  }
                >
                  Connect to{" "}
                  {walletKey.charAt(0).toUpperCase() + walletKey.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display error message if any */}
      {/* If you want to show error handling, you can add a similar section here */}
    </div>
  );
};

export default WalletConnectModalMobile;
