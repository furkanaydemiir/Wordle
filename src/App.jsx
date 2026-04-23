import axios from "axios";
import React, { useEffect, useState } from "react";
import Row from "./Row";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { toast } from "sonner";

function App() {
  const [gameWord, setGameWord] = useState("");
  const [userGuess, setUserGuess] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [colors, setColors] = useState(Array(30).fill("bg-[#3A3A3C]"));
  const [history, setHistory] = useState(Array(30).fill(""));
  const [show, setShow] = useState(false);
  const [parent] = useAutoAnimate();

  const rows = Array(30).fill("");

  const handleBackspace = (e) => {
    if (e.key === "Backspace") {
      setUserGuess((prev) => prev.slice(0, -1));
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/wordle.json");
      const data = response.data.words;
      const rand = Math.floor(Math.random() * data.length);
      setGameWord(data[rand].toUpperCase());
      console.log("Hedef:", data[rand]);
    } catch (error) {
      toast.error("Veri çekilemedi");
    }
  };

  const handleChange = (e) => {
    const char = e.target.value.toUpperCase();
    if (char !== "" && userGuess.length < 5) {
      setUserGuess((prev) => [...prev, char]);
    }
  };

  const compareWords = () => {
    if (userGuess.length !== 5) return;

    const currentGuess = [...userGuess];
    const targetArray = gameWord.split("");
    const resultColors = Array(5).fill("bg-red-500 border-red-500");
    const letterCounts = {};

    targetArray.forEach(char => {
      letterCounts[char] = (letterCounts[char] || 0) + 1;
    });

    currentGuess.forEach((char, i) => {
      if (char === targetArray[i]) {
        resultColors[i] = "bg-green-500 border-green-500";
        letterCounts[char] -= 1;
      }
    });

    currentGuess.forEach((char, i) => {
      if (resultColors[i] !== "bg-green-500 border-green-500") {
        if (letterCounts[char] > 0) {
          resultColors[i] = "bg-yellow-500 border-yellow-500";
          letterCounts[char] -= 1;
        }
      }
    });

    const newColors = [...colors];
    const newHistory = [...history];
    resultColors.forEach((color, i) => {
      const globalIndex = (currentRow * 5) + i;
      newColors[globalIndex] = color + " scale-110 transition-transform duration-500";
      newHistory[globalIndex] = currentGuess[i];
    });

    setColors(newColors);
    setHistory(newHistory);

    if (currentGuess.join("") === gameWord) {
      toast.success("Kazandın!");
      setCurrentRow(10);
      setShow(true);
    } else if (currentRow === 5) {
      setShow(true);
      toast.error("Kaybettin!");
      setCurrentRow(10);
    } else {
      setCurrentRow(prev => prev + 1);
      setUserGuess([]);
    }
  };

  const restartGame = () => {
    setColors(Array(30).fill("bg-[#3A3A3C]"));
    setHistory(Array(30).fill(""));
    setCurrentRow(0);
    setUserGuess([]);
    setShow(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-dvh w-full flex bg-[#1A1A1A] justify-center items-center flex-col overflow-hidden">
      <p className="text-white font-serif text-3xl mb-2">WORDLE</p>
      <hr className="text-white w-1/4 mb-8" />
      
      <div ref={parent} className="grid grid-cols-5 gap-3">
        {rows.map((_, index) => {
          const rowOfInput = Math.floor(index / 5);
          const isCurrentRow = rowOfInput === currentRow;
          const displayValue = isCurrentRow 
            ? (userGuess[index % 5] || "") 
            : (history[index] || "");

          return (
            <Row
              key={index}
              value={displayValue}
              color={colors[index]}
              disabled={!isCurrentRow}
              handleChange={handleChange}
              handleBackSpace={handleBackspace}
            />
          );
        })}
      </div>

      <div className="flex flex-col items-center mt-8 h-24">
        {show && (
          <p className="text-xl font-serif text-amber-400 mb-4 animate-bounce">
            Kelime: {gameWord}
          </p>
        )}
        
        <div className="flex flex-row gap-4">
          {!show && currentRow < 6 && (
            <button
              className="bg-green-600 hover:bg-green-500 text-white px-8 py-2 rounded-lg font-bold transition-all active:scale-95"
              onClick={compareWords}
            >
              Onayla
            </button>
          )}
          
          {show && (
            <button
              onClick={restartGame}
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-2 rounded-lg font-bold transition-all"
            >
              Tekrar Dene
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;