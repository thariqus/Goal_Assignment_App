import React, { useEffect, useState } from 'react'
import { CiEdit, CiSearch } from 'react-icons/ci';
import { IoIosArrowDown, IoIosArrowRoundDown } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import GoalAssignmentTable from '../components/tables/BasicTables/GoalAssignmentTable';
import { IoAddSharp, IoArrowForwardOutline } from 'react-icons/io5';
import { FaRegCopy } from 'react-icons/fa';
import { Link } from 'react-router';
import { useNavigate } from "react-router-dom";

interface Goal {
    id: number;
    name: string;
    status: string;
}
interface Tablevalues {
    id: number;
    name: string;
    weightage: number;
    details: string;
}
const employees = ["Tharique", "Adhil", "Aisha", "Meera"];



function EvaluationTemplate() {
    const navigate = useNavigate();
    const [datas] = useState<Tablevalues[]>([
        {
            id: 1,
            name: "Website Redesign",
            weightage: 120,
            details:
                "Redesign the corporate website with a modern UI, improved navigation, and mobile responsiveness. The project includes updating brand colors, optimizing page speed, and implementing accessibility best practices to increase user engagement and conversion rates.",
        },
        {
            id: 2,
            name: "Attend at least 2 tech conferences or workshops this year",
            weightage: 100,
            details:
                "Participate in industry-leading events such as React Summit or UX India to gain insights into new frameworks, design systems, and best practices. Networking with professionals and attending workshops will help in staying up-to-date with modern technologies.",
        },
        {
            id: 3,
            name: "Conduct weekly code reviews to mentor junior developers",
            weightage: 100,
            details:
                "Establish a structured code review process every Friday to improve code quality and share knowledge with junior team members. Provide feedback on coding standards, design patterns, and performance optimization while encouraging best practices.",
        },
        {
            id: 4,
            name: "Improve Unit Test Coverage",
            weightage: 100,
            details:
                "Increase the unit test coverage of the project from 40% to 80% within the next quarter. This includes writing test cases for critical modules, integrating Jest/React Testing Library, and automating testing pipelines for CI/CD.",
        },
        {
            id: 5,
            name: "Optimize Database Queries",
            weightage: 100,
            details:
                "Review and refactor inefficient SQL queries, add missing indexes, and implement caching strategies. The goal is to reduce API response times by at least 30% and improve overall system performance under high load.",
        },
    ]);

    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedTitle, setSelectedTitle] = useState<string>("Select Title");
    const [selectedEmployee, setSelectedEmployee] = useState<string>("Select Employee");
    const [searchEmployee, setSearchEmployee] = useState("");
    const [openEmployeeSideBox, setOpenEmployeeSidebox] = useState<boolean>(false);

    const toggleDropdown = (dropdownName: string) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };



    //  Close dropdown when clicking outside
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

    const handleSideBox = () => {
        setOpenEmployeeSidebox(!openEmployeeSideBox)
    }


    return (
        <div className='border h-full flex flex-col gap-5 rounded-lg bg-white px-6 py-10'>

            <form action="" className=' h-full flex flex-col gap-5  bg-white  relative'>
                <h1 className='text-xl font-medium pb-5'>Evaluation</h1>
                <div className='flex gap-14'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" placeholder='Enter Name' className='py-1 focus:outline-none border w-130 px-2 rounded-sm' />

                </div>
                {/* Employee dropdown */}
                <div className='flex gap-5'>
                    <div className="relative dropdown-container">
                        <div className="flex gap-7">
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
                    <button type='button' className='bg-[#972E26] text-white text-sm px-2 rounded-md' onClick={handleSideBox}>{openEmployeeSideBox ? "Hide Box" : "Show My Child"}</button>

                    {/* EmployeeSideBox  */}

                    {
                        openEmployeeSideBox && (
                            <div className='absolute top-15 flex flex-col gap-4 right-0 bg-gray-100 px-5 w-100 py-8 rounded-md'>
                                <div className='flex gap-4'>
                                    <input type="checkbox" />
                                    <p>Tharique</p>
                                </div>
                                 <div className='flex gap-4'>
                                    <input type="checkbox" />
                                    <p>Adhil</p>
                                </div>
                                 <div className='flex gap-4'>
                                    <input type="checkbox" />
                                    <p>Saji</p>
                                </div>
                                 <div className='flex gap-4'>
                                    <input type="checkbox" />
                                    <p>Sali</p>
                                </div>
                            </div>
                        )
                    }
                </div>


               


                <div className='flex gap-12'>
                    <label htmlFor="name">Status:</label>
                    <div className='flex gap-7 items-center'>

                        <button type='button' className=' flex gap-3'>
                            <input type="radio" />
                            <span>Active</span>
                        </button>
                        <button type='button' className=' flex gap-3'>
                            <input type="radio" />
                            <span>Inactive</span>
                        </button>
                    </div>
                </div>

            </form>





            <div className="overflow-hidden w-full rounded-xl border border-gray-200 mt-5 bg-white">
                {/* Search Bar */}
                <div className="flex items-center border w-270 rounded-lg m-2 px-5 py-1 gap-1">
                    <CiSearch style={{ fontSize: "18px", color: "gray" }} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="focus:outline-none w-full"
                        placeholder="Search Goal Title..."
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
                                <th className="px-4 py-3 w-100 font-medium text-gray-500">Title</th>
                                <th className="px-4 py-3 font-medium text-gray-500">weightage</th>
                                <th className="px-4 py-3  w-[500px] font-medium text-gray-500">
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

                        <tbody className="divide-y divide-gray-200">
                            {currentRows.map((value) => (
                                <tr key={value.id} className="hover:bg-gray-50 border-b">
                                    <td className="px-2 py-3 text-center">{value.id}</td>
                                    <td className="px-2 py-3 text-center">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-4  py-3 text-gray-700">{value.name}</td>
                                    <td className="px-4 py-3 text-gray-700">{value.weightage}</td>
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

            <div className='flex gap-10'>
                <label htmlFor="name">Remark:</label>
                <textarea placeholder='Enter Remark' className='py-1 focus:outline-none border w-130 h-20 px-2 rounded-sm' />

            </div>

            {/* Buttons */}
            <div className='flex gap-5 justify-center pt-10'>


                <button type='button' className=' rounded-sm py-1 text-white bg-[#972e26] px-5'>Save</button>

                <button className=' rounded-sm py-1  bg-[#ffe4e6] px-5 flex gap-1 items-center'>
                    <CiEdit style={{ fontSize: "20px" }} />
                    <span >Edit</span>
                </button>

            </div>



        </div>
    )

}

export default EvaluationTemplate;
