import React, { useState, useEffect } from "react";
import { CiEdit, CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import ReactDOM from "react-dom";
import { FaRegCopy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import Pagination from "../components/Pagination";

interface TableValues {
  id: string;
  name: string;
}

function AssignEmployee() {
  const [rows, setRows] = useState<TableValues[]>([
    { id: "1", name: "" },
    { id: "2", name: "" },
  ]);

  const [openDropdownTable, setOpenDropdownTable] = useState<{
    type: "employee" | "goal" | null;
    rowId: string | null;
    pos: { top: number; left: number } | null;
  }>({ type: null, rowId: null, pos: null });

  const [selectedGoal, setSelectedGoal] = useState<{ [key: string]: string }>(
    {}
  );
  const [selectedEmployee, setSelectedEmployee] = useState<{
    [key: string]: string;
  }>({});


  const [selectedStatus, setSelectedStatus] = useState("Select Status");
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [searchGoal, setSearchGoal] = useState<{ [key: string]: string }>({});
  const [searchEmployee, setSearchEmployee] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [searchStatus, setSearchStatus] = useState("");


  // Search 
  let filteredData = rows.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const toggleDropdown = (
    type: "employee" | "goal",
    rowId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (openDropdownTable.rowId === rowId && openDropdownTable.type === type) {
      setOpenDropdownTable({ type: null, rowId: null, pos: null });
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setOpenDropdownTable({
      type,
      rowId,
      pos: { top: rect.bottom + window.scrollY, left: rect.left + window.scrollX },
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setOpenDropdownTable({ type: null, rowId: null, pos: null });
        setOpenStatusDropdown(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="border h-full flex flex-col gap-5 rounded-lg bg-white px-6 py-10">
      <h1 className="text-xl font-medium pb-5">Employee Assignment</h1>
      <form className="h-full flex flex-col gap-5 bg-white px-6">
        <div className="flex gap-10">
          <label htmlFor="from">From:</label>
          <input
            type="text"
            id="from"
            className="py-1 focus:outline-none border w-100 px-2 rounded-sm"
          />
        </div>

        <div className="flex gap-15">
          <label htmlFor="to">To:</label>
          <input
            type="text"
            id="to"
            className="py-1 focus:outline-none border w-100 px-2 rounded-sm"
          />
        </div>

        {/* Status dropdown */}
        <div className="relative dropdown-container">
          <div className="flex gap-8">
            <label>Status:</label>
            <div>
              <button
                type="button"
                className="flex items-center gap-2 border bg-white rounded-md py-1 px-3"
                onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
              >
                <span
                  className={
                    selectedStatus === "Select Status"
                      ? "text-gray-400"
                      : "text-black"
                  }
                >
                  {selectedStatus}
                </span>
                <IoIosArrowDown style={{ color: "gray" }} />
              </button>

              {openStatusDropdown && (
                <div className="absolute left-30 mt-1 w-48 border rounded-md shadow-sm bg-white z-[1000]">
                  {/* Search inside dropdown */}
                  <div className="flex items-center border-b px-2 py-2">
                    <CiSearch style={{ fontSize: "20px", color: "grey" }} />
                    <input
                      type="text"
                      placeholder="Search Status..."
                      value={searchStatus}
                      onChange={(e) => setSearchStatus(e.target.value)}
                      className="w-full px-2 outline-none"
                    />
                  </div>
                  <ul className="font-normal max-h-40 overflow-y-auto">
                    {["Open", "In Progress", "Cancelled", "Completed", "Closed"]
                      .filter((status) =>
                        status.toLowerCase().includes(searchStatus.toLowerCase())
                      )
                      .map((item) => (
                        <li
                          key={item}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            setSelectedStatus(item);
                            setSearchStatus("");
                            setOpenStatusDropdown(false);
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

      </form>

      {/* Table */}
      <div className="my-5">
        <div className="border rounded-lg w-full overflow-x-auto">
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
          <table className="w-full text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="px-5 py-3 font-medium w-10">#</th>
                <th className="px-5 py-3 font-medium w-400">Goal</th>
                <th className="px-5 py-3 font-medium w-300">Employee</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="px-5 py-4">{row.id}</td>

                  {/* Goal Dropdown */}
                  <td className="px-5 py-4">
                    <button
                      className={`flex items-center gap-2 border bg-white rounded-md py-1 px-3 dropdown-container ${!selectedGoal[row.id] ? "text-gray-400" : "text-black"
                        }`}
                      onClick={(e) => toggleDropdown("goal", row.id, e)}
                    >
                      {selectedGoal[row.id] || "Select Goal"}
                      <IoIosArrowDown style={{ color: "gray" }} />
                    </button>
                  </td>

                  {/* Employee Dropdown */}
                  <td className="px-5 py-4">
                    <button
                      className={`flex items-center gap-2 border bg-white rounded-md py-1 px-3 dropdown-container ${!selectedEmployee[row.id] ? "text-gray-400" : "text-black"
                        }`}
                      onClick={(e) => toggleDropdown("employee", row.id, e)}
                    >
                      {selectedEmployee[row.id] || "Select Employee"}
                      <IoIosArrowDown style={{ color: "gray" }} />
                    </button>
                  </td>

                  {openDropdownTable.rowId === row.id &&
                    openDropdownTable.pos &&
                    ReactDOM.createPortal(
                      <div
                        className="absolute w-48 border rounded-md shadow-sm bg-white z-50 dropdown-container"
                        style={{
                          top: openDropdownTable.pos.top,
                          left: openDropdownTable.pos.left,
                        }}
                      >
                        <div className="flex items-center border-b px-2 py-2">
                          <CiSearch style={{ fontSize: "20px", color: "grey" }} />
                          <input
                            type="text"
                            placeholder={`Search ${openDropdownTable.type}...`}
                            value={
                              openDropdownTable.type === "goal"
                                ? (searchGoal[row.id] || "")
                                : (searchEmployee[row.id] || "")
                            }
                            onChange={(e) => {
                              if (openDropdownTable.type === "goal") {
                                setSearchGoal((prev) => ({ ...prev, [row.id]: e.target.value }));
                              } else {
                                setSearchEmployee((prev) => ({
                                  ...prev,
                                  [row.id]: e.target.value,
                                }));
                              }
                            }}
                            className="w-full px-2 outline-none"
                          />
                        </div>
                        <ul className="font-normal">
                          {(
                            openDropdownTable.type === "goal"
                              ? ["Redesign Website", "Update UI", "Launch Campaign"].filter((item) =>
                                item
                                  .toLowerCase()
                                  .includes((searchGoal[row.id] || "").toLowerCase())
                              )
                              : ["Tharique", "Adhil", "Aisha"].filter((item) =>
                                item
                                  .toLowerCase()
                                  .includes((searchEmployee[row.id] || "").toLowerCase())
                              )
                          ).map((item) => (
                            <li
                              key={item}
                              className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
                              onClick={() => {
                                if (openDropdownTable.type === "goal") {
                                  setSelectedGoal((prev) => ({
                                    ...prev,
                                    [row.id]: item,
                                  }));
                                  setSearchGoal((prev) => ({ ...prev, [row.id]: "" }));
                                } else {
                                  setSelectedEmployee((prev) => ({
                                    ...prev,
                                    [row.id]: item,
                                  }));
                                  setSearchEmployee((prev) => ({ ...prev, [row.id]: "" }));
                                }
                                setOpenDropdownTable({ type: null, rowId: null, pos: null });
                              }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>,
                      document.body
                    )}

                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <Pagination
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      <hr />

      {/* Buttons */}
      <div className="flex gap-5 justify-center pt-15">
        <button
          type="button"
          className="border rounded-sm py-1 text-white bg-[#972e26] px-5"
        >
          Submit
        </button>
        <button
          type="button"
          className="rounded-sm py-1 px-5 bg-gray-100 flex gap-1 items-center"
        >
          <MdDeleteOutline style={{ fontSize: "20px" }} /> <span>Delete</span>
        </button>
        <button
          type="button"
          className=" rounded-sm py-1 bg-[#ffe4e6] px-5 flex gap-1 items-center"
        >
          <CiEdit style={{ fontSize: "20px" }} /> <span>Edit</span>
        </button>
        <button
          type="button"
          className=" rounded-sm py-1 bg-[#ffe4e6] px-5 flex gap-1 items-center"
        >
          <FaRegCopy style={{ fontSize: "20px" }} /> <span>Create Copy</span>
        </button>
      </div>
      <button
        type="button"
        className="hover:bg-[#972e26] hover:text-white rounded-lg w-100 py-2 mx-auto my-3"
      >
        <Link
          to="/goalassignment"
          className="flex gap-2 items-center justify-center"
        >
          <span>Go To Assignment</span>
          <IoArrowForwardOutline />{" "}
        </Link>
      </button>
    </div>
  );
}

export default AssignEmployee;
