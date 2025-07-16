import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const words = ["CodeCrack", "Interview", "MockAI", "Resume", "Practice"];

const VerticalLetterScroll = () => {
  const marqueeRef = useRef(null);

  // Split string into vertical characters
  const getVerticalItems = () => {
    const all = [...words, ...words]; // for seamless loop
    return all.map((word, index) => (
      <div key={index} className="flex flex-col items-center gap-1 text-green-400 font-mono text-sm">
        {[...word].map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </div>
    ));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        yPercent: -50,
        ease: "none",
        duration: 10,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
      <div ref={marqueeRef} className="flex flex-col gap-6 items-center">
        {getVerticalItems()}
      </div>
    </div>
  );
};

export default VerticalLetterScroll;
