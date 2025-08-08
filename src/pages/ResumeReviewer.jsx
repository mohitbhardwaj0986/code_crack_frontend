import React, { useState } from "react";
import axios from "../axios/axios";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import ReactMarkdown from "react-markdown";
import { UploadCloud, FileText, Loader2 } from "lucide-react";

function ResumeReviewer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [aiFeedback, setAiFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const resumeReviewerFn = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      setAiFeedback("");
      const { data } = await axios.post("/gemini/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
    <div className="min-h-screen bg-gradient-to-br from-[#0d001a] via-[#120022] to-[#050009] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Floating background particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/10 dark:bg-black/40 border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-6xl grid md:grid-cols-2 gap-10"
      >
        {/* Upload Panel */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-3">
              📤 Upload Resume
            </h2>
            <p className="text-gray-300 mb-6">
              Drag & drop or select a file — Supported:{" "}
              <span className="font-medium">Images, PDF</span>
            </p>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-6 transition-colors duration-300 ${
                isDragging
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-gray-500/50"
              }`}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileChange(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center text-gray-400">
                <UploadCloud size={40} className="mb-3 text-purple-400" />
                <p className="text-sm">
                  {selectedFile ? selectedFile.name : "Drop your file here or click to browse"}
                </p>
              </div>
            </div>

            {/* Preview */}
            {previewUrl && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto max-h-80 rounded-xl mt-6 border border-gray-600 shadow-lg"
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
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} /> Analyzing...
              </span>
            ) : (
              "Upload & Review"
            )}
          </Button>
        </div>

        {/* Feedback Panel */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-3">
            🧠 AI Feedback
          </h2>
          <div className="flex-1 bg-black/30 border border-purple-400/40 rounded-xl p-6 overflow-y-auto max-h-[460px] shadow-inner">
            <AnimatePresence>
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="h-4 bg-gray-500/30 rounded animate-pulse" />
                  <div className="h-4 bg-gray-500/30 rounded animate-pulse w-2/3" />
                  <div className="h-4 bg-gray-500/30 rounded animate-pulse w-1/2" />
                </motion.div>
              ) : aiFeedback ? (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="prose prose-invert max-w-none"
                >
                  <ReactMarkdown>{aiFeedback}</ReactMarkdown>
                </motion.div>
              ) : (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400 italic"
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
