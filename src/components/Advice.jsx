import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import { addDoc, collection } from "firebase/firestore";
import Favorite from "./Favorite";

const Advice = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState("");

  const addToFavorite = async () => {
    if (advice !== "") {
      try {
        await addDoc(collection(db, "favorites"), {
          favorite: advice,
          completed: false,
        });
        console.log("Favorite added to Firestore");
      } catch {
        console.log("Failed to add advice to favorites");
      }
      setFavorite("");
    }
  };

  const fetchAdvice = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      console.log(data);
      setAdvice(data.slip.advice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <>
      <main className="bg-dark-100 h-screen w-full">
        <div className="flex justify-center items-center h-full flex-col gap-4">
          <div className="max-w-screen-md mx-auto ">
            {loading ? (
              <span className="loading__anim"></span>
            ) : (
              <p className="font-primary text-dark-600 text-base md:text-3xl break-words whitespace-break-spaces text-center">
                {advice}
              </p>
            )}
          </div>
          <div className="flex w-full justify-center items-center gap-2">
            <button
              onClick={fetchAdvice}
              className="border border-primary_dark-200 bg-primary_dark-200 text-white  px-4 py-2 rounded-lg hover:bg-primary_dark-400 font-primary tracking-widest text-lg"
            >
              Generate Advice
            </button>
            <button
              onClick={addToFavorite}
              className="border border-primary_dark-200 bg-primary_dark-200 text-white  px-4 py-2 rounded-lg hover:bg-primary_dark-400 font-primary tracking-widest text-lg"
            >
              Favorites
            </button>
          </div>
        </div>
        <div>
          <Favorite />
        </div>
      </main>
    </>
  );
};

export default Advice;
