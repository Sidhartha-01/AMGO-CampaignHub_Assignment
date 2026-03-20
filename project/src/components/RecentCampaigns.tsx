import { Tag } from "antd";
import { Zap } from "lucide-react";
import { useCampaignStore } from "../store/campaignStore";
import { useState } from "react";

export default function RecentCampaigns() {
  const { campaigns } = useCampaignStore();
  const [viewAll, setViewAll] = useState(false);

  function func() {
    setViewAll(!viewAll);
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900">Recent Campaigns</h3>
        <button
          className="text-xs font-bold text-emerald-600 hover:underline uppercase tracking-wider"
          onClick={func}
        >
          View All
        </button>
      </div>

      <div className="divide-y divide-zinc-50">
        {(viewAll ? campaigns : campaigns.slice(0, 3)).map((campaign) => (
          <div
            key={campaign.id}
            className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400">
                <Zap className="w-5 h-5" />
              </div>

              <div>
                <div className="text-sm font-semibold text-zinc-900">
                  {campaign.name}
                </div>
                <div className="text-xs text-zinc-500">
                  Modified{" "}
                  {new Date(
                    campaign.createdAt || Date.now(),
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>

            <Tag
              color={
                campaign.status === "Active"
                  ? "green"
                  : campaign.status === "Paused"
                    ? "orange"
                    : "red"
              }
              style={{
                borderRadius: 20,
                padding: "4px 12px",
              }}
            >
              {campaign.status}
            </Tag>
          </div>
        ))}
      </div>
    </div>
  );
}
