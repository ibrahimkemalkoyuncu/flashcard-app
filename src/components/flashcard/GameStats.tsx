import { useEffect, useState } from 'react';

type GameStatsProps = {
  correctAnswers: number;
  wrongAnswers: number;
  onReset: () => void;
  timeElapsed: number;
};

export default function GameStats({ 
  correctAnswers, 
  wrongAnswers, 
  onReset,
  timeElapsed 
}: GameStatsProps) {
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    const total = correctAnswers + wrongAnswers;
    setAccuracy(total > 0 ? Math.round((correctAnswers / total) * 100) : 0);
  }, [correctAnswers, wrongAnswers]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Oyun İstatistikleri</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Doğru</p>
          <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
        </div>
        <div className="p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-gray-600">Yanlış</p>
          <p className="text-2xl font-bold text-red-600">{wrongAnswers}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Doğruluk</p>
          <p className="text-2xl font-bold text-blue-600">{accuracy}%</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">Süre</p>
          <p className="text-2xl font-bold text-purple-600">{formatTime(timeElapsed)}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onReset}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Yeni Oyun Başlat
        </button>
      </div>
    </div>
  );
}