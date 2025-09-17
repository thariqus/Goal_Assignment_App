import React, { useState } from "react";
import { useNavigate } from "react-router";

interface CategoriesList {
    id: string;
    title: string;
    description: string;
    status: string;
    category: string
}

function GoalList() {
    const [category, setCategory] = useState<CategoriesList[]>([
        { id: "1", title: "Redesign Webste", description: "Thomas", status: "Comlpeted", category: "TeamWork" },
        { id: "2", title: "Testing Website", description: "Adhil", status: "Comlpeted", category: "Learning and Development" },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate()

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = category.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(category.length / rowsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleGoalNavigation = () => {
        navigate("/goalcreation")
    }

    return (
        <div className="bg-white border rounded-lg px-6 py-6 h-full">
            <h1 className="text-xl font-medium pb-5">Goal List</h1>
            <div className="flex justify-end mb-5">
                <button className="bg-[#972E26] text-white rounded-lg flex justify-end px-3 py-2" onClick={handleGoalNavigation}>Add new Goal</button>
            </div>

            <div className="border rounded-lg w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-gray-500 border-b ">
                        <tr>
                            <th className="py-3 font-medium px-4">#</th>
                            <th className="py-3 font-medium px-4">Title</th>
                            <th className="py-3 font-medium px-4">Description</th>
                            <th className="py-3 font-medium px-4">Status</th>
                            <th className="py-3 font-medium px-4">Category</th>

                        </tr>
                    </thead>

                    <tbody>
                        {category.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50  transition"
                            >
                                <td className="py-3 px-4">{item.id}</td>
                                <td className="py-3 px-4">{item.title}</td>
                                <td className="py-3 px-4">{item.description}</td>
                                <td className="py-3 px-4">{item.status}</td>
                                <td className="py-3 px-4">{item.category}</td>

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

export default GoalList;
