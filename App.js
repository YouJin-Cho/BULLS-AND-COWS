import { useState } from 'react';
import './App.css';
import { generateRandomNumber } from './random/random';
import { useEffect } from 'react';
import Logs from './random/Logs';

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState('');
  const [logs, setLogs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAnswerChanged = (e) => {
    setAnswer(e.target.value);
  }

  const handleSubmit = () => {  
    const answers = answer.split('').map((item) => Number(item))

    // 유효성 검사
    if(answers.some((item) => isNaN(item))) {
      alert('숫자만 입력해주세요.');
      return;
    }

    if(answers.length !== 4) {
      alert('4자리로 입력해주세요.');
      return;
    }
    
    const isDuplicate = answers.some((number) => {
      return answers.indexOf(number) !== answers.lastIndexOf(number)
    })

    if(isDuplicate) {
      alert('중복 없이 입력해주세요.');
      return;
    }

    // strike, ball, 정답 유무
    const { strike, ball } = randomNumber.reduce((prev, cur, index) => {
      // 같은 자리 같은 수가 존재 --> strike
      if(answers[index] === cur) {
        return {
          ...prev,
          strike: prev.strike + 1
        }
      }
      // 다른 자리에 수가 존재 --> ball
      if(answers.includes(cur)) {
        return {
          ...prev,
          ball: prev.ball + 1
        }
      }
      return prev;
    }, {
      strike: 0,
      ball: 0
    });

    if(strike === 4) {
      alert('이야, 정답입니다!');
      setLogs([ ...logs, `정답 : ${answer}`]);
      setIsSuccess(true);
      return;
    }
    console.log(`strike : ${strike}, ball : ${ball}`);
    setLogs([ ...logs, `${answer} (strike : ${strike}, ball : ${ball})`]);
  }

  const handleRetry = () => { // 초기화
    setRandomNumber(generateRandomNumber());
    setAnswer('');
    setLogs([]);
    setIsSuccess(false);
  }

  useEffect(() => {
    console.log(randomNumber);
  }, [randomNumber])

  return (
    <div className="App">
      <h1>⚾️ 숫자 야구 게임 ⚾️</h1>
      <header className='header'>
        {isSuccess ? `정답 : ${answer}` : '💚 숫자 4개를 입력해보세요 : _ _ _ _ 💚'}  
      </header>
      <section>
        <input type='text' value={answer} onChange={handleAnswerChanged} disabled={isSuccess}/>
        {
          isSuccess ? (<button onClick={handleRetry}>다시하기</button>) : (<button onClick={handleSubmit}>제출하기</button>)
        }
      </section>
      <Logs className='logs' logs={logs}/>
    </div>
  );
}

export default App;
