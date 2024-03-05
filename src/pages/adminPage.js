import React, { useState } from "react";
import { useQuestionsContext } from "@/utils/context/contextProvider";

const AdminPage = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [points, setPoints] = useState("");
  const { state, dispatch } = useQuestionsContext();

  function getLatestQuestionObjId() {
    if (state.questions.length === 0) return 0;
    let lastQuestionObj = state.questions[state.questions.length - 1];
    return lastQuestionObj.id;
  }

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const saveData = () => {
    let latestId = getLatestQuestionObjId();
    const newUniqueId = latestId + 1;
    const newQuestionObject = {
      id: newUniqueId,
      question: newQuestion,
      answer: correctAnswer.trim(),
      wrongAnswers: options.filter((opt) => opt.trim() !== ""),
      points: parseInt(points, 10) || 0,
    };

    dispatch({
      type: "ADD_QUESTION",
      payload: newQuestionObject,
    });

    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setPoints("");
  };

  return (
    <div className="max-w-screen-md mx-auto p-8">
      <h1 className="text-3xl mb-6">Admin Page</h1>
      <div className="mb-4">
        <label className="block mb-2">
          Question:
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        {options.map((option, index) => (
          <label key={index} className="block mb-2">
            Option {index + 1}:
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border p-2 w-full"
            />
          </label>
        ))}
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Correct Answer:
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Points:
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
      </div>
      <div className="mb-4">
        <button onClick={saveData} className="bg-blue-500 text-white px-4 py-2">
          Save Data
        </button>
      </div>
    </div>
  );
};

export default AdminPage;