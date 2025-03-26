// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { icons } from "@/constant";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { menuSidebar } from "@/app/data/menuSidebar";

export default function Sidebar() {
  const pathname = usePathname();

  // สถานะสำหรับ dropdown และขนาด Sidebar
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // ตรวจสอบว่า active ในหมวดที่มี dropdown หรือไม่
  const isActiveDropdown = (dropdownlist: { part: string }[] = []) => {
    return dropdownlist.some((item) => pathname === item.part); // เปลี่ยนจาก startsWith เป็น ===
  };

  // อัพเดตสถานะ dropdown เมื่อ pathname เปลี่ยน
  useEffect(() => {
    const activeMenu = menuSidebar.find(
      (menu) => menu.dropdownlist && isActiveDropdown(menu.dropdownlist)
    );
    setOpenDropdown(activeMenu ? activeMenu.name : null);
  }, [pathname]);

  // ตรวจสอบขนาดหน้าจอและอัพเดตสถานะ Sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants สำหรับ Sidebar
  const sidebarVariants = {
    expanded: {
      width: 256,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    collapsed: {
      width: 64,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Animation variants สำหรับ dropdown
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <>
      <motion.aside
        initial={isExpanded ? "expanded" : "collapsed"}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        className="bg-gray-800 text-white p-4 min-h-screen text-[12px] fixed top-0 left-0 z-50"
      >
        <div className="text-2xl font-bold mb-6 hidden md:block">
          Admin Panel
        </div>
        <nav className="space-y-2">
          {menuSidebar.map((menu) => {
            // ตรวจสอบ active state
            const isActive =
              (menu.href && pathname === menu.href) || // เมนูหลัก
              (menu.dropdownlist && isActiveDropdown(menu.dropdownlist)); // เมนู dropdown
            const isOpen = openDropdown === menu.name;

            return (
              <div
                key={menu.name}
                className={` ${
                  isActive
                    ? "border-l-2 rounded-t-sm rounded-b-sm border-gray-100"
                    : "border-none"
                }`}
              >
                {menu.dropdownlist ? (
                  // เมนูที่มี Dropdown
                  <div>
                    <div className={`relative`}>
                      <button
                        onClick={() =>
                          setOpenDropdown(isOpen ? null : menu.name)
                        }
                        className={`w-full text-left py-2 px-2 rounded-lg transition-colors flex items-center justify-between ${
                          isActive
                            ? "bg-gray-900 text-white"
                            : "hover:bg-gray-700"
                        }`}
                        data-tooltip-id="sidebar-tooltip"
                        data-tooltip-content={
                          isExpanded ? undefined : menu.name
                        }
                        data-tooltip-place="right"
                      >
                        <div className="flex items-center">
                          <Image
                            src={icons[menu.icon as keyof typeof icons]}
                            alt={menu.name}
                            width={20}
                            priority
                          />
                          <span className="ml-2 hidden md:block">
                            {menu.name}
                          </span>
                        </div>
                        <span className="hidden md:block">
                          {isOpen ? "▲" : "▼"}
                        </span>
                      </button>
                    </div>

                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate={isOpen ? "visible" : "hidden"}
                      className="space-y-2 mt-0 overflow-hidden pl-0 md:pl-0"
                    >
                      {menu.dropdownlist.map((subMenu) => (
                        <div key={subMenu.name} className="relative">
                          <Link
                            href={subMenu.part}
                            className={`flex items-center  mt-2 py-2 px-2 rounded-lg transition-colors ${
                              pathname === subMenu.part
                                ? "bg-gray-900 text-white"
                                : "hover:bg-gray-600"
                            }`}
                            data-tooltip-id="sidebar-tooltip"
                            data-tooltip-content={
                              isExpanded ? undefined : subMenu.name
                            }
                            data-tooltip-place="right"
                          >
                            <Image
                              src={icons[subMenu.icon as keyof typeof icons]}
                              alt={subMenu.name}
                              width={20}
                              priority
                            />
                            <span className="ml-2 hidden md:block">
                              {subMenu.name}
                            </span>
                          </Link>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                ) : (
                  // เมนูปกติ (ไม่มี Dropdown)
                  <div className="relative">
                    <Link
                      href={menu.href || "#"}
                      className={`flex items-center py-2 px-2 rounded-lg transition-colors ${
                        pathname === menu.href
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-700"
                      }`}
                      data-tooltip-id="sidebar-tooltip"
                      data-tooltip-content={isExpanded ? undefined : menu.name}
                      data-tooltip-place="right"
                    >
                      <Image
                        src={icons[menu.icon as keyof typeof icons]}
                        alt={menu.name}
                        width={20}
                        priority
                      />
                      <span className="ml-2 hidden md:block">{menu.name}</span>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </motion.aside>

      <Tooltip
        id="sidebar-tooltip"
        className="bg-gray-900 text-white text-sm px-2 py-1 rounded z-50"
      />
    </>
  );
}
