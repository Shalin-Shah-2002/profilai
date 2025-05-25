import React, { useEffect, useState } from "react";
// Assuming useNavigate is available from react-router-dom in your environment.
// If you are not using react-router-dom, you might need to adjust navigation logic.
// import { useNavigate } from "react-router-dom";

// Import the dashboard styles
import "./dashboard.css";
import Upload from "./dash_components/upload"; // Correct path to your Upload component

const Dashboard = () => {
    const [user, setUser] = useState(null);
    // New state to store the analysis result from the backend
    const [analysisResult, setAnalysisResult] = useState(null);

    // Placeholder for navigation. In a real app, you'd use useNavigate from react-router-dom.
    // const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        if (!token) {
            console.log("No token found. Simulating redirection to /");
            // In a real app: navigate("/");
            return;
        }

        // fetch("http://localhost:5000/api/user/me", {
        fetch("https://profil-ai-backend.onrender.com/api/user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setUser(data))
            .catch((error) => {
                console.error("Fetch user failed:", error);
                localStorage.removeItem("token");
                // In a real app: navigate("/");
            });
    }, []);

    // Function to handle analysis data coming from the Upload component
    const handleAnalysisComplete = (analysisData) => {
        setAnalysisResult(analysisData);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary-600 text-lg">Loading user data...</div>
            </div>
        );
    }

    return (
        <div id="webcrumbs" className="min-h-screen bg-purple-100">
            <div className="w-[1080px] bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg p-8 mx-auto my-10 font-sans max-w-full">
                <section className="flex flex-col md:flex-row items-center md:items-start gap-8 pb-10 border-b border-purple-200">
                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
                        <img
                            src="https://media.licdn.com/dms/image/v2/D4D03AQHedWakSNqffw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1732037721590?e=1753920000&v=beta&t=e0lhM6pFauECQ1Nyq5zQ7hEiS9YFYRZeP8g8QOMYayI"
                            alt="Shalin Shah"
                            className="w-full h-full object-cover"
                        // keywords="developer, programmer, software engineer, profile picture, avatar" // Removed keywords as they are not valid HTML attributes
                        />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">👋 Hi, I'm Shalin Shah</h1>
                        <h2 className="text-xl text-purple-600 font-medium mb-4">"Flutter Developer | Web Enthusiast </h2>
                        <p className="text-gray-600 max-w-2xl mb-6">
                        Shalin, a B.Tech Computer Science student at Charotar University, has built Resumi AI using the MERN stack. Powered by Google's Gemini AI, the platform analyzes resumes, extracts skills, and provides intelligent enhancement suggestions. It showcases Shalin's expertise in full-stack development and practical AI integration.


                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a
                                href="https://www.linkedin.com/in/shalin-shah0705/"
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-purple-700 hover:text-purple-800 hover:bg-purple-50 group"
                            >
                                <i className="fa-brands fa-linkedin text-xl group-hover:rotate-12 transition-transform"></i>
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href="https://github.com/Shalin-Shah-2002"
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-purple-700 hover:text-purple-800 hover:bg-purple-50 group"
                            >
                                <i className="fa-brands fa-github text-xl group-hover:rotate-12 transition-transform"></i>
                                <span>GitHub</span>
                            </a>
                            <a
                                href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=2002shalin@gmail.com"
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-purple-700 hover:text-purple-800 hover:bg-purple-50 group"
                            >
                                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                                    mail
                                </span>
                                <span>Contact</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Pass the callback function to the Upload component */}
                <Upload onAnalysisComplete={handleAnalysisComplete} />

                {/* Conditional Rendering of Analysis Results */}
                {analysisResult && (
                    <section className="analysis-section mt-8">
                        <h3 className="text-xl font-bold text-purple-900 mb-4">Resume Analysis Results</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-lg font-semibold text-purple-700 mb-2">Overall Summary:</h4>
                                <p className="text-gray-700 mb-4">{analysisResult.overall_summary}</p>

                                <h4 className="text-lg font-semibold text-purple-700 mb-2">Strengths:</h4>
                                <ul className="list-disc pl-5 text-gray-700 mb-4">
                                    {analysisResult.strengths && analysisResult.strengths.map((item, index) => (
                                        <li key={`strength-${index}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-purple-700 mb-2">Areas for Improvement:</h4>
                                <ul className="list-disc pl-5 text-gray-700 mb-4">
                                    {analysisResult.areas_for_improvement && analysisResult.areas_for_improvement.map((item, index) => (
                                        <li key={`improvement-${index}`}>{item}</li>
                                    ))}
                                </ul>

                                <h4 className="text-lg font-semibold text-purple-700 mb-2">Specific Suggestions:</h4>
                                <ul className="list-disc pl-5 text-gray-700 mb-4">
                                    {analysisResult.specific_suggestions && analysisResult.specific_suggestions.map((item, index) => (
                                        <li key={`suggestion-${index}`}>{item}</li>
                                    ))}
                                </ul>

                                <h4 className="text-lg font-semibold text-purple-700 mb-2">Keyword Suggestions:</h4>
                                <ul className="list-disc pl-5 text-gray-700 mb-4">
                                    {analysisResult.keyword_suggestions && analysisResult.keyword_suggestions.map((item, index) => (
                                        <li key={`keyword-${index}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Display raw output for debugging if there was a parsing error */}
                        {analysisResult.error && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
                                <p className="font-semibold">Analysis Parsing Error:</p>
                                <p>{analysisResult.error}</p>
                                {analysisResult.raw_output && (
                                    <>
                                        <p className="font-semibold mt-2">Raw LLM Output (for debugging):</p>
                                        <pre className="whitespace-pre-wrap break-all text-xs bg-gray-100 p-2 rounded-md overflow-auto max-h-40">{analysisResult.raw_output}</pre>
                                    </>
                                )}
                            </div>
                        )}
                    </section>
                )}

                {/* Other sections of your dashboard */}
                <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-purple-500">
                        <div className="flex items-start justify-between">
                            <h3 className="font-bold text-lg text-gray-800">Recent Projects</h3>
                            <span className="material-symbols-outlined text-purple-500">folder</span>
                        </div>
                        <p className="text-gray-600 mt-2">Check out my latest Flutter and web development projects</p>
                        <button className="mt-4 text-purple-700 hover:text-purple-800 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                            onClick={() => { window.location.href = "https://github.com/Shalin-Shah-2002?tab=repositories" }}>
                            View all projects
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>

                    {/* <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-purple-500">
                        <div className="flex items-start justify-between">
                            <h3 className="font-bold text-lg text-gray-800">Skills & Expertise</h3>
                            <span className="material-symbols-outlined text-purple-500">code</span>
                        </div>
                        <p className="text-gray-600 mt-2">Explore my technical skills and development expertise</p>
                        <button className="mt-4 text-purple-700 hover:text-purple-800 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                            onClick={() => { window.location.href = "" }}>
                            See all skills

                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div> */}

                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-purple-500">
                        <div className="flex items-start justify-between">
                            <h3 className="font-bold text-lg text-gray-800">Blog & Tutorials</h3>
                            <span className="material-symbols-outlined text-purple-500">edit_note</span>
                        </div>
                        <p className="text-gray-600 mt-2">
                            Read my latest articles on Flutter development and web technologies
                        </p>
                        <button
                            onClick={() => { window.location.href = "https://medium.com/@2002shalin" }}
                            className="mt-4 text-purple-700 hover:text-purple-800 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                            Read my blog
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;