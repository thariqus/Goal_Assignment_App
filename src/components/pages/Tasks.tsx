import React, { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BasicTables from "../../pages/Tables/BasicTables";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Modal } from "../ui/modal";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { MdOutlineTextFields } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

function Tasks() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [condition, setCondition] = useState<string>("<=");
  const [isModalOpen, setIsModalOpen] = useState<boolean | null>(false)
  const [isOn, setIsOn] = useState(false);
  const [disableAssigneeMail, setDisableAssigneeMail] = useState(false);
  const [disableAssignorMail, setDisableAssignorMail] = useState(false);

  const ModalTrigger = () => {
    setIsModalOpen(!isModalOpen);
  }

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div>
      <div className="flex flex-col gap-1 pb-5">
        <h2 className="text-2xl">Tasks</h2>
        <p>Tasks that you have created and are responsible for</p>
      </div>

      {/* Searchbar */}
      <div className="flex justify-between items-center">
        <form>
          <div className="relative">
            <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
              {/* Search Icon */}
              <svg
                className="fill-gray-500 dark:fill-gray-400"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search or type ..."
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
            />
          </div>
        </form>

        <button onClick={ModalTrigger} className="flex gap-2 items-center bg-[#972e26] px-3 py-1 rounded-md text-white"><span><IoAddSharp /></span> Create New Task</button>
      </div>

      {/* Dropdown Buttons */}
      <div className="flex gap-5 items-center mt-5">
        {/* Status */}
        <div className="relative">
          <button
            className="flex items-center gap-2 border bg-white rounded-md py-1 px-3"
            onClick={() => toggleDropdown("status")}
          >
            <span>Status</span>
            <IoIosArrowDown />
          </button>
          {openDropdown === "status" && (
            <div className="absolute left-0 mt-1 w-46 border rounded-md shadow-sm bg-white">
              <div className="flex items-center border-b px-2 py-2">
                <CiSearch style={{fontSize:"20px",color:"grey"}}/>
                <input
                  type="text"
                  placeholder="Search Status..."
                  className="w-full px-2 outline-none"
                />
              </div>
              <ul className="font-normal">
                <li className="px-10 py-2 hover:bg-gray-100 cursor-pointer">Open</li>
                <li className="px-10 py-2 hover:bg-gray-100 cursor-pointer">In Progress</li>
                <li className="px-10 py-2 hover:bg-gray-100 cursor-pointer">Cancelled</li>
                <li className="px-10 py-2 hover:bg-gray-100 cursor-pointer">Completed</li>
                <li className="px-10 py-2 hover:bg-gray-100 cursor-pointer">Closed</li>
              </ul>
            </div>
          )}
        </div>

        {/* Created By */}
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-white border rounded-md p-1"
            onClick={() => toggleDropdown("createdby")}
          >
           
            <span>Created By</span>
            <IoIosArrowDown />
          </button>
          {openDropdown === "createdby" && (
            <div className="absolute left-0 mt-1 w-46 rounded-md shadow-sm bg-white">
               <div className="flex items-center border-b px-2 py-2">
                <CiSearch style={{fontSize:"20px",color:"grey"}}/>
                <input
                  type="text"
                  placeholder="Search Status..."
                  className="w-full px-2 outline-none"
                />
              </div>
              <ul className="font-normal">
                <li className="px-10 py-2 hover:bg-gray-100 cursor-pointer">Saji Jose</li>
              </ul>
            </div>
          )}
        </div>

        {/* Due Date */}
        <div className="relative">
          <button
            className="flex items-center bg-white gap-2 border rounded-md p-1"
            onClick={() => toggleDropdown("duedate")}
          >
            <CiCalendar />
            <span>Due Date</span>
          </button>
          {openDropdown === "duedate" && (
            <div className="absolute mt-1 bg-white rounded-md shadow-lg p-3 z-50 w-72">
              {/* 🔽 Filter Select Box */}
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full mb-3 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="<=">Less than or equal to (≤)</option>
                <option value=">=">Greater than or equal to (≥)</option>
                <option value="<">Less than (&lt;)</option>
                <option value=">">Greater than (&gt;)</option>
                <option value="=">Equal (=)</option>
              </select>
              {/* 📅 Inline Calendar */}
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                inline
              />
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="relative">
          <button
            className="flex items-center gap-2 border rounded-md p-1"
            onClick={() => toggleDropdown("projects")}
          >
            <IoAddSharp />
            <span>Projects</span>
          </button>
          {openDropdown === "projects" && (
            <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg " aria-disabled>
              <ul>

              </ul>
            </div>
          )}
        </div>

        {/* Toogle */}
        <div className="flex items-center gap-2 cursor-pointer">
          {/* Toggle */}
          <div
            onClick={() => setIsOn(!isOn)}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isOn ? "bg-green-500" : "bg-gray-300"
              }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? "translate-x-6" : ""
                }`}
            ></div>
          </div>

          {/* Label */}
          <span className="font-medium text-gray-800">Private Tasks</span>
        </div>
      </div>

      {/* Table */}
      <BasicTables />


      {/* Modal */}
      {isModalOpen && (
        <div onClick={ModalTrigger} className="fixed inset-0 flex items-center justify-center bg-black/50 z-99999">
          <div onClick={(e) => e.stopPropagation()} style={{scrollbarWidth:"thin"}} className="bg-white w-200 h-[90vh] overflow-auto  rounded-md shadow-lg p-6 relative">
            <button onClick={ModalTrigger} className="absolute top-3 right-5 text-gray-600 hover:text-black text-xl">
              ✕
            </button>
            {/* Modal Content */}
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            <form className="flex flex-col gap-3">
              <label htmlFor="task name">Task Name</label>
              <input
                type="text"
                placeholder="Enter task name"
                className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-[#ffe4e6]"
                required />

              {/* Toogle */}
              <div className="flex items-center gap-2 cursor-pointer">
                {/* Toggle */}
                <div
                  onClick={() => setIsOn(!isOn)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${isOn ? "bg-green-500" : "bg-gray-300"
                    }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? "translate-x-6" : ""
                      }`}
                  ></div>
                </div>

                {/* Label */}
                <span className="font-medium text-gray-800">Private Tasks</span>
              </div>

              <div className="grid grid-cols-2  gap-6">
                <div className="flex flex-col">
                  <label htmlFor="bussiness">Bussiness</label>
                  <select className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-[#ffe4e6]" name="" id="" aria-placeholder="Select business">
                    <input type="text" placeholder="Search select business" />
                    <option className="" value="">Al Jaleeb</option>
                    <option value="">Al Basil</option>
                    <option value="">B&J Trading</option>
                    <option value="">Crosswell logistics</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="bussiness">Division</label>
                  <select className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-[#ffe4e6]" name="" id="" aria-placeholder="Select business division">
                    <input type="text" placeholder="Search select business" />
                    <option value="">Al Jaleeb</option>
                    <option value="">Al Basil</option>
                    <option value="">B&J Trading</option>
                    <option value="">Crosswell logistics</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2  gap-6">
                <div className="flex flex-col">
                  <label htmlFor="bussiness">Assigned To</label>
                  <select className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-[#ffe4e6]" name="" id="" aria-placeholder="Select business">
                    <input type="text" placeholder="Search sklect business" />
                    <option value="">Al Jaleeb</option>
                    <option value="">Al Basil</option>
                    <option value="">B&J Trading</option>
                    <option value="">Crosswell logistics</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="bussiness">Due Date</label>
                  <input type="date" placeholder="" />
                </div>
              </div>
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <label className="block font-medium mb-2">Description</label>
                  <div className="border rounded-md">
                    {/* Toolbar */}
                    <div className="flex items-center gap-3 border-b px-3 py-2 bg-gray-50">
                      <select className="border rounded px-1 text-sm">
                        <option>Normal</option>
                        <option>Heading</option>
                        <option>Subheading</option>
                      </select>
                      <button className="font-bold">B</button>
                      <button className="italic">I</button>
                      <button className="underline">U</button>
                      <button>🔗</button>
                      <button><MdOutlineFormatListNumbered /></button>
                      <button><MdFormatListBulleted /></button>
                      <button><MdOutlineTextFields /></button>
                    </div>

                    {/* Textarea */}
                    <textarea
                      placeholder="Enter task description"
                      className="w-full h-28 p-3 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <label className="block font-medium mb-2">Attachments</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50">
                    <IoCloudUploadOutline size={30} className="text-gray-400 mb-2" />
                    <p>
                      Drag your file(s) or{" "}
                      <span className="text-red-600 font-medium cursor-pointer">
                        browse
                      </span>
                    </p>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                  {/* Toggle 1 */}
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setDisableAssigneeMail(!disableAssigneeMail)}
                  >
                    <div
                      className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${disableAssigneeMail ? "bg-green-500" : "bg-gray-300"
                        }`}
                    >
                      <div
                        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${disableAssigneeMail ? "translate-x-6" : ""
                          }`}
                      ></div>
                    </div>
                    <span className="text-gray-600">
                      No Automated Email For Assignee
                    </span>
                  </div>

                  {/* Toggle 2 */}
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setDisableAssignorMail(!disableAssignorMail)}
                  >
                    <div
                      className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${disableAssignorMail ? "bg-green-500" : "bg-gray-300"
                        }`}
                    >
                      <div
                        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${disableAssignorMail ? "translate-x-6" : ""
                          }`}
                      ></div>
                    </div>
                    <span className="text-gray-600">
                      No Automated Email For Assignor
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="border rounded-sm ">Cancel</button>
                <button
                  type="submit"
                  className="bg-[#972e26] text-white py-2 rounded-md hover:bg-[#7a231d] transition"
                >
                  Save Task
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
