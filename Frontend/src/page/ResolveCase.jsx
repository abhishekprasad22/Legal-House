import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { marked } from "marked";

const ResolveCase = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/view/view-resolve"
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

    fetchCases();
  }, []);

  const handleViewSummary = async (caseData) => {
    setSelectedCase(caseData);
    setIsSummarizing(true);
    setSummary("");

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/view/get-summary?id=${caseData.case_id}`
      );
      console.log(response);
      const op =
        response.data.data.case_resolve_file_link || "No summary available."; // Assuming there's a 'summary' field
      const fop = op.replace(/<think>.*?<\/think>/gs, "");

      setSummary(fop);
    } catch (err) {
      console.error("Error fetching summary:", err);
      setSummary("Failed to load summary.");
    }

    setIsSummarizing(false);
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">Loading cases...</div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="p-4">
        {/* <h1 className="text-2xl font-bold mb-4">Cases</h1> */}
        <table className="min-w-full mt-10 bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 ">Person Name</th>
              <th className="py-2 px-4 ">Case Name</th>
              <th className="py-2 px-4 ">Case File</th>
              <th className="py-2 px-4 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseData) => (
              <tr key={caseData.id} className="border-t">
                <td className="py-2 px-4">{caseData.user_name}</td>
                <td className="py-2 px-4">{caseData.case_name}</td>
                <td className="py-2 px-4">
                  <a
                    href={`http://localhost:8000` + caseData.case_file_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View File
                  </a>
                </td>
                <td className="py-2 px-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => handleViewSummary(caseData)}
                      >
                        View Summary
                      </button>
                    </DialogTrigger>
                    <DialogContent className="w-9/12 h-5/6 max-w-none max-h-none">
                      <DialogHeader>
                        <DialogTitle>Case Summary</DialogTitle>
                        <DialogDescription>
                          <p>
                            <strong>Person Name:</strong>{" "}
                            {selectedCase?.user_name}
                          </p>
                          <p>
                            <strong>Case Name:</strong>{" "}
                            {selectedCase?.case_name}
                          </p>
                          <p>
                            <strong>Details:</strong>
                          </p>
                          <textarea
                            readOnly
                            className="w-full mt-3 h-96 p-4 border rounded-md bg-gray-100 text-gray-700"
                            value={isSummarizing ? "Summarizing..." : summary}
                          // dangerouslySetInnerHTML={isSummarizing?"Summarizing":{__html:marked(summary)}}
                          ></textarea>

                          {/* {isSummarizing ? (
                            <p className="mt-3 text-gray-600">Summarizing...</p>
                          ) : (
                            <div
                              className="w-full mt-3 p-4 border rounded-md  overflow-hidden bg-gray-100 text-gray-700"
                              dangerouslySetInnerHTML={{
                                __html: marked(summary),
                              }}
                            />
                          )} */}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResolveCase;
