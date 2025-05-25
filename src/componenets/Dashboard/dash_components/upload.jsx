// dash_components/upload.jsx
import React, { useState } from "react";

const Upload = ({ onAnalysisComplete }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [analysisLoading, setAnalysisLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadStatus("");
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("Please select a PDF file first.");
            return;
        }

        setAnalysisLoading(true);
        setUploadStatus("Uploading and analyzing resume...");

        const formData = new FormData();
        formData.append("pdf", selectedFile);

        try {
            const response = await fetch("http://localhost:5000/api/pdf/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (parseError) {
                    console.error("Failed to parse backend error response as JSON:", parseError);
                    throw new Error(`Server responded with non-JSON (likely HTML) status ${response.status}. Check backend logs.`);
                }
                throw new Error(errorData.details || errorData.error || `Upload failed with status ${response.status}`);
            }

            const data = await response.json();
            setUploadStatus("Resume analyzed successfully!");
            console.log("Full Analysis Data from Backend:", data);

            if (onAnalysisComplete) {
                onAnalysisComplete(data.analysis);
            }

        } catch (error) {
            console.error("Error during file upload or analysis:", error);
            setUploadStatus(`Error: ${error.message}`);
        } finally {
            setSelectedFile(null);
            setAnalysisLoading(false);
        }
    };

    return (
        <section className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-purple-500 mt-8">
            <div className="flex items-start justify-between">
                <h3 className="font-bold text-lg text-gray-800">Upload Your Resume</h3>
                <span className="material-symbols-outlined text-purple-500">upload_file</span>
            </div>
            <p className="text-gray-600 mt-2">Upload your PDF resume to get instant analysis and improvement suggestions.</p>

            <div className="mt-4 flex flex-col gap-4">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100"
                />
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || analysisLoading}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full
                    shadow-md hover:bg-purple-700 transition-colors duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                    {analysisLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-lg">cloud_upload</span>
                            Upload & Analyze
                        </>
                    )}
                </button>
                {uploadStatus && (
                    <p className={`mt-2 text-sm ${uploadStatus.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>
                        {uploadStatus}
                    </p>
                )}
            </div>
        </section>
    );
};

export default Upload;