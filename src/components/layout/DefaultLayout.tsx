import Footer from "./Footer";
import Tabs from "../common/Tabs";
import AppHeader from "./AppHeader";
import { Outlet } from "react-router";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentPage,
  setEthAddress,
  setEthBalance,
  setEthNfts,
  setEthTxns,
} from "../../store/rootSlice";
import { useAppSelector } from "../../store/reduxHooks";

export default function DefaultLayout() {
  const dispatch = useDispatch();
  const { currentPage } = useAppSelector((state) => state.main);

  // Web3 Logic
  const Web3Api = useMoralisWeb3Api();
  const { user } = useMoralis();

  const fetchTransactions: (address: string) => void = async (
    address: string
  ) => {
    const transactions = await Web3Api.account.getTransactions({
      address,
    });
    if (!!transactions.result) {
      dispatch(
        setEthTxns({
          result: transactions.result,
          total: transactions.total,
        })
      );
      dispatch(setCurrentPage(currentPage));
    }
  };

  const fetchNativeBalance = async (address: string) => {
    const balance = await Web3Api.account.getNativeBalance({ address });
    const ethAmt = Number(balance.balance) / Math.pow(10, 18);
    const balances = await Web3Api.token.getTokenPrice({
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      chain: "eth",
      exchange: "uniswap-v3",
    });

    const assets = await Web3Api.account.getTokenBalances({ address });

    dispatch(
      setEthBalance({
        assets,
        amt: ethAmt,
        price: balances.usdPrice,
        balance: balances.usdPrice * ethAmt,
      })
    );
  };

  const fetchNFTs = async (address: string) => {
    const nfts = await Web3Api.account.getNFTs({ address });

    if (!!nfts.result) {
      dispatch(
        setEthNfts({
          result: nfts.result,
          total: nfts.total,
        })
      );
    }
  };

  useEffect(() => {
    if (user) {
      const ethAddress = user?.get("ethAddress");
      dispatch(setEthAddress(ethAddress));
      fetchTransactions(ethAddress);
      fetchNativeBalance(ethAddress);
      fetchNFTs(ethAddress);
    }
  }, []);

  return (
    <>
      <div className="app-container">
        <AppHeader />
        <div className="app-container__main">
          <Tabs />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
