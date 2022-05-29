import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions } from './API';
import { QuestionState, Difficulty } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10
function App() {
  let style = {
    backgroundImage: `url("/images/bg.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%"
  }
  const [correct, setCorrect] = useState("")
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  console.log(questions);
  
  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await(fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY))

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)

  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) =>{
    if (!gameOver){
      // user answer
      const answer = e.currentTarget.value
      // check answer against correct value
      setCorrect(questions[number].correct_answer)
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if(correct){
        setScore(prev => prev + 1)
      }
      // save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer, 
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }
  const nextQuestion = ()=>{
    // move onto next question if not the last question
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
      setCorrect("")
    }
  }
  return (
    <div style={style} className="text-center">
      <div className='text-center text-white pt-16'>
        <h1 className='text-3xl font-bold'>React-Typescipt Quiz</h1>
        <p>By Divine Edeh 😊</p>
      </div>
      <div className='mt-10 text-[#f1f1f1]'>
        {
          gameOver || userAnswers.length === TOTAL_QUESTIONS ? <button className='bg-purple-600 mb-4 text-white font-medium text-xl py-2 px-10 rounded' onClick={startTrivia}>Start quiz!</button>
          : null
        }
        {
          !gameOver ? <p className='text-lg font-semibold
          '>Score: {score}</p> : null
        }
        {
          !loading && !gameOver && <p>The correct answer is <span className='font-bold text-xl'>{correct}</span></p>
        }
        {
          loading && <p className='text-xl'>Questions are being loaded...</p>
        }
        {
          !loading && !gameOver && <QuestionCard questionNum={number + 1} totalQuestions={TOTAL_QUESTIONS} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers ? userAnswers[number] : undefined} callback={checkAnswer} /> 
        }
      </div>
      {
        !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1  && <div>
        <button className='bg-purple-600 text-white font-medium text-xl py-2 px-10 rounded my-8' onClick={nextQuestion}>Next question</button>
      </div>
      }
    </div>
  );
}

export default App;
