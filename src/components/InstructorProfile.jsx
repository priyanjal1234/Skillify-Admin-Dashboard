import React from "react";

const InstructorProfile = ({instructor,setShowProfile}) => {
    console.log(instructor)
    return (
        <div>
        <div>
            <h1 className="text-2xl font-semibold mb-5">
            Profile of {instructor?.name}
            </h1>
            <h2 className="text-lg mb-3">Name: {instructor?.name}</h2>
            <h2 className="text-lg mb-3">Email: {instructor?.email}</h2>
            <h2 className="text-lg mb-3">Role: {instructor?.role}</h2>

            <button
            onClick={() => setShowProfile(false)}
            className="px-3 py-2 bg-slate-700 rounded-lg"
            >
            Go back
            </button>
        </div>
        </div>
    );
};

export default InstructorProfile;
