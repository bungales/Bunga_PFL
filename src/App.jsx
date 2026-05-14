import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Lazy load pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Transactions = React.lazy(() => import("./pages/Transactions"));
const Tracking = React.lazy(() => import("./pages/Tracking"));
const Notifications = React.lazy(() => import("./pages/Notifications"));
const Loyalty = React.lazy(() => import("./pages/Loyalty"));
const Segmentation = React.lazy(() => import("./pages/Segmentation"));
const Feedback = React.lazy(() => import("./pages/Feedback"));
const Reports = React.lazy(() => import("./pages/Reports"));
const CustomerDetail = React.lazy(() => import("./pages/CustomerDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// Guard: redirect ke /login jika belum login
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// Guard: redirect ke / jika sudah login
function GuestRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Main Layout - harus login */}
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/segmentation" element={<Segmentation />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/reports" element={<Reports />} />
        </Route>

        {/* Auth Layout - hanya untuk yang belum login */}
        <Route element={<GuestRoute><AuthLayout /></GuestRoute>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
