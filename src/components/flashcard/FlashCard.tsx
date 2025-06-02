import React, { useState } from 'react';
import { Word } from '@/types';
import { Button } from '@/components/ui/Button';

interface FlashCardProps {
  word: Word;
  onAnswer: (isCorrect: boolean) => void;
  showResult?: boolean;
  isAnswered?: boolean;
}

export const FlashCard: React.FC<FlashCardProps> = ({
  word,
  onAnswer,
  showResult = false,
  isAnswered = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
  };

  const handleAnswerSubmit = () => {
    const isCorrect = userAnswer.toLowerCase().trim() === word.Turkish.toLowerCase().trim();
    onAnswer(isCorrect);
    setShowAnswer(true);
  };

  const handleCorrectAnswer = () => {
    onAnswer(true);
  };

  const handleWrongAnswer = () => {
    onAnswer(false);
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-orange-100 text-orange-800';
      case 4: return 'bg-red-100 text-red-800';
      case 5: return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Çok Kolay';
      case 2: return 'Kolay';
      case 3: return 'Orta';
      case 4: return 'Zor';
      case 5: return 'Çok Zor';
      default: return 'Bilinmeyen';
    }
  };

  if (isAnswered && showResult) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(word.Difficulty)}`}>
              {getDifficultyText(word.Difficulty)}
            </span>
            {word.Category && (
              <span className="ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {word.Category}
              </span>
            )}
          </div>
          
          <div className="text-4xl font-bold text-gray-800 mb-2">
            {word.English}
          </div>
          
          <div className="text-2xl text-gray-600 mb-6">
            {word.Turkish}
          </div>
          
          <div className="text-sm text-gray-500">
            Kartı çevirmek için tıklayın
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* 3D Flip Card */}
      <div className="relative h-80 perspective-1000">
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white h-full flex flex-col justify-center items-center">
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white`}>
                  {getDifficultyText(word.Difficulty)}
                </span>
                {word.Category && (
                  <span className="ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                    {word.Category}
                  </span>
                )}
              </div>
              
              <div className="text-4xl font-bold mb-4 text-center">
                {word.English}
              </div>
              
              <div className="text-sm opacity-80 text-center">
                Türkçe karşılığını görmek için kartı çevirin
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white h-full flex flex-col justify-center items-center">
              <div className="text-3xl font-bold mb-4 text-center">
                {word.Turkish}
              </div>
              
              <div className="text-xl opacity-90 mb-6 text-center">
                {word.English}
              </div>
              
              <div className="text-sm opacity-80 text-center">
                Tekrar çevirmek için kartı tıklayın
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Input Mode */}
      {!showAnswer && !isFlipped && (
        <div className="mt-6 space-y-4">
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Türkçe karşılığını yazın:
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Cevabınızı yazın..."
              onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleAnswerSubmit}
              disabled={!userAnswer.trim()}
              fullWidth
            >
              Cevapla
            </Button>
            <Button 
              variant="outline"
              onClick={handleRevealAnswer}
              fullWidth
            >
              Cevabı Göster
            </Button>
          </div>
        </div>
      )}

      {/* Answer Feedback */}
      {(showAnswer || isFlipped) && !isAnswered && (
        <div className="mt-6 space-y-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-lg font-medium text-gray-800">
              {word.English} = {word.Turkish}
            </div>
            {userAnswer && (
              <div className="text-sm text-gray-600 mt-2">
                Sizin cevabınız: <span className="font-medium">{userAnswer}</span>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Bu kelimeyi biliyor muydunuz?</p>
            <div className="flex space-x-2">
              <Button 
                variant="success"
                onClick={handleCorrectAnswer}
                fullWidth
              >
                ✓ Evet, biliyordum
              </Button>
              <Button 
                variant="danger"
                onClick={handleWrongAnswer}
                fullWidth
              >
                ✗ Hayır, bilmiyordum
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom CSS for 3D flip effect (add to globals.css)
/*
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
*/