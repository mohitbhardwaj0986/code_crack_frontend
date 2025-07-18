import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "../axios/axios";
import { asyncGetSingleQuestion } from "../store/actions/questionAction";
import { useDispatch, useSelector } from "react-redux";

function SingleQuestion() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleQuestion, questionLoading } = useSelector(
    (state) => state.question
  );

  const [code, setCode] = useState("");
  const [result, setResult] = useState([]);
  const [submission, setSubmission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const supportedLanguages = ["JavaScript"];
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    dispatch(asyncGetSingleQuestion(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (singleQuestion?.starterCode) {
      setCode(singleQuestion.starterCode);
    }
  }, [singleQuestion]);

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
        }
      }
    } catch (err) {
      console.error(err);
      setResult([
        { error: err.response?.data?.message || "Execution failed" },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (questionLoading || !singleQuestion)
    return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="h-screen pt-20 w-full bg-black text-white flex">
      {/* LEFT PANEL */}
      <div className="w-1/2 p-6 overflow-y-auto space-y-4 border-r border-gray-800">
        <h1 className="text-3xl font-bold">{singleQuestion.title}</h1>

        {/* Tabs */}
        <div className="flex space-x-4 text-sm border-b border-gray-700 mb-2">
          {["description", "constraints", "examples"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 capitalize transition duration-200 ${
                activeTab === tab
                  ? "border-b-2 border-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "description" && (
          <p className="whitespace-pre-wrap text-gray-300">
            {singleQuestion.description}
          </p>
        )}
        {activeTab === "constraints" && (
          <p className="whitespace-pre-wrap text-gray-300">
            {singleQuestion.constraints}
          </p>
        )}
        {activeTab === "examples" && (
          <div className="space-y-2">
            {singleQuestion.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-700 rounded p-3"
              >
                <pre className="whitespace-pre-wrap text-sm">{ex}</pre>
              </div>
            ))}
          </div>
        )}

        {/* Meta Info */}
        <div className="text-sm space-y-1 pt-4">
          <p>
            <span className="font-semibold">Difficulty:</span>{" "}
            {singleQuestion.difficulty}
          </p>
          <p>
            <span className="font-semibold">Tags:</span>{" "}
            {singleQuestion.tags.join(", ")}
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 p-6 overflow-y-auto flex flex-col gap-4">
        {/* Code Editor */}
        <div className="flex-1 border border-gray-700 rounded bg-[#111] p-2">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={(val) => setCode(val)}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
            }}
          />
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-4">
          <label htmlFor="language" className="text-sm text-gray-300">
            Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleRunOrSubmit("run")}
            disabled={isSubmitting}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? "Running..." : "Run Code"}
          </button>
          <button
            onClick={() => handleRunOrSubmit("submit")}
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Code"}
          </button>
        </div>

        {/* Test Results */}
        <div className="bg-[#111] p-4 rounded border border-gray-700">
          <h3 className="text-lg font-bold mb-2">Test Results:</h3>
          {result.length === 0 ? (
            <p className="text-gray-400">No result yet</p>
          ) : (
            result.map((r, i) => (
              <div key={i} className="mb-1">
                {typeof r === "string" ? (
                  <p>
                    Test Case {i + 1}:{" "}
                    <span
                      className={
                        r.includes("✅")
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {r}
                    </span>
                  </p>
                ) : r.error ? (
                  <p className="text-red-500">Error: {r.error}</p>
                ) : null}
              </div>
            ))
          )}

          {/* Submission Summary */}
          {submission && (
            <div className="mt-4">
              <p>
                <span className="font-semibold">Submission Status:</span>{" "}
                <span
                  className={
                    submission.status === "passed"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {submission.status === "passed" ? "Accepted ✅" : "Failed ❌"}
                </span>
              </p>
              <p>
                <span className="font-semibold">Score:</span>{" "}
                <span className="text-yellow-400">{submission.score}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleQuestion;
