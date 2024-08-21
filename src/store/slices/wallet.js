import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showwalletconnectmodalmobile: false,
  showwalletconnectmodaldesk: false,
  isDollar: false,
  hotwalletmenuitems: [
    { id: 0, value: "Total Volume Traded", active: true },
    { id: 1, value: "Total ADA", active: false },
    { id: 2, value: "Token Transactions", active: false },
    { id: 3, value: "NFT Transactions", active: false },
  ],
  walletprofilermenuitems: [
    { id: 0, value: "Overview", active: true },
    { id: 1, value: "Portfolio", active: false },
    { id: 2, value: "Associated Wallets", active: false },
    { id: 3, value: "Trade History", active: false },
  ],
  signedMessage:localStorage.getItem("wallet_sign"),
  walletAppName:localStorage.getItem("walletAppName"),
  walletData: [],
  walletPosition:[],
};


const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    walletSignMessage(state, action) {
      // You can handle the logic for signing a message here.
      // For now, let's assume you have a property in the state like `signedMessage`.
      state.signedMessage = action.payload;
      console.log(action.payload,"toolkit");
      return;
    },
    walletAppName(state, action){
      state.walletAppName = action.payload;
      console.log(action.payload,"toolkit");
      return;
    },
    walletPosition(state, action){
      state.walletPosition = action.payload;
      return;
  },

    showWalletConnectModalMobile(state) {
      state.showwalletconnectmodalmobile = !state.showwalletconnectmodalmobile;
      return;
    },
    showWalletConnectModalDesk(state) {
      state.showwalletconnectmodaldesk = !state.showwalletconnectmodaldesk;
      return;
    },
    setIsDollar(state) {
      state.isDollar = !state.isDollar;
      return;
    },
    sethotwalletmenuitems(state, action) {
      const newhotwalletmenuitems = state.hotwalletmenuitems.map(
        (item, idx) => {
          if (action.payload === idx) {
            item.active = true;
          } else {
            item.active = false;
          }
          return item;
        }
      );
      state.hotwalletmenuitems = newhotwalletmenuitems;
      return;
    },
    setwalletprofilermenuitems(state, action) {
      const newwalletprofilermenuitems = state.walletprofilermenuitems.map(
        (item, idx) => {
          if (action.payload === idx) {
            item.active = true;
          } else {
            item.active = false;
          }
          return item;
        }
      );

      state.walletprofilermenuitems = newwalletprofilermenuitems;
      return;
    },
    setWalletData(state, action) {
      state.walletData = action.payload
    },
    setWalletPosition(state, action) {
      state.walletPosition = action.payload
    }
  },
});

const { reducer, actions } = walletSlice;

export const {
  showWalletConnectModalMobile,
  showWalletConnectModalDesk,
  setIsDollar,
  sethotwalletmenuitems,
  setwalletprofilermenuitems,
  walletSignMessage,
  setWalletData,
  setWalletPosition,
  walletAppName,walletPosition
} = actions;

export default reducer;
