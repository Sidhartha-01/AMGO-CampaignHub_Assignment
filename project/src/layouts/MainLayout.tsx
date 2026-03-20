import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout>
        <HeaderBar />
        <Content style={{ margin: "24px 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}