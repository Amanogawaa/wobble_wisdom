import React, { useState, useEffect, useContext } from "react";

function App() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);

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
        <h1 className="text-dark-600 ">
          {loading ? <p>Loading...</p> : <p>{advice}</p>}
        </h1>
        <button
          onClick={fetchAdvice}
          className="border border-dark-500 text-dark-600"
        >
          Generate Advice
        </button>
      </main>
    </>
  );
}

export default App;
