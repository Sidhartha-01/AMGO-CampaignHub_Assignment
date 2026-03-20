import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

interface Props {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: any;
  color: string;
  bg: string;
}

export default function StatCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
  bg,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${bg} ${color}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div
          className={`flex items-center text-xs font-bold ${
            trend === "up" ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {change}
          {trend === "up" ? (
            <ArrowUpOutlined className="w-3 h-3 ml-0.5" />
          ) : (
            <ArrowDownOutlined className="w-3 h-3 ml-0.5" />
          )}
        </div>
      </div>

      <div className="text-3xl font-bold text-zinc-900 mb-1">{value}</div>

      <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
        {title}
      </div>
    </div>
  );
}
