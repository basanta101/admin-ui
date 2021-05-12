import './Pagination.css'

const Pagination = ({ pagination, handlePageChangeCb }) => {
    const {currentPageNo, totalPages, pageSize} = pagination;
  
    return (
        <div className='paginationWrapper'>
          <button onClick={() => handlePageChangeCb(1)}>{'<<'}</button>  
          <button onClick={() => handlePageChangeCb(currentPageNo - 1)}>{'<'}</button>
          <span>{currentPageNo}</span>/<span>{totalPages}</span>
          <button onClick={() => handlePageChangeCb(currentPageNo + 1)}>{'>'}</button>
          <button onClick={() => handlePageChangeCb(totalPages)}>{'>>'}</button>

        </div>
    )
};

export default Pagination;