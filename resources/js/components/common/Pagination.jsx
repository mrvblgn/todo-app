const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-6 space-x-2">
    <button
      className="btn"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Önceki
    </button>
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i + 1}
        className={`btn ${currentPage === i + 1 ? "btn-primary" : ""}`}
        onClick={() => onPageChange(i + 1)}
      >
        {i + 1}
      </button>
    ))}
    <button
      className="btn"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Sonraki
    </button>
  </div>
);

export default Pagination;
