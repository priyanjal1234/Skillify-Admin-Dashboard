import { useQuery } from "@tanstack/react-query";
import { Mail, Clock, Eye, Trash } from "lucide-react";
import React, { useState } from "react";
import instructorService from "../services/Instructor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import InstructorProfile from "./InstructorProfile";

dayjs.extend(relativeTime);

const Instructors = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [instructor, setInstructor] = useState({});
  const [showProfile, setShowProfile] = useState(false);

  const { data, refetch: refetchInstructorDetails } = useQuery({
    queryKey: ["fetchInstructorDetails", page],
    queryFn: async () => {
      try {
        const instructorDetailsRes =
          await instructorService.getInstructorDetails(page, 5);

        return instructorDetailsRes.data;
      } catch (error) {
        console.error(error?.response?.data?.message);
        return false;
      }
    },
  });

  function handleViewProfile(instructorId) {
    setShowProfile(true);
    const instructorData = data?.instructors?.find(
      (instr) => instr?._id === instructorId
    );
    if (instructorData) {
      setInstructor(instructorData);
    }
  }

  async function handleDeleteInstructor(instructorId) {
    try {
      await instructorService.deleteInstructor(instructorId);
      toast.success("Instructor Deleted Successfully");
      refetchInstructorDetails();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="p-6">
      {showProfile ? (
        <InstructorProfile
          setShowProfile={setShowProfile}
          instructor={instructor}
        />
      ) : (
        <>
          {data?.instructors?.length > 0 ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Instructors
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Manage and monitor instructor information
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
                        All Instructors
                      </button>
                      {/* Additional filters can be added here */}
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        <th className="py-4 px-6">Instructor</th>
                        <th className="py-4 px-6">Contact</th>
                        <th className="py-4 px-6">Created Courses</th>
                        <th className="py-4 px-6">Join Date</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.instructors?.map((instr) => (
                        <tr
                          key={instr?._id}
                          className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <img
                                src={instr?.profileImage}
                                alt={instr.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {instr?.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {instr?.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Mail className="w-4 h-4 mr-2" />
                                {instr?.email}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              {instr?.createdCourses?.length} courses
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="w-4 h-4 mr-2" />
                              {dayjs(instr?.dateJoined).fromNow()}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                instr.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {instr?.createdCourses?.length > 0
                                ? "active"
                                : "inactive"}
                            </span>
                          </td>
                          <td className="py-4 px-6 flex space-x-2">
                            <button
                              onClick={() => handleViewProfile(instr?._id)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                              <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                            {instr?.email !== "priyanjal362@gmail.com" && (
                              <button
                                onClick={() =>
                                  handleDeleteStudent(student?._id)
                                }
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                              >
                                <Trash className="w-5 h-5 text-red-600 dark:text-red-400" />
                              </button>
                            )}
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
                      <span className="font-medium">{data?.page || page}</span>{" "}
                      of{" "}
                      <span className="font-medium">{data?.pages || "-"}</span>,
                      total{" "}
                      <span className="font-medium">{data?.total || "-"}</span>{" "}
                      instructors.
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
            <p>No Instructors Yet</p>
          )}
        </>
      )}
    </div>
  );
};

export default Instructors;
