import { Link } from "react-router";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function MyTasks() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-2">
      {/* <!-- Metric Item Start --> */}
      <Link to="/tasks">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4 cursor-pointer">
        {/* <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div> */}

        <div className="flex items-end justify-between  gap-2">
          <h3>My Tasks</h3>
          <h3 className="rounded-2xl px-2 py-1 bg-[#ffe4e6]">Total : 8</h3>
        </div>


        <div className="grid grid-cols-2 justify-between text-center mt-5 gap-2">
          <div className="border px-2 rounded-2xl  py-2 cursor-pointer">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Open
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              9
            </h4>
            <p className="text-xs">9 Tasks : <span className="text-red-500 font-bold">30+ days overdue</span></p>
          </div>

          <div className="border px-2 rounded-2xl text-center py-2 cursor-pointer">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              In Progress
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              1
            </h4>
            <p className="text-xs">1 Tasks : <span className="text-red-500 font-bold">30+ days overdue</span></p>
          </div>


          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>

        <div className="grid grid-cols-2 gap-2 items-end text-center justify-between mt-5">
          <div className="border rounded-xl px-10 py-2 cursor-pointer" >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Completed
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              0
            </h4>
          </div>

          <div className="border rounded-2xl px-10 py-2 cursor-pointer">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Canceled
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              0
            </h4>
          </div>


          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>

      </div>
      </Link>
    
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <Link to="/Createdbyme">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4 cursor-pointer">
        {/* <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div> */}
         <div className="flex items-end justify-between  gap-2">
          <h3>Created By Me</h3>
          <h3 className="rounded-2xl px-2 py-1 bg-[#ffe4e6]">Total : 8</h3>
        </div>

        <div className="grid grid-cols-2 gap-2 justify-between mt-5 gap-2">
          <div className="border px-1 rounded-2xl text-center py-2 cursor-pointer">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Open
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              8
            </h4>
            <p className="text-xs">1 Task : <span className="text-red-500 font-bold">1-10 days overdue</span></p>
          </div>

          <div className="border px-2 rounded-2xl text-center py-2 cursor-pointer">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              In Progress
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              0
            </h4>
            <p className="text-xs">1 Tasks : <span className="text-red-500 font-bold">30+ days overdue</span></p>
          </div>


          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>

        <div className="grid grid-cols-2 gap-2 items-end justify-between text-center mt-5">
          <div className="border rounded-xl px-10  py-2 cursor-pointer" >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Completed
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              0
            </h4>
          </div>

          <div className="border rounded-2xl px-10 py-2  cursor-pointer">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Canceled
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              0
            </h4>
          </div>


          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>

      </div>
      </Link>
    
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
