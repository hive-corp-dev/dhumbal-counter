import React from 'react';
import { History } from 'lucide-react';
import { type Player } from '../App';

type ScoreHistoryProps = {
  players: Player[];
};

const ScoreHistory: React.FC<ScoreHistoryProps> = ({ players }) => {
  if (players[0]?.scores.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-800">スコア履歴</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-2">ラウンド</th>
              {players.map(player => (
                <th key={player.id} className="px-4 py-2">{player.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players[0].scores.map((_, roundIndex) => (
              <tr key={roundIndex} className="border-b">
                <td className="px-4 py-2 font-medium">
                  {roundIndex + 1}
                </td>
                {players.map(player => (
                  <td key={player.id} className="px-4 py-2">
                    {player.scores[roundIndex]}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-4 py-2">合計</td>
              {players.map(player => (
                <td key={player.id} className="px-4 py-2">
                  {player.total}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreHistory;