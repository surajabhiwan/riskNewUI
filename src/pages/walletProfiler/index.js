import { useDispatch, useSelector } from "react-redux";
import WalletProfilerHeader from "../../components/Pro/WalletProfilerHeader";
import ProLandingWalletProfiler from "../../components/Pro/ProLandingWalletProfiler";
import { useEffect } from "react";
import { decryption, encryption } from "../../functions/crypto";
import {
  UTXos,
  associateAmount,
  associateTime,
  getAddress,
  getNftImage,
  projectIdBlockfrost,
  transactionAll,
  walletHistoryApi,
  walletPositionApi,
} from "../../baseurl/baseurl";
import axios from "axios";
import {
  setHoldingNft,
  setInputOutputData,
  setTransactions,
  setWalletProfilerBalance,
  setWalletTradeHistory,
} from "../../store/slices/walltProfiler";
import { useNavigate } from "react-router-dom";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import useMedia from "../../common/mediaQuery";

const WalletProfiler = () => {
  const { walletAddress, stakeAddress, isPro } = useSelector(
    (state) => state.walletProfilerReducer
  );

  console.log("wallet address from wallet Profiler", walletAddress);
  console.log("wallet stakeAddress from wallet Profiler", stakeAddress);

  console.log("wallet isPro from wallet Profiler", isPro);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isConnect } = useCardano();

  useEffect(() => {
    dispatch(setHoldingNft([]));
    dispatch(setWalletProfilerBalance([]));
  }, [dispatch]);

  //Transaction for charts api
  const blockFrostApi = async () => {
    const data = {
      address: walletAddress,
    };
    const encryptedData = {
      key: encryption(data),
    };
    try {
      console.log("function running fetchUTXos");

      const response = await axios.post(transactionAll, encryptedData);
      console.log("function running fetchUTXos2", response);

      const result = decryption(response?.data);
      console.log("function running fetchUTXos3", result);

      const transactions = result?.transactions;
      console.log("blockFrostApi", transactions);

      const transacWithAmount = await Promise.all(
        transactions?.map(async (trans) => {
          const amountResponse = await axios.get(
            `https://cardano-mainnet.blockfrost.io/api/v0/txs/${trans?.tx_hash}`,
            {
              headers: {
                project_id: `${projectIdBlockfrost}`,
              },
            }
          );
          const res = amountResponse?.data;
          const amount = res?.output_amount;
          console.log("blockFrostApiiiii", res);
          //time
          const tx_hash = {
            tx_hash: `${trans?.tx_hash}`,
          };
          const encryptedTx = {
            key: encryption(tx_hash),
          };
          //TIME
          const timeResponse = await axios.post(associateTime, encryptedTx);
          const timeResponseDecrypt = decryption(timeResponse?.data);
          const blockTime = timeResponseDecrypt?.associateTime?.block_time;

          return { ...trans, amount, blockTime };
        })
      );
      dispatch(setTransactions(transacWithAmount));
    } catch (error) {
      console.error("blockFrostApi", error);
    }
  };

  //For associate wallets
  const fetchUTXos = async () => {
    const data = {
      address: walletAddress,
    };
    const encryptedData = {
      key: encryption(data),
    };
    try {
      console.log("function running fetchUTXos");

      const response = await axios.post(UTXos, encryptedData);
      console.log("function running fetchUTXos2", response);

      const result = decryption(response?.data);
      console.log("function running fetchUTXos2", result);

      console.log("proUTXos", result);
      const transacWithAmount = await Promise.all(
        result?.utxos?.map(async (trans) => {
          const tx_hash = {
            tx_hash: `${trans?.tx_hash}`,
          };
          const encryptedTx = {
            key: encryption(tx_hash),
          };
          //TIME
          const timeResponse = await axios.post(associateTime, encryptedTx);
          const timeResponseDecrypt = decryption(timeResponse?.data);
          const blockTime = timeResponseDecrypt?.associateTime?.block_time;

          //amount
          const tx_hashh = {
            tx_hash: `${trans?.tx_hash}`,
          };
          const encryptedTxx = {
            key: encryption(tx_hashh),
          };
          const amountResponse = await axios.post(
            associateAmount,
            encryptedTxx
          );
          const amountResponseDecrypt = decryption(amountResponse?.data);
          const amount = amountResponseDecrypt?.associateAmount;

          //STAKE
          const stakedata = {
            address: `${
              amount?.inputs[0]?.address === walletAddress
                ? amount?.outputs[0]?.address
                : amount?.inputs[0]?.address
            }`,
          };

          const encryptedDataStake = {
            key: encryption(stakedata),
          };

          const stakeResponse = await axios.post(
            getAddress,
            encryptedDataStake
          );
          const result = decryption(stakeResponse?.data);
          const stake = result?.stakeAddress;
          return { ...trans, amount, stake, blockTime };
        })
      );
      dispatch(setInputOutputData(transacWithAmount.reverse()));
      console.log("transacWithAmount", transacWithAmount);
    } catch (error) {
      console.error(error);
    }
  };

  //wallet amount, nfts, tokens, all assets api (Taptools)
  const walletPosition = async () => {
    const data = {
      address: stakeAddress,
    };
    const encryptedData = {
      key: encryption(data),
    };
    try {
      console.log("function running walletPoisiton");
      const response = await axios.post(walletPositionApi, encryptedData);
      console.log("function running walletPoisiton2", response);

      const result = decryption(response?.data);
      console.log("function running walletPoisiton3", result);

      console.log(
        "balanceprofiler1 iamsun",
        result.walletPosition.positionsNft
      );

      const maxPrice = Math.max(
        ...result?.walletPosition?.positionsNft?.map((item) => item?.adaValue)
      );
      // Fetch time series and image for each NFT concurrently
      // const nftsWithImages = await Promise.all(
      //   result?.walletPosition?.positionsNft?.map(async (nft) => {
      //     console.log("entering into map func iamsun");
      //     const encryptedData = encryption({ policyId: nft?.policy });
      //     console.log("encrypted DAta iamsun", encryptedData);
      //     const imageResponse = await axios.post(getNftImage, {
      //       key: encryptedData,
      //     });
      //     console.log("imageResponse iamsun jk", imageResponse);
      //     const imageResult = decryption(imageResponse?.data);
      //     console.log("imageResult iamsun", imageResult);

      //     const image = imageResult?.NFTMetaData?.image;
      //     console.log("image iamsun2", image);

      //     return { ...nft, image, maxPrice };
      //   })
      // );
      // console.log("balanceprofiler1 iamsun nftsWithImages2", nftsWithImages);

      // Replace the existing positionsNft array with the new array
      // result.walletPosition.positionsNft = nftsWithImages;
      // Dispatch the updated result
      console.log(
        "balanceprofiler1 iamsun2",
        result.walletPosition.positionsNft
      );
      dispatch(setWalletProfilerBalance(result));
      dispatch(setHoldingNft(result.walletPosition.positionsNft));
    } catch (error) {
      console.log("error", error);
    }
  };

  //walletHistoryApi - Trade
  const walletHistory = async () => {
    const data = {
      address: stakeAddress,
    };
    const encryptedData = {
      key: encryption(data),
    };
    try {
      const response = await axios.post(walletHistoryApi, encryptedData);
      const result = decryption(response?.data);
      console.log("wallet-history", result);
      dispatch(setWalletTradeHistory(result));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchUTXos();
      blockFrostApi();
    }
  }, []);

  useEffect(() => {
    if (stakeAddress) {
      walletPosition();
      walletHistory();
    }
  }, [stakeAddress]);

  //Allow without pro in small screen
  const useMediaQuery = useMedia();
  const { screenAllowProfiler } = useMediaQuery;

  //Check pro if wallet connect or disconnect
  useEffect(() => {
    if (!isPro && !screenAllowProfiler && walletAddress && stakeAddress) {
      navigate("/profiler-search");
    }
  }, [isConnect, isPro, navigate]);

  return (
    <div className="lg:px-4 md:px-2">
      <WalletProfilerHeader text="WalletWatch" />
      <ProLandingWalletProfiler />
    </div>
  );
};

export default WalletProfiler;
