import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setscore } from "../slice/scoreSlice";

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Player1 = useSelector((state) => state.names.names.player1);
  const Player2 = useSelector((state) => state.names.names.player2);
  const Score1 = useSelector((state) => state.score.score.player1);
  const Score2 = useSelector((state) => state.score.score.player2);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    if (Score1 > Score2) {
      setWinner(Player1);
    } else if (Score2 > Score1) {
      setWinner(Player2);
    } else {
      setWinner("It's a Tie");
    }
  }, [Score1, Score2, Player1, Player2]);
  const handleNewGame = () => {
    localStorage.clear();
    dispatch(setscore(null));
    navigate("/");
  };
  const handleHeadingClick = () => {
    dispatch(setscore(null));
    localStorage.clear();
    navigate("/");
  };
  const handleGoBack = () => {
    dispatch(setscore(null));
  };

  return (
    <div className="flex flex-col  justify-center items-center min-h-screen bg-yellow-500">
      <div
        className="text-6xl text-red-500 mt-4 text-center font-bold mb-6 cursor-pointer"
        onClick={handleHeadingClick}
      >
        <h1>Hv-Quiz!</h1>
      </div>
      <div className="bg-blue-500 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-4xl text-white font-bold mb-4">Result</h1>
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-2xl text-blue-700 font-bold mb-4">
            Winner: {winner}
          </h2>
          <p className="text-xl text-gray-700">
            {Player1}: {Score1} points
          </p>
          <p className="text-xl text-gray-700">
            {Player2}: {Score2} points
          </p>
        </div>
        <div className="mt-6 text-white font-bold">
          {winner === "It's a Tie" ? (
            <p className="text-2xl">Well played, it's a tie!</p>
          ) : (
            <p className="text-2xl">Congratulations, {winner}!</p>
          )}
        </div>
        <button
          onClick={handleNewGame}
          className="mt-6 w-full bg-green-500 text-white p-3 rounded-md font-bold  transition duration-300"
        >
          Start New Game
        </button>

        <Link
          to="/category"
          className="mt-4 inline-block text-center bg-blue-500 text-white p-3 rounded-md font-bold hover:bg-green-400 transition duration-300"
          onClick={handleGoBack}
        >
          Go back to sections
        </Link>
      </div>
    </div>
  );
};

export default Result;
