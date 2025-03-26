"use client";
import images from "@/constant/images";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import axios from "axios";
import { config } from "@/config/config_api";

export default function QRCodePayment() {
  const [paymentData, setPaymentData] = useState({
    amount: "",
    refId: "",
    order_id: "56",
    description: "งานประชุมวิชาการ 2568",
  });
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>("");
  const [transitionId, setTrasitionId] = useState<string | null>("");
  const qrSectionRef = useRef(null);

  const handleChange = (e: any) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const generateQRCode = async () => {
    try {
      const res = await axios.post(
        `${config.URL_API}/role/payment/qr-code`,
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success === true) {
        const paymentString = res.data.qr_data;
        const url = await QRCode.toDataURL(paymentString);
        setQrCodeUrl(url);
        setTrasitionId(res.data.transaction_id);
      } else {
        console.error("Error:", "QR Code");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้าง QR Code:", error);
    }
  };

  const downloadQRSection = () => {
    if (qrSectionRef.current) {
      html2canvas(qrSectionRef.current, {
        scale: 2,
        width: 300,
        backgroundColor: "#ffffff",
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qr-การชำระเงิน.png";
        link.click();
      });
    }
  };

  const checkPaymentStatus = async (transitionId: string) => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `${config.URL_API}/role/payment/status/${transitionId}`
        );
        console.log(res.data);
        const result = res.data;

        if (result.status === "SUCCESS") {
          clearInterval(interval);
          alert("ชำระเงินสำเร็จ!");
        } else if (result.status === "FAILED") {
          clearInterval(interval);
          alert("การชำระเงินล้มเหลว");
        }
      } catch (error) {
        console.error("Status Error");
      }
    }, 2000);
  };

  useEffect(() => {
    if (transitionId) {
      checkPaymentStatus(transitionId);
    }
  }, [transitionId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          className="h-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="mx-auto flex flex-col w-full sm:w-1/2 gap-6">
            <div className="flex justify-center">
              <Image
                src={images.logo}
                alt="Logo CMUVC"
                width={200}
                className="object-cover rounded-full "
                priority
              />
            </div>

            <div className="flex flex-col justify-center gap-1 text-center">
              <h1 className="text-2xl font-bold" style={{ color: "#9878b0" }}>
                สร้าง QR Code การชำระเงิน
              </h1>
              <p className="text-sm font-semibold" style={{ color: "#9878b0" }}>
                คณะสัตวแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="amount" className="text-gray-700 font-medium">
                  จำนวนเงิน (บาท)
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="กรอกจำนวนเงิน"
                  value={paymentData.amount}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9878b0] shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="ref" className="text-gray-700 font-medium">
                  หมายเลขอ้างอิง (เช่น PromptPay ID)
                </label>
                <input
                  type="text"
                  name="refId"
                  id="ref"
                  placeholder="กรอกหมายเลขอ้างอิง"
                  value={paymentData.refId}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9878b0] shadow-sm"
                />
              </div>
            </div>

            <button
              onClick={generateQRCode}
              className="py-3 px-4 text-sm font-semibold rounded-md transition-all duration-300 ease-in-out shadow-md"
              style={{ backgroundColor: "#325e8c", color: "#ffffff" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#5584ab")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#325e8c")
              }
            >
              สร้าง QR Code
            </button>

            {qrCodeUrl && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div
                  ref={qrSectionRef}
                  className="rounded-lg shadow-lg border max-w-sm mx-auto"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e5e7eb",
                    width: "300px",
                  }}
                >
                  <h3
                    className="text-lg font-semibold p-4"
                    style={{ color: "#ffffff", backgroundColor: "#1c3c64" }}
                  >
                    สแกนเพื่อชำระเงิน
                  </h3>
                  <div className="flex flex-col px-4 pt-2 rounded-md gap-2">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code การชำระเงิน"
                      className="w-full h-auto"
                      style={{ maxWidth: "200px", margin: "0 auto" }}
                    />
                  </div>
                  <div
                    className="px-4 pb-4 text-left text-sm flex flex-col gap-1"
                    style={{ color: "#374151" }}
                  >
                    <div className="flex gap-x-2">
                      <span className="font-semibold">จำนวนเงิน:</span>{" "}
                      {Number(paymentData.amount).toLocaleString("th-TH")} บาท
                    </div>
                    <div className="flex gap-x-2">
                      <span className="font-semibold">หมายเลขอ้างอิง:</span>{" "}
                      <div className="flex gap-x-2">{paymentData.refId}</div>
                    </div>
                    <div className="flex gap-x-2">
                      <span className="font-semibold">ผู้รับ:</span>{" "}
                      คณะสัตวแพทยศาสตร์ มช.
                    </div>
                    <div className="flex gap-x-2">
                      <span className="font-semibold">ชื่อโครงการ:</span>{" "}
                      {paymentData.description}
                    </div>
                  </div>
                </div>
                <button
                  onClick={downloadQRSection}
                  className="mt-4 py-2 px-4 text-sm font-semibold rounded-md transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: "#00b894",
                    color: "#ffffff",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#00d1b2")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#00b894")
                  }
                >
                  ดาวน์โหลด QR Code
                </button>
              </motion.div>
            )}

            <div className="flex justify-center text-sm text-gray-500 mt-8">
              © 2568 คณะสัตวแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
