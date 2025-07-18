import React, { useEffect, useState, useRef } from "react";
import { BsFillCheckCircleFill, BsCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetQuestionsByPage } from "../store/actions/questionAction";
import { useNavigate } from "react-router-dom";

function Problems() {
  const dispatch = useDispatch();
  const { questions, questionLoading } = useSelector((state) => state.question);
  const navigete = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  // Filters
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // Fetch questions
  useEffect(() => {
    const fetchData = async () => {
      const totalPages = await dispatch(asyncGetQuestionsByPage(page));
      if (page >= totalPages) setHasMore(false);
    };
    if (hasMore) fetchData();
  }, [page, hasMore, dispatch]);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !questionLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, questionLoading]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // All available tags from loaded questions
  const allTags = [...new Set(questions?.flatMap((q) => q.tags) || [])];

  // Apply filters + search
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

  return (
    <div className="h-screen pt-20 flex overflow-hidden">
      {/* Background Dots */}
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

      {/* Sidebar Filters */}
      <div className="w-[25%] h-full bg-gray-900 px-4 py-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Difficulty Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-300 mb-2">Difficulty</h3>
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() =>
                setSelectedDifficulty(
                  level === selectedDifficulty ? null : level
                )
              }
              className={`capitalize py-1 px-3 mr-2 mb-2 rounded-full border ${
                selectedDifficulty === level
                  ? "bg-green-400 text-black border-green-400"
                  : "bg-transparent text-white border-white"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Tag Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-300 mb-2">Tags</h3>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-sm py-1 px-3 mr-2 mb-2 rounded-full border ${
                selectedTags.includes(tag)
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-transparent text-white border-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[75%] px-6 pt-4 space-y-5 overflow-y-auto">
        {/* Header with Search */}
        <div className="flex justify-between px-5 items-center sticky top-0 z-10 py-2 bg-gray-900">
          <div className="text-xl font-semibold">All Problems</div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search problems..."
            className="w-full max-w-md p-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="text-sm font-medium text-gray-300 ml-4 whitespace-nowrap">
            {solvedCount}/{questions?.length} Solved
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-3 pb-10">
          {filteredQuestions?.length === 0 && (
            <p className="text-center text-gray-400">No problems found.</p>
          )}

          {filteredQuestions?.map(
            (problem) => (
              
              (
                <div
                  onClick={() => navigete(`/submission/${problem?._id}`)}
                  key={problem._id}
                  className="bg-gray-800 hover:bg-gray-700 transition-all flex items-center px-5 py-4 rounded-xl justify-between shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {problem.solved ? (
                        <BsFillCheckCircleFill className="text-green-400 text-2xl" />
                      ) : (
                        <BsCircle
                          className={`text-2xl ${
                            !problem?.staterCode ||
                            problem.staterCode.length < 70
                              ? "text-green-500"
                              : "text-green-500"
                          }`}
                        />
                      )}
                    </span>
                    <span className="font-medium">{problem.title}</span>
                  </div>
                  <div className="flex gap-6 items-center text-sm">
                    <span className="text-yellow-300 font-mono">
                      {Math.trunc(Math.random() * 100)}%
                    </span>
                    <span
                      className={`capitalize font-semibold ${
                        problem.difficulty === "easy"
                          ? "text-green-400"
                          : problem.difficulty === "medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {problem.difficulty === "medium"
                        ? "med."
                        : problem.difficulty}
                    </span>
                  </div>
                </div>
              )
            )
          )}

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
