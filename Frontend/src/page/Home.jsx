import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Search,
  Plus,
  ArrowRight,
  Building2,
  Users,
  FileText,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [cases, setCases] = useState([]);
  const [resolveCases, setResolveCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/view/view"
        );
        console.log(response);
        setCases(response.data.data); // Extracting the cases from API response
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cases:", err);
        setError("Failed to fetch cases. Please try again later.");
        setLoading(false);
      }
    };

    const fetchResolveCases = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/view/view-resolve"
        );
        console.log(response);
        setResolveCases(response.data.data); // Extracting the cases from API response
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cases:", err);
        setError("Failed to fetch cases. Please try again later.");
        setLoading(false);
      }
    };

    fetchCases();
    fetchResolveCases();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">Loading cases...</div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mt-10 container mx-auto px-6 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">Active Cases</p>
              <p className="text-2xl font-bold">{cases.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Resolved Cases</p>
              <p className="text-2xl font-bold">{resolveCases.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold">{cases.length + resolveCases.length}</p>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center flex-col">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-blue-600" />
              Create New Case
            </h2>
            <p className="text-gray-600 mb-4">
              Start a new legal case by filling out the essential information.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center">
              <Link to="/create-case" className="flex justify-center items-center">New Case
                <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </button>
          </div>
        </div>

        {/* Recent Cases Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Cases</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className=" py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Case Title</th>
                  <th className=" py-3 px-4">Document</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {cases.length > 0 ? (cases.slice(0, 3).map((caseData) => (
                  <tr key={caseData.id} className="border-t">
                    <td className="py-2 px-4">{caseData.user_name}</td>
                    <td className="py-2 px-4">{caseData.case_name}</td>
                    <td className="py-2 px-4">
                      <a
                        href={`http://localhost:5000` + caseData.case_file_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View File
                      </a>
                    </td>
                    <td className="py-2 px-4">
                      {caseData.creation_timestamp.slice(0, 10)}
                    </td>
                  </tr>
                ))) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No unresolved cases found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
