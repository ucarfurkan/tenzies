function Stopwatch(props) {

    return (
        <div className="num-of-move align-items-center">
            <div className='number-of d-flex justify-content-center align-items-center'>
                Time
            </div>
            <div className='square time d-flex justify-content-center align-items-center'>
                <span>{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}</span>
            </div>
        </div>
    );

}

export default Stopwatch;