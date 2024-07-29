import React, { useState } from 'react';
import { Dice6 } from 'lucide-react';

export const FloatingDice = () => {
    const [diceResult, setDiceResult] = useState(null);
    const [isRolling, setIsRolling] = useState(false);

    const rollDice = () => {
        setIsRolling(true);
        const rollDuration = 1000; // 1 second of rolling animation
        const rollInterval = 50; // Update every 50ms during rolling

        const rollAnimation = setInterval(() => {
            setDiceResult(Math.floor(Math.random() * 6) + 1);
        }, rollInterval);

        setTimeout(() => {
            clearInterval(rollAnimation);
            setDiceResult(Math.floor(Math.random() * 6) + 1);
            setIsRolling(false);
        }, rollDuration);
        setTimeout(() => setDiceResult(null), rollDuration * 3);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={rollDice}
                disabled={isRolling}
                className={`
          bg-white rounded-full p-4 shadow-lg
          transition-all duration-200 ease-in-out
          ${isRolling ? 'animate-spin' : 'hover:shadow-xl hover:scale-110'}
        `}
            >
                <Dice6 size={32} className="text-blue-500" />
            </button>
            {diceResult && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                        {diceResult}
                    </span>
                </div>
            )}
        </div>
    );
};