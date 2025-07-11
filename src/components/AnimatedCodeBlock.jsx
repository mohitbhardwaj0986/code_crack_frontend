import React, { useEffect, useState } from "react";

const codeSamples = [
  `// Interview Tip
const isPalindrome = (str) =>
  str === str.split('').reverse().join('');`,

  `// Resume Helper
const formatTitle = (title) =>
  title.trim().toUpperCase();`,

  `// Async in JS
async function fetchUser() {
  const res = await fetch('/api/user');
  return res.json();
}`,
];

const AnimatedCodeBlock = () => {
  const [text, setText] = useState("");
  const [sampleIndex, setSampleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = codeSamples[sampleIndex];

    if (charIndex <= current.length) {
      const timeout = setTimeout(() => {
        setText(current.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      // Wait before moving to next code block
      const wait = setTimeout(() => {
        setCharIndex(0);
        setSampleIndex((prev) => (prev + 1) % codeSamples.length);
      }, 1800);
      return () => clearTimeout(wait);
    }
  }, [charIndex, sampleIndex]);

  return (
    <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap p-4 h-full animate-pulse">
      {text}
      <span className="text-white/40">|</span>
    </pre>
  );
};

export default AnimatedCodeBlock;
