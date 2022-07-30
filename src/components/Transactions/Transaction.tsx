import dayjs from "dayjs";
import Asset from "../common/Asset";
import { shortenAddr } from "../../utils";
import { TxnElementProps } from "../../types";
import millify from "millify";

const Transaction = ({ transaction, address }: TxnElementProps) => {
  return (
    <>
      <div className="table__row">
        <div className="table__row__item">
          <div className="txn_direction">
            {transaction?.from_address === address ? (
              <>
                <span className="from_acct">.</span>
                <i className="ph-arrow-up-right-bold" />
              </>
            ) : (
              <>
                <span className="to_acct">.</span>
                <i className="ph-arrow-down-left-bold" />
              </>
            )}
          </div>
        </div>
        <div className="table__row__item">
          <p>
            {!!transaction?.from_address &&
              shortenAddr(
                transaction?.from_address === address
                  ? transaction?.to_address
                  : transaction?.from_address
              )}
          </p>
        </div>
        <div className="table__row__item">
          <Asset.Ethereum />
          <p>
            {millify(Number(transaction?.value) / 1e18, {
              precision: 3,
            })}
          </p>
        </div>
        <div className="table__row__item">
          {transaction?.receipt_status === "0" ? (
            <p className="base-tag--error">Failed</p>
          ) : transaction?.receipt_status === "1" ? (
            <p className="base-tag--success">Successful</p>
          ) : (
            <p className="base-tag--warning">Pending</p>
          )}
        </div>
        <div className="table__row__item">
          <p>{dayjs(transaction?.block_timestamp).format("D MMM, YYYY")}</p>
        </div>
        <a
          href={`https://etherscan.io/tx/${transaction?.hash}`}
          target="_blank"
          className="table__row__item"
        >
          <i className="ph-link-simple" />
        </a>
      </div>
    </>
  );
};

export default Transaction;
