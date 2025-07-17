"use client";
import Logo from "@/assets/logos/Logo";
import "./Sidebar.css";
import LogoSmall from "@/assets/logos/LogoSmall";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Users2, LogOut, House, Settings, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { successToast } from "@/utils/customToast";
import { Coins } from "lucide-react";

const SidebarContainer = ({ collapsed }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const navbarTitle = pathname.split("/admin")[1].split("/")[1];
  // Logout handler
  const handleLogout = (e) => {
    if (e.key !== "logout") return;
    dispatch(logout());
    router.refresh();
    router.push("/login");
    successToast("Logout Successful!");
  };
  const wishlist = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 128 128"
      id="Layer_1"
      data-name="Layer 1"
    >
      <defs>
        <style>{`.cls-1{fill:${navbarTitle === "wishlist" ? "#000" : "#fff"};}.cls-2{fill:${navbarTitle === "wishlist" ? "#000" : "#fff"};}`}</style>
      </defs>
      <path
        strokeWidth={2}
        className="cls-1"
        d="M121.42848,78.51934a14.43863,14.43863,0,0,0-20.42168,0l-3.2781,3.2781-3.2781-3.2781A14.44072,14.44072,0,0,0,69.799,88.73019c0,4.66533,2.46839,8.78663,5.15855,12.42049a118.5565,118.5565,0,0,0,9.594,11.42367,80.75628,80.75628,0,0,0,11.255,9.93362,2.68608,2.68608,0,0,0,3.84408,0,80.75628,80.75628,0,0,0,11.255-9.93362,118.55649,118.55649,0,0,0,9.594-11.42367c2.69016-3.63386,5.15855-7.75516,5.15855-12.42049A14.39669,14.39669,0,0,0,121.42848,78.51934Z"
      />
      <path
        strokeWidth={2}
        className="cls-1"
        d="M75.3791,32.69343H29.283a3.07687,3.07687,0,0,0,0,6.15375H75.3791a3.07687,3.07687,0,1,0,0-6.15375Z"
      />
      <path
        strokeWidth={2}
        className="cls-1"
        d="M75.3791,54.36434H29.283a3.07687,3.07687,0,0,0,0,6.15375H75.3791a3.07687,3.07687,0,0,0,0-6.15375Z"
      />
      <path
        strokeWidth={2}
        className="cls-1"
        d="M52.047,76.03582H29.283a3.07687,3.07687,0,0,0,0,6.15375H52.047a3.07687,3.07687,0,1,0,0-6.15375Z"
      />
      <path
        strokeWidth={2}
        className="cls-2"
        d="M97.72826,4.68206H6.93248A4.59167,4.59167,0,0,0,2.34165,9.27289V118.72711a4.59166,4.59166,0,0,0,4.59083,4.59083H88.99037a91.94892,91.94892,0,0,1-7.91371-7.41965q-.82964-.869-1.64834-1.762h-67.905V13.86372H93.13743V71.6492a19.26017,19.26017,0,0,1,4.59083,3.34695,19.30394,19.30394,0,0,1,4.59083-3.34695V9.27289A4.59027,4.59027,0,0,0,97.72826,4.68206Z"
      />
    </svg>
  );

  const sidebarLinks = [
    {
      key: "dashboard",
      icon: <House size={21} strokeWidth={2} />,
      label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
    },
    {
      key: "users",
      icon: <Users2 size={21} strokeWidth={2} />,
      label: <Link href={"/admin/users"}>Users</Link>,
    },
    {
      key: "Wish List",
      icon: wishlist,
      label: <Link href={"/admin/wishlist"}>Wish List</Link>,
    },
    {
      key: "tokenOrder",
      icon: <Coins size={21} strokeWidth={2} />,
      label: <Link href={"/admin/token-order"}>Token Order</Link>,
    },
    {
      key: "report",
      icon: <TriangleAlert size={21} strokeWidth={2} />,
      label: <Link href={"/admin/report"}>Report Review</Link>,
    },
    {
      key: "settings",
      icon: <Settings size={21} strokeWidth={2} />,
      label: <Link href={"/admin/settings"}>Settings</Link>,
    },
    {
      key: "logout",
      icon: <LogOut size={21} strokeWidth={2} />,
      label: "Logout",
    },
  ];

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()?.replace("/admin/", "")?.split(" ")[0];

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        paddingInline: `${!collapsed ? "10px" : "4px"}`,
        paddingBlock: "80px",
        backgroundColor: "var(--primary-black)",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      className="scroll-hide"
    >
      <div className="mb-6 flex flex-col items-center justify-center gap-y-5">
        <Link href={"/"}>{collapsed ? <LogoSmall /> : <Logo />}</Link>
      </div>

      <Menu
        onClick={handleLogout}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu space-y-2.5 !border-none !bg-transparent !pb-10"
        items={sidebarLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
