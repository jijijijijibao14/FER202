import { Link, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      <nav>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/reports">Reports</Link>
      </nav>
      
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
