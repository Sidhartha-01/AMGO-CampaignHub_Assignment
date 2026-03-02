import { Layout, Menu } from "antd";
import { DashboardOutlined, FundProjectionScreenOutlined, SettingOutlined} from "@ant-design/icons";
import { useNavigate} from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div style={{ color: "white", padding: 16, fontSize: 18 }}>
        AMGO CampaignHub
      </div>

      <Menu
        theme="dark"
        mode="inline"
        onClick={(item) => navigate(item.key)}
        items={[
          {
            key: "/dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          {
            key: "/campaigns",
            icon: <FundProjectionScreenOutlined />,
            label: "Campaigns",
          },
          {
            key: "/settings",
            icon: <SettingOutlined />,
            label: "Settings",
          }
        ]}
      />
    </Sider>
  );
}