function RollButton(props) {
    return (
        <div className='d-flex justify-content-center align-items-center mb-3'>
            {!props.tenzies &&
                <button
                    onClick={() => {
                        props.roll();
                        props.count();
                        props.startStopWatch();
                    }}
                    className='btn btn-roll'>
                    Roll
                </button>}
            {props.tenzies && <button onClick={props.resetTheGame} className='btn btn-roll'>Reset the Game</button>}
        </div>
    )
}

export default RollButton;