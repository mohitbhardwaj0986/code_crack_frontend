import React, { useEffect } from "react";
import Nav from "../components/Nav";
import { motion } from "framer-motion";
import {
  Sparkles,
  Accessibility,
  MousePointerClick,
  Component,
} from "lucide-react";
import Button from "../components/Button";
import img1 from "../assets/3c5399ef4a7b2f6575361c0935c61170.jpg";
import img2 from "../assets/8c8e8253f21a180be88fc67e409ae69f.jpg";
import img3 from "../assets/805eccdc9ebee0d98b4b4cd8e0f618ab.jpg";
import CodeEditor from "../components/CodeEditor";
import AnimatedCodeBlock from "../components/AnimatedCodeBlock";
import VerticalLetterScroll from "../components/VerticalLetterScroll";
function Home() {

  return (
    <div className="relative w-full min-h-screen  overflow-hidden ">
      <section className="relative">
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
        {/* 🔮 Animated Glow Background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <div className="w-[200px] h-[200px] shadow_circle bg-[#be08df] rounded-full blur-[70px] opacity-100 absolute top-0 left-0 z-0" />
          <div className="w-[400px] h-[400px] bg-[#6526B7] rounded-full blur-[180px] opacity-25 absolute bottom-[-100px] right-[-100px] z-0" />
        </motion.div>

        {/* 💬 Content Wrapper */}
        <div className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-32 pt-32 sm:pt-36 md:pt-40 pb-12 text-center">
          <motion.span
            className="inline-block bg-white/10 text-xs sm:text-sm py-1 px-4 sm:px-5 rounded-full backdrop-blur-xl hover:bg-white/5 transition"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Unlock your full potential
          </motion.span>

          <motion.h1
            className="mt-4 text-3xl sm:text-4xl md:text-6xl font-bold leading-tight "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Fastest & Easiest Way to{" "}
            <span className="text-[#8C3EC1]"
            style={{fontFamily:"monospace"}}
            >Crack Interviews</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Prepare with AI-generated coding challenges, real-time mock
            interviews, and smart resume reviews — all in one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button className="mt-6 text-sm sm:text-base px-6 py-3">
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="h-screen w-[90%] gap-3 pt-25 xl:flex relative mx-auto">
        {/* Glow or Gradient Background */}
        <div className="absolute inset-0">
          <div className="w-[400px] h-[400px] bg-[#6526B7] rounded-full blur-[180px] opacity-70 absolute bottom-[-100px] right-[-100px] z-0"></div>
        </div>
        <div className="xl:w-[40%] w-full bg-white/5 mb-3 xl:mb-0 rounded-xl p-4 overflow-auto h-full">
          <CodeEditor />
        </div>
        <div className="xl:w-[55%] w-full  gap-3 flex flex-col  rounded-xl">
          <div className="w-[100%] p-3 gap-2 h-[60%] bg-white/5 xl:flex  rounded-xl">
            <div className="overflow-hidden  xl:w-[50%] h-full">
              <img
                className="w-full h-full xl:mb-0 mb-1 rounded-xl object-center object-cover"
                src={img3}
                alt=""
              />
            </div>
            <div className="xl:w-[50%] overflow-hidden rounded-xl gap-2 flex flex-col ">
              <img
                className="w-full rounded-xl h-[50%] object-center object-cover"
                src={img1}
                alt=""
              />
              <img
                className="w-full rounded-xl  h-[50%] object-center object-cover"
                src={img2}
                alt=""
              />
            </div>
          </div>
          <div className="w-[100%] h-[40%] bg-white/5 rounded-xl">
            <AnimatedCodeBlock />
          </div>
        </div>
        <div className="hidden sm:block rounded-full w-[5%] bg-white/5">
          <VerticalLetterScroll />
        </div>
      </section>
      <section>
        <div className="relative w-full xl:py-15 pt-400 pb-20 text-center px-4 ">
          {/* Starry Background Dots */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {[...Array(30)].map((_, i) => (
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

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-extrabold  leading-tight">
              Crack tech interviews with <br />
              <span className="bg-gradient-to-r from-white to-[#8C3EC1] bg-clip-text text-transparent">
                smart practice & AI feedback.
              </span>
            </h1>
            <p className="mt-6 /60 text-sm sm:text-base max-w-xl mx-auto">
              Solve real DSA questions from top companies. Get instant mock
              feedback, resume tips, and personalized roadmaps with CodeCrack.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="relative h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20 sm:py-28 ">
          {/* 🔮 Moving Glowing Strip Behind Card */}
          <div className="absolute w-[400px] h-[200px] bg-[#6526B7] blur-[120px] opacity-40 rounded-full animate-glow-move" />

          {/* 🟣 Static Background Glow */}
          <div className="absolute w-[300px] h-[300px] bg-[#6526B7] blur-[100px] rounded-full top-[-100px] left-[-200px] opacity-25" />

          {/* ✨ Card */}
          <div className="z-10 backdrop-blur-xl bg-white/5 p-6 sm:p-8 rounded-2xl w-full max-w-3xl border border-white/10 shadow-xl">
            <div className="text-xs sm:text-sm px-3 py-1 rounded-full bg-[#8C3EC1]/20 text-[#8C3EC1] w-fit mb-4">
              CodeCrack AI
            </div>
            <h2 className="text-xl sm:text-3xl font-semibold  mb-4">
              Practice <span className="/70">DSA Smarter</span> with{" "}
              <span className="text-[#8C3EC1]">CodeCrack</span>
            </h2>

            {/* DSA Categories */}
            <div className="space-y-6 /80 text-sm">
              {[
                {
                  icon: <Sparkles className="text-[#8C3EC1] w-4 h-4" />,
                  title: "Arrays & Strings (120)",
                  problems: [
                    "Two Sum · Easy · Amazon",
                    "Longest Substring · Medium · Google",
                  ],
                },
                {
                  icon: <Accessibility className="text-[#8C3EC1] w-4 h-4" />,
                  title: "Linked Lists (45)",
                  problems: [
                    "Reverse List · Easy · Microsoft",
                    "Cycle Detection · Medium · Adobe",
                  ],
                },
                {
                  icon: (
                    <MousePointerClick className="text-[#8C3EC1] w-4 h-4" />
                  ),
                  title: "Dynamic Programming (64)",
                  problems: [
                    "Climbing Stairs · Easy · Meta",
                    "House Robber · Medium · Paytm",
                  ],
                },
                {
                  icon: <Component className="text-[#8C3EC1] w-4 h-4" />,
                  title: "Trees & Graphs (75)",
                  problems: [
                    "Level Order Traversal · Easy · Flipkart",
                    "Graph Cycle Check · Medium · Google",
                  ],
                },
              ].map(({ icon, title, problems }, i) => (
                <div key={i} className="flex flex-wrap items-start gap-2">
                  {icon}
                  <span>{title}</span>
                  <div className="ml-auto flex flex-wrap gap-2 text-xs w-full sm:w-auto sm:justify-end">
                    {problems.map((text, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 px-2 py-1 rounded-md whitespace-nowrap"
                      >
                        {text}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Text */}
            <div className="mt-8 text-center text-sm /60">
              Want to master coding interviews? Start solving top company DSA
              problems with AI-powered help.
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#8C3EC1]  hover:bg-[#7b32b0] transition">
                Start Practicing →
              </button>
              <button className="px-4 py-2 text-sm font-semibold rounded-lg border border-white/10  hover:bg-white/10 transition">
                Explore More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
