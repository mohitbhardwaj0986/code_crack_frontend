import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncCreateQuestion } from '../store/actions/questionAction'; // update path if needed

const AddProblem = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'easy',
    tags: [],
    functionName: '',
    starterCode: '',
    constraints: '',
    examples: [''],
    testCases: [
      { input: '', output: '', isPublic: true }
    ],
    createBy: 'user_id_here', // Replace with actual user ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For tags: convert comma-separated string to array
    if (name === 'tags') {
      setFormData({ ...formData, tags: value.split(',').map(tag => tag.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleExampleChange = (i, value) => {
    const updated = [...formData.examples];
    updated[i] = value;
    setFormData({ ...formData, examples: updated });
  };

  const handleTestCaseChange = (i, field, value) => {
    const updated = [...formData.testCases];
    updated[i][field] = field === 'isPublic' ? value === 'true' : value;
    setFormData({ ...formData, testCases: updated });
  };

  const addExample = () => {
    setFormData({ ...formData, examples: [...formData.examples, ''] });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', output: '', isPublic: true }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncCreateQuestion(formData));
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#0C0415] via-[#23003B] to-black py-20 px-4">
  <div className="max-w-4xl mx-auto bg-[#0C0415] rounded-2xl shadow-xl border border-[#23003B] p-8">
    <h2 className="text-3xl font-bold text-white mb-6 text-center">🧠 Add New Problem</h2>
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      <input
        name="title"
        placeholder="Problem Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full bg-[#23003B] text-white border border-[#9005B6] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9005B6]"
        required
      />

      <textarea
        name="description"
        placeholder="Problem Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full bg-[#23003B] text-white border border-[#9005B6] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9005B6]"
        rows={4}
        required
      />

      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        className="w-full bg-[#23003B] text-white border border-[#9005B6] p-3 rounded-md"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        name="tags"
        placeholder="Tags (comma-separated)"
        onChange={handleChange}
        className="w-full bg-[#23003B] text-white border border-[#9005B6] p-3 rounded-md"
      />

      <input
        name="functionName"
        placeholder="Function Name"
        value={formData.functionName}
        onChange={handleChange}
        className="w-full bg-[#23003B] text-white border border-[#9005B6] p-3 rounded-md"
        required
      />

      <textarea
        name="starterCode"
        placeholder="Starter Code"
        value={formData.starterCode}
        onChange={handleChange}
        className="w-full font-mono bg-[#23003B] text-green-400 border border-[#9005B6] p-3 rounded-md"
        rows={4}
        required
      />

      <textarea
        name="constraints"
        placeholder="Constraints"
        value={formData.constraints}
        onChange={handleChange}
        className="w-full bg-[#23003B] text-white border border-[#9005B6] p-3 rounded-md"
        rows={3}
        required
      />

      {/* Examples */}
      <div>
        <label className="font-semibold text-[#9005B6]">Examples</label>
        {formData.examples.map((example, i) => (
          <input
            key={i}
            type="text"
            value={example}
            onChange={(e) => handleExampleChange(i, e.target.value)}
            className="w-full bg-[#23003B] text-white border border-[#9005B6] p-3 mt-2 rounded-md"
            placeholder={`Example #${i + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={addExample}
          className="mt-2 text-sm text-[#9005B6] hover:underline"
        >
          + Add Example
        </button>
      </div>

      {/* Test Cases */}
      <div>
        <label className="font-semibold text-[#9005B6]">Test Cases</label>
        {formData.testCases.map((testCase, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mt-2">
            <input
              type="text"
              value={testCase.input}
              onChange={(e) => handleTestCaseChange(i, 'input', e.target.value)}
              placeholder="Input"
              className="bg-[#23003B] text-white border border-[#9005B6] p-2 rounded-md"
            />
            <input
              type="text"
              value={testCase.output}
              onChange={(e) => handleTestCaseChange(i, 'output', e.target.value)}
              placeholder="Output"
              className="bg-[#23003B] text-white border border-[#9005B6] p-2 rounded-md"
            />
            <select
              value={testCase.isPublic.toString()}
              onChange={(e) => handleTestCaseChange(i, 'isPublic', e.target.value)}
              className="bg-[#23003B] text-white border border-[#9005B6] p-2 rounded-md"
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={addTestCase}
          className="mt-2 text-sm text-[#9005B6] hover:underline"
        >
          + Add Test Case
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[#9005B6] hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300"
      >
        🚀 Submit Problem
      </button>
    </form>
  </div>
</div>


  );
};

export default AddProblem;
