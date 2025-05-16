import React from "react";

const Pagination = ({ page, totalPages, setPage }) => (
  <div className="flex justify-center space-x-2 mt-4">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
      className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
    >
      Prev
    </button>
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`px-3 py-1 rounded ${
          page === i + 1
            ? "bg-amber-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
      disabled={page === totalPages}
      className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;
