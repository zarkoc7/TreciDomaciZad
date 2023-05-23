import { nanoid } from "nanoid"
import React from "react"
import Answer from "./Answer"

const he = require('he')

function Question(props) {

    const allAnswers = props.answers.sort((a,b) => {
        const answerA = a.value.toUpperCase()
        const answerB = b.value.toUpperCase()
        if(answerA < answerB)
            return -1
        if(answerA > answerB)
            return 1
        
        return 0
    })

    const allAnswersElements = allAnswers.map(answer => {
        return (
            <Answer
                key={nanoid()}
                id = {answer.id} 
                answer={answer.value}
                name={answer.name}
                handleChange={(event) => props.selectAnswer(event)}
                isSelected = {answer.isSelected}
                isCorrect= {answer.isCorrect}
                isFinished={props.isFinished}
            />
        )
    })

    return(
        <div className="question__container">
            <h4 className="question">{he.decode(props.question)}</h4>
            <div className="answers--grid">
                {allAnswersElements}
            </div>
        </div>
    )
}

export default Question