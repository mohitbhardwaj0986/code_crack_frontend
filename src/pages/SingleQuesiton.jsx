import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "../axios/axios";
import { toast } from "sonner";
import { asyncGetSingleQuestion } from "../store/actions/questionAction";
import {
  asyncAiSubmission,
  asyncGetUserSubmissionsForQuestion,
} from "../store/actions/submissionAciton";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { clearAiSubmission } from "../store/reducers/submissionSlice";
import AiSubmissionPopup from "../components/AiSubmissionPopup";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import { BiCopy, BiArrowBack } from "react-icons/bi";

export default function SingleQuestion() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleQuestion, questionLoading } = useSelector(
    (state) => state.question
  );
  const { user } = useSelector((state) => state.user);
  const { getUserSubmissionsForQuestion } = useSelector(
    (state) => state.submission
  );

  // Editor & UI state
  const [code, setCode] = useState("");
  const [result, setResult] = useState([]);
  const [submission, setSubmission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showPreviousSubmissions, setShowPreviousSubmissions] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const supportedLanguages = useMemo(() => ["javascript"], []);

  useEffect(() => {
    // Load question
    dispatch(asyncGetSingleQuestion(id));
    return () => {
      // cleanup if any
      dispatch(clearAiSubmission());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (singleQuestion?.starterCode) setCode(singleQuestion.starterCode);
  }, [singleQuestion]);

  useEffect(() => {
    if (user?._id && id) dispatch(asyncGetUserSubmissionsForQuestion(user._id, id));
  }, [user, id, dispatch]);

  const handleRunOrSubmit = async (type = "run") => {
    setIsSubmitting(true);
    setResult([]);
    setSubmission(null);

    try {
      const res = await axios.post(`/submission/create/${id}`, {
        code,
        language,
        type,
      });

      const data = res.data?.data;
      if (data) {
        setResult(data.result || []);
        if (type === "submit" && data.submission) {
          setSubmission({
            status: data.submission.status,
            score: data.submission.score,
          });

          // refresh user's submissions list
          dispatch(asyncGetUserSubmissionsForQuestion(user._id, id));
        }
      }
    } catch (err) {
      console.error(err);
      setResult([{ error: err.response?.data?.message || "Execution failed" }]);
      toast.error(err.response?.data?.message || "Execution failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlegetAiSubmission = () => {
    // Build prompt (you might want to refine)
    const predata = { pre: "generate a clear JS solution:", post: singleQuestion.description || "" };
    const data = `${predata.pre} ${predata.post}`;
    dispatch(asyncAiSubmission(data));
  };

  const getSubmissionCode = (sid) => {
    const newSub = getUserSubmissionsForQuestion?.filter((sub) => sub._id === sid);
    if (!newSub || newSub.length === 0) {
      toast.error("Submission not found");
      return;
    }
    setCode(newSub[0]?.code || singleQuestion.starterCode);
    toast.success("Loaded code into editor");
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  // Loading guard
  if (questionLoading || !singleQuestion) return <Loading />;

  return (
    <>
      {/* local helper CSS so no extra stylesheet needed */}
      <style>{`
        /* hide scrollbars but keep scroll */
        .cc-hide-scrollbar {
          -ms-overflow-style: none; /* IE, Edge */
          scrollbar-width: none; /* Firefox */
        }
        .cc-hide-scrollbar::-webkit-scrollbar { display: none; } /* Chrome, Safari, Opera */

        /* subtle glow utility */
        .cc-glow {
          box-shadow: 0 6px 24px rgba(140,62,193,0.08), 0 2px 6px rgba(236,72,153,0.04);
        }

        /* responsive editor min height */
        @media (max-width: 880px) {
          .cc-editor-h { height: 360px !important; }
        }
      `}</style>

      <div className="min-h-screen pb-12 bg-gradient-to-b from-[#0C0414] via-[#12021f] to-[#07030a] text-white">
        <AiSubmissionPopup />

        {/* Page container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">

          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-md bg-transparent hover:bg-white/5 transition cc-glow"
                aria-label="Back"
              >
                <BiArrowBack className="w-5 h-5 text-[#d9c3f7]" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {singleQuestion.title}
                </h1>
                <div className="text-sm text-gray-400 mt-1">
                  <span className="mr-3">Difficulty: <span className="text-white font-medium">{singleQuestion.difficulty}</span></span>
                  <span>Tags: <span className="text-white font-medium">{singleQuestion.tags?.join(", ")}</span></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => { setShowPreviousSubmissions(!showPreviousSubmissions); }}
                className="hidden sm:inline-flex bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] hover:opacity-95"
              >
                {showPreviousSubmissions ? "Hide Submissions" : "Your Submissions"}
              </Button>

              <div className="flex items-center gap-2">
                <select
                  aria-label="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-[#12021f] text-white px-3 py-2 rounded-md border border-[#2c1536]"
                >
                  {supportedLanguages.map((l) => (
                    <option key={l} value={l.toLowerCase()}>
                      {l}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={() => handleRunOrSubmit("run")}
                  className="bg-[#1f2f3d] hover:bg-[#243142] px-4 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Running..." : "Run"}
                </Button>
                <Button
                  onClick={() => handleRunOrSubmit("submit")}
                  className="bg-gradient-to-r from-[#00d68f] to-[#7ee3a8] text-black px-4 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>

          {/* layout: left/details + right/editor on desktop; stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: details (spans 5/12 on large screens) */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-5"
            >
              <div className="bg-[#0f0817] rounded-2xl p-5 cc-glow border border-[#2a1735]">
                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                  {["description", "constraints", "examples"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                        activeTab === t
                          ? "bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-black"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="text-gray-300 text-sm leading-relaxed cc-hide-scrollbar" style={{ maxHeight: 320, overflowY: "auto" }}>
                  {activeTab === "description" && (
                    <div className="whitespace-pre-wrap">{singleQuestion.description}</div>
                  )}
                  {activeTab === "constraints" && (
                    <div className="whitespace-pre-wrap">{singleQuestion.constraints}</div>
                  )}
                  {activeTab === "examples" && (
                    <div className="space-y-3">
                      {(singleQuestion.examples || []).map((ex, i) => (
                        <div key={i} className="bg-[#0b0710] p-3 rounded-md border border-[#1f1226]">
                          <pre className="whitespace-pre-wrap text-sm text-gray-200">{ex}</pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* meta & actions */}
                <div className="mt-4 border-t border-[#231129] pt-4 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2d0d3b] border border-[#3b1851] text-[#e9d6ff]">Company: {singleQuestion.company || "General"}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#2d0d3b] border border-[#3b1851] text-[#ffd79a]">Difficulty: {singleQuestion.difficulty}</span>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button onClick={() => copyToClipboard(singleQuestion.description)} className="bg-[#1d1330] text-sm px-3">Copy Prompt</Button>
                    <Button onClick={() => handlegetAiSubmission()} className="bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-sm px-3">AI Suggest</Button>
                  </div>

                  {/* show/hide previous submissions toggle for mobile */}
                  <div className="sm:hidden mt-2">
                    <Button onClick={() => setShowPreviousSubmissions(!showPreviousSubmissions)} className="w-full">{showPreviousSubmissions ? "Hide Submissions" : "Show Submissions"}</Button>
                  </div>

                  {/* Previous Submissions (collapsible) */}
                  {showPreviousSubmissions && (
                    <div className="mt-3 bg-[#08060a] rounded-md border border-[#1f1226] p-3 cc-hide-scrollbar" style={{ maxHeight: 240, overflowY: "auto" }}>
                      <h4 className="text-sm font-semibold mb-2">Your Submissions</h4>
                      {getUserSubmissionsForQuestion?.length === 0 ? (
                        <p className="text-gray-400">No submissions yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {getUserSubmissionsForQuestion.map((sub) => (
                            <div key={sub._id} className="flex items-start justify-between gap-3 bg-[#0b0810] p-3 rounded-md border border-[#221229]">
                              <div className="text-xs">
                                <div><span className="text-gray-400">Lang:</span> <span className="text-white">{sub.language}</span></div>
                                <div><span className="text-gray-400">Status:</span> <span className={sub.status === "passed" ? "text-green-400" : "text-red-400"}>{sub.status}</span></div>
                                <div><span className="text-gray-400">Score:</span> <span className="text-yellow-400">{sub.score}</span></div>
                                <div className="text-xs text-gray-500 mt-1">{new Date(sub.createdAt).toLocaleString()}</div>
                              </div>
                              <div className="flex flex-col gap-2 items-end">
                                <button onClick={() => getSubmissionCode(sub._id)} className="text-sm text-[#c9b3ff] hover:underline">Load</button>
                                <button onClick={() => copyToClipboard(sub.code || "")} className="text-sm text-gray-400">Copy</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right: editor & results (spans 7/12 on large screens) */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="lg:col-span-7"
            >
              <div className="bg-[#0f0817] rounded-2xl p-4 cc-glow border border-[#2a1735]">
                <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-300">Editor</div>
                    <button onClick={() => copyToClipboard(code)} title="Copy code" className="p-1 rounded-md text-gray-300 hover:bg-white/5">
                      <BiCopy />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 hidden sm:inline">Auto-run & submit from the editor</span>
                    {/* Run/Submit buttons duplicated for convenience */}
                    <Button onClick={() => handleRunOrSubmit("run")} className="bg-[#1f2f3d] px-3 py-1" disabled={isSubmitting}>
                      {isSubmitting ? "Running..." : "Run"}
                    </Button>
                    <Button onClick={() => handleRunOrSubmit("submit")} className="bg-gradient-to-r from-[#00d68f] to-[#7ee3a8] text-black px-3 py-1" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                    <Button onClick={handlegetAiSubmission} className="bg-[#8b5cf6] px-3 py-1 hidden sm:inline-flex">AI</Button>
                  </div>
                </div>

                {/* Editor container */}
                <div className="rounded-md overflow-hidden border border-[#231129]">
                  <div className="h-[300px] cc-editor-h">
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      theme="vs-dark"
                      value={code}
                      onChange={(val) => setCode(val)}
                      options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        wordWrap: "on",
                        automaticLayout: true,
                      }}
                    />
                  </div>
                </div>

                {/* Results & submission summary */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Results */}
                  <div className="bg-[#0b0710] p-4 rounded-md border border-[#1f1226] cc-hide-scrollbar" style={{ maxHeight: 220, overflowY: "auto" }}>
                    <h3 className="text-sm font-semibold mb-2">Test Results</h3>
                    {result.length === 0 ? (
                      <p className="text-gray-400">No result yet</p>
                    ) : (
                      <div className="space-y-2 text-sm">
                        {result.map((r, i) => (
                          <div key={i} className="flex justify-between items-start gap-2">
                            {r?.error ? (
                              <div className="text-red-400">Error: {r.error}</div>
                            ) : (
                              <div className={typeof r === "string" && r.includes("✅") ? "text-green-400" : "text-red-400"}>
                                {typeof r === "string" ? r : JSON.stringify(r)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submission summary */}
                  <div className="bg-[#0b0710] p-4 rounded-md border border-[#1f1226]">
                    <h3 className="text-sm font-semibold mb-2">Submission Summary</h3>
                    {!submission ? (
                      <p className="text-gray-400">No submission yet</p>
                    ) : (
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-300">Status:</span>{" "}
                          <span className={submission.status === "passed" ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                            {submission.status === "passed" ? "Accepted ✅" : "Failed ❌"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-300">Score:</span>{" "}
                          <span className="text-yellow-400 font-semibold">{submission.score}</span>
                        </div>
                      </div>
                    )}

                    {/* quick actions */}
                    <div className="mt-4 space-y-2">
                      <button
                        onClick={() => {
                          setCode(singleQuestion.starterCode || "");
                          toast.success("Reset to starter code");
                        }}
                        className="w-full text-sm px-3 py-2 rounded-md bg-transparent border border-[#231129] hover:bg-white/3"
                      >
                        Reset to Starter Code
                      </button>
                      <button
                        onClick={() => {
                          toast("Feature coming: download code");
                        }}
                        className="w-full text-sm px-3 py-2 rounded-md bg-transparent border border-[#231129] hover:bg-white/3"
                      >
                        Download Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
