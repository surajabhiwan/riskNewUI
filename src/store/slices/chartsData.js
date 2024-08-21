//Slice to store token table data on home
import { createSlice} from "@reduxjs/toolkit";

 const initialState = {
  depthData: [],
  loading : false,
  showChartsModal: false,
  showNftInfoModal: false,
  tradeHistoryData: []
}

const chartsData = createSlice({
    name: "chartsData",
    initialState,
    reducers:{
      getDepthData(state, action) {
        console.log(action.payload)
        state.depthData = action.payload
      },
      getModalOpen(state, action) {
        state.showChartsModal = action.payload
      },

      getModalNftinfoOpen(state, action) {
        state.showNftInfoModal = action.payload
      },
      setTradeHIstoryData(state, action) {
        state.tradeHistoryData = action.payload
      },
    }, 
})

export default chartsData.reducer;
export const chartsAction = chartsData.actions
export const chartsModalAction = chartsData.actions














