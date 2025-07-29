import React, { useState } from "react";
import axios from "../axios/axios";
import { motion, AnimatePresence } from "framer-motion";
import Button from '../components/Button'
function ResumeReviewer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [aiFeedback, setAiFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
     
      
    } else {
      setPreviewUrl(null);
    }
  };

  const resumeReviewerFn = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const { data } = await axios.post("/gemini/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setAiFeedback(data?.data || data);
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      setAiFeedback("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#150024] to-[#0B0414] dark:text-white flex
     items-center justify-center px-4 py-12">
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 dark:bg-[#2a2a2e]/50 backdrop-blur-lg rounded-[2rem] shadow-2xl p-10 max-w-6xl w-full grid md:grid-cols-2 gap-10 border border-gray-200 dark:border-gray-700"
      >
        
        {/* Upload Panel */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-4">📤 Upload Resume</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Supported formats: <span className="font-medium">Image, PDF</span>
            </p>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-[#1c1c1e] text-sm dark:text-white"
            />
            {previewUrl && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto max-h-80 rounded-xl mt-6 border dark:border-gray-500"
              />
            )}
          </div>

          <Button
            whileTap={{ scale: 0.95 }}
            onClick={resumeReviewerFn}
            disabled={loading || !selectedFile}
            className={`mt-8 py-3 rounded-xl font-bold text-white text-lg transition duration-300 shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:brightness-110"
            }`}
          >
            {loading ? "Analyzing..." : "Upload & Review"}
          </Button>
        </div>

        {/* Feedback Panel */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-extrabold text-purple-700 dark:text-purple-400 mb-4">🧠 AI Feedback</h2>
          <div className="flex-1 bg-white dark:bg-[#1c1c1e] border border-dashed border-purple-300 dark:border-purple-600 rounded-xl p-6 overflow-y-auto max-h-[460px] shadow-inner">
            <AnimatePresence>
              {loading ? (
                <motion.p
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-indigo-500 dark:text-indigo-300 font-medium animate-pulse"
                >
                  Thinking... Generating insights from your resume...
                </motion.p>
              ) : aiFeedback ? (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200"
                >
                  {aiFeedback}
                </motion.div>
              ) : (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400 italic dark:text-gray-500"
                >
                  Upload your resume to receive AI-powered feedback instantly.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ResumeReviewer;
