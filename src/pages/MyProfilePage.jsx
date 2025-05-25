import React, { useState, useEffect } from "react";

const MyProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    university: "",
    course: "",
    skills: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(null);

  // Load from localStorage on first render
  useEffect(() => {
    const savedData = localStorage.getItem("studentProfile");
    const savedImage = localStorage.getItem("profileImage");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setSubmitted(true);
    }
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.setItem("studentProfile", JSON.stringify(formData));
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  return (
    <div className="max-w-10xl mx-auto mt-6 mb-10 p-6">
      {!submitted ? (
        <>
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
            Student Profile Form
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            {/* Image Upload Section */}
            <div className="md:col-span-2 flex flex-col items-center space-y-4">
              {image ? (
                <img src={image} alt="Profile" className="w-55 h-55 rounded-full object-cover border border-blue-300" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-sm">
                  No Image
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-gray-600" />
            </div>

            {/* Form Fields */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Full Name", name: "name", placeholder: "John Doe" },
                { label: "Age", name: "age", placeholder: "22" },
                { label: "Gender", name: "gender", type: "select" },
                { label: "Email", name: "email", placeholder: "email@example.com" },
                { label: "Phone", name: "phone", placeholder: "+91 9876543210" },
                { label: "Address", name: "address", placeholder: "City, State" },
                { label: "University", name: "university", placeholder: "ABC University" },
                { label: "Course", name: "course", placeholder: "B.Tech CSE" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-1 text-blue-700">{field.label}</label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              ))}

              {/* Skills Textarea spans both columns */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-blue-700">Skills (comma separated)</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, Python"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-800">Profile Summary</h2>

          <div className="flex justify-center">
            {image && (
              <img
                src={image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border border-blue-300"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                <div className="text-sm text-blue-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                <div className="text-base font-medium text-blue-800">{value || "N/A"}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition duration-200"
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
