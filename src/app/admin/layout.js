"use client";

import HeaderContainer from "@/components/shared/HeaderContainer/HeaderContainer";
import SidebarContainer from "@/components/shared/SidebarContainer/SidebarContainer";
import { Layout } from "antd";
import { useState } from "react";
const { Content } = Layout;

export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }} hasSider>
      <SidebarContainer collapsed={sidebarCollapsed}></SidebarContainer>

      <Layout>
        <HeaderContainer
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        ></HeaderContainer>
<div className="!bg-[#000] !overflow-hidden">

        <Content
          style={{
            height: "100vh",
            maxHeight: "100vh",
            overflow: "auto",
            background: "var(--primary-background2)",
            padding: "30px",
            borderTopLeftRadius: "10px",
          }}
        >
          {children}
        </Content>
</div>
      </Layout>
    </Layout>
  );
}
