import Dice from './Dice';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

function Main() {

    const [dices, setDices] = useState(newAllDices());

    const getDices = dices.map(x => (
        <Dice
            value={x.value}
            key={x.id}
            isHeld={x.isHeld}
        />
    ))

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

    return (
        <main className='container d-flex justify-content-center'>
            <div className='dice-container m-5'>
                {getDices}
            </div>
        </main>
    )

}

export default Main;
