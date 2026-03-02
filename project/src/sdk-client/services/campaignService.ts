import type { Campaign } from "../../types/campaign";

// let mockCampaigns: Campaign[] = [
//   {
//     id: "1",
//     name: "Summer Promo",
//     status: "Active",
//     budget: 10000,
//     spend: 4500,
//     impressions: 120000,
//     clicks: 3400,
//     createdAt: "2026-01-15",
//   },
//   {
//     id: "2",
//     name: "Gaming Launch",
//     status: "Paused",
//     budget: 8000,
//     spend: 6100,
//     impressions: 240000,
//     clicks: 8200,
//     createdAt: "2026-02-10",
//   },
//   {
//     id: "3",
//     name: "Black Friday",
//     status: "Completed",
//     budget: 15000,
//     spend: 15000,
//     impressions: 500000,
//     clicks: 21000,
//     createdAt: "2026-03-05",
//   },
// ]
const simulateDelay = (min = 500, max = 1200) =>
  new Promise((res) =>
    setTimeout(res, Math.random() * (max - min) + min)
  );

export const campaignService = {
  async getCampaigns(data: Campaign[]): Promise<Campaign[]> {
    await simulateDelay();
    return [...data];
  },

  async simulateMetricUpdate(data: Campaign[]): Promise<Campaign[]> {
    await simulateDelay();

    data = data.map((campaign) => {
      if (campaign.status !== "Active") return campaign;

      const randomImpressions = Math.floor(Math.random() * 5000);
      const randomClicks = Math.floor(Math.random() * 100);

      return {
        ...campaign,
        impressions: campaign.impressions + randomImpressions,
        clicks: campaign.clicks + randomClicks,
        spend: campaign.spend + randomClicks * 0.1,
      };
    });


    return [...data];
  },
};

export const mockAreaChartData = [
  { date: "2026-03-01", clicks: 320, reach: 5200,  budgetUtilization: 2500 },
  { date: "2026-03-02", clicks: 450, reach: 6800,  budgetUtilization: 3002 },
  { date: "2026-03-03", clicks: 600, reach: 9000,  budgetUtilization: 4000 },
  { date: "2026-03-04", clicks: 720, reach: 11000, budgetUtilization: 4008 },
  { date: "2026-03-05", clicks: 850, reach: 13000, budgetUtilization: 5005 },

  { date: "2026-03-06", clicks: 980, reach: 15500, budgetUtilization: 6000 },
  { date: "2026-03-07", clicks: 1100, reach: 18000, budgetUtilization: 6008 },
  { date: "2026-03-08", clicks: 1050, reach: 17500, budgetUtilization: 6005 }, // slight dip
  { date: "2026-03-09", clicks: 1250, reach: 21000, budgetUtilization: 7002 },
  { date: "2026-03-10", clicks: 1450, reach: 24000, budgetUtilization: 7008 },

  { date: "2026-03-11", clicks: 1600, reach: 26500, budgetUtilization: 8002 },
  { date: "2026-03-12", clicks: 1750, reach: 29000, budgetUtilization: 8008 },
  { date: "2026-03-13", clicks: 1680, reach: 27500, budgetUtilization: 8004 }, // natural fluctuation
  { date: "2026-03-14", clicks: 1900, reach: 31000, budgetUtilization: 9002 },
  { date: "2026-03-15", clicks: 2100, reach: 34000, budgetUtilization: 9008 },
];