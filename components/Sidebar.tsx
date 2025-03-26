"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { icons } from "@/constant";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  // ตรวจสอบว่า active ในหมวด "การเงินและพัสดุ" หรือไม่
  const isFinanceActive =
    pathname.startsWith("/dashboard/qr-code") || pathname === "#";

  // สถานะสำหรับ dropdown และขนาด Sidebar
  const [isFinanceOpen, setIsFinanceOpen] = useState(isFinanceActive);
  const [isExpanded, setIsExpanded] = useState<boolean>(
    typeof window !== "undefined" && window.innerWidth >= 768
  );

  // อัพเดตสถานะเมื่อ pathname เปลี่ยน
  useEffect(() => {
    setIsFinanceOpen(isFinanceActive);
  }, [pathname]);

  // ตรวจสอบขนาดหน้าจอและอัพเดตสถานะ Sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

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

  // Tooltip variants
  const tooltipVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.aside
      initial={isExpanded ? "expanded" : "collapsed"}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      className="bg-gray-800 text-white p-4 md:min-h-screen text-[12px] fixed h-full"
    >
      <div className="text-2xl font-bold mb-6 hidden md:block">Admin Panel</div>
      <nav className="space-y-2">
        {/* Dashboard */}
        <motion.div
          whileHover={!isExpanded ? "visible" : undefined}
          className="relative"
        >
          <Link
            href="/dashboard"
            className={`flex items-center py-2 px-2 rounded-lg transition-colors ${
              pathname === "/dashboard"
                ? "bg-gray-900 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            <Image src={icons.dashborad} alt="Dashboard" width={20} priority />
            <span className="ml-2 hidden md:block">Dashboard</span>
          </Link>
          {!isExpanded && (
            <motion.div
              initial="hidden"
              variants={tooltipVariants}
              className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded"
            >
              Dashboard
            </motion.div>
          )}
        </motion.div>

        {/* Dropdown: การเงินและพัสดุ */}
        <div>
          <motion.div
            whileHover={!isExpanded ? "visible" : undefined}
            className="relative"
          >
            <button
              onClick={() => setIsFinanceOpen(!isFinanceOpen)}
              className={`w-full text-left py-2 px-2 rounded-lg transition-colors flex items-center justify-between ${
                isFinanceActive ? "bg-gray-900 text-white" : "hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center">
                <Image src={icons.finance} alt="Finance" width={20} priority />
                <span className="ml-2 hidden md:block">การเงินและพัสดุ</span>
              </div>
              <span className="hidden md:block">
                {isFinanceOpen ? "▲" : "▼"}
              </span>
            </button>
            {!isExpanded && (
              <motion.div
                initial="hidden"
                variants={tooltipVariants}
                className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded"
              >
                การเงินและพัสดุ
              </motion.div>
            )}
          </motion.div>

          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate={isFinanceOpen ? "visible" : "hidden"}
            className="space-y-2 mt-2 overflow-hidden pl-0 md:pl-0"
          >
            <motion.div
              whileHover={!isExpanded ? "visible" : undefined}
              className="relative"
            >
              <Link
                href="/dashboard/qr-code"
                className={`flex items-center py-2 px-2 rounded-lg transition-colors ${
                  pathname === "/dashboard/qr-code"
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-600"
                }`}
              >
                <Image src={icons.qrcode} alt="QR Code" width={20} priority />
                <span className="ml-2 hidden md:block">QR Code</span>
              </Link>
              {!isExpanded && (
                <motion.div
                  initial="hidden"
                  variants={tooltipVariants}
                  className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded"
                >
                  QR Code
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Settings */}
        <motion.div
          whileHover={!isExpanded ? "visible" : undefined}
          className="relative"
        >
          <Link
            href="#"
            className={`flex items-center py-2 px-2 rounded-lg transition-colors ${
              pathname === "#" ? "bg-gray-900 text-white" : "hover:bg-gray-700"
            }`}
          >
            <Image src={icons.setting} alt="Settings" width={20} priority />
            <span className="ml-2 hidden md:block">Settings</span>
          </Link>
          {!isExpanded && (
            <motion.div
              initial="hidden"
              variants={tooltipVariants}
              className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded"
            >
              Settings
            </motion.div>
          )}
        </motion.div>
      </nav>
    </motion.aside>
  );
}
