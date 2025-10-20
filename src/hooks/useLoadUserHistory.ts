import { Purchase } from "../types";
import { purchaseService } from "../services/purchase.services";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface useLoadUserHistoryProps {
  selectedId: number;
  errorCallback?: () => void;
}

export default function useLoadUserHistory({
  selectedId,
  errorCallback,
}: useLoadUserHistoryProps) {
  const [userPurchases, setUserPurchases] = useState<Purchase[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);

  const loadUserHistory = useCallback(async (selectedId: number) => {
    setUserPurchases([]);
    setLoadingPurchases(true);
    try {
      const data = await purchaseService.getUserPurchases(selectedId);
      setUserPurchases(data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error loading purchases");
      setUserPurchases([]);
      errorCallback?.();
    } finally {
      setLoadingPurchases(false);
    }
  }, []);

  useEffect(() => {
    if (selectedId) {
      loadUserHistory(selectedId);
    }
  }, [loadUserHistory, selectedId]);

  return { userPurchases, loadingPurchases };
}
