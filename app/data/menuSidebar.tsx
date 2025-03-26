export const menuSidebar = [
  { name: "Application", href: "", icon: "application" },
  {
    name: "การเงินและพัสดุ",
    icon: "finance",
    dropdownlist: [
      {
        name: "QR Code",
        part: "/dashboard/finance/qr-code",
        icon: "qrcode",
      },
      {
        name: "ตรวจสอบสลิปโครงการ/สัมมนา",
        part: "/dashboard/finance/projects",
        icon: "list",
      },
    ],
  },
  {
    name: "ข้อมูลบุคคล",
    icon: "user",
    dropdownlist: [
      {
        name: "Dashboard",
        part: "/dashboard",
        icon: "dashborad",
      },
      {
        name: "แก้ไขข้อมูลบุคคล",
        part: "",
        icon: "pen",
      },
    ],
  },

  { name: "Setting", href: "", icon: "setting" },
];
