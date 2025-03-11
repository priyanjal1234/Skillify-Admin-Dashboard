import React from "react";
import { User, TrendingUp, Users2, BookOpen, GraduationCap, BarChart3, Calendar } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Stats Cards */}
        <div className="bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Students</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-100">2,543</h3>
            </div>
            <div className="bg-blue-800 p-3 rounded-lg">
              <Users2 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400 font-medium">12%</span>
            <span className="text-gray-400 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Courses</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-100">128</h3>
            </div>
            <div className="bg-purple-800 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400 font-medium">8%</span>
            <span className="text-gray-400 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Instructors</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-100">48</h3>
            </div>
            <div className="bg-orange-800 p-3 rounded-lg">
              <GraduationCap className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400 font-medium">4%</span>
            <span className="text-gray-400 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Revenue</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-100">$45,231</h3>
            </div>
            <div className="bg-green-800 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400 font-medium">15%</span>
            <span className="text-gray-400 ml-1">from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-100">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="bg-gray-700 p-2 rounded-full">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-100">
                    New student enrolled
                  </p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Preview */}
        <div className="bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-100">Calendar</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="font-medium text-gray-400">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-full hover:bg-gray-700 cursor-pointer ${
                    i + 1 === 15 ? "bg-indigo-600 text-white" : ""
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
