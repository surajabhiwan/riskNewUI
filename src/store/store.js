import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import walletReducer from "./slices/wallet";
import tableReducer from './slices/TableData'
import chartsReducer from './slices/chartsData'
import walletProfilerReducer from './slices/walltProfiler'

const reducer = {
  auth: authReducer,
  wallet: walletReducer,
  tableREducer: tableReducer,
  chartsReducer: chartsReducer,
  walletProfilerReducer : walletProfilerReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
