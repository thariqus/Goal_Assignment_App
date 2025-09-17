import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'

function CategoryPage() {
  return (
       <div className=''>

            <form action="" className='border h-full flex flex-col gap-5 rounded-lg bg-white px-6 py-10 '>
                <h1 className='text-xl font-medium pb-5'>Add Categories</h1>
                <div className='flex gap-7'>
                    <label htmlFor="name">Code: </label>
                    <input type="text" placeholder='Enter Code' className='py-1 focus:outline-none border w-50 px-2 rounded-sm' />

                </div>
                <div className='flex gap-6'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" placeholder='Enter Name' className='py-1 focus:outline-none border w-100 px-2 rounded-sm' />

                </div>

                {/* Buttons */}
                <div className='flex gap-5 justify-center pt-15'>
                    <button type='button' className='border rounded-sm py-1 text-white bg-[#972e26] px-25'>Submit</button>
                    {/* <button type='button' className='border rounded-sm py-1 px-5 bg-gray-100 flex gap-1 items-center'><MdDeleteOutline style={{ fontSize: "20px" }} /> <span>Delete</span></button> */}
                    {/* <button  className='border rounded-sm py-1  bg-[#ffe4e6] px-5 flex gap-1 items-center'><CiEdit style={{ fontSize: "20px" }} /> <span >Edit</span> </button> */}
                </div>

            </form>

        </div>
  )
}

export default CategoryPage
