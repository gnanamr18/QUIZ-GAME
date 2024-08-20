import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setscore } from "../slice/scoreSlice";

const Quiz = () => {
  const dispatch = useDispatch();
  const Player1 = useSelector((state) => state.names.names.player1);
  const Player2 = useSelector((state) => state.names.names.player2);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const easyQuestions = useSelector(
    (state) => state?.questions?.questions?.q1?.data || []
  );
  const mediumQuestions = useSelector(
    (state) => state?.questions?.questions?.q2?.data || []
  );
  const hardQuestions = useSelector(
    (state) => state?.questions?.questions?.q3?.data || []
  );

  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [playerScores, setPlayerScores] = useState({
    player1: 0,
    player2: 0,
  });
  const score = {
    player1: playerScores.player1,
    player2: playerScores.player2,
  };

  const getCurrentQuestions = () => {
    switch (difficultyLevel) {
      case "easy":
        return easyQuestions;
      case "medium":
        return mediumQuestions;
      case "hard":
        return hardQuestions;
      default:
        return [];
    }
  };
  const questions = getCurrentQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const { category, question, correctAnswer, incorrectAnswers, difficulty } =
    currentQuestion;
  const options = [...incorrectAnswers, correctAnswer].sort();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  //   const handleScore = () => {
  //     console.log("hi");
  //     let points = 0;

  //     // Assign points based on difficulty level
  //     switch (difficultyLevel) {
  //       case "easy":
  //         points = 10;
  //         break;
  //       case "medium":
  //         points = 15;
  //         break;
  //       case "hard":
  //         points = 20;
  //         break;
  //       default:
  //         points = 0;
  //     }

  //     if (selectedOption === correctAnswer) {
  //       console.log("hiii");
  //       const isOddQuestion = (currentQuestionIndex + 1) % 2 !== 0;
  //       const playerKey = isOddQuestion ? "player1" : "player2";
  //       //   setPlayerScores((prevScores) => ({
  //       //     ...prevScores,
  //       //     [playerKey]: prevScores[playerKey] + points,
  //       //   }));
  //       setPlayerScores((prevScores) => {
  //         const updatedScores = {
  //           ...prevScores,
  //           [playerKey]: prevScores[playerKey] + points,
  //         };
  //         dispatch(setscore(updatedScores));
  //         return updatedScores;
  //       });

  //       setAlertMessage("Correct!");
  //     } else {
  //       setAlertMessage("Wrong Answer");
  //     }
  //     setShowAlert(true);
  //     setTimeout(() => setShowAlert(false), 500);
  //     // dispatch(setscore(playerScores));
  //   };

  const handleScore = () => {
    return new Promise((resolve) => {
      console.log("hi");
      let points = 0;

      // Assign points based on difficulty level
      switch (difficultyLevel) {
        case "easy":
          points = 10;
          break;
        case "medium":
          points = 15;
          break;
        case "hard":
          points = 20;
          break;
        default:
          points = 0;
      }

      if (selectedOption === correctAnswer) {
        const isOddQuestion = (currentQuestionIndex + 1) % 2 !== 0;
        const playerKey = isOddQuestion ? "player1" : "player2";
        setPlayerScores((prevScores) => {
          const updatedScores = {
            ...prevScores,
            [playerKey]: prevScores[playerKey] + points,
          };
          dispatch(setscore(updatedScores));
          return updatedScores;
        });

        setAlertMessage("Correct!");
      } else {
        setAlertMessage("Wrong Answer");
      }
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        resolve(); // Resolve the promise after the alert timeout
      }, 1000);
    });
  };

  const handleSubmit = () => {
    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    // Check if we need to change difficulty level
    if (currentQuestionIndex + 1 >= questions.length) {
      if (difficultyLevel === "easy") setDifficultyLevel("medium");
      else if (difficultyLevel === "medium") setDifficultyLevel("hard");
      setCurrentQuestionIndex(0); // Reset index for new difficulty level
    }

    setSelectedOption("");
  };

  const isFinalQuestion =
    difficultyLevel === "hard" && currentQuestionIndex + 1 >= questions.length;

  //   const handleFinish = () => {
  //     navigate("/result");
  //   };

  const handleFinish = async () => {
    await handleScore(); // Ensure handleScore completes before navigating
    navigate("/result");
  };

  const handleHeadingClick = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-yellow-500 p-6">
      <div
        className="text-6xl text-red-500 mt-4 text-center font-bold mb-6 cursor-pointer"
        onClick={handleHeadingClick}
      >
        <h1>Hv-Quiz!</h1>
      </div>
      <div className="bg-blue-500 p-8 rounded-lg shadow-lg max-w-xl w-full">
        {/* Alert Message */}
        <div>
          {showAlert && (
            <div
              className={`fixed top-16.5 left-0 right-0   mx-auto max-w-md p-4 text-center rounded ${
                alertMessage === "Correct!" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {alertMessage}
            </div>
          )}
        </div>
        {/* question number, player name, difficulty */}
        <div className="flex flex-row justify-between">
          <span className="text-lg text-white font-bold mr-4">
            Question {currentQuestionIndex + 1}:
          </span>
          <div>
            {(currentQuestionIndex + 1) % 2 !== 0 ? (
              <span className="text-lg text-white font-bold mr-4">
                {Player1}
              </span>
            ) : (
              <span className="text-lg text-white font-bold mr-4">
                {Player2}
              </span>
            )}
          </div>
          <span className="text-lg text-white  font-bold mr-4">
            Difficulty:{difficulty}
          </span>
        </div>

        {/* question */}
        <h1 className="text-2xl font-bold text-black mt-4 mb-4">
          {question.text}
        </h1>
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`w-full py-2 px-4 rounded-md text-gray ${
                selectedOption === option
                  ? "bg-red-500"
                  : "bg-white hover:bg-red-500"
              }`}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>
        {isFinalQuestion ? (
          <button
            onClick={() => {
              handleFinish();
            }}
            className="mt-6 w-full bg-green-500 text-white p-3 rounded-md font-bold hover:bg-green-400 transition duration-300"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={() => {
              handleSubmit();
              handleScore();
            }}
            disabled={!selectedOption}
            className="mt-6 w-full bg-green-500 text-white p-3 rounded-md font-bold hover:bg-green-400 transition duration-300 disabled:bg-gray-400"
          >
            Submit
          </button>
        )}
        <div className="mt-6 text-white">
          <p>
            {Player1} Score: {playerScores.player1}
          </p>
          <p>
            {Player2} Score: {playerScores.player2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
