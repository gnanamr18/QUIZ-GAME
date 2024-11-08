import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setplayerName } from "../slice/nameSlice";

const Home = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartGame = (e) => {
    e.preventDefault();
    if (player1.trim() === "" || player2.trim() === "") {
      alert("Please enter names for both players.");
      return;
    }
    const playerNames = {
      player1: player1,
      player2: player2,
    };
    console.log("Player Names:", playerNames);
    dispatch(setplayerName(playerNames));
    navigate("/category");
  };
  const handleHeadingClick = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="flex  flex-col  items-center min-h-screen bg-yellow-500">
      <div
        className="text-6xl text-red-500 mt-4 text-center font-bold mb-6 cursor-pointer"
        onClick={handleHeadingClick}
      >
        <h1>Hv-Quiz!</h1>
      </div>
      <div className="bg-blue-500 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl text-black font-bold mb-6 text-center">
          Enter the Players Name
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="w-full p-3 rounded-md text-lg"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="w-full p-3 rounded-md text-lg"
          />
        </div>
        <button
          onClick={(e) => {
            handleStartGame(e);
          }}
          className="w-full bg-green-500 text-white p-3 rounded-md font-bold hover:bg-blue-400 hover:text-white transition duration-300"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Home;
