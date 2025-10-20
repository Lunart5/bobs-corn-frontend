import { Purchase } from "../types/";
import { purchaseService } from "../services/purchase.services";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useLoadPurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPurchases = useCallback(async () => {
    try {
      const data = await purchaseService.getMyPurchases();
      setPurchases(data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error al cargar las compras");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPurchases();
  }, [loadPurchases]);

  return { purchasesList: purchases, loadingPurchases: loading };
}
