import { useQuery } from "@tanstack/react-query";
import { Filter, Mail, Phone, Clock, Eye, Trash } from "lucide-react";
import React, { useState } from "react";
import studentService from "../services/Student";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import StudentProfile from "./StudentProfile";
import { toast } from "react-toastify";

dayjs.extend(relativeTime);

const Students = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [student, setStudent] = useState({});
  const [showProfile, setShowProfile] = useState(false);

  const { data, refetch: refetchStudentDetails } = useQuery({
    queryKey: ["fetchStudentDetails", page],
    queryFn: async function () {
      try {
        let studentDetailsRes = await studentService.getStudentDetails(page, 5);
        return studentDetailsRes.data;
      } catch (error) {
        console.log(error?.response?.data?.message);
        return false;
      }
    },
  });

  function handleViewProfile(studentId) {
    setShowProfile(true);
    let studentData = data?.students?.find(
      (student) => student?._id === studentId
    );
    if (studentData) {
      setStudent(studentData);
    }
  }

  async function handleDeleteStudent(studentId) {
    try {
      await studentService.deleteStudent(studentId);
      toast.success("Student Deleted Successfully");
      refetchStudentDetails();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="p-6">
      {showProfile ? (
        <StudentProfile setShowProfile={setShowProfile} student={student} />
      ) : (
        <>
          {data?.students?.length > 0 ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Students
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Manage and monitor student information
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                {/* Filters and Actions */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedFilter("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedFilter === "all"
                            ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        All Students
                      </button>
                      <button
                        onClick={() => setSelectedFilter("active")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedFilter === "active"
                            ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => setSelectedFilter("inactive")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          selectedFilter === "inactive"
                            ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        <th className="py-4 px-6">Student</th>
                        <th className="py-4 px-6">Contact</th>
                        <th className="py-4 px-6">Enrolled Courses</th>
                        <th className="py-4 px-6">Join Date</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.students?.map((student) => (
                        <tr
                          key={student._id}
                          className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <img
                                src={student?.profileImage}
                                alt={student.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {student.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {student.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Mail className="w-4 h-4 mr-2" />
                                {student.email}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              {student?.enrolledCourses?.length} courses
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="w-4 h-4 mr-2" />
                              {dayjs(student?.dateJoined).fromNow()}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                student.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {student?.enrolledCourses?.length > 0
                                ? "active"
                                : "inactive"}
                            </span>
                          </td>
                          <td className="py-4 px-6 flex space-x-2">
                            <button
                              onClick={() => handleViewProfile(student?._id)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                              <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student?._id)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                              <Trash className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Showing page{" "}
                      <span className="font-medium">{data?.page || page}</span> of{" "}
                      <span className="font-medium">{data?.pages || "-"}</span>, total{" "}
                      <span className="font-medium">{data?.total || "-"}</span>{" "}
                      students.
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        disabled={data && page >= data.pages}
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>No Students Yet</p>
          )}
        </>
      )}
    </div>
  );
};

export default Students;
