"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/login" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          {children}
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />

            <main className="sm:w-2/3 xl:w-full sm:min-h-screen p-5">
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
}
