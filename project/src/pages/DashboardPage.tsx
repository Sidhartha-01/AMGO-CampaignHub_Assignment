import { Row, Col, Card } from "antd";
import { useMemo } from "react";
import {
  TrendingUp,
  Users,
  Target,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import RecentCampaigns from "../components/RecentCampaigns";
import { useCampaignStore } from "../store/campaignStore";
import StatCard from "../components/StatCard";
import { useCampaignPolling } from "../hooks/useCampaignPolling";
import { mockAreaChartData } from "../sdk-client/services/campaignService";

const STATUS_COLORS: Record<string, string> = {
  Active: "#22c55e",     // green
  Paused: "#f59e0b",    // orange
  Completed: "#ef4444",  // red
};;

export default function DashboardPage() {
  const { campaigns } = useCampaignStore();

  useCampaignPolling();

  const activeCampaigns = campaigns.filter(c => c.status === "Active").length;
  const totalReach = campaigns.reduce((acc, c) => acc + (c.impressions || 0), 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + (c.clicks || 0), 0);
  const totalSpend = campaigns.reduce((acc, c) => acc + (c.spend || 0), 0);

  const pieData = useMemo(() => {
    const statusCount: Record<string, number> = {};

    campaigns.forEach((c) => {
      statusCount[c.status] = (statusCount[c.status] || 0) + 1;
    });

    return Object.entries(statusCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [campaigns]);

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Active Campaigns"
            value={activeCampaigns}
            icon={Zap}
            color="text-amber-600"
            bg="bg-amber-50" change={""} trend={"up"}/>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Total Clicks"
            value={totalClicks.toLocaleString()}
            icon={Users}
            color="text-blue-600"
            bg="bg-blue-50" change={""} trend={"up"}/>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Total Reach"
            value={totalReach.toLocaleString()}
            icon={Target}
            color="text-purple-600"
            bg="bg-purple-50" change={""} trend={"up"}/>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <StatCard
            title="Budget Utilization"
            value={`${totalSpend.toLocaleString()}%`}
            icon={TrendingUp}
            color="text-emerald-600"
            bg="bg-emerald-50" change={""} trend={"up"}/>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={14}>
          <Card title="Campaign Performance" bordered={false}>
            {campaigns.length === 0 ? (
              <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockAreaChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />

                  <Area
                    type="monotone"
                    dataKey="reach"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />

                  <Area
                    type="monotone"
                    dataKey="budgetUtilization"
                    stroke="red"
                    fill="#10b981"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card title="Campaign Status">
            {pieData.length === 0 ? (
              <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
  <Cell
    key={`cell-${index}`}
    fill={STATUS_COLORS[entry.name]}
  />
))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>
      </Row>

      <div className="mt-6">
        <RecentCampaigns />
      </div>

    </div>
  );
}