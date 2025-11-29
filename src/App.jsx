import React, { useEffect } from 'react'
import { useState } from 'react'
import GameHeader from './components/GameHeader'
import Card from './components/Card'
import './App.css'
import WinMessage from './components/WinMessage'
const cardValues = [
  "🐯",
  "🦁",
  "🦒",
  "🦝",
  "🦓",
  "🐸",
  "🦄",
  "🫎",
  "🐯",
  "🦁",
  "🦒",
  "🦝",
  "🦓",
  "🐸",
  "🦄",
  "🫎",
]




const App = () => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])

  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isLocked, setIsLocked] = useState(false)


  const shuffledArray = (arr)=>{
    const shuffled = [...arr]
    for(let i = shuffled.length-1; i>0;i--){
      const j = Math.floor(Math.random() * (i+1));
      [shuffled[i] , shuffled[j]] = [shuffled[j] , shuffled[i]]
    }
    return shuffled
  }
  
  const initializeGame = () => {
    //SHUFFLING PART
    const shuffled = shuffledArray(cardValues)

    const finalCards = cardValues.map((value, index) => (
      {
        id: index,
        value: value,
        isFlipped: false,
        isMatched: false
      }
    ))
    setCards(finalCards)
    setMoves(0)
    setScore(0)
    setIsLocked(false )
    setFlippedCards([])
    setMatchedCards([])
  }

  const handleCardclick = (card) => {
    //Dont allow clicking if its already flipped , matched
    if (card.isFlipped || card.isMatched ||isLocked ==true || flippedCards.length ==2) {
      return;
    }
    //Update card fliped state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true }
      } else {
        return c;
      }
    })

    setCards(newCards)


    const newFlippedCards = [...flippedCards, card.id]
    setFlippedCards(newFlippedCards)
    //check for match if two cards are flipped 
    if (flippedCards.length == 1) {
      setIsLocked(true)
      const firstCard = cards[flippedCards[0]]

      if (firstCard.value == card.value) {
        setScore((prev)=>prev+1)
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id])
          
          setCards((prev)=>prev.map((c) => {
            if (c.id === card.id || c.id === firstCard.id) {
              return { ...c, isMatched: true }
            }
            else return c
          }))
          setFlippedCards([])
          setIsLocked(false)
        }, 500);

      } else {
        //flip back card 1 , 2
        setTimeout(() => {
          const flippedBackcard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false }
            } else {
              return c;
            }
          })
          setCards(flippedBackcard)
          setFlippedCards([])
          setIsLocked(false)
        }, 1000);

      }

      setMoves((prev)=>prev+1)

    }

  }
  const isGameCompleted = matchedCards.length===cards.length

  useEffect(() => {
    initializeGame();
  }, [])

  return (
    <div className='app'>
      <GameHeader score={score} moves={moves} onReset = {initializeGame}/>
      {isGameCompleted && <WinMessage moves = {moves}/>}
      <div className="cards-grid">
        {cards.map((card, id) => (
          <Card card={card} handleCardclick={handleCardclick} />
        ))}
      </div>
    </div>
  )
}

export default App