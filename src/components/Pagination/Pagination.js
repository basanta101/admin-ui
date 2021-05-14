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
      >
        {"<<"}
      </button>
      <button
        onClick={() => handlePageChange(currentPageNo - 1)}
        disabled={isFirstPageInView}
      >
        {"<"}
      </button>
      <span>{currentPageNo}</span>/<span>{totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPageNo + 1)}
        disabled={isLastPageInView}
      >
        {">"}
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={isLastPageInView}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
