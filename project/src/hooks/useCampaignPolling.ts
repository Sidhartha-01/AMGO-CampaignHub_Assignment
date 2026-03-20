import { useEffect } from "react";
import { useCampaignStore } from "../store/campaignStore";

export const useCampaignPolling = () => {
  const { campaigns, refreshMetrics } = useCampaignStore();

  useEffect(() => {
    setInterval(() => {
      refreshMetrics(campaigns);
    }, 5000);
  }, []);
};
