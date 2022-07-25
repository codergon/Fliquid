import Transaction from "./Transaction";
import { useAppSelector } from "../../store/reduxHooks";
import PaginationTab from "./PaginationTab";
import EmptyState from "../common/EmptyState";

const Transactions = () => {
  const { ethAddress, ethTxns, currentPage } = useAppSelector(
    (state) => state.main
  );

  return (
    <div className="base-table base-animation--fade-left">
      <div className="base-table__header table__row">
        <div className="table__row__item">Type</div>
        <div className="table__row__item">Address</div>
        <div className="table__row__item">Amount</div>
        <div className="table__row__item">Status</div>
        <div className="table__row__item">Date</div>
        <div className="table__row__item"></div>
      </div>

      {!ethTxns || ethTxns.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {ethTxns
            .slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
            ?.map?.((transaction, index) => (
              <Transaction
                transaction={transaction}
                address={ethAddress}
                key={index}
              />
            ))}
          <PaginationTab />
        </>
      )}
    </div>
  );
};

export default Transactions;
