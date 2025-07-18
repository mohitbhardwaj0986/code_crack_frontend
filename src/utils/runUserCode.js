import { NodeVM } from "vm2";

export const runUserCode = async (code) => {
  const vm = new NodeVM({
    console: "redirect",
    sandbox: {},
    timeout: 3000, // 3 seconds
    eval: false,
    wasm: false,
  });

  const logs = [];

  // Capture console.log output
  vm.on("console.log", (msg) => logs.push(msg));

  try {
    vm.run(code, "user_code.js");

    const allPassed = logs.every((line) => line.includes("✅"));

    return {
      passed: allPassed,
      details: logs,
    };
  } catch (err) {
    throw new Error("Code execution error: " + err.message);
  }
};
