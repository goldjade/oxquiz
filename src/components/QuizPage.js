import React, { useState, useEffect } from "react";
import quizData from "../data/ox_quiz_data.json";

const shuffleArray = (array) => {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
};

const lifeCount = 3;

const QuizPage = () => {
  const [quizList, setQuizList] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [finished, setFinished] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [num, setNum] = useState(0);
  const [life, setLife] = useState(lifeCount);

  useEffect(() => {
    const shuffled = shuffleArray(quizData);
    setQuizList(shuffled);
    setCurrentQuiz(shuffled[0]);
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    if (life <= 0) {
      setFinished(true);
    }
  }, [life]);

  const handleAnswer = (userAnswer) => {
    const correct = userAnswer === currentQuiz.answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setNum((prev) => prev + 1);
    } else {
      setLife((prev) => prev - 1); // 기회 감소만 처리
    }
  };

  const goToNextQuiz = () => {
    if (life === 0) return;

    const nextIndex = currentIndex + 1;

    if (nextIndex >= quizList.length && !finished) {
      setCompleted(true);
      return;
    }

    setCurrentIndex(nextIndex);
    setCurrentQuiz(quizList[nextIndex]);
    setShowResult(false);
    setIsCorrect(null);
    setFinished(false);
  };

  const restartQuiz = () => {
    alert("퀴즈를 다시 시작합니다.");
    const reshuffled = shuffleArray(quizData);
    setQuizList(reshuffled);
    setCurrentQuiz(reshuffled[0]);
    setCurrentIndex(0);
    setNum(0);
    setShowResult(false);
    setIsCorrect(null);
    setFinished(false);
    setCompleted(false);
    setLife(lifeCount);
  };

  if (!currentQuiz) return <div>로딩 중...</div>;

  return (
    <div>
      {completed ? (
        <div>
          <p className="text-area">🎉 모든 문제를 다 풀었습니다!</p>
          <button onClick={restartQuiz}>다시 시작</button>
        </div>
      ) : (
        <>
          <p className="text-area">{currentQuiz.question}</p>

          {!showResult && (
            <div className="btn-wrap">
              <button className="o-btn" onClick={() => handleAnswer(true)}>
                O
              </button>
              <button className="x-btn" onClick={() => handleAnswer(false)}>
                X
              </button>
            </div>
          )}

          {showResult && (
            <div style={{ marginTop: 20 }}>
              {isCorrect ? (
                <>
                  <p className="green-text">정답입니다!</p>
                  <button onClick={goToNextQuiz}>다음 문제</button>
                </>
              ) : (
                <>
                  <p className="red-text">오답입니다!</p>
                  <p>남은 기회: {life}</p>
                  {currentQuiz.note && (
                    <p className="note">💡 {currentQuiz.note}</p>
                  )}
                  {life > 0 ? (
                    <button onClick={goToNextQuiz}>다음 문제</button>
                  ) : (
                    <button onClick={restartQuiz}>다시 시작</button>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
      <p className="count">현재 점수: {num}</p>
      <p>남은 기회: {life}</p>
    </div>
  );
};

export default QuizPage;
