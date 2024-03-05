/* import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] }); */
//import Falskt from"./trueOrFalseComp/falskt"

import contextTestPage from "./contextTestPage";



import React, { useState, useEffect } from "react";
import { useQuestionsContext } from "@/utils/context/contextProvider";

export default function Home() {
  const { state, checkAnswer, closeModal, dispatch } = useQuestionsContext();
  const { questions, isModalOpen, index } = state;

  if (!questions.length || index >= questions.length) {
    return <div>No questions available or loading...</div>;
  }

  const currentQuestion = questions[index];
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const shuffleAnswers = (answers) => {
    let shuffled = [...answers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (currentQuestion) {
      const answers = [...currentQuestion.wrongAnswers, currentQuestion.answer];
      setShuffledAnswers(shuffleAnswers(answers));
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    }
  }, [currentQuestion]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    const correct = selectedAnswer === currentQuestion.answer;
    checkAnswer(correct);
    setIsAnswerCorrect(correct);
    if (!correct) {
      setTimeout(() => {
        dispatch({ type: "RESET_GAME" });
      }, 3000);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        {isModalOpen && (
          <div className="modal-container isOpen">
            <div className="grid">
              <p className="bg-white rounded-2xl m-4 w-fit grid justify-self-center p-4">
                Want to see the score? I bet you do!
              </p>
              <button
                className="close-btn justify-self-center p-6 hover:bg-green-400 rounded-full"
                onClick={closeModal}
              >
                Play again
              </button>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Question: {currentQuestion.question}
          </h2>
          <div>
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {answer}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <button
              onClick={handleCheckAnswer}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Check Answer
            </button>
          )}
        </div>

        {isAnswerCorrect !== null && (
          <div className="mt-4">
            {isAnswerCorrect
              ? `Correct! ${currentQuestion.points}+ Points!`
              : "Incorrect. Try again!"}
          </div>
        )}
      </div>
    </main>
  );
}