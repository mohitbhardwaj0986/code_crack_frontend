import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAiSubmission } from "../store/reducers/submissionSlice";

const AiSubmissionPopup = () => {
  const dispatch = useDispatch();
  const { aiSubmission, submissionLoading } = useSelector(
    (state) => state.submission
  );

  const handleClose = () => {
    dispatch(clearAiSubmission());
  };

  const shouldShowPopup = aiSubmission !== null || submissionLoading;

  return (
    <>
      {shouldShowPopup && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">
          <div className="bg-[#1f1f1f] text-white max-w-lg w-[90%] sm:w-full p-6 rounded-xl shadow-xl relative animate-fade-in border border-gray-700">
            <button
              className="absolute top-2 right-3 text-xl text-gray-400 hover:text-white transition"
              onClick={handleClose}
              aria-label="Close"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-200">
              AI Submission Result
            </h2>

            {submissionLoading ? (
              <div className="text-center py-6 text-gray-400 font-medium animate-pulse">
                Generating solution...
              </div>
            ) : (
              <div className="text-gray-300 whitespace-pre-wrap overflow-y-auto max-h-[400px] bg-[#2a2a2a] p-4 rounded-md border border-gray-700">
                {aiSubmission?.data || "No solution found."}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AiSubmissionPopup;
