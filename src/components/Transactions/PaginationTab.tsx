import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/reduxHooks";
import { setCurrentPage } from "../../store/rootSlice";

const PaginationTab = () => {
  const dispatch = useDispatch();
  const { txnPages, currentPage, totalTxns, ethTxnsTotal } = useAppSelector(
    (state) => state.main
  );

  const getNewTxns = async (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return !!totalTxns ? (
    <div className="pagination_container">
      <div className="pagination">
        <div
          className="pagination__item nav-btn left-btn"
          data-inactive={currentPage <= 1}
          onClick={() => {
            if (currentPage > 1) {
              getNewTxns(currentPage - 1);
            }
          }}
        >
          <i className="ph-caret-left" />
        </div>

        {txnPages?.map((page, index) => (
          <div
            key={index}
            className="pagination__item"
            data-active={currentPage === page}
            onClick={() => getNewTxns(page)}
          >
            {page}
          </div>
        ))}

        <div
          className="pagination__item nav-btn right-btn"
          data-inactive={!(currentPage < Math.ceil(ethTxnsTotal / 10))}
          onClick={() => {
            if (currentPage < Math.ceil(ethTxnsTotal / 10)) {
              getNewTxns(currentPage + 1);
            }
          }}
        >
          <i className="ph-caret-right" />
        </div>
      </div>
    </div>
  ) : null;
};

export default PaginationTab;
