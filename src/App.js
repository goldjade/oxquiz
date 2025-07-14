import { useState } from 'react';
import './App.css';
import QuizPage from './components/QuizPage';

function App() {


    const [start, setStart] = useState(false)
  
  
  return (
    <div className='containenr'>

{ !start ?       <div>
      <h1>절망 단합회 OX 퀴즈</h1>
      <p>절망 단합회에서 순식간에 끝나버린 OX 퀴즈가 아쉬워서 만들었습니다.<br/>40문제가 랜덤으로 줄제되며, 틀리면 바로 종료됩니다.
      </p>
      <button className='button' onClick={()=> setStart(true)}>
        시작
      </button>
      </div>

:      <QuizPage/>}


    </div>
  );
}

export default App;
