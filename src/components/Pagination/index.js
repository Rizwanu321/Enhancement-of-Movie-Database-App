import './index.css'

const Pagination = ({currentPage, setCurrentPage, totalPages}) => {
  const visiblePages = 5

  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
  let endPage = Math.min(totalPages, currentPage + Math.floor(visiblePages / 2))

  if (endPage - startPage + 1 < visiblePages) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + visiblePages - 1)
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - visiblePages + 1)
    }
  }

  const pages = []
  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i)
  }

  return (
    <div className="pagination-controls">
      <button
        className="pagination-button"
        type="button"
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map(page => (
        <p
          key={page}
          className={`pagination-button ${
            currentPage === page ? 'active' : ''
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </p>
      ))}

      <button
        className="pagination-button"
        type="button"
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
