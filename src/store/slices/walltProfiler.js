//Slice to store token table data on home
import { createSlice} from "@reduxjs/toolkit";

 const initialState = {
  isPro: false,
  userInputProfiler:'',
  walletAddress : '',
  stakeAddress: '',
  assetsHeld: '',
  assetDetails: [],
  transactions: [],
  walletProfilerBalance:[],
  holdingNft:[],
  getUtox: [],
  inputOutputData: [],
  walletTradeHistory: [],
  assetType: 'token',
  
}

const walletProfilerData = createSlice({
    name: "walletProfilerData",
    initialState,
    reducers:{
      setIsProRedux(state, action) {
        state.isPro = action.payload
      },
      setUserInputProfiler(state, action) {
        state.userInputProfiler = action.payload
      },
      setWalletAddress(state, action) {
        state.walletAddress = action.payload
      },
      setStakeAddress(state, action) {
        state.stakeAddress = action.payload
      },
      setAllAssetsLength(state, action) {
        state.assetsHeld = action.payload
      },
      setAssetDetails(state, action) {
        state.assetDetails = action.payload
      },
      setTransactions(state, action) {
        state.transactions = action.payload
      },
      setWalletProfilerBalance(state, action) {
        state.walletProfilerBalance = action.payload
      },
      setUtox(state, action) {
        state.getUtox = action.payload
      },
      setInputOutputData(state, action) {
        state.inputOutputData = action.payload
      },
      setHoldingNft(state, action) {
        state.holdingNft = action.payload
      },
      setWalletTradeHistory(state, action) {
        state.walletTradeHistory = action.payload
      },

      setPortfolioAssetType(state, action){
        state.assetType = action.payload
      }
    }, 
})

const { reducer, actions } = walletProfilerData;
export const { setWalletAddress, setStakeAddress, setAllAssetsLength, setAssetDetails, setTransactions, setWalletProfilerBalance, setUtox, setInputOutputData, setHoldingNft , setWalletTradeHistory, setIsProRedux, setPortfolioAssetType, setUserInputProfiler} = actions; 
export default reducer;

  