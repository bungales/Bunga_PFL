import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";

// Lazy load ADMIN pages
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const Customers = React.lazy(() => import("./pages/admin/Customers"));
const Transactions = React.lazy(() => import("./pages/admin/Transactions"));
const Tracking = React.lazy(() => import("./pages/admin/Tracking"));
const Notifications = React.lazy(() => import("./pages/admin/Notifications"));
const Loyalty = React.lazy(() => import("./pages/admin/Loyalty"));
const Segmentation = React.lazy(() => import("./pages/admin/Segmentation"));
const Feedback = React.lazy(() => import("./pages/admin/Feedback"));
const Reports = React.lazy(() => import("./pages/admin/Reports"));
const Components = React.lazy(() => import("./pages/admin/Components"));
const Users = React.lazy(() => import("./pages/admin/Users"));
const CustomerDetail = React.lazy(() => import("./pages/admin/CustomerDetail"));
const CustomerQR = React.lazy(() => import("./pages/admin/CustomerQR"));

// Lazy load GUEST pages
const LandingPage = React.lazy(() => import("./pages/guest/LandingPage"));
const QRScan = React.lazy(() => import("./pages/guest/QRScan"));
const MemberPage = React.lazy(() => import("./pages/guest/MemberPage"));

// Lazy load AUTH pages
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// Lazy load OTHER pages
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Guard: redirect ke /login jika belum login admin
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// Guard untuk halaman member
function MemberRoute({ children }) {
  const memberId = localStorage.getItem("memberId");
  return memberId ? children : <Navigate to="/login" replace />;
}

// Guard: kalau sudah login admin → /admin, kalau sudah login member → /member
function GuestOnlyRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const memberId = localStorage.getItem("memberId");
  if (memberId) return <Navigate to="/member" replace />;
  if (isLoggedIn) return <Navigate to="/admin" replace />;
  return children;
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* GUEST Routes - accessible without login */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/scan/:customerId" element={<QRScan />} />
          <Route path="/member" element={<MemberRoute><MemberPage /></MemberRoute>} />
        </Route>

        {/* AUTH Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* ADMIN Routes - only for logged in users */}
        <Route path="/admin" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="customers/:id/qr" element={<CustomerQR />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="loyalty" element={<Loyalty />} />
          <Route path="segmentation" element={<Segmentation />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="reports" element={<Reports />} />
          <Route path="components" element={<Components />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
