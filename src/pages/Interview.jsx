import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "../axios/axios";
import Button from "../components/Button";
import { motion, AnimatePresence } from "framer-motion";

function Interview() {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [aiReply, setAiReply] = useState(null);
  const [aiReplyLoading, setAiReplyLoading] = useState(false);
  const [quesitonandAns, setQuesitonandAns] = useState([]);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const storedQA = JSON.parse(localStorage.getItem("interviewQA")) || [];
    setQuesitonandAns(storedQA);
  }, []);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      toast.error("Your browser doesn't support speech synthesis.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;
    synth.speak(utterance);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = async (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);

      try {
        setAiReplyLoading(true);
        const { data } = await axios.post("/gemini/interview", {
          message: result,
        });

        const reply = data?.data;
        setAiReply(reply);
        speak(reply);

        const fullMessage = {
          id: Date.now(),
          userText: result,
          aitext: reply,
        };

        setQuesitonandAns((prev) => {
          const updated = [...prev, fullMessage];
          localStorage.setItem("interviewQA", JSON.stringify(updated));
          return updated;
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error getting AI response."
        );
      } finally {
        setAiReplyLoading(false);
      }
    };

    recognition.onerror = (e) => {
      toast.error(`Speech error: ${e.error}`);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    setTranscript("");
    setAiReply(null);
    if (recognitionRef.current && !listening) {
      recognitionRef.current.start();
    }
  };

  const clearHistory = () => {
    setQuesitonandAns([]);
    localStorage.removeItem("interviewQA");
  };

  return (
   <div className="min-h-screen bg-gradient-to-br pt-20 from-[#3D0061] via-[#0C0415] to-[#210038] text-white flex flex-col lg:flex-row">
  {/* Left Side - Q&A History */}
  <div className="w-full lg:w-[60%] p-4 sm:p-6 md:p-8 overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/10 max-h-[50vh] lg:max-h-none">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">📝 Conversation History</h2>
      {quesitonandAns.length > 0 && (
        <Button onClick={clearHistory} className="text-sm sm:text-base">Clear History</Button>
      )}
    </div>
    {quesitonandAns.length === 0 ? (
      <p className="text-gray-400">No questions asked yet.</p>
    ) : (
      <div className="space-y-6">
        {quesitonandAns.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow transition hover:scale-[1.01]"
          >
            <p>
              <span className="font-semibold text-purple-400">You:</span>{" "}
              {item.userText}
            </p>
            <p className="mt-2">
              <span className="font-semibold text-pink-400">AI:</span>{" "}
              {item.aitext}
            </p>
          </motion.div>
        ))}
      </div>
    )}
  </div>

  {/* Right Side - Controls */}
  <div className="w-full lg:w-[40%] p-4 sm:p-6 md:p-10 flex flex-col items-center justify-start">
    <motion.h1
      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      🎙️ Voice Interview with Gemini AI
    </motion.h1>

    <motion.div
      animate={
        listening
          ? {
              scale: [1, 1.05, 1],
              transition: { repeat: Infinity, duration: 1.5 },
            }
          : {}
      }
      className="w-full flex justify-center"
    >
      <Button
        onClick={startListening}
        disabled={listening || aiReplyLoading}
        className={`px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-xl transition-all duration-300 ${
          listening || aiReplyLoading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:brightness-110"
        }`}
      >
        {listening
          ? "🎤 Listening..."
          : aiReplyLoading
          ? "🤖 Thinking..."
          : "Start Interview"}
      </Button>
    </motion.div>

    <AnimatePresence>
      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-6 bg-white/5 backdrop-blur p-4 rounded-lg w-full text-center"
        >
          <p className="text-base sm:text-lg">
            <strong className="text-blue-300">You said:</strong> {transcript}
          </p>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {aiReply && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-4 bg-white/5 backdrop-blur p-4 rounded-lg w-full text-center"
        >
          <p className="text-base sm:text-lg">
            <strong className="text-green-400">AI Reply:</strong> {aiReply}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>

  );
}

export default Interview;
