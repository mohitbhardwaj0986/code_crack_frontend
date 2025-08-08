import React, { useEffect, useState, useRef } from "react";
import { BsFillCheckCircleFill, BsCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetQuestionsByPage } from "../store/actions/questionAction";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { clearQuestions } from "../store/reducers/questionSlice";
import { FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function Problems() {
  const dispatch = useDispatch();
  const { questions, questionLoading } = useSelector((state) => state.question);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(asyncGetQuestionsByPage());
    return () => {
      dispatch(clearQuestions());
    };
  }, [dispatch]);

  const isAuthRole = user?.role;

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const allTags = [...new Set(questions?.flatMap((q) => q.tags) || [])];

  const filteredQuestions = questions?.filter((q) => {
    const matchesDifficulty = selectedDifficulty
      ? q.difficulty === selectedDifficulty
      : true;
    const matchesTags = selectedTags.length
      ? selectedTags.every((tag) => q.tags.includes(tag))
      : true;
    const matchesSearch = q.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesTags && matchesSearch;
  });

  const solvedCount = questions?.filter((p) => p.solved).length;

  return questionLoading ? (
    <Loading />
  ) : (
    <div className="h-screen pt-20 flex flex-col md:flex-row overflow-hidden relative bg-[#0C0414] text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[3px] h-[3px] bg-purple-500/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(1.5px)",
            }}
          />
        ))}
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-between items-center px-4 pb-2 z-20">
        <h2 className="text-xl font-semibold text-pink-400">Problems</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-700 to-pink-600 rounded-lg text-white shadow-md hover:shadow-pink-500/40 transition"
        >
          <FiFilter />
          Filters
        </button>
      </div>

      {/* Sidebar Filters */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className={`hide-scrollbar fixed md:static top-0 left-0 h-full bg-[#160025] px-4 py-6 z-40 overflow-y-auto w-64 md:w-[25%] shadow-lg shadow-purple-800/40`}
          >
            <h2 className="text-xl font-bold mb-6 text-purple-400">
              Filters
            </h2>

            {/* Difficulty Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
                Difficulty
              </h3>
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() =>
                    setSelectedDifficulty(
                      level === selectedDifficulty ? null : level
                    )
                  }
                  className={`capitalize py-1 px-4 mr-2 mb-2 rounded-full border text-sm transition-all ${
                    selectedDifficulty === level
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-lg shadow-pink-500/30"
                      : "bg-transparent text-gray-300 border-purple-500 hover:bg-purple-500/20"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Tag Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
                Tags
              </h3>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs py-1 px-3 mr-2 mb-2 rounded-full border transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-yellow-400 text-black border-yellow-400 shadow-md"
                      : "bg-transparent text-gray-300 border-yellow-500 hover:bg-yellow-500/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 hide-scrollbar px-4 md:px-6 pt-2 md:pt-4 space-y-5 overflow-y-auto relative z-10">
        {isAuthRole === "admin" && (
          <Button
            className="bg-gradient-to-r from-pink-600 to-purple-700 hover:shadow-lg hover:shadow-pink-500/30 transition"
            onClick={() => navigate("/add/problem")}
          >
            Add Problem
          </Button>
        )}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sticky top-0 z-10 py-3 bg-[#0C0414] border-b border-purple-800 space-y-3 sm:space-y-0">
          <div className="text-lg sm:text-xl font-semibold text-pink-400">
            All Problems
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search problems..."
            className="w-full sm:max-w-md p-2 rounded-md bg-[#160025] text-white placeholder-gray-400 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <div className="text-sm font-medium text-gray-300 sm:ml-4 whitespace-nowrap">
            {solvedCount}/{questions?.length} Solved
          </div>
        </div>

        {/* Problem Cards */}
        <div className="space-y-4 pb-10">
          {filteredQuestions?.length === 0 && (
            <p className="text-gray-400 text-center">No problems found</p>
          )}

          {filteredQuestions?.map((problem) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={problem._id}
              onClick={() => navigate(`/submission/${problem?._id}`)}
              className="relative group bg-gradient-to-br from-[#1a0b29] to-[#2b0d3d] rounded-xl p-[2px] cursor-pointer"
            >
              <div className="bg-[#0C0414] rounded-xl p-5 flex justify-between items-center transition-all group-hover:shadow-lg group-hover:shadow-pink-500/20">
                <div className="flex items-center gap-3">
                  {problem.solved ? (
                    <BsFillCheckCircleFill className="text-green-400 text-2xl" />
                  ) : (
                    <BsCircle className="text-green-500 text-2xl" />
                  )}
                  <span className="font-medium">{problem.title}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="px-2 py-1 text-xs rounded-md bg-yellow-400 text-black font-semibold">
                    {Math.trunc(Math.random() * 100)}%
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-md font-semibold ${
                      problem.difficulty === "easy"
                        ? "bg-green-400/20 text-green-300"
                        : problem.difficulty === "medium"
                        ? "bg-yellow-400/20 text-yellow-300"
                        : "bg-red-400/20 text-red-300"
                    }`}
                  >
                    {problem.difficulty==="medium"?"med":problem.difficulty}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          <div ref={observerRef} className="text-center py-4 text-gray-400">
            {questionLoading
              ? "Loading more questions..."
              : hasMore
              ? "Scroll down to load more"
              : "No more questions"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problems;
