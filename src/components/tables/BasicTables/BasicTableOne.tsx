import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { CiEdit } from "react-icons/ci";

import Badge from "../../ui/badge/Badge";

interface Order {
  id: number;
  task: string;
  duedate: string;
  status: string;
  createdby:string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    task: "Production Server Backup",
    duedate: "09 May 2025",
    createdby: "Saji Jose",
    status: "In Progress",
  },
  {
    id: 2,
    task: "UAT Bachup setup",
    duedate: "09 May 2025",
     createdby: "Saji Jose",
    status: "Open",
  },
  {
    id: 3,
    task: "Production Service Setup",
    duedate: "09 May 2025",
     createdby: "Saji Jose",
    status: "Open",
  },
  {
    id: 4,
    task: "Complete Current Tickets and API Testing",
    duedate: "09 May 2025",
     createdby: "Saji Jose",
    status: "In Progress",
  },
  {
    id: 5,
   task: "Send Mail On Bug Development",
    duedate: "09 May 2025",
     createdby: "Saji Jose",
    status: "In Progress",
  },
];

export default function BasicTableOne() {

  const handleRowClick =()=>{
    
  }
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table className="">
          {/* Table Header */}
          <TableHeader className="border-b  border-gray-100 dark:border-white/[0.05] text-center">

            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500  text-theme-sm dark:text-gray-400"
              >
                #
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500  text-theme-sm dark:text-gray-400"
              >
                Task
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500  text-theme-sm dark:text-gray-400"
              >
                Due Date / Revised
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500  text-theme-sm dark:text-gray-400"
              >
                Created By
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500  text-theme-sm dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500  text-theme-sm dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y  text-center  divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((order) => (
              <TableRow key={order.id} >
                <TableCell className="px-5 py-4 sm:px-6 ">
                  <p>{order.id}</p>
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start"> 
                      <p>{order.task}</p>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500  text-theme-sm dark:text-gray-400">
                  {order.duedate}
                </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500  text-theme-sm dark:text-gray-400">
                  {order.createdby}
                </TableCell>
               
                <TableCell className=" py-3 text-gray-500  text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      order.status === "Open"
                        ? "success"
                        : order.status === "Pending"
                          ? "error"
                          : "warning"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="pl-12  py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <CiEdit style={{fontSize:"23px"}}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
