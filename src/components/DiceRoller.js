import React, { useState } from "react";
import { Dice6 } from "lucide-react";

export const DiceRoller = ({ title, d }) => {
  const [result, setResult] = useState(null);

  const rollDice = () => {
    const getResult = () => {
      if (d === "2d6") {
        const firstRoll = Math.floor(Math.random() * 6) + 1;
        const secondRoll = Math.floor(Math.random() * 6) + 1;
        setResult(firstRoll + secondRoll);
      } else if (d === "d66") {
        const firstRoll = Math.floor(Math.random() * 6) + 1;
        const secondRoll = Math.floor(Math.random() * 6) + 1;
        setResult(parseInt(`${firstRoll}${secondRoll}`));
      } else if (d === "d6") {
        setResult(Math.floor(Math.random() * 6) + 1);
      }
    }

    if (result) {
      setResult(null);
      setTimeout(getResult, 200);
    } else {
      getResult();
    }
  };

  return (
    <div className="rounded">
      <h3>{title}</h3>
      <button
        onClick={rollDice}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Roll {d}
        <Dice6 className="inline-block ml-2" />
        {d !== "d6" && <Dice6 className="inline-block" />}
      </button>
      {result !== null && (
        <p className="inline m-2 text-lg">Result: {result}</p>
      )}
    </div>
  );
};