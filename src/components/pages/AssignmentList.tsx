import React, { useState } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";

interface AssignmentsList {
    id: string;
    evaluation: string;
    status: string;
    assignedto: string;
}

function AssignmwntList() {
    const [assignments, setAssignments] = useState<AssignmentsList[]>([
        { id: "1", evaluation: "2011-03-3", status: "Open", assignedto: "Saji Jose" },
        { id: "2", evaluation: "2015-03-3", status: "In progress", assignedto: "Saji Jose" },
        { id: "3", evaluation: "2025-03-3", status: "Completed", assignedto: "Saji Jose" },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = assignments.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(assignments.length / rowsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-white border rounded-lg px-6 py-6 h-full">
            <h1 className="text-xl font-medium pb-5">Assignment List</h1>

            <div className="border rounded-lg w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-gray-500 border-b ">
                        <tr>
                            <th className="py-3 font-medium px-4">#</th>
                            <th className="py-3 font-medium px-4">
                                <div className="flex items-center gap-1">
                                    <span>Evaluation</span>
                                    <IoIosArrowRoundDown />
                                </div>
                            </th>

                            <th className="py-3 font-medium px-4">
                                <div className="flex items-center gap-1">
                                    <span>Status</span>
                                    <IoIosArrowRoundDown />
                                </div>
                            </th>
                            <th className="py-3 font-medium px-4">Assigned To</th>

                        </tr>
                    </thead>

                    <tbody>
                        {assignments.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50  transition"
                            >
                                <td className="py-3 px-4">{item.id}</td>
                                <td className="py-3 px-4">{item.evaluation}</td>
                                <td className="py-3 px-4">{item.status}</td>
                                <td className="py-3 px-4">{item.assignedto}</td>

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

export default AssignmwntList;
