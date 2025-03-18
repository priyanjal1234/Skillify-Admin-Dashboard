import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Settings,
  Bell,
  ChevronDown,
  Search,
  BarChart3,
  Calendar,
} from "lucide-react";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import Instructors from "./components/Instructors";
import Analytics from "./components/Analytics";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  
  // Updated menu items including additional features
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "students", label: "Students", icon: Users },
    { id: "instructors", label: "Instructors", icon: GraduationCap },

    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-500">
            Admin Dashboard
          </h1>
        </div>
        <nav className="mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center px-6 py-3 text-sm ${
                  activePage === item.id
                    ? "text-indigo-500 bg-indigo-900 border-r-4 border-indigo-500"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

     <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-gray-800 border-b border-gray-700">
            <div className="flex items-center justify-end px-6 py-4">
              
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-700 rounded-full">
                  <Bell className="w-5 h-5 text-gray-400" />
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Priyanjal Saxena</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "students" && <Students />}
          {activePage === "instructors" && <Instructors />}
          {activePage === "analytics" && <Analytics />}
        </main>
    </div>
  );
}

export default App;
