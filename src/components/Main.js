import Dice from './Dice';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

function Main() {

    const [dices, setDices] = useState(newAllDices());

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

    return (
        <main className='container d-flex justify-content-center'>
            <div className='dice-container m-5'>
                {getDices}
            </div>
            <div>
                <button onClick={roll} className='btn btn-roll mb-5'>Roll</button>
            </div>
        </main>
    )

}

export default Main;
