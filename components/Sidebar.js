"use client";
import React from "react";

import { usePathname } from "next/navigation";

import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5 ">
      <div>
        <p className="text-white text-2xl font-black">RIJKSMUSEUM</p>
        <p className="text-gray-600 text-xl font-black mt-4">
          Prueba Paula Alzate
        </p>
      </div>

      <nav className="mt-5 list-none">
        <li className={pathname === "/user" ? "bg-blue-600 p-2" : "p-2"}>
          <Link href={"/user"} className="text-white  block">
            Perfil de Usuario
          </Link>
        </li>

        <li className={pathname === "/search" ? "bg-blue-600 p-2" : "p-2"}>
          <Link href={"/search"} className="text-white  block">
            Explora Rijks
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
