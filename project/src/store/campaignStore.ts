import { create } from "zustand";
import type { Campaign } from "../types/campaign";
import { campaignService } from "../sdk-client/services/campaignService";

interface CampaignState {
  campaigns: Campaign[];
  loading: boolean;
  // fetchCampaigns: () => Promise<void>;
  refreshMetrics: (data: Campaign[]) => Promise<void>;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (campaign: Campaign) => void;
  deleteCampaign: (id: string) => void;
}

export const useCampaignStore = create<CampaignState>((set) => ({
  campaigns: [],
  loading: false,

  refreshMetrics: async (data : Campaign[]) => {
    const updated = await campaignService.simulateMetricUpdate(data);
    set((state) => {
      // Merge updated metrics with current state to avoid losing newly added campaigns
      const updatedMap = new Map(updated.map(c => [c.id, c]));
      return {
        campaigns: state.campaigns.map(c => updatedMap.get(c.id) || c)
      };
    });
  },

  addCampaign: (campaign) =>
    set((state) => ({
      campaigns: [...state.campaigns, campaign],
    })),

  updateCampaign: (updatedCampaign) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === updatedCampaign.id ? updatedCampaign : c
      ),
    })),

  deleteCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.filter((c) => c.id !== id),
    })),
}));