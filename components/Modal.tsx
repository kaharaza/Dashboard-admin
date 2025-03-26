import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean; // ควบคุมการเปิด/ปิด Modal
  onClose: () => void; // ฟังก์ชันสำหรับปิด Modal
  title?: string; // หัวข้อของ Modal (optional)
  children: React.ReactNode; // เนื้อหาภายใน Modal
}

interface ModalLoadingProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  progress: number; // ค่าเปอร์เซ็นต์ 0-100
  loadingText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null; // ไม่แสดง Modal ถ้า isOpen เป็น false

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative transform transition-all duration-300 scale-100">
        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
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

        {/* หัวข้อ */}
        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        )}

        {/* เนื้อหา */}
        <div className="text-gray-600">{children}</div>
      </div>
    </motion.div>
  );
};

export const ModalCard: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null; // ไม่แสดง Modal ถ้า isOpen เป็น false

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative transform transition-all duration-300 scale-100">
        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none hidden"
        >
          <svg
            className="w-6 h-6"
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

        {/* หัวข้อ */}
        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        )}

        {/* เนื้อหา */}
        <div className="text-gray-600 flex flex-col gap-2">{children}</div>
      </div>
    </motion.div>
  );
};

export const ModalRecheck: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null; // ไม่แสดง Modal ถ้า isOpen เป็น false

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 relative transform transition-all duration-300 scale-100">
        {/* ปุ่มปิด */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
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

        {/* หัวข้อ */}
        {title && (
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        )}

        {/* เนื้อหา */}
        <div className="text-gray-600 flex flex-col gap-2">{children}</div>
      </div>
    </motion.div>
  );
};

export const ModalLoading: React.FC<ModalLoadingProps> = ({
  isOpen,
  onClose,
  title = "Loading...",
  progress = 0,
  loadingText = "Please wait a moment...",
}) => {
  if (!isOpen) return null;

  // จำกัด progress ระหว่าง 0-100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative transform transition-all duration-300 scale-100">
        {/* ปุ่มปิด (ถ้ามี onClose) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none hidden"
          >
            <svg
              className="w-6 h-6"
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
        )}

        {/* หัวข้อ */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {title}
        </h2>

        {/* เนื้อหา Progress */}
        <div className="flex flex-col items-center gap-4">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-blue-500 h-full rounded-full"
              style={{ backgroundColor: "#ae7e47" }}
              initial={{ width: 0 }}
              animate={{ width: `${clampedProgress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* เปอร์เซ็นต์และข้อความ */}
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">
              {clampedProgress}%
            </span>
            <span className="text-gray-600">{loadingText}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
