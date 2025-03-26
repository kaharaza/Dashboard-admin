import React from "react";
import { motion } from "framer-motion";

interface AlertMessageProps {
  message: string;
  onClose: () => void;
  variant?: "error" | "success" | "warning" | "info"; // เพิ่ม variant เพื่อความยืดหยุ่น
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  onClose,
  variant = "error",
}) => {
  // กำหนดสีตาม variant
  const variantStyles = {
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`${variantStyles[variant]} border rounded-lg shadow-md px-6 py-4 relative w-full mx-auto my-2`}
      role="alert"
    >
      {/* ไอคอนตาม variant */}
      <div className="flex items-start">
        <div className="mr-3">
          {variant === "error" && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {variant === "success" && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {/* สามารถเพิ่มไอคอนสำหรับ warning และ info ได้ */}
        </div>

        {/* ข้อความ */}
        <span className="block text-sm font-medium">{message}</span>
      </div>

      {/* ปุ่มปิด */}
      <button
        onClick={onClose}
        className="absolute top-3 right-2 p-1 rounded-full hover:bg-gray-200/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-label="Close alert"
      >
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </motion.div>
  );
};


