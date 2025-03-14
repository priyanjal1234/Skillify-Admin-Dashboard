import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import analyticsService from "../services/Analytics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const Analytics = () => {
  const [userRegData, setuserRegData] = useState(null);
  const [startDate, setStartDate] = useState("2025-03-11");
  const [endDate, setEndDate] = useState("2025-03-13");

  const [revenueStartDate, setrevenueStartDate] = useState(null);
  const [revenueEndDate, setrevenueEndDate] = useState(null);

  const PIE_COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#aa00ff",
    "#ff00aa",
  ];

  let {
    data: userRegisterationAnalytics,
    isLoading,
    error,
    refetch: refetchUserRegAnalytics,
  } = useQuery({
    queryKey: ["fetchUserRegisterationsAnalytics", startDate, endDate],
    queryFn: async function () {
      try {
        let res = await analyticsService.getUserRegisterationAnalytics(
          startDate,
          endDate
        );
        const data = res.data;

        const labels = data.map((item) => item._id);
        const counts = data.map((item) => item.count);

        setuserRegData({
          labels,
          datasets: [
            {
              label: "Daily Registrations",
              data: counts,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        });

        return res.data;
      } catch (error) {
        console.log(error?.response?.data?.message);
        return false;
      }
    },
  });

  let {
    data: userRoleAnalytics,
    isLoading: isLoadingRoles,
    error: errorRoles,
  } = useQuery({
    queryKey: ["fetchUserRoleAnalytics"],
    queryFn: async function () {
      try {
        let res = await analyticsService.getUserRolesAnalytics();

        return res.data;
      } catch (error) {
        console.log(error?.response?.data?.message);
        return false;
      }
    },
  });

  let {
    data: courseEnrollmentAnalytics,
    isLoading: isLoadingEnrollments,
    error: errorEnrollments,
  } = useQuery({
    queryKey: ["fetchCourseEnrollments"],
    queryFn: async function () {
      try {
        let res = await analyticsService.getCourseEnrollmentAnalytics();

        return res.data;
      } catch (error) {
        console.log(error?.response?.data?.message);
        return false;
      }
    },
  });

  let {
    data: courseRatingsAnalytics,
    isLoading: isLoadingRatings,
    error: errorRatings,
  } = useQuery({
    queryKey: ["fetchCourseRatingAnalytics"],
    queryFn: async function () {
      try {
        let res = await analyticsService.getCourseRatingsAnalytics();

        return res.data;
      } catch (error) {
        console.log(error?.response?.data?.message);
        return false;
      }
    },
  });

  let {
    data: orderRevenueAnalytics,
    isLoading: isLoadingRevenue,
    error: errorRevenue,
  } = useQuery({
    queryKey: ["fetchOrderRevenue",revenueStartDate,revenueEndDate],
    queryFn: async function () {
      try {
        let res = await analyticsService.getOrderRevenue(revenueStartDate,revenueEndDate);

        return res.data;
      } catch (error) {
        console.log(error?.response?.data?.message);

        return false;
      }
    },
  });

  console.log(orderRevenueAnalytics)

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleRevenueStartChange = (e) => {
    setrevenueStartDate(e.target.value)
  }

  const handleRevenueEndChange = (e) => {
    setrevenueEndDate(e.target.value)
  }

  return (
    <div className="flex flex-wrap gap-20">
      <div
        className="p-5 w-[40%]"
        style={{ backgroundColor: "#0d1117", color: "#fff" }}
      >
        {/* Date range selectors */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ marginRight: "1rem" }}>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>

        {/* Render the chart or a loading/error state */}
        {isLoading ? (
          <p>Loading registrations chart...</p>
        ) : error ? (
          <p>Error loading data.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={userRegisterationAnalytics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="_id" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", color: "#000" }}
                labelStyle={{ color: "#000" }}
                itemStyle={{ color: "#000" }}
              />
              <Legend wrapperStyle={{ color: "#ccc" }} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#82ca9d"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* User Roles Pie Chart */}
      <div className="w-[40%]">
        {isLoadingRoles ? (
          <p>Loading user roles chart...</p>
        ) : errorRoles ? (
          <p>Error loading user roles data.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={userRoleAnalytics}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {userRoleAnalytics.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", color: "#000" }}
              />
              <Legend wrapperStyle={{ color: "#ccc" }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Course Enrollments Bar Chart */}

      <div className="w-[40%]">
        {isLoadingEnrollments ? (
          <p>Loading course enrollments chart...</p>
        ) : errorEnrollments ? (
          <p>Error loading course enrollments data.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={courseEnrollmentAnalytics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="title" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", color: "#000" }}
              />
              <Legend wrapperStyle={{ color: "#ccc" }} />
              <Bar dataKey="enrollmentCount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Course Ratings Bar Chart */}

      <div className="w-[40%]">
        {isLoadingRatings ? (
          <p>Loading course ratings chart...</p>
        ) : errorRatings ? (
          <p>Error loading course ratings data.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={courseRatingsAnalytics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="title" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", color: "#000" }}
              />
              <Legend wrapperStyle={{ color: "#ccc" }} />
              <Bar dataKey="averageRating" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Order Revenue Line Chart */}

      <div className="p-5 w-[40%]">
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ marginRight: "1rem" }}>
            Start Date:
            <input
              type="date"
              value={revenueStartDate}
              onChange={handleRevenueStartChange}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              value={revenueEndDate}
              onChange={handleRevenueEndChange}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>

        {isLoadingRevenue ? (
          <p>Loading order revenue chart...</p>
        ) : errorRevenue ? (
          <p>Error loading order revenue data.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={orderRevenueAnalytics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="_id" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", color: "#000" }}
              />
              <Legend wrapperStyle={{ color: "#ccc" }} />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#ff7300"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Analytics;
