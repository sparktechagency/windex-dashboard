"use client";
import Logo from "@/assets/logos/Logo";
import "./Sidebar.css";
import LogoSmall from "@/assets/logos/LogoSmall";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  Users2,
  LogOut,
  House,
  Settings,
  TriangleAlert,
  ChartColumnDecreasing,
  TicketSlash,
  BookHeart,
  Mail,
  Mails,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "@/utils/customToast";
import { Coins } from "lucide-react";
import { User } from "lucide-react";
import { NotepadText } from "lucide-react";
import { Newspaper } from "lucide-react";
import { Film } from "lucide-react";
import Image from "next/image";
import logoImg from "@/assets/logos/WishRoot Logo.png";
import logoSmall from "@/assets/logos/WishRoot Logo small.png";

const SidebarContainer = ({ collapsed }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  // Logout handler
  const handleLogout = (e) => {
    if (e.key !== "logout") return;
    dispatch(logout());
    router.refresh();
    router.push("/login");
    successToast("Logout Successful!");
  };

  const sidebarLinks = [
    {
      key: "dashboard",
      icon: <House size={21} strokeWidth={2} />,
      label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
    },
    {
      key: "analytics",
      icon: <ChartColumnDecreasing size={21} strokeWidth={2} />,
      label: <Link href={"/admin/analytics"}>Analytics</Link>,
    },
    {
      key: "users",
      icon: <Users2 size={21} strokeWidth={2} />,
      label: <Link href={"/admin/users"}>Users</Link>,
    },
    {
      key: "Wish List",
      icon: <BookHeart />,
      label: <Link href={"/admin/wishlist"}>Wish List</Link>,
    },
    {
      key: "Refund Requests",
      icon: <TicketSlash />,
      label: <Link href={"/admin/refund-request"}>Refund Request</Link>,
    },
    {
      key: "tokenOrder",
      icon: <Coins size={21} strokeWidth={2} />,
      label: <Link href={"/admin/token-order"}>Token Order</Link>,
    },
    {
      key: "report",
      icon: <TriangleAlert size={21} strokeWidth={2} />,
      label: <span>Report Review</span>,
      children: [
        {
          key: "profile-report",
          icon: <User size={21} strokeWidth={2} />,
          label: <Link href={"/admin/profile-report"}>Profile Report</Link>,
        },
        {
          key: "wishlist-report",
          icon: <NotepadText size={21} strokeWidth={2} />,
          label: <Link href={"/admin/wishlist-report"}>Wishlist Report</Link>,
        },
        {
          key: "feed-report",
          icon: <Newspaper size={21} strokeWidth={2} />,
          label: <Link href={"/admin/feed-report"}>Feed Report</Link>,
        },
        {
          key: "reel-report",
          icon: <Film size={21} strokeWidth={2} />,
          label: <Link href={"/admin/reel-report"}>Reel Report</Link>,
        },
      ],
    },
    {
      key: "settings",
      icon: <Settings size={21} strokeWidth={2} />,
      label: <Link href={"/admin/settings"}>Settings</Link>,
    },
    {
      key: "invitations",
      icon: <Mails size={21} strokeWidth={2} />,
      label: <Link href={"/admin/invitations"}>Invitations</Link>,
    },
    {
      key: "logout",
      icon: <LogOut size={21} strokeWidth={2} />,
      label: "Logout",
    },
  ];

  const subAdminSidebarLinks = [
    {
      key: "Wish List",
      icon: <BookHeart />,
      label: <Link href={"/admin/wishlist"}>Wish List</Link>,
    },
    {
      key: "Refund Requests",
      icon: <TicketSlash />,
      label: <Link href={"/admin/refund-request"}>Refund Request</Link>,
    },
    {
      key: "tokenOrder",
      icon: <Coins size={21} strokeWidth={2} />,
      label: <Link href={"/admin/token-order"}>Token Order</Link>,
    },
    {
      key: "report",
      icon: <TriangleAlert size={21} strokeWidth={2} />,
      label: <span>Report Review</span>,
      children: [
        {
          key: "profile-report",
          icon: <User size={21} strokeWidth={2} />,
          label: <Link href={"/admin/profile-report"}>Profile Report</Link>,
        },
        {
          key: "wishlist-report",
          icon: <NotepadText size={21} strokeWidth={2} />,
          label: <Link href={"/admin/wishlist-report"}>Wishlist Report</Link>,
        },
        {
          key: "feed-report",
          icon: <Newspaper size={21} strokeWidth={2} />,
          label: <Link href={"/admin/feed-report"}>Feed Report</Link>,
        },
        {
          key: "reel-report",
          icon: <Film size={21} strokeWidth={2} />,
          label: <Link href={"/admin/reel-report"}>Reel Report</Link>,
        },
      ],
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
        {/* <Link href={"/"}>{collapsed ? <LogoSmall /> : <Logo />}</Link> */}
        <Link href={"/"}>
          {collapsed ? (
            <Image src={logoSmall} width={60} height={60} alt="logo" />
          ) : (
            <Image src={logoImg} width={110} height={110} alt="logo" />
          )}
        </Link>
      </div>

      <Menu
        onClick={handleLogout}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu space-y-2.5 !border-none !bg-transparent !pb-10"
        items={user?.role === "admin" ? sidebarLinks : subAdminSidebarLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
