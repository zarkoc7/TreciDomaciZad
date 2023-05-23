import React from "react"

const he = require('he')

function Answer(props) {
    return (
        <div>
            <input
                onChange={(event) => props.handleChange(event)}
                type="radio"
                id={props.id}
                name={props.name}
                value={props.answer}
                checked={props.isSelected}
            />
            <label 
                className={`answer 
                        ${props.isFinished 
                            ? props.isCorrect
                                ? "correct"
                                : props.isSelected
                                    ? "wrong"
                                    : "other"
                            : ""}
                    `}
                htmlFor={props.id}
            >
                    {he.decode(props.answer)}
            </label>
        </div>
    )
}

export default Answer