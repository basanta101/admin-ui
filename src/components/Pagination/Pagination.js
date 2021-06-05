import "./Pagination.css";

const Pagination = ({ pagination = {}, handlePageChange = (f) => f }) => {
  const { currentPageNo, totalPages } = pagination;

  // disable btn when it is not required
  const isFirstPageInView = currentPageNo === 1;
  const isLastPageInView = currentPageNo === totalPages;
  
  return (
    <div className="paginationWrapper">
      <button
        onClick={() => handlePageChange(1)}
        disabled={isFirstPageInView}
        data-testid='getFirstPageBtn'
      >
        {"<<"}
      </button>
      <button
        onClick={() => handlePageChange(currentPageNo - 1)}
        disabled={isFirstPageInView}
        data-testid='getPrevPageBtn'
      >
        {"<"}
      </button>
      <span>{currentPageNo}</span>/<span>{totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPageNo + 1)}
        disabled={isLastPageInView}
        data-testid='getNextPageBtn'

      >
        {">"}
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={isLastPageInView}
        data-testid='getLastPageBtn'
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
