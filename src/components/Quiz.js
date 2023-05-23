import React,{useState, useEffect} from "react"
import {nanoid} from "nanoid"

function Quiz() {
    const [quiz, setQuiz] = useState([])
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
 
   


   

    return (
        <div>Quiz</div>
       
    )
}

export default Quiz