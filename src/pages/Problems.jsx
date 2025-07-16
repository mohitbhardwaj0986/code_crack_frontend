import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { BsFillCheckCircleFill, BsCircle } from "react-icons/bs";

// Dummy problems
const dummyProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    successRate: "91%",
    solved: true,
    tags: ["Array", "HashMap"],
    company: "Amazon",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "med.",
    successRate: "78%",
    solved: false,
    tags: ["Linked List", "Math"],
    company: "Google",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "med.",
    successRate: "66%",
    solved: true,
    tags: ["String", "Sliding Window"],
    company: "Microsoft",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    successRate: "42%",
    solved: false,
    tags: ["Binary Search", "Divide and Conquer"],
    company: "Facebook",
  },
  {
    id: 5,
    title: "Valid Parentheses",
    difficulty: "easy",
    successRate: "95%",
    solved: true,
    tags: ["Stack"],
    company: "Amazon",
  },
];

// Dummy filter values
const companies = ["Amazon", "Google", "Microsoft", "Facebook"];
const tags = [
  "Array",
  "HashMap",
  "Linked List",
  "Stack",
  "Sliding Window",
  "DP",
];

function Problems() {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);

  useEffect(() => {
    setProblems(dummyProblems);
  }, []);

  const toggleCheckbox = (value, selectedList, setSelectedList) => {
    if (selectedList.includes(value)) {
      setSelectedList(selectedList.filter((item) => item !== value));
    } else {
      setSelectedList([...selectedList, value]);
    }
  };

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCompany =
      selectedCompanies.length === 0 || selectedCompanies.includes(p.company);
    const matchesTags =
      selectedTags.length === 0 ||
      p.tags.some((tag) => selectedTags.includes(tag));
    const matchesDifficulty =
      selectedDifficulty.length === 0 ||
      selectedDifficulty.includes(p.difficulty);
    return matchesSearch && matchesCompany && matchesTags && matchesDifficulty;
  });

  const solvedCount = problems.filter((p) => p.solved).length;

  return (
    <div className="h-screen  pt-20  flex overflow-hidden">
      <div className="absolute  inset-0 pointer-events-none z-0">
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
      {/* Sidebar */}
      <div className="w-[25%] h-full bg-gray-900 px-4 py-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Difficulty Filter as Toggle Buttons */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-300 mb-2">Difficulty</h3>
          <div className="flex gap-2 flex-wrap">
            {["easy", "med.", "hard"].map((diff) => {
              const isActive = selectedDifficulty.includes(diff);
              return (
                <button
                  key={diff}
                  onClick={() =>
                    toggleCheckbox(
                      diff,
                      selectedDifficulty,
                      setSelectedDifficulty
                    )
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition 
            ${
              diff === "easy"
                ? isActive
                  ? "bg-green-500 text-black"
                  : "border-green-500 text-green-400"
                : diff === "med."
                ? isActive
                  ? "bg-yellow-400 text-black"
                  : "border-yellow-400 text-yellow-300"
                : isActive
                ? "bg-red-500 text-black"
                : "border-red-500 text-red-400"
            }
          `}
                >
                  {diff}
                </button>
              );
            })}
          </div>
        </div>

        {/* Company Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-300 mb-2">Company</h3>
          <div className="flex gap-2 flex-wrap">
            {companies.map((company) => {
              const isActive = selectedCompanies.includes(company);
              return (
                <button
                  key={company}
                  onClick={() =>
                    toggleCheckbox(
                      company,
                      selectedCompanies,
                      setSelectedCompanies
                    )
                  }
                  className={`px-3 cursor-pointer py-1 rounded-full text-sm font-medium border transition
            ${
              isActive ? "bg-[#6526B7]  border-[#6526B7]" : "text-[#6526B7]  border-[#6526B7]"
            }
          `}
                >
                  {company}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tag Filter */}
        <div className="mb-6">
  <h3 className="text-sm font-bold text-gray-300 mb-2">Tags</h3>
  <div className="flex gap-2 flex-wrap">
    {tags.map((tag) => {
      const isActive = selectedTags.includes(tag);
      return (
        <button
          key={tag}
          onClick={() =>
            toggleCheckbox(tag, selectedTags, setSelectedTags)
          }
          className={`px-3 py-1 rounded-full text-sm font-medium border transition
            ${
              isActive
                ? "bg-yellow-400  border-yellow-400"
                : "border-yellow-400 text-yellow-300"
            }
          `}
        >
          {tag}
        </button>
      );
    })}
  </div>
</div>

      </div>

      {/* Main content */}
      <div className="w-[75%] px-6 pt-4 space-y-5 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center sticky top-0  z-10 py-2">
          <div className="flex items-center gap-3 w-full max-w-md">
            <input
              className="outline-none bg-gray-800 px-4 py-2 rounded-full text-white w-full"
              type="text"
              placeholder="Search question"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaFilter className="cursor-pointer text-xl" />
          </div>
          <div className="text-sm font-medium text-gray-300 ml-4 whitespace-nowrap">
            {solvedCount}/{problems.length} Solved
          </div>
        </div>

        {/* Problem List */}
        <div className="space-y-3 pb-10">
          {filteredProblems.length === 0 && (
            <p className="text-center text-gray-400">No problems found.</p>
          )}
          {filteredProblems.map((problem) => (
            <div
              key={problem.id}
              className="bg-gray-800 hover:bg-gray-700 transition-all flex items-center px-5 py-4 rounded-xl justify-between shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  {problem.solved ? (
                    <BsFillCheckCircleFill className="text-green-400" />
                  ) : (
                    <BsCircle className="text-gray-500" />
                  )}
                </span>
                <span className="font-medium">{problem.title}</span>
              </div>
              <div className="flex gap-6 items-center text-sm">
                <span className="text-yellow-300 font-mono">
                  {problem.successRate}
                </span>
                <span
                  className={`capitalize font-semibold ${
                    problem.difficulty === "easy"
                      ? "text-green-400"
                      : problem.difficulty === "med."
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Problems;
