import React from "react";
import { CiSearch } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { RiCompassFill, RiArrowDropDownFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { AiFillMessage, AiFillHeart } from "react-icons/ai";
import { BsBookmarkDashFill } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { BiSolidUser } from "react-icons/bi";
const Navbar = () => {
  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Social Media Logo */}
          <div className="flex items-center">
            <span className="self-center text-2xl font-bold whitespace-nowrap text-orange-500">
              Pansos.
            </span>
          </div>
          {/* PAGE CONTENTS  */}
          <div className="flex space-x-4 items-center">
            <GoHomeFill className=" h-6 w-6 text-slate-300 hover:p-1 md:hover:h-8 md:w-8  md:hover:p-2 hover:bg-orange-500 hover:rounded hover:text-white hover:transition-all" />
            <RiCompassFill className="h-6 w-6 text-slate-300 hover:p-1  md:hover:h-8 md:w-8 md:hover:p-2 hover:bg-orange-500 hover:rounded hover:text-white hover:transition-all" />
            <div class="flex items-center cursor-pointer">
              <span class="">
                {" "}
                <FaUsers className="h-6 w-6 text-slate-300 hover:p-1  md:hover:h-8 md:w-8 md:hover:p-2 hover:bg-orange-500 hover:rounded hover:text-white hover:transition-all" />
              </span>
              <div class="h-2 w-2 bg-red-600 rounded-full border-2 border-white relative -top-2 -left-2"></div>
            </div>
            <div class="flex items-center cursor-pointer">
              <span class="">
                {" "}
                <AiFillMessage className="h-6 w-6 text-slate-300 hover:p-1  md:hover:h-8 md:w-8 md:hover:p-2 hover:bg-orange-500 hover:rounded hover:text-white hover:transition-all" />
              </span>
              <div class="h-2 w-2 bg-red-600 rounded-full border-2 border-white relative -top-2 -left-3"></div>
            </div>
            <AiFillHeart className="h-6 w-6 text-slate-300 hover:p-1  md:hover:h-8 md:w-8 md:hover:p-2 hover:bg-orange-500 hover:rounded hover:text-white hover:transition-all" />
          </div>
          {/* Search bar  */}
          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 rounded-lg text-sm p-2.5 mr-1"
            >
              <CiSearch className="w-6 h-6 text-gray-500" />
            </button>
            <div className="relative hidden md:block">
              <input
                type="text"
                id="search-navbar"
                className="block w-full pl-2 md:pr:-32 lg:pr-40 py-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 flex items-center right-4 pointer-events-none">
                <CiSearch className="w-6 h-6 text-gray-500" />
              </div>
            </div>
            {/* User bookmark bell-icon and avatar */}
            <div className="flex items-center space-x-4 pl-2">
              <BsBookmarkDashFill className=" h-6 w-6 p-1 md:h-8 md:w-8  md:p-2 bg-slate-300 rounded" />
              {/* <IoNotifications className=" h-6 w-6 p-1 md:h-8 md:w-8  md:p-2  bg-slate-300 rounded " /> */}
              <div class="flex items-center cursor-pointer">
                <span class="">
                  {" "}
                  <IoNotifications className=" h-6 w-6 p-1 md:h-8 md:w-8  md:p-2  bg-slate-300 rounded " />
                </span>
                <div class="h-2 w-2 bg-red-600 rounded-full border-2 border-white relative -top-1 -left-4"></div>
              </div>
              <BiSolidUser className="h-6 w-6 p-1 md:h-8 md:w-8  md:p-2  bg-orange-500 rounded outline outline-2 outline-red-500/50 " />
              <p className="self-center text-lg  whitespace-nowrap">Kemito</p>
              <RiArrowDropDownFill className="h-6 w-6" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
