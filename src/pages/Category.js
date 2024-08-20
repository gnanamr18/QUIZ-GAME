import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setcategory } from "../slice/categorySlice";
import { setquestions } from "../slice/questionSlice";
import { setscore } from "../slice/scoreSlice";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [api, setApi] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    "history",
    "society_and_culture",
    "music",
    "geography",
    "sport_and_leisure",
    "film_and_tv",
    "arts_and_literature",
    "science",
    "food_and_drink",
    "general_knowledge",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleNextClick = async (e) => {
    e.preventDefault();
    console.log("Selected Category:", selectedCategory);
    dispatch(setcategory(selectedCategory));
    setApi(true);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res1 = await axios.get(
          `https://the-trivia-api.com/v2/questions?limit=2&categories=${selectedCategory}&difficulties=easy`
        );
        const res2 = await axios.get(
          `https://the-trivia-api.com/v2/questions?limit=2&categories=${selectedCategory}&difficulties=medium`
        );
        const res3 = await axios.get(
          `https://the-trivia-api.com/v2/questions?limit=2&categories=${selectedCategory}&difficulties=hard`
        );
        const questions = { q1: res1, q2: res2, q3: res3 };
        dispatch(setquestions(questions));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setApi(false);
        navigate("/quiz");
      }
    };

    if (api) {
      fetchQuestions();
    }
  }, [api]);
  const handleHeadingClick = () => {
    dispatch(setscore(null));
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex flex-col  bg-yellow-500  items-center min-h-screen  p-6">
      <div
        className="text-6xl text-red-500 mt-4 text-center font-bold mb-6 cursor-pointer"
        onClick={handleHeadingClick}
      >
        <h1>Hv-Quiz!</h1>
      </div>
      <div className="bg-blue-500 p-8   rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl text-black font-bold mb-6 text-center">
          Choose the Category
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`cursor-pointer py-2 px-4 rounded-full text-center ${
                selectedCategory === category
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-green-400 hover:text-white transition duration-300`}
            >
              {category}
            </div>
          ))}
        </div>
        <button
          onClick={(e) => {
            handleNextClick(e);
          }}
          disabled={!selectedCategory}
          className="mt-6 w-full bg-green-500 text-white p-3 rounded-md font-bold hover:bg-green-400 transition duration-300 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Category;
