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
    const q = query(collection(db, "favorites"));
    const unsub = onSnapshot(q, (querySnapShot) => {
      let favoriteArr = [];

      querySnapShot.forEach((doc) => {
        favoriteArr.push({ ...doc.data(), id: doc.id });
      });

      setFavorite(favoriteArr);
    });

    return () => unsub();
  }, []);

  const favoriteList = favorites.map((favorite, index) => (
    <div className="flex items-center ">
      <li key={index}>{favorite.favorite}</li>
    </div>
  ));

  return (
    <>
      <ul>{favoriteList}</ul>
    </>
  );
};

export default Favorite;
