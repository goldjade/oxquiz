import React, { useState, useEffect } from 'react';
import quizData from '../data/ox_quiz_data.json';

const shuffleArray = (array) => {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
};

const QuizPage = () => {

  const [quizList, setQuizList] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [finished, setFinished] = useState(false);
  const [completed, setCompleted] = useState(false); // 모든 문제 완료 여부
  const [num, setNum] = useState(0); // 점수


  useEffect(() => {
    const shuffled = shuffleArray(quizData);
    setQuizList(shuffled);
    setCurrentQuiz(shuffled[0]);
    setCurrentIndex(0);
  }, []);

  const handleAnswer = (userAnswer) => {
    const correct = userAnswer === currentQuiz.answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setNum((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

const goToNextQuiz = () => {
  const nextIndex = currentIndex + 1;

  // 오답 상태에서 다시 시작할 경우 → 점수 초기화
  if (finished) {
    setNum(0);
  }

  // "정답을 맞추며 마지막 문제까지 도달한 경우"만 completed 처리
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
    alert('모든 문제를 다 풀었습니다. 퀴즈를 새로 시작합니다.');
    const reshuffled = shuffleArray(quizData);
    setQuizList(reshuffled);
    setCurrentQuiz(reshuffled[0]);
    setCurrentIndex(0);
    setNum(0);
    setShowResult(false);
    setIsCorrect(null);
    setFinished(false);
    setCompleted(false);
  };

  if (!currentQuiz) return <div>로딩 중...</div>;

  return (
    <div>

      {completed ? (
        <div>
          <p className='text-area'>모든 문제를 다 풀었습니다.</p>
          <button onClick={restartQuiz}>다시 시작</button>
        </div>
      ) : (
        <>
          <p className='text-area'>{currentQuiz.question}</p>

          {!showResult && (
            <div className='btn-wrap'>
              <button className='o-btn' onClick={() => handleAnswer(true)}>O</button>
              <button className='x-btn' onClick={() => handleAnswer(false)}>X</button>
            </div>
          )}

          {showResult && (
            <div className=''>
              {isCorrect ? (
                <>
                  <p className='green-text'>정답입니다!</p>
                  <button onClick={goToNextQuiz}>다음 문제</button>
                </>
              ) : (
                <div>
                  <p className='red-text'>오답입니다!</p>          
                  {currentQuiz.note && <p className='note'>
                    {currentQuiz.note}</p>}
                  <button onClick={goToNextQuiz}>다시 시작</button>
                </div>
              )}
            </div>
          )}
        </>
      )}
      <p className='count'>현재 점수: {num}</p>
    </div>
  );
};

export default QuizPage;
