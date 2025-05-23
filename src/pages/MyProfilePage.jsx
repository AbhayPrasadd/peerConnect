import React, { useState, useEffect } from "react";

const MyProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    collegeId: "",
    year: "",
    department: "",
    skills: "",
    projectAreas: "",
    profilePic: null,
  });

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(formData);
    localStorage.setItem("userProfile", JSON.stringify(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {!profile ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-4xl rounded-xl shadow-md p-8 grid md:grid-cols-2 gap-6"
        >
          {/* Left: Image preview */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden shadow">
              {formData.profilePic ? (
                <img
                  src={formData.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">Preview</div>
              )}
            </div>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="text-sm text-gray-600"
            />
          </div>

          {/* Right: Form inputs */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-green-700">Create Profile</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="collegeId"
              placeholder="College ID"
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2"
            />
            <input
              type="text"
              name="year"
              placeholder="Year (e.g. 3rd)"
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2"
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills/Interests (comma separated)"
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />
            <input
              type="text"
              name="projectAreas"
              placeholder="Project Areas (comma separated)"
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Profile Summary</h2>
          {profile.profilePic && (
            <img
              src={profile.profilePic}
              className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
              alt="Profile"
            />
          )}
          <div className="text-left space-y-2 text-gray-700">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>College ID:</strong> {profile.collegeId}</p>
            <p><strong>Year:</strong> {profile.year}</p>
            <p><strong>Department:</strong> {profile.department}</p>
            <p><strong>Skills:</strong> {profile.skills}</p>
            <p><strong>Project Areas:</strong> {profile.projectAreas}</p>
          </div>
          <button
            className="mt-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={() => setProfile(null)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
