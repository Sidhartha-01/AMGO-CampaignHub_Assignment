import { Layout, Dropdown, Space, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const { Header } = Layout;

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/campaigns":
      return "Campaigns";
    case "/settings":
      return "Settings";
    default:
      return "Dashboard";
  }
};

export default function HeaderBar() {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 24,
        paddingLeft: 24,
      }}
    >
    <h2 className="ml-5 text-xl font-semibold text-gray-900 tracking-tight">
    {pageTitle}
    </h2>
      
      <Dropdown
        menu={{
          items: [
            { key: "1", label: "Profile" },
            { key: "2", label: "Logout" },
          ],
        }}
      >
        <Space style={{ cursor: "pointer" }}>
          <Avatar icon={<UserOutlined />} />
          Admin
        </Space>
      </Dropdown>
    </Header>
  );
}