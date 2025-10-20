import { User } from "../types";
import { userService } from "../services/users.services";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useLoadUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error loading users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return { usersList: users, loadingUsers: loading };
}
