"use client";
import { AlertMessage } from "@/components/AlertMessage";
import images from "@/constant/images";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [alertMessage, setAlertMessage] = useState<boolean>(true);
  const handleClose = () => {
    setAlertMessage(false); // ล้าง message เมื่อปิด
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          className="h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="mx-auto flex flex-col w-1/2 gap-3">
            <div className="flex justify-center rounded-full">
              <Image
                src={images.logo}
                alt="Logo CMUVC"
                width={200}
                className="object-cover  rounded-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-center text-xl text-[#9878b0] font-bold ">
                ระบบสารสนเทศ คณะสัตวแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่
              </div>
           
            </div>
            {alertMessage && (
              <AlertMessage message="Please login." onClose={handleClose} />
            )}

            <button
              type="button"
              className="bg-[#325e8c] py-3 px-4 text-white text-sm font-semibold rounded-md hover:bg-[#5584ab] cursor-pointer transition-all duration-300 ease-in-out"
            >
              เข้าสู่ระบบผ่าน Microsoft Online
            </button>
            <div className="flex flex-col gap-1 text-gray-500">
              <div className="flex justify-center text-sm">
                CMU IT ACCOUNT เพื่อเข้าถึง ทุก Application
                ในมหาวิทยาลัยเชียงใหม่
              </div>
              <div className="flex justify-center text-sm">
                (ONE IT ACCOUNT TO ALL CMU SERVICES)
              </div>
              <div className="flex justify-center text-sm text-red-500">
                ** ใช้ CMU E-Mail และ Password เดียวกันกับระบบ CMU MIS **
              </div>
            </div>

            <div className="flex justify-center text-sm text-gray-500 mt-8">
              @2025 คณะสัตวแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
