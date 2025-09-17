import React, { useState } from "react";

function Pagination({ rowsPerPage, setRowsPerPage, currentPage, setCurrentPage, totalPages, handlePageChange }) {
  const [open, setOpen] = useState(false);

  const options = [5, 10, 20];

  return (
    <div className="flex justify-between items-center mt-4 px-2">
      {/* Rows per page selector */}
      <div className="flex items-center gap-2 relative">
        <span>Show</span>

        {/* Dropdown button */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="border rounded px-3 py-1 flex items-center gap-1"
          >
            {rowsPerPage}
            <svg
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute left-0 mt-1 w-20 border rounded bg-white shadow-md z-5060">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setRowsPerPage(opt);
                    setCurrentPage(1);
                    setOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-1 hover:bg-gray-100 ${
                    rowsPerPage === opt ? "bg-gray-200 font-medium" : ""
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <span>entries</span>
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-2 my-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-[#ffe4e6] text-gray-600" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
