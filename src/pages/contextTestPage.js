import { useQuestionsContext } from "@/utils/context/contextProvider";

const questionRemoveID = 3;

const questionEditedObj = {
  id: 4,
  question: "EDITED Question",
};

export default function contextTestPage() {
  const { state, dispatch } = useQuestionsContext();

  function createQuestionObj() {
    let latestId = getLatestQuestionObjId();
    const newUnikeId = latestId + 1;
    const testQuestionObj1 = {
      id: newUnikeId,
      question: "new q",
      answer: "new answer",
      wrongAnswer: ["w1", "w2"],
      points: 2,
    };
    return testQuestionObj1;
  }

  function getLatestQuestionObjId() {
    const { questions } = state;
    let lastQuestionObj = questions[questions.length - 1];
    const questionId = lastQuestionObj.id;
    return questionId;
  }

  function readQuestionsList() {
    console.log(state);
  }

  function handleAddQuestion() {
    const newQuestionObj = createQuestionObj();
    dispatch({
      type: "ADD_QUESTION",
      payload: newQuestionObj,
    });
  }

  function handleRemoveQuestionById() {
    dispatch({
      type: "REMOVE_QUESTION",
      payload: questionRemoveID,
    });
  }

  function handleEditQuestion() {
    dispatch({
      type: "EDIT_QUESTION",
      payload: questionEditedObj,
    });
  }

  return (
    <div className="flex flex-col gap-5 text-2xl items-center">
      <h1>CONTEXT C.R.U.D OPERATIONS TESTS (Using the Console)</h1>
      <div className="flex flex-row gap-4">
        <button className="w-36 bg-slate-400" onClick={readQuestionsList}>
          READ Q
        </button>
        <button className="w-36 bg-slate-400" onClick={handleAddQuestion}>
          ADD Q
        </button>
        <br />
        <button
          className="w-36 bg-slate-400"
          onClick={handleRemoveQuestionById}
        >
          REMOVE Q
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <h1>Edit a Question by ID = {questionEditedObj.id}</h1>
        <button className="w-36 bg-slate-400" onClick={handleEditQuestion}>
          EDIT Q
        </button>
      </div>
    </div>
  );
}