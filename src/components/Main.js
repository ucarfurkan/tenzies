import Dice from './Dice';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Counter from './Counter'

function Main() {

    const [dices, setDices] = useState(newAllDices());
    const [tenzies, setTenzies] = useState(false);
    const [numOfMove, setNumOfMove] = useState(0);

    useEffect(() => {
        const isDicesHeld = dices.map((dice) => dice.isHeld).every((held) => held);
        const isValuesEqual = dices.map((dice) => dice.value === dices[0].value).every((held) => held);
        if (isDicesHeld && isValuesEqual) {
            setTenzies(true);
        }

    }, [dices])

    const getDices = dices.map(x => (
        <Dice
            key={x.id}
            value={x.value}
            isHeld={x.isHeld}
            toggle={() => toggleDice(x.id)}
        />
    ))

    function toggleDice(id) {
        setDices(oldDices => oldDices.map(x => {
            return x.id === id ? { ...x, isHeld: !x.isHeld } : x
        }))
    }

    function generateNewDice() {
        const value = Math.floor(Math.random() * 6 + 1)
        const id = nanoid();
        return { value: value, id: id, isHeld: false }
    }

    function newAllDices() {
        const dices = [];
        for (let i = 0; i < 10; i++) {
            dices.push(generateNewDice())
        }
        return dices;
    }

    function roll() {
        setDices(oldDices => oldDices.map(x => {
            return x.isHeld === true ? x : generateNewDice()
        }))
    }

    function resetTheGame() {
        setTenzies(false);
        setDices(newAllDices());
        setNumOfMove(0)
    }

    function count(){
        setNumOfMove(prev => prev+1)
    }

    return (
        <main className='container d-flex justify-content-center'>
            <div className='dice-container m-5'>
                {getDices}
            </div>
            <div className='d-flex justify-content-center align-items-center mb-3'>
                {!tenzies &&
                    <button
                        onClick={() => {
                            roll();
                            count();
                        }}
                        className='btn btn-roll'>
                        Roll
                    </button>}
                {tenzies && <button onClick={resetTheGame} className='btn btn-roll'>Reset the Game</button>}
            </div>
            <div className='w-100 d-flex justify-content-around mb-4'>
                <Counter count= {numOfMove} />
                <div className='num-of-move align-items-center'>
                    <div className='number-of d-flex justify-content-center align-items-center'>
                        Time
                    </div>
                    <div className='number d-flex justify-content-center align-items-center'>
                        <span></span>
                    </div>
                </div>
            </div>
        </main>
    )

}

export default Main;
