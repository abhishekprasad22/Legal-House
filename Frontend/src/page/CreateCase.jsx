import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

const CreateCase = () => {
  const [message, setMessage] = useState("");
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [case_name, setCaseName] = useState("");
  const [caseFile, setCaseFile] = useState(null);

  const handleFileChange = (e) => {
    setCaseFile(e.target.files[0]); // Store selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !user_name ||
      !email ||
      !phone_no ||
      !address ||
      !case_name ||
      !caseFile
    ) {
      toast.error("Please fill all fields and upload a case file.");
      return;
    }

    try {
      // Step 1: Create User
      const userResponse = await axios.post(
        "http://localhost:8000/api/v1/create/user",
        {
          user_name,
          phone_no,
          email,
          address,
        }
      );

      const user_id = userResponse.data.data[0].id; // Get user ID from response

      // Step 2: Upload Case File and Create Case
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("case_name", case_name);
      formData.append("case_file_link", caseFile);

      await axios.post("http://localhost:8000/api/v1/create/case", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("New case created successfully!", {
        description: `${case_name} has been added to your cases.`,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating case. Check console for details.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen dark">
        <Toaster position="top-right" expand={true} richColors />
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Create Case</h2>
          {message && <p className="text-green-500">{message}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              name="user_name"
              placeholder="Full Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              name="email"
              placeholder="Email"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              name="phone_no"
              placeholder="Phone"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="number"
              onChange={(e) => setPhoneNo(e.target.value)}
            />

            <input
              name="address"
              placeholder="Address"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              name="case_name"
              placeholder="Case Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              onChange={(e) => setCaseName(e.target.value)}
            />

            {/* PDF Upload Input */}
            <label className="text-gray-200 mb-2" htmlFor="caseFile">
              Upload Case File (PDF)
            </label>
            <input
              id="caseFile"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              Create Case
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCase;
