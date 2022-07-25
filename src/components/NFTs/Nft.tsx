import React, { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { EthNftsType } from "../../types";

const Nft = ({ nft }: { nft: EthNftsType }) => {
  const fixURL = (url: string) =>
    "https://ipfs.io/ipfs/" + JSON.parse(url).image.split("ipfs://")[1];

  const nftImage = !!nft?.metadata
    ? fixURL(nft.metadata)
    : "https://img.seadn.io/files/3cd0b04d74aae7ec1a98498557d9856e.png?auto=format&fit=max";

  //   const Web3Api = useMoralisWeb3Api();
  //   const [fp, setFp] = useState("");
  //   const getFloorPrice = async (address: string) => {
  //     const nftFP = await Web3Api.token.getNFTLowestPrice({
  //       address,
  //       days: 3,
  //     });
  //     setFp(nftFP)
  //   };

  return (
    <div className="nft-list__item__cover">
      <div className="nft-list__item">
        <div className="media">
          <img src={nftImage} alt="" />
        </div>
        <div className="details">
          <p className="name">{nft?.name}</p>
          <div className="info">
            <div className="rank">
              <p className="title">No</p>
              <p className="value">
                {nft?.metadata
                  ? "#" + JSON.parse(nft?.metadata).name.split("#")[1]
                  : null}
              </p>
            </div>
            <div className="estimated_value">
              <p className="title">Symbol</p>
              <p className="value">{nft?.symbol}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nft;
