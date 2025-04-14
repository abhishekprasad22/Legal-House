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

const ViewCase = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  useEffect(() => {
    fetchCases();
  }, []);

  //   const formatText=(text)=>{
  //     return text.replace(/<think>.*?<\/think>/gs, "").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\*(.*?)\*/g, "<i>$1</i>").replace(/`(.*?)`/g, "<code>$1</code>");
  //   }

  //   const handleViewSummary = async (caseData) => {
  //     setSelectedCase(caseData);
  //     setIsSummarizing(true);
  //     setSummary("");

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/api/v1/summarize",
  //         {
  //           pdfUrl: caseData.case_file_link, // Sending the PDF link
  //         }
  //       );

  //       const op = response.data.output.replace(/<think>.*?<\/think>/gs, "")

  //       setSummary(op || "No summary available.");
  //     } catch (err) {
  //       console.error("Error fetching summary:", err);
  //       setSummary("Failed to load summary.");
  //     }

  //   setIsSummarizing(false);
  // };

  const handleViewSummary = async (caseData) => {
    setSelectedCase(caseData);
    setIsSummarizing(true);
    setSummary("");
    console.log(caseData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/summarize",
        {
          pdfUrl: caseData.case_file_link,
          caseId: caseData.case_id, // Sending case ID for database update
        }
      );

      const op = response.data.output.replace(/<think>.*?<\/think>/gs, "");
      setSummary(op || "No summary available.");

      // Update case status in UI after resolving
      setCases((prevCases) =>
        prevCases.map((c) =>
          c.id === caseData.id
            ? {
              ...c,
              resolve_status: true,
              case_resolve_file_link: response.data.output,
            }
            : c
        )
      );

      // fetchCases()
    } catch (err) {
      console.error("Error fetching summary:", err);
      setSummary("Failed to load summary.");
    }

    setIsSummarizing(false);
  };

  const handleDialogClose = (isOpen) => {
    setIsDialogOpen(isOpen);
    if (!isOpen) {
      fetchCases(); // Fetch cases only when dialog is closed
    }
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
    <div className="p-4 mt-10">
      {/* <h1 className="text-2xl font-bold mb-4">Cases</h1> */}
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 ">Person Name</th>
            <th className="py-2 px-4">Case Name</th>
            <th className="py-2 px-4 ">Case File</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.length > 0 ? (
            cases.map((caseData) => (
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
                  <Dialog onOpenChange={() => fetchCases()}>
                    <DialogTrigger asChild>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => handleViewSummary(caseData)}
                      >
                        Summarize
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
                          />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No unresolved cases found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCase;
