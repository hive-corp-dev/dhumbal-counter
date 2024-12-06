import React, { useState } from "react";
import { Users, Trophy, History } from "lucide-react";
import PlayerSetup from "./components/PlayerSetup";
import ScoreInput from "./components/ScoreInput";
import ScoreHistory from "./components/ScoreHistory";

export type Player = {
  id: number;
  name: string;
  scores: number[];
  total: number;
};

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const handleStartGame = (playerNames: string[]) => {
    const newPlayers = playerNames.map((name, index) => ({
      id: index,
      name,
      scores: [],
      total: 0,
    }));
    setPlayers(newPlayers);
    setGameStarted(true);
  };

  const handleScoreSubmit = (newScores: number[]) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player, index) => {
        const newScore = newScores[index];
        const newTotal = player.total + newScore;
        return {
          ...player,
          scores: [...player.scores, newScore],
          total: newTotal,
        };
      });

      // Check if any player has reached 100 points
      if (updatedPlayers.some((player) => player.total >= 100)) {
        setGameFinished(true);
      }

      return updatedPlayers;
    });
  };

  const getWinner = () => {
    if (!gameFinished) return null;
    return players.reduce((prev, current) => (prev.total < current.total ? prev : current));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Dhumbal Score Counter</h1>
          <p className="text-gray-600">100点を超えたプレイヤーが出たら終了です</p>
        </header>

        {!gameStarted && (
          <div className="max-w-md mx-auto">
            <PlayerSetup onStartGame={handleStartGame} />
          </div>
        )}

        {gameStarted && !gameFinished && (
          <div className="max-w-2xl mx-auto">
            <ScoreInput players={players} onScoreSubmit={handleScoreSubmit} />
            <ScoreHistory players={players} />
          </div>
        )}

        {gameFinished && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">ゲーム終了！</h2>
            <div className="text-xl mb-4">
              勝者: <span className="font-bold text-indigo-600">{getWinner()?.name}</span>
              <br />
              スコア: {getWinner()?.total}点
            </div>
            <ScoreHistory players={players} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
