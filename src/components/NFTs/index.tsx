import { useEffect } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import EmptyState from "../common/EmptyState";
import Nft from "./Nft";

const NFTS = () => {
  const { ethNfts, ethNftsTotal } = useAppSelector((state) => state.main);

  return (
    <div className="nfts-container base-animation--fade-left">
      <div className="nfts-container__header">
        <div className="nfts-container__header__item">
          <p>
            <span>Collected digital Arts</span>
          </p>
          <div className="nft_total">
            <i className="ph-alien-fill" />
            <i className="ph-x-bold small" />
            <p>&nbsp;{ethNftsTotal}</p>
          </div>
        </div>
      </div>
      {/*  */}

      {!ethNfts || ethNfts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="nft-list">
          {ethNfts.map((nft, index) => {
            return <Nft nft={nft} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default NFTS;
