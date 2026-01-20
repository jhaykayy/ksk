import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
  HiShoppingBag,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import logo from "../../assets/logo.png";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav
        className="
          container flex
          mx-auto py-4 px-6
          items-center justify-between
        "
      >
        {/*Left logo */}
        <Link
          to="/"
          className="
            flex
            items-center
          "
        >
          <img
            src={logo}
            alt="KSK Logo"
            className="
              h-10 w-auto
            "
          />
        </Link>

        {/* Center Navigation links */}
        <div
          className="
            hidden
            space-x-6
            md:flex
          "
        >
          <Link
            to="collections/all"
            className="
              text-gray-700 text-sm font-medium
              hover:text-black uppercase
            "
          >
            Shop
          </Link>
          <Link
            to="#"
            className="
              text-gray-700 text-sm font-medium
              hover:text-black uppercase
            "
          >
            About Us
          </Link>
          <Link
            to="#"
            className="
              text-gray-700 text-sm font-medium
              hover:text-black uppercase
            "
          >
            Gallery
          </Link>
          <Link
            to="#"
            className="
              text-gray-700 text-sm font-medium
              hover:text-black uppercase
            "
          >
            Contact Us
          </Link>
        </div>

        {/*Right Section */}
        <div
          className="
            flex
            space-x-4
            items-center
          "
        >
          <Link
            to="/admin"
            className="black bg-black px-2 rounded text-sm text-white"
          >
            Admin
          </Link>
          <Link
            to="/profile"
            className="
              hover:text-black
            "
          >
            <HiOutlineUser
              className="
                h-6 w-6
                text-gray-700
              "
            />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="
              relative hover:text-black
            "
          >
            <HiShoppingBag
              className="
                h-6 w-6
                text-gray-700
              "
            />
            <span
              className="
                px-2 py-0.5
                text-white text-xs
                bg-orange-900
                rounded-full
                absolute -top-1
              "
            >
              4
            </span>
          </button>

          {/* Search  */}

          <div
            className="
              overflow-hidden
            "
          >
            <SearchBar />
          </div>

          <button
            onClick={toggleNavDrawer}
            className="
              md:hidden
            "
          >
            <HiBars3BottomRight
              className="
                h-6 w-6
                text-gray-700
              "
            />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}

      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Shop
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              About Us
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Gallery
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
