import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { EthAssetType, EthNftsType, EthTxnType } from "../types";

const initialState = {
  activeTab: localStorage.getItem("activeTab")
    ? localStorage.getItem("activeTab")
    : "Transactions",

  ethAmt: 0,
  ethPrice: 0,
  ethBalance: 0,
  ethAddress: "",
  ethTxnsTotal: 0,
  ethNftsTotal: 0,
  ethTxns: <EthTxnType[]>[],
  ethNfts: <EthNftsType[]>[],
  ethAssets: <EthAssetType[]>[],

  solTxnsTotal: 0,
  solNftsTotal: 0,
  solNfts: <EthNftsType[]>[],
  solTxns: <EthTxnType[]>[],

  totalTxnsCount: 0,
  totalNfts: 0,
  totalTxns: <EthTxnType[]>[],

  currentPage: localStorage.getItem("currentPage")
    ? Number(localStorage.getItem("currentPage"))
    : 1,
  txnPages: <number[]>[],
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      localStorage.setItem("activeTab", action.payload);
      state.activeTab = action.payload;
    },

    setCurrentPage: (state, action) => {
      const pageNum = action.payload;
      const firstCond = pageNum === Math.ceil(state.ethTxnsTotal / 10);
      const secondCond = pageNum >= 5;
      const firstVal = pageNum - 5;
      const secondVal = pageNum - 4;
      const totalPages = Math.ceil(state.ethTxnsTotal / 10);

      localStorage.setItem("currentPage", pageNum);
      state.currentPage = Number(!isNaN(pageNum) ? pageNum : state.currentPage);

      state.txnPages =
        totalPages >= 5
          ? [
              firstCond ? 1 + firstVal : secondCond ? 1 + secondVal : 1,
              firstCond ? 2 + firstVal : secondCond ? 2 + secondVal : 2,
              firstCond ? 3 + firstVal : secondCond ? 3 + secondVal : 3,
              firstCond ? 4 + firstVal : secondCond ? 4 + secondVal : 4,
              firstCond ? 5 + firstVal : secondCond ? 5 + secondVal : 5,
            ]
          : Array.from({ length: totalPages }, (_, i) => i + 1);
    },

    // Eth configurations
    setEthAddress: (state, action) => {
      state.ethAddress = action.payload;
    },

    setEthBalance: (state, action) => {
      state.ethAmt = Number(
        !isNaN(action.payload.amt) ? action.payload.amt : state.ethAmt
      );
      state.ethPrice = Number(
        !isNaN(action.payload.price) ? action.payload.price : state.ethPrice
      );
      state.ethBalance = Number(
        !isNaN(action.payload.balance)
          ? action.payload.balance
          : state.ethBalance
      );
      state.ethAssets = [...action.payload.assets];
    },

    setEthTxns: (state, action) => {
      state.ethTxns = [...action.payload.result];

      state.ethTxnsTotal = Number(
        !isNaN(action.payload.total) ? action.payload.total : state.ethTxnsTotal
      );
      state.totalTxnsCount = state.ethTxnsTotal + state.solTxnsTotal;
    },

    setEthNfts: (state, action) => {
      state.ethNfts = [...action.payload.result];
      state.ethNftsTotal = Number(
        !isNaN(action.payload.total) ? action.payload.total : state.ethNftsTotal
      );
      state.totalNfts = state.ethNftsTotal + state.solNftsTotal;
    },
  },
});

export const {
  setCurrentTab,
  setCurrentPage,
  //
  setEthTxns,
  setEthNfts,
  setEthBalance,
  setEthAddress,
} = rootSlice.actions;
export default rootSlice.reducer;
