import React,{useState, useEffect} from "react"
import Question from "./Question"
import {nanoid} from "nanoid"

function Quiz() {
    const [quiz, setQuiz] = useState([])
    const [score, setScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [restart, setRestart] = useState(false)

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(res => res.json())
        .then(data => {
            let quizArray = []
            let counter = 0
            data.results.map(item => {
                const incorrectAnswers = item.incorrect_answers.map(answer => {
                    return {
                        value : answer,
                        isSelected : false,
                        isCorrect : false,
                        name: counter,
                        id : nanoid()
                    }
                })

                const correctAnswer = {
                        value: item.correct_answer,
                        isSelected : false,
                        isCorrect: true,
                        name: counter,
                        id : nanoid()
                    }

                counter++

                quizArray.push({
                    question: item.question,
                    answers: [...incorrectAnswers, correctAnswer]
                })

                // counter++

                return quizArray
            })

            setQuiz(quizArray)
        })
    }, [restart])
 
    function selectAnswer(event) {
        const {id,name} = event.target
        setQuiz(prevQuiz => {
            return prevQuiz.map(item => {
                return {
                        ...item,
                        answers : item.answers.map(answer => {
                                return answer.name.toString() === name 
                                    ? answer.id === id  
                                        ? {...answer, isSelected: true}
                                        : {...answer, isSelected: false}
                                    : answer
                            })
                        }
            })
        })
     }

    function countScore() {

        if(isFinished)
        {
            setIsFinished(false)
            setRestart(prevRestart => !prevRestart)
        }
        else
        {
            let result = 0
            quiz.map(item => {
                return item.answers.map(answer => {
                    return answer.isSelected && answer.isCorrect
                        ? result++
                        : 0
                })
            })
            setScore(result)
            setIsFinished(true)
        }
    }

    const questionsElements = quiz.map(item => {
        return <Question 
                    key={nanoid()} 
                    question={item.question} 
                    answers={item.answers}
                    selectAnswer={selectAnswer}
                    isFinished={isFinished}
                />
    })

    return (
        <div className="quiz">
            {questionsElements}
            <div className="quiz__footer">
                {isFinished && <h4 className="quiz__results">You scored {score}/5 correct answers</h4> }
                {questionsElements.length > 0 && <button onClick={countScore}>{isFinished ? "Play Again" : "Check answers"}</button>}
            </div>
        </div>
    )
}

export default Quiz