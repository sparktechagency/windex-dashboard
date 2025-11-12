"use client";

import "./Sidebar.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  House,
  ChartColumnDecreasing,
  Users2,
  BookHeart,
  TicketSlash,
  Coins,
  TriangleAlert,
  User,
  NotepadText,
  Newspaper,
  Film,
  Settings,
  Mails,
  LogOut,
} from "lucide-react";
import logoImg from "@/assets/logos/WishRoot Logo.png";
import logoSmall from "@/assets/logos/WishRoot Logo small.png";
import { logout } from "@/redux/features/authSlice";
import { successToast } from "@/utils/customToast";
import { jwtDecode } from "jwt-decode";

const SidebarContainer = ({ collapsed }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const decoded = token ? jwtDecode(token) : null;

  console.log("Decoded Token:", decoded);
  console.log("User Role:", user?.role, "| Permission:", user?.permission);

  // ---- LOGOUT HANDLER ----
  const handleLogout = (e) => {
    if (e.key !== "logout") return;
    dispatch(logout());
    router.push("/login");
    successToast("Logout Successful!");
  };

  // ---- DEFINE SIDEBAR LINKS ----
  const Navlinks = {
    admin: [
      {
        key: "dashboard",
        icon: <House size={21} />,
        label: <Link href="/admin/dashboard">Dashboard</Link>,
      },
      {
        key: "analytics",
        icon: <ChartColumnDecreasing size={21} />,
        label: <Link href="/admin/analytics">Analytics</Link>,
      },
      {
        key: "users",
        icon: <Users2 size={21} />,
        label: <Link href="/admin/users">Users</Link>,
      },
      {
        key: "wishlist",
        icon: <BookHeart />,
        label: <Link href="/admin/wishlist">Wish List</Link>,
      },
      {
        key: "refund",
        icon: <TicketSlash />,
        label: <Link href="/admin/refund-request">Refund Request</Link>,
      },
      {
        key: "tokenOrder",
        icon: <Coins size={21} />,
        label: <Link href="/admin/token-order">Token Order</Link>,
      },
      {
        key: "reports",
        icon: <TriangleAlert size={21} />,
        label: "Report Review",
        children: [
          {
            key: "profile-report",
            icon: <User size={20} />,
            label: <Link href="/admin/profile-report">Profile Report</Link>,
          },
          {
            key: "wishlist-report",
            icon: <NotepadText size={20} />,
            label: <Link href="/admin/wishlist-report">Wishlist Report</Link>,
          },
          {
            key: "feed-report",
            icon: <Newspaper size={20} />,
            label: <Link href="/admin/feed-report">Feed Report</Link>,
          },
          {
            key: "reel-report",
            icon: <Film size={20} />,
            label: <Link href="/admin/reel-report">Reel Report</Link>,
          },
        ],
      },
      {
        key: "settings",
        icon: <Settings size={21} />,
        label: <Link href="/admin/settings">Settings</Link>,
      },
      {
        key: "invitations",
        icon: <Mails size={21} />,
        label: <Link href="/admin/invitations">Invitations</Link>,
      },
      {
        key: "logout",
        icon: <LogOut size={21} />,
        label: "Logout",
      },
    ],

    order_support: [
      {
        key: "tokenOrder",
        icon: <Coins size={21} />,
        label: <Link href="/admin/token-order">Token Order</Link>,
      },
      {
        key: "logout",
        icon: <LogOut size={21} />,
        label: "Logout",
      },
    ],

    content_reviewer: [
      {
        key: "reports",
        icon: <TriangleAlert size={21} />,
        label: "Report Review",
        children: [
          {
            key: "profile-report",
            icon: <User size={20} />,
            label: <Link href="/admin/profile-report">Profile Report</Link>,
          },
          {
            key: "wishlist-report",
            icon: <NotepadText size={20} />,
            label: <Link href="/admin/wishlist-report">Wishlist Report</Link>,
          },
          {
            key: "feed-report",
            icon: <Newspaper size={20} />,
            label: <Link href="/admin/feed-report">Feed Report</Link>,
          },
          {
            key: "reel-report",
            icon: <Film size={20} />,
            label: <Link href="/admin/reel-report">Reel Report</Link>,
          },
        ],
      },
      {
        key: "logout",
        icon: <LogOut size={21} />,
        label: "Logout",
      },
    ],

    finance: [
      {
        key: "tokenOrder",
        icon: <Coins size={21} />,
        label: <Link href="/admin/token-order">Token Order</Link>,
      },
      {
        key: "refund",
        icon: <TicketSlash />,
        label: <Link href="/admin/refund-request">Refund Request</Link>,
      },
      {
        key: "logout",
        icon: <LogOut size={21} />,
        label: "Logout",
      },
    ],
  };

  // ---- CHOOSE LINK SET BASED ON ROLE/PERMISSION ----
  let menuItems = [];

  if (user?.role === "admin") {
    menuItems = Navlinks.admin;
  } else if (user?.role === "sub_admin") {
    switch (user?.permission) {
      case "order_support":
        menuItems = Navlinks.order_support;
        break;
      case "content_reviewer":
        menuItems = Navlinks.content_reviewer;
        break;
      case "finance":
        menuItems = Navlinks.finance;
        break;
      default:
        menuItems = Navlinks.admin;
        break;
    }
  } else {
    menuItems = Navlinks.admin;
  }

  // ---- ACTIVE MENU HIGHLIGHT ----
  const currentPathname = usePathname()?.replace("/admin/", "") || "";

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        paddingInline: collapsed ? "4px" : "10px",
        paddingBlock: "80px",
        backgroundColor: "var(--primary-black)",
        maxHeight: "100vh",
        overflow: "auto",
      }}
      className="scroll-hide"
    >
      <div className="mb-6 flex flex-col items-center justify-center gap-y-5">
        <Link href="/">
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
        items={menuItems}
      />
    </Sider>
  );
};

export default SidebarContainer;
