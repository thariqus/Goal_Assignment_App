import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoIosArrowRoundDown } from 'react-icons/io';

interface Tablevalues {
  id: number;
  name: string;
  webpage: number;
  details: string;
}

function GoalAssignmentTable() {
  const [datas] = useState<Tablevalues[]>([
    {
      id: 1,
      name: "Evaluation",
      webpage: 49,
      details:
        "A It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      id: 2,
      name: "Testing",
      webpage: 30,
      details: "Cccc",
    },
    {
      id: 3,
      name: "Deployment",
      webpage: 20,
      details: "Zzzz",
    },
  ]);

  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  


  // Search
  let filteredData = datas.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  if (sortAsc !== null) {
    filteredData = [...filteredData].sort((a, b) => {
      if (sortAsc) {
        return a.details.localeCompare(b.details);
      } else {
        return b.details.localeCompare(a.details);
      }
    });
  }

  const handleDetailsSort = () => {
    setSortAsc(!sortAsc);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };




  return (
    <div className="overflow-hidden w-full rounded-xl border border-gray-200 mt-3 bg-white">
      {/* Search Bar */}
      <div className="flex items-center border w-270 rounded-lg m-2 px-5 py-1 gap-1">
        <CiSearch style={{ fontSize: "18px", color: "gray" }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus:outline-none w-full"
          placeholder="Search Goal Name..."
        />
      </div>


      <div className="max-w-full">
        <table className="w-full text-left border-collapse">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="px-2  py-3 font-medium text-gray-500 text-center">
                #
              </th>
              <th className="px-2  py-3 font-medium text-gray-500 text-center">
                Check
              </th>
              <th className="px-4 py-3 font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 font-medium text-gray-500">Webpage</th>
              <th className="px-4 py-3  w-[400px] font-medium text-gray-500">
                <div className="flex items-center gap-1">
                  <span>Details</span>
                  <IoIosArrowRoundDown
                    onClick={handleDetailsSort}
                    className={`cursor-pointer transition-transform ${sortAsc ? "rotate-180" : ""
                      }`}
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {currentRows.map((value) => (
              <tr key={value.id} className="hover:bg-gray-50 border-b">
                <td className="px-2 py-3 text-center">{value.id}</td>
                <td className="px-2 py-3 text-center">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-3 text-gray-700">{value.name}</td>
                <td className="px-4 py-3 text-gray-700">{value.webpage}</td>
                <td className="px-4 py-3 text-gray-700">{value.details}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2">
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
                className={`px-3 py-1 border rounded ${currentPage === i + 1
                    ? "bg-[#ffe4e6] text-gray-600"
                    : "bg-white"
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
      </div>
    </div>
  );
}

export default GoalAssignmentTable;
