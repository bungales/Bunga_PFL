import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="w-full min-h-screen">
      <Outlet />
    </div>
  );
}
