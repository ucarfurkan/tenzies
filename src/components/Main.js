import Dice from './Dice';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import Counter from './Counter'
import Stopwatch from './Stopwatch';
import RollButton from './RollButton';
import Confetti from 'react-confetti'

function Main() {
    const [dices, setDices] = useState(newAllDices());
    const [tenzies, setTenzies] = useState(false);
    const [numOfMove, setNumOfMove] = useState(0);
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false); // New state variable
    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        const isDicesHeld = dices.map((dice) => dice.isHeld).every((held) => held);
        const isValuesEqual = dices.map((dice) => dice.value === dices[0].value).every((held) => held);
        if (isDicesHeld && isValuesEqual) {
            setTenzies(true);
            setRunning(false);
            setShowConfetti(true); // Set showConfetti to true
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
        setRunning(true);
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
        setNumOfMove(0);
        setTime(0);
        setShowConfetti(false); // Set showConfetti to false
    }

    function count() {
        setNumOfMove(prev => prev + 1)
    }

    function startStopWatch() {
        setRunning(true);
    }
    return (
        <main className='container d-flex justify-content-center'>
            <div className='dice-container m-5'>
                {getDices}
            </div>
            {showConfetti && <Confetti/>}
            <RollButton
                startStopWatch={startStopWatch}
                count={count}
                roll={roll}
                resetTheGame={resetTheGame}
                tenzies={tenzies}
            />
            <div className='w-100 d-flex justify-content-around mb-4'>
                <Counter count={numOfMove} />
                <Stopwatch time={time} setRunning={setRunning} />
            </div>

        </main>
    )

}

export default Main;
