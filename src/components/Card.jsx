import React from 'react'

const Card = ({card , handleCardclick}) => {
  return (
    <div className={`card ${card.isFlipped ? "flipped" : ""}
    card ${card.isMatched ? "matched" : ""}`} onClick={()=> handleCardclick(card)}>
        <div className="card-front">?</div>
        <div className="card-back">{card.value}</div>
    </div>
  )
}

export default Card