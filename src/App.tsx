import { useAuthStore } from "./store/useAuthStore";
import Layout from "./components/layout/main";
import Login from "./pages/login";
import Register from "./pages/register";
import BuyMaiz from "./pages/buy";
import MyPurchases from "./pages/purchases";
import AdminUsers from "./pages/users";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserRoles } from "././types";

function App() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const userRoutes = (
    <>
      <Route path="/buy" element={<BuyMaiz />} />
      <Route path="/my-purchases" element={<MyPurchases />} />
      <Route path="*" element={<Navigate to="/buy" replace />} />
    </>
  );

  const adminRoutes = (
    <>
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="*" element={<Navigate to="/admin/users" replace />} />
    </>
  );

  return (
    <Layout>
      <Routes>
        {user?.role === UserRoles.admin ? adminRoutes : userRoutes}
      </Routes>
    </Layout>
  );
}

export default App;
