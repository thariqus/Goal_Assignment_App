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
                <div className="relative dropdown-container">
                    <div className="flex gap-24">
                        <label>Title:</label>
                        <div>
                            <button
                                type="button"
                                className="flex items-center gap-2 border bg-white rounded-md py-1 px-3"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "title" ? null : "title")
                                }
                            >
                                <span
                                    className={
                                        selectedTitle === "Select Title"
                                            ? "text-gray-400"
                                            : "text-black"
                                    }
                                >
                                    {selectedTitle}
                                </span>
                                <IoIosArrowDown style={{ color: "gray" }} />
                            </button>

                            {openDropdown === "title" && (
                                <div className="absolute mt-1 w-94 border rounded-md shadow-sm bg-white z-[1000]">

                                    <div className="flex items-center border-b px-2 py-2">
                                        <CiSearch style={{ fontSize: "20px", color: "grey" }} />
                                        <input
                                            type="text"
                                            placeholder="Search Title..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full px-2 outline-none"
                                        />
                                    </div>

                                    <ul className="font-normal max-h-40 overflow-y-auto">
                                        {titleOptions
                                            .filter((item) =>
                                                item.name.toLowerCase().includes(search.toLowerCase())
                                            )
                                            .map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedTitle(item.name);
                                                        setOpenDropdown(null);
                                                        setSearch("");
                                                    }}
                                                >
                                                    {item.name}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-23">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        className="py-1 focus:outline-none border px-2 rounded-sm"
                    />
                </div>
                <div className="flex gap-11">
                    <label>Assigned To:</label>
                    <input
                        type="text"
                        className="py-1 focus:outline-none border px-2 rounded-sm w-100"
                    />
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
                <div className='flex gap-36'>
                    <label htmlFor="name" className=''>Evaluated By:</label>
                    <input type="text" placeholder='' className='py-1 focus:outline-none border w-100 px-2 rounded-sm' /> </div>
                <div className='flex gap-10'>
                    <label htmlFor="name" className='w-50'>Number of Goal Assigned:</label>
                    <input type="number" placeholder='' className='py-1 focus:outline-none border w-100 px-2 rounded-sm' /> </div>
                <div className='flex gap-34'>
                    <label className='' htmlFor="name">Total % Gained:</label>
                    <input type="text" placeholder='' className='py-1 focus:outline-none border w-100 px-2 rounded-sm' />
                </div>
            </form>

            {/*  Buttons */}
            <div className="flex gap-5 justify-center pt-5">
                <button
                    type="button"
                    className="rounded-sm py-1 text-white bg-[#972e26] px-5"
                >
                    Send For Approval
                </button>
                <button className="rounded-sm py-1 bg-[#ffe4e6] px-5 flex gap-1 items-center">
                    <CiEdit style={{ fontSize: "20px" }} />
                    <span>Enable Editing</span>
                </button>
            </div>
        </div>
    );
}

export default Evaluation;
