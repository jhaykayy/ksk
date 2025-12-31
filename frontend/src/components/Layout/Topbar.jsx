import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div
      className="
        text-white
        bg-orange-700
      "
    >
      <div
        className="
          container flex
          mx-auto py-3 px-4
          justify-between items-center
        "
      >
        <div
          className="
            hidden
            space-x-4
            items-center
            md:flex
          "
        >
          <a
            href="#"
            className="
              hover:text-gray-300
            "
          >
            <TbBrandMeta
              className="
                h-5 w-5
              "
            />
          </a>

          <a
            href="#"
            className="
              hover:text-gray-300
            "
          >
            <IoLogoInstagram
              className="
                h-5 w-5
              "
            />
          </a>

          <a
            href="#"
            className="
              hover:text-gray-300
            "
          >
            <RiTwitterXLine
              className="
                h-4 w-4
              "
            />
          </a>
        </div>
        <div
          className="
            text-sm text-center
            grow
          "
        >
          <span>We Ship worldwide - Fast and reliable Shipping!</span>
        </div>
        <div
          className="
            hidden
            text-sm
            md:block
          "
        >
          <a
            href="te: +1(708)334-9494"
            className="
              hover:text-gray-300
            "
          >
            +1 (708) 334-9494
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
