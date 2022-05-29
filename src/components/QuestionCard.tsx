import React from 'react'
import { AnswerObject } from "../App"

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQuestions: number;
} 

const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNum, totalQuestions}) => {
    return (
        <div>
            <h2 className='text-lg my-2'>Question: {questionNum}/{totalQuestions}</h2>
            <div className='w-full bg-gray-700 bg-opacity-50 px-10 py-8'>
                <h2 className='text-2xl pb-5 border-b' dangerouslySetInnerHTML={{__html: question}} />
                {
                    answers.map(answer => {
                            return <div key={answer}>
                                <button className={`bg-purple-700 py-2 w-full rounded my-3 hover:cursor-pointer`} disabled={!!userAnswer} value={answer} onClick={callback}> 
                                    <h2 dangerouslySetInnerHTML={{__html: answer }} />
                                </button>
                            </div>
                        })
                    }
            </div>
            
        </div>
    )
}

export default QuestionCard