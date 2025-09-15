import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import { BiSolidReport } from "react-icons/bi";

interface Reports {
    id: string;
    evaluation: string;
    assigned: number;
    progress: number;
    completed: number;
    pending: number;
}

function AssessmentSummaryReport() {
    const [reports] = useState<Reports[]>([
        { id: "1", evaluation: "2011-03-3 Evaluation", assigned: 8, progress: 2, completed: 2, pending: 4 },
        { id: "2", evaluation: "2015-03-3 Evaluation", assigned: 8, progress: 2, completed: 2, pending: 4 },
        { id: "3", evaluation: "2025-03-3 Evaluation", assigned: 8, progress: 2, completed: 2, pending: 4 },
    ]);

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedEvaluation, setSelectedEvaluation] = useState<string>("Select Evaluation");
    const [selectedEmployee, setSelectedEmployee] = useState<string>("Select Employee");
    const [showReport, setShowReport] = useState(false);
    const [searchEvaluation, setSearchEvaluation] = useState("");
    const [searchEmployee, setSearchEmployee] = useState("");

    const evaluations = ["3-3-2025 Evaluation", "7-3-2025 Evaluation", "2011-03-3 Evaluation"];
    const employees = ["Tharique", "Adhil", "Aisha", "Meera"];

    const toggleDropdown = (dropdownName: string) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".dropdown-container")) {
                setOpenDropdown(null);
            }
        };
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = reports.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(reports.length / rowsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className=''>
            <form className='border h-full flex flex-col gap-5 rounded-lg bg-white px-6 py-10 '>
                <h1 className='text-xl font-medium pb-5'>Assessment Summary Report</h1>

                {/* Evaluation dropdown */}
                <div className="relative dropdown-container">
                    <div className="flex gap-12">
                        <label>Evaluation:</label>
                        <div>
                            <button
                                type="button"
                                className="flex items-center gap-2 border bg-white rounded-md py-1 px-3"
                                onClick={() => toggleDropdown("evaluation")}
                            >
                                <span className={selectedEvaluation === "Select Evaluation" ? "text-gray-400" : "text-black"}>
                                    {selectedEvaluation}
                                </span>
                                <IoIosArrowDown style={{ color: "gray" }} />
                            </button>

                            {openDropdown === "evaluation" && (
                                <div className="absolute left-35 mt-1 w-48 border rounded-md shadow-sm bg-white z-[1000]">
                                    {/* Search inside evaluation */}
                                    <div className="flex items-center border-b px-2 py-2">
                                        <CiSearch style={{ fontSize: "20px", color: "grey" }} />
                                        <input
                                            type="text"
                                            placeholder="Search Evaluation..."
                                            value={searchEvaluation}
                                            onChange={(e) => setSearchEvaluation(e.target.value)}
                                            className="w-full px-2 outline-none"
                                        />
                                    </div>
                                    <ul className="font-normal max-h-40 overflow-y-auto">
                                        {evaluations
                                            .filter(item => item.toLowerCase().includes(searchEvaluation.toLowerCase()))
                                            .map((item) => (
                                                <li
                                                    key={item}
                                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedEvaluation(item);
                                                        setOpenDropdown(null);
                                                        setSearchEvaluation("");
                                                    }}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Employee dropdown */}
                <div className="relative dropdown-container">
                    <div className="flex gap-13">
                        <label>Employee:</label>
                        <div>
                            <button
                                type="button"
                                className="flex items-center gap-2 border bg-white rounded-md py-1 px-3"
                                onClick={() => toggleDropdown("employee")}
                            >
                                <span className={selectedEmployee === "Select Employee" ? "text-gray-400" : "text-black"}>
                                    {selectedEmployee}
                                </span>
                                <IoIosArrowDown style={{ color: "gray" }} />
                            </button>

                            {openDropdown === "employee" && (
                                <div className="absolute left-35 mt-1 w-48 border rounded-md shadow-sm bg-white z-[1000]">
                                    {/* Search inside employee */}
                                    <div className="flex items-center border-b px-2 py-2">
                                        <CiSearch style={{ fontSize: "20px", color: "grey" }} />
                                        <input
                                            type="text"
                                            placeholder="Search Employee..."
                                            value={searchEmployee}
                                            onChange={(e) => setSearchEmployee(e.target.value)}
                                            className="w-full px-2 outline-none"
                                        />
                                    </div>
                                    <ul className="font-normal max-h-40 overflow-y-auto">
                                        {employees
                                            .filter(item => item.toLowerCase().includes(searchEmployee.toLowerCase()))
                                            .map((item) => (
                                                <li
                                                    key={item}
                                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedEmployee(item);
                                                        setOpenDropdown(null);
                                                        setSearchEmployee("");
                                                    }}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                
                <div className='flex justify-end w-full'>
                    <button
                        type='button'
                        onClick={() => setShowReport(!showReport)}
                        className='flex gap-2 items-center rounded-sm py-1 text-white bg-[#972e26] px-3'
                    >
                        <BiSolidReport />
                        <span>{showReport ? "Hide Report" : "Show Report"}</span>
                    </button>
                </div>

               
                {showReport && (
                    <>
                        <hr />
                        <div className='mt-10'>
                            <h3 className='text-xl mb-8 text-center text-[#972E26]'>
                                Report for the period of 2025 Sep 03
                            </h3>
                            <div className="border rounded-lg w-full overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-gray-500 border-b">
                                        <tr>
                                            <th className="py-3 w-[1px] font-medium px-4">#</th>
                                            <th className="py-3 font-medium px-4">Evaluation</th>
                                            <th className="py-3 font-medium px-4">Assigned </th>
                                            <th className="py-3 font-medium px-4">Progress</th>
                                            <th className="py-3 font-medium px-4">Completed</th>
                                            <th className="py-3 font-medium px-4">Pending</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRows.map((item) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                                                <td className="py-3 px-4">{item.id}</td>
                                                <td className="py-3 px-4">{item.evaluation}</td>
                                                <td className="py-3 px-4">{item.assigned}</td>
                                                <td className="py-3 px-4">{item.progress}</td>
                                                <td className="py-3 px-4">{item.completed}</td>
                                                <td className="py-3 px-4">{item.pending}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination */}
                                <div className="flex justify-between items-center px-2">
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
                    </>
                )}
            </form>
        </div>
    )
}

export default AssessmentSummaryReport
