import React, { useState } from "react";
import { type Player } from "../App";

type ScoreInputProps = {
  players: Player[];
  onScoreSubmit: (scores: number[]) => void;
};

const ScoreInput: React.FC<ScoreInputProps> = ({ players, onScoreSubmit }) => {
  const [scores, setScores] = useState<string[]>(Array(players.length).fill("0"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericScores = scores.map((score) => parseInt(score) || 0);
    onScoreSubmit(numericScores);
    setScores(Array(players.length).fill(""));
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">ラウンド {players[0]?.scores.length + 1} のスコアを入力</h3>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {players.map((player, index) => (
            <div key={player.id} className="flex items-center gap-4">
              <label className="w-32 font-medium text-gray-700">{player.name}</label>
              <input
                type="number"
                value={scores[index]}
                onChange={(e) => {
                  const newScores = [...scores];
                  newScores[index] = e.target.value;
                  setScores(newScores);
                }}
                placeholder="点数を入力"
                min="0"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          スコアを記録
        </button>
      </form>
    </div>
  );
};

export default ScoreInput;
