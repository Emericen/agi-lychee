import React, { useState } from "react";
import "./index.css";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import ChatBox from "./chatbox";

import { Layout, Menu, Button } from "antd";
const { Content, Sider, Header } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const contentStyle = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const onBreakpoint = (broken) => {
    setIsMobile(broken);
    if (!broken) {
      setCollapsed(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible={!isMobile}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md"
        collapsedWidth={isMobile ? "0" : "80"}
        onBreakpoint={onBreakpoint}
        width="256"
      >
        <div
          style={{
            height: 32,
            margin: 16,
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          Eddy's GPT 😎
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        {isMobile && (
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 12px",
            }}
          >
            <Button
              onClick={toggleMenu}
              style={{
                zIndex: 1,
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div
              style={{
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Eddy's GPT 😎
            </div>
          </Header>
        )}
        <Content style={{ ...contentStyle, marginTop: isMobile ? 64 : 0 }}>
          <ChatBox />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;