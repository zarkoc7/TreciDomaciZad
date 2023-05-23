import React from "react"

const he = require('he')

function Question(props) {

  


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