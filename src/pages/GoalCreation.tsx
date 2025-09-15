import React, { useState, useEffect } from "react";
import { CiEdit, CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router";

function GoalCreation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [questionName, setQuestionName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<
    { questionName: string; description: string }[]
  >([]);

  const [selectedStatus, setSelectedStatus] =
    useState<string>("Select Status");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Select Category");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // close dropdown on outside click
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

  const statuses = ["Open", "In Progress", "Cancelled", "Completed", "Closed"];
  const categories = [
    "Performance",
    "Learning & Development",
    "Teamwork",
    "Productivity",
    "Innovation",
    "Customer Satisfaction",
  ];

  return (
    <div>
      <form className="border h-full flex flex-col gap-5 rounded-lg bg-white px-6 py-10 ">
        <h1 className="text-xl font-medium pb-5">Goal Creation</h1>

        <div className="flex gap-15">
          <label htmlFor="name">Title:</label>
          <input
            type="text"
            value={questionName}
            onChange={(e) => setQuestionName(e.target.value)}
            placeholder="Enter goal title"
            className="py-1 focus:outline-none border w-full px-2 rounded-sm"
          />
        </div>

        <div className="flex gap-3">
          <label htmlFor="description">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border h-28 rounded-sm px-3 py-1 w-full focus:outline-none"
            placeholder="Enter Description"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative dropdown-container">
          <div className="flex gap-12">
            <label>Status:</label>
            <div>
              <button
                type="button"
                className="flex items-center gap-2 border bg-white rounded-md py-1 px-3"
                onClick={() => toggleDropdown("status")}
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

              {openDropdown === "status" && (
                <div className="absolute left-25 mt-1 w-48 border rounded-md shadow-sm bg-white z-[1000]">
                  {/* search input */}
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
                    {statuses
                      .filter((status) =>
                        status.toLowerCase().includes(searchStatus.toLowerCase())
                      )
                      .map((status, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            setSelectedStatus(status);
                            setOpenDropdown(null);
                            setSearchStatus("");
                          }}
                        >
                          {status}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Drlopdown */}
        <div className="relative dropdown-container">
          <div className="flex gap-7">
            <label>Category:</label>
            <div>
              <button
                type="button"
                className="flex items-center gap-2 border bg-white rounded-md py-1 px-4"
                onClick={() => toggleDropdown("category")}
              >
                <span
                  className={
                    selectedCategory === "Select Category"
                      ? "text-gray-400"
                      : "text-black"
                  }
                >
                  {selectedCategory}
                </span>
                <IoIosArrowDown style={{ color: "gray" }} />
              </button>

              {openDropdown === "category" && (
                <div className="absolute left-25 mt-1 w-64 border rounded-md shadow-sm bg-white z-[1000]">
                  <div className="flex items-center border-b px-2 py-2">
                    <CiSearch style={{ fontSize: "20px", color: "grey" }} />
                    <input
                      type="text"
                      placeholder="Search Category..."
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      className="w-full px-2 outline-none"
                    />
                  </div>
                  <ul className="font-normal max-h-40 overflow-y-auto">
                    {categories
                      .filter((category) =>
                        category
                          .toLowerCase()
                          .includes(searchCategory.toLowerCase())
                      )
                      .map((category, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            setSelectedCategory(category);
                            setOpenDropdown(null);
                            setSearchCategory("");
                          }}
                        >
                          {category}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-center mt-10">
          <button className="rounded-sm py-1 text-white bg-[#972e26] px-5">
            Submit
          </button>
          <button className="rounded-sm py-1 px-5 bg-gray-100 flex gap-1 items-center">
            <MdDeleteOutline style={{ fontSize: "20px" }} /> <span>Delete</span>
          </button>
          <button className="border rounded-sm py-1 bg-[#ffe4e6] px-5 flex gap-1 items-center">
            <CiEdit style={{ fontSize: "20px" }} /> <span>Edit</span>
          </button>
        </div>

        <button
          type="button"
          className=" hover:bg-[#972e26] hover:text-white rounded-lg w-100 py-2 mx-auto my-3"
        >
          <Link
            to="/evaluationtemplate"
            className="flex gap-2 items-center justify-center"
          >
            <span>Go To Evaluation Template Creation</span>{" "}
            <IoArrowForwardOutline />
          </Link>
        </button>
      </form>
    </div>
  );
}

export default GoalCreation;
