import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { ArrowLeftIcon, Trash } from "lucide-react";

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
      className="favorite_card__anim border border-dark-300 bg-dark-200 rounded-lg flex justify-center items-center p-5 shadow-dark-200 shadow-md min-h-80 max-h-96 h-full relative"
    >
      <li className="list-none break-words text-base md:text-2xl text-center text-white">
        {favorite.favorite}
      </li>
      <button
        onClick={() => deleteFavorite(favorite.id)}
        className="absolute -right-3.5 -top-3 bg-rose-500 rounded-full p-1"
      >
        <Trash className="text-white h-4 w-4" />
        <span className="sr-only">Delete</span>
      </button>
    </div>
  ));

  return (
    <>
      <main className="bg-dark-100 h-screen w-full ">
        <a href="/">
          <ArrowLeftIcon className="text-white absolute top-5 left-5 " />
        </a>

        <div className="grid sm:grid-col-1 lg:grid-cols-4 gap-3 px-10 py-16">
          {favoriteList}
        </div>
      </main>
    </>
  );
};

export default Favorite;
