import React, { useState } from 'react';
import { Dice6 } from 'lucide-react';
import { DiceType } from '../types';

interface DiceRollerProps {
  title: string;
  d: DiceType;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({ title, d }) => {
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollDice = (): void => {
    const getResult = (): void => {
      if (d === '2d6') {
        const firstRoll = Math.floor(Math.random() * 6) + 1;
        const secondRoll = Math.floor(Math.random() * 6) + 1;
        setResult(firstRoll + secondRoll);
      } else if (d === 'd66') {
        const firstRoll = Math.floor(Math.random() * 6) + 1;
        const secondRoll = Math.floor(Math.random() * 6) + 1;
        setResult(parseInt(`${firstRoll}${secondRoll}`));
      } else if (d === 'd6') {
        setResult(Math.floor(Math.random() * 6) + 1);
      }
      setIsRolling(false);
    };

    if (result) {
      setResult(null);
      setIsRolling(true);
      setTimeout(getResult, 300);
    } else {
      setIsRolling(true);
      setTimeout(getResult, 300);
    }
  };

  return (
    <div className="rounded">
      <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 h-[40px] rounded
                     hover:from-blue-600 hover:to-blue-700 transition-all duration-300
                     shadow-lg hover:shadow-xl
                     disabled:opacity-50 disabled:cursor-not-allowed
                     font-medium flex items-center gap-2"
        >
          <div className={`flex ${isRolling ? 'animate-bounce' : ''}`}>
            <Dice6 className={`inline-block ${isRolling ? 'animate-spin' : ''}`} size={20} />
            {d !== 'd6' && (
              <Dice6
                className={`inline-block -ml-1 ${isRolling ? 'animate-spin' : ''}`}
                size={20}
                style={{ animationDelay: '0.1s' }}
              />
            )}
          </div>
        </button>

        {result !== null && (
          <div className="animate-bounce-in">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-2 py-1 rounded shadow-lg flex items-center justify-center min-w-[40px] h-[40px]">
              <p className="text-2xl font-bold">{result}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
