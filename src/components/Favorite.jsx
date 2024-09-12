import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/Firebase";

const Favorite = () => {
  const [favorites, setFavorite] = useState([]);

  useEffect(() => {
    try {
      const q = query(collection(db, "favorites"));
      const unsub = onSnapshot(q, (querySnapShot) => {
        let favoriteArr = [];

        querySnapShot.forEach((doc) => {
          favoriteArr.push({ ...doc.data(), id: doc.id });
        });

        setFavorite(favoriteArr);
      });

      return () => unsub();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // ?function for deleting favorite
  async function deleteFavorite(id) {
    try {
      await deleteDoc(doc(db, "favorites", id));
      console.log("Favorite deleted successfully");
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  }

  const favoriteList = favorites.map((favorite) => (
    <div
      key={favorite.id}
      className="border border-primary_dark-300 bg-primary_dark-200 rounded-lg flex justify-center items-center p-5 shadow-primary_dark-200 shadow-md min-h-80 max-h-96 h-full relative"
    >
      <li className="list-none break-words text-base md:text-2xl text-center text-white">
        {favorite.favorite}
      </li>
      <button
        onClick={() => deleteFavorite(favorite.id)}
        className="absolute -right-3.5 -top-3 bg-rose-500 rounded-full p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span className="sr-only">Delete</span>
      </button>
    </div>
  ));

  return (
    <>
      <main className="bg-dark-100 h-screen w-full">
        <div className="grid sm:grid-col-1 lg:grid-cols-4 gap-3 p-10  ">
          {favoriteList}
        </div>
      </main>
    </>
  );
};

export default Favorite;
