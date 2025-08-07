import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAiSubmission } from "../store/reducers/submissionSlice";
import ReactMarkdown from "react-markdown";

const AiSubmissionPopup = () => {
  const dispatch = useDispatch();
  const { aiSubmission, aisubmissionLoading } = useSelector(
    (state) => state.submission
  );

  const handleClose = () => {
    dispatch(clearAiSubmission());
  };

  const shouldShowPopup = aiSubmission !== null || aisubmissionLoading;

  return (
    <>
      {shouldShowPopup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[#0C0415] text-white max-w-xl w-[90%] p-6 rounded-2xl shadow-2xl border border-[#9005B6] animate-fade-in relative">
            
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-white transition-colors"
              onClick={handleClose}
              aria-label="Close"
            >
              ✖
            </button>

            {/* Heading */}
            <h2 className="text-2xl font-bold mb-4 text-center text-[#9005B6]">
              AI Submission Result
            </h2>

            {/* Loader or Response */}
            {aisubmissionLoading ? (
              <div className="text-center py-6 text-gray-400 font-medium animate-pulse">
                Generating solution...
              </div>
            ) : (
              <div className="prose prose-invert max-w-none overflow-y-auto max-h-[400px] bg-[#23003B] text-[#E5DBF5] p-4 rounded-md border border-[#9005B6] text-sm">
                <ReactMarkdown>
                  {aiSubmission?.data || "No solution found."}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AiSubmissionPopup;
