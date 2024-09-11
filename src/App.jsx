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
        <div className="flex justify-center items-center h-full flex-col gap-4">
          <h1 className="text-dark-600 text-3xl">
            {loading ? (
              <span className="loading__anim"></span>
            ) : (
              <p>{advice}</p>
            )}
          </h1>
          <button
            onClick={fetchAdvice}
            className="border border-primary_dark-200 bg-primary_dark-200 text-white  px-4 py-2 rounded-lg hover:bg-primary_dark-400"
          >
            Generate Advice
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
