import React, { useState } from "react";
import { Users, Plus, Minus } from "lucide-react";

type PlayerSetupProps = {
  onStartGame: (playerNames: string[]) => void;
};

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(2).fill(""));

  // const _playerName: string[] = [];
  // playerNames.forEach((_, index) => {
  //   _playerName.push("プレイヤー" + (index + 1));
  // });
  // setPlayerNames(_playerName);

  const handlePlayerCountChange = (increment: boolean) => {
    const newCount = increment ? playerCount + 1 : playerCount - 1;
    if (newCount >= 2 && newCount <= 6) {
      setPlayerCount(newCount);
      setPlayerNames((prev) => {
        if (increment) {
          return [...prev, ""];
        } else {
          return prev.slice(0, -1);
        }
      });
    }
  };

  const handleNameChange = (index: number, name: string) => {
    setPlayerNames((prev) => {
      const newNames = [...prev];
      newNames[index] = name;
      return newNames;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedNames = playerNames.map((name, index) => name.trim() || `プレイヤー${index + 1}`);

    // if (playerNames.every((name) => name.trim())) {
    //   onStartGame(playerNames);
    // }

    onStartGame(updatedNames);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="flex items-center justify-center mb-6">
        <Users className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">プレイヤー設定</h2>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => handlePlayerCountChange(false)}
          disabled={playerCount <= 2}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <Minus className="w-5 h-5 text-indigo-600" />
        </button>
        <span className="text-xl font-semibold text-gray-700">{playerCount}人</span>
        <button
          type="button"
          onClick={() => handlePlayerCountChange(true)}
          disabled={playerCount >= 6}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <Plus className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {Array.from({ length: playerCount }).map((_, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                value={playerNames[index]}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`プレイヤー${index + 1}の名前`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          ゲームを開始する
        </button>
      </form>
    </div>
  );
};

export default PlayerSetup;
