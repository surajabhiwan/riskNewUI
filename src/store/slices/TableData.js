//Slice to store token table data on home
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { tableDataApi } from "../../baseurl/baseurl";
import { decryption } from "../../functions/crypto";

export const getTableDataForHome = createAsyncThunk(
  "getTableDataForHome",
  async (data, { rejectwithvalue }) => {
    const response = await axios.get(tableDataApi, {
      headers: {
        "x-api-key":
          "5r26BELqoLuWbDEn6PaKhLWaVmHsYpDh5rDKOkQef0n6RVTcUztI3NH1TLkH",
      },
    });
    try {
      const result = decryption(response?.data);
      console.log("redux-data", result);
      return result;
    } catch (error) {
      return rejectwithvalue(error);
    }
  }
);

const initialState = {
  adaLive: null,
  data: [],
  dataTokenTabs: [],
  nftTableData: [],
  loading: false,
  loadingTokenTab: false,
  nftTableLoading: false,
  trendingToken: [],
  trendingNftt: [],
  tokenScreen: true,
  tabSelected: "",
};

const tableData = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    getAdaLive(state, action) {
      console.log(action.payload);
      state.adaLive = action.payload;
    },
    getTableData(state, action) {
      console.log(action.payload);
      state.data = action.payload;
    },
    getTokenTabs(state, action) {
      state.dataTokenTabs = action.payload;
    },
    getTrendingToken(state, action) {
      state.trendingToken = action.payload;
    },
    getTrendingNft(state, action) {
      state.trendingNftt = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLoadingTokenTab(state, action) {
      state.loadingTokenTab = action.payload;
    },
    setNftTableLOading(state, action) {
      state.nftTableLoading = action.payload;
    },
    setNftTableData(state, action) {
      state.nftTableData = action.payload;
    },
    setTokenTab(state, action) {
      state.tokenScreen = action.payload;
    },
    setTabSelected(state, action) {
      state.tabSelected = action.payload;
    },
  },

  extraReducers: {
    [getTableDataForHome.pending]: (state) => {
      state.loading = true;
      state.loadingTokenTab = true;
    },

    [getTableDataForHome.fulfilled]: (state, action) => {
      state.loading = false;
      state.loadingTokenTab = false;
      if (action.payload === null) {
        state.data = [];
        return;
      }
      const result = action.payload;

      // const maxVolumeADA = Math.max(...result?.pageProps?.top25Tokens?.map(item => parseFloat(item?.volume?.replace(/[$,]/g, ''))));
      const maxVolumeADA = Math.max(
        ...result?.pageProps?.top25Tokens?.map((item) =>
          parseFloat(item?.volume)
        )
      );
      // const maxTotalLiquidityADA = Math.max(...result?.pageProps?.top25Tokens?.map(item => parseFloat(item?.liquidity?.replace(/[$,]/g, ''))));
      const maxTotalLiquidityADA = Math.max(
        ...result?.pageProps?.top25Tokens?.map((item) =>
          parseFloat(item?.liquidity)
        )
      );
      const dataWithPercentage = result?.pageProps?.top25Tokens?.map(
        (item) => ({
          ...item,
          // percentagevolumeADA: (parseFloat(item?.volume?.replace(/[$,]/g, '')) / maxVolumeADA) * 100,
          percentagevolumeADA: (parseFloat(item?.volume) / maxVolumeADA) * 100,
          // percentagetotalLiquidityADA: (parseFloat(item?.liquidity?.replace(/[$,]/g, '')) / maxTotalLiquidityADA) * 100
          percentagetotalLiquidityADA:
            (parseFloat(item?.liquidity) / maxTotalLiquidityADA) * 100,
        })
      );
      state.data = dataWithPercentage;
      state.trendingToken = dataWithPercentage;
      state.dataTokenTabs = dataWithPercentage;
      sessionStorage.setItem(
        "tokenModalData",
        JSON.stringify(dataWithPercentage)
      );
    },

    [getTableDataForHome.reject]: (state, action) => {
      state.loading = false;
      state.loadingTokenTab = false;
    },
  },
});

export default tableData.reducer;
export const tableAction = tableData.actions;
