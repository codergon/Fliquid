import millify from "millify";
import Icon from "../common/Icon";
import { shortenAddr } from "../../utils";
import { useAppSelector } from "../../store/reduxHooks";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";
import { useMoralis } from "react-moralis";

export default function AppHeader() {
  const { ethBalance, totalTxnsCount, totalNfts, ethAddress } = useAppSelector(
    (state) => state.main
  );

  const { logout } = useMoralis();

  const [copied, setCopied] = useState(false);

  const CopiedText = () => {
    if (copied) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const signOut = async () => {
    localStorage.clear();
    await logout();
  };

  return (
    <div className="app-header">
      <div className="app_logo">
        <Icon.Logo />
        <p>Fliquid</p>
      </div>

      <div className="account_stats">
        <div className="account_stats__block">
          <p className="value">${millify(ethBalance, { precision: 2 })}</p>
          <p className="title">Net Worth</p>
        </div>

        <div className="account_stats__block">
          <p className="value">{millify(totalTxnsCount)}</p>
          <p className="title">Transactions</p>
        </div>

        <div className="account_stats__block">
          <p className="value">{millify(totalNfts)}</p>
          <p className="title">
            <span className="hide-mb">Total</span> NFTs
          </p>
        </div>
      </div>
      <div className="page_description">
        Aggregate portfolio of the connected wallet addresses
      </div>

      <div className="connected_network">
        <div className="network">
          <Icon.Metamask />
          <p className="wallet_addr">{shortenAddr(ethAddress, 3, 4)}</p>

          <CopyToClipboard text={ethAddress} onCopy={() => CopiedText()}>
            <button>
              <i
                className={
                  copied ? "ph-check-circle-fill copied" : "ph-copy-fill"
                }
              />
            </button>
          </CopyToClipboard>

          <button onClick={signOut}>
            <i className="ph-sign-out-bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
