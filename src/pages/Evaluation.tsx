import React, { useState, useEffect } from "react";
import { CiEdit, CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import ReactDOM from "react-dom";

interface Reports {
    id: string;
    goalname: string;
    weightage: number;
    achieved: number;
    remark: string;
}

function Evaluation() {
    const [reports] = useState<Reports[]>([
        {
            id: "1",
            goalname: "Redesign Website",
            weightage: 40,
            achieved: 50,
            remark: "Not completed on time",
        },
        {
            id: "2",
            goalname: "Improve Unit Test Coverage",
            weightage: 40,
            achieved: 10,
            remark: "5-3-2025 Evaluation",
        },
        {
            id: "3",
            goalname: "Attend at least 2 tech conferences or workshops this year",
            weightage: 40,
            achieved: 30,
            remark: "Not completed on time",
        },
    ]);


    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedTitle, setSelectedTitle] = useState<string>("Select Title");
    const [search, setSearch] = useState("");
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [dropdownPos, setDropdownPos] = useState<{
        top: number;
        left: number;
    } | null>(null);
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

    const titleOptions = [
        { id: "1", name: "Attend at least 2 tech conferences or workshops this year" },
        { id: "2", name: "Redesign Wepage" },
        { id: "3", name: "Improve Unit Test Coverage" },
    ];

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".dropdown-container")) {
                setOpenDropdown(null);
                setOpenDropdownId(null);
            }
        };
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const toggleTableDropdown = (
        id: string,
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (openDropdownId === id) {
            setOpenDropdownId(null);
            return;
        }
        const rect = e.currentTarget.getBoundingClientRect();
        setDropdownPos({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
        });
        setOpenDropdownId(id);
    };

    return (
        <div className="border h-full flex flex-col gap-5 rounded-lg bg-white px-6 py-10">
            <h1 className="text-xl font-medium pb-5">Goal Evaluation</h1>

            <form className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <label>Title :</label>
                        <p>2024</p>
                    </div>


                    <div className="flex gap-2">
                        <label>Assigned To :</label>
                        <p>Tharique</p>
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="date">Date :</label>
                        <p>17/09/25</p>
                    </div>
                </div>


            </form>


            <div className="my-5">
                <div className="border rounded-lg w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="py-3 px-4">#</th>
                                <th className="py-3 px-4">Goal Name</th>
                                <th className="py-3 px-4">Weightage</th>
                                <th className="py-3 px-4">Achieved %</th>
                                <th className="py-3 px-4">Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-4">{item.id}</td>
                                    <td className="py-3 px-4">{item.goalname}</td>
                                    <td className="py-3 px-4">{item.weightage}</td>
                                    <td className="py-3 px-4">
                                        <input type="number" className="border rounded-sm w-20" />
                                    </td>
                                    <td className="py-3 px-4">
                                        <input type="text" className="border rounded-sm w-full" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4 px-2">
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
                                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-[#ffe4e6]" : ""
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


            <form action="" className=' flex flex-col gap-5 mt-5'>
                <div className='flex gap-3'>
                    <label htmlFor="name" className=''>Evaluated By  :</label>
                    <p>Saji</p>
                </div>
                <div className='flex gap-3'>
                    <label htmlFor="name" className='w-50'>Number of Goal Assigned  :</label>
                    <p>10</p>
                </div>
                <div className='flex gap-3'>
                    <label className='' htmlFor="name">Total % Gained  :</label>
                    <p>90%</p>
                </div>
            </form>

            {/*  Buttons */}
            <div className="flex gap-5 justify-center pt-5">
                <button className="rounded-sm py-1 bg-[#ffe4e6] px-5 flex gap-1 items-center">
                    {/* <CiEdit style={{ fontSize: "20px" }} /> */}
                    <span>Save as Draft</span>
                </button>
                <button
                    type="button"
                    className="rounded-sm py-1 text-white bg-[#972e26] px-5"
                >
                    Submit
                </button>

            </div>
        </div>
    );
}

export default Evaluation;
