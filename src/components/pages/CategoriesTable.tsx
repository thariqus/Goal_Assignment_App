import React, { useState } from "react";

interface CategoriesList {
  id: string;
  code: string;
  name: string;
}

function CategoriesTable() {
  const [category, setCategory] = useState<CategoriesList[]>([
    { id: "1", code: "00011", name: "Thomas" },
    { id: "2", code: "00211", name: "Thomson" },
    { id: "3", code: "00321", name: "Johnson" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = category.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(category.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white border rounded-lg px-6 py-6 h-full">
      <h1 className="text-xl font-medium pb-5">Categories List</h1>

      <div className="border rounded-lg w-full overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-500 border-b ">
            <tr>
              <th className="py-3 font-medium px-4">#</th>
              <th className="py-3 font-medium px-4">Code</th>
              <th className="py-3 font-medium px-4">Name</th>
            </tr>
          </thead>

          <tbody>
            {category.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50  transition"
              >
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.code}</td>
                <td className="py-3 px-4">{item.name}</td>
              </tr>
            ))}
          </tbody>

        </table>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center px-2 ">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span>entries</span>
          </div>

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
                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-[#ffe4e6] text-gray-600" : ""}`}
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
      </div>


    </div>
  );
}

export default CategoriesTable;
