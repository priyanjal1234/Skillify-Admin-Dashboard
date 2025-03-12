import React from "react";

const StudentProfile = ({ student, setshowProfile }) => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold mb-5">
          Profile of {student?.name}
        </h1>
        <h2 className="text-lg mb-3">Name: {student?.name}</h2>
        <h2 className="text-lg mb-3">Email: {student?.email}</h2>
        <h2 className="text-lg mb-3">Role: {student?.role}</h2>

        <button
          onClick={() => setshowProfile(false)}
          className="px-3 py-2 bg-slate-700 rounded-lg"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
