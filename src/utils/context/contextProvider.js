import { createContext, useContext, useReducer } from "react";

// Create Context
const QuestionsContext = createContext();

// Initial state
const initialState = {
  waiting: true,
  loading: false,
  index: 0,
  correct: 0,
  isModalOpen: false,
  error: false,
  questions: [
    {
      id: 1,
      question: "Which is the highest mountain of the world?",
      answer: "Mount Everest",
      wrongAnswers: ["K2", "Kangchenjunga", "Makalu"],
      points: 2,
    },
    {
      id: 2,
      question: "Which state of Sweden is located the - LM-tornet?",
      answer: "Stockholm",
      wrongAnswers: ["Linköping", "Södermanland", "Malmö"],
      points: 4,
    },
    
  ],
};

// Action types
export const ActionTypes = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  IS_THIS_CORRECT: "IS_THIS_CORRECT",
  NEXT_QUESTION_PLEASE: "NEXT_QUESTION_PLEASE",
  RESET_GAME: "RESET_GAME",
  ADD_QUESTION: "ADD_QUESTION", // Added ADD_QUESTION action type
};

// Reducer function
function questionsReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_QUESTION:
      return { ...state, questions: [...state.questions, action.payload] };

    case ActionTypes.REMOVE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(question => question.id !== action.payload),
      };

    case ActionTypes.EDIT_QUESTION:
      return {
        ...state,
        questions: state.questions.map(q => q.id === action.payload.id ? action.payload : q),
      };

    case ActionTypes.OPEN_MODAL:
      return { ...state, isModalOpen: true, index: 0 };

    case ActionTypes.CLOSE_MODAL:
      return { ...state, waiting: true, correct: 0, isModalOpen: false };

    case ActionTypes.IS_THIS_CORRECT:
      return { ...state, correct: state.correct + 1 };

    case ActionTypes.NEXT_QUESTION_PLEASE:
      const newIndex = state.index + 1;
      return newIndex >= state.questions.length
        ? { ...state, isModalOpen: true }
        : { ...state, index: newIndex };

    case ActionTypes.RESET_GAME:
      return { ...initialState };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}

// Provider Component
export const QuestionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(questionsReducer, initialState);

  const checkAnswer = (isCorrect) => {
    dispatch({ type: ActionTypes.CHECK_ANSWER, payload: isCorrect });

    if (isCorrect && state.index >= state.questions.length - 1) {
      dispatch({ type: ActionTypes.OPEN_MODAL });
    }

    if (isCorrect) {
      dispatch({ type: ActionTypes.NEXT_QUESTION_PLEASE });
    }
  };

  const closeModal = () => {
    dispatch({ type: ActionTypes.CLOSE_MODAL });
  };

  const resetGame = () => {
    dispatch({ type: ActionTypes.RESET_GAME });
  };

  return (
    <QuestionsContext.Provider value={{ state, dispatch, checkAnswer, closeModal, resetGame }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestionsContext = () => useContext(QuestionsContext);