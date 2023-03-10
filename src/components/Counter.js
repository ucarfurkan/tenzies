function Counter(props) {
    return (
        <div className='num-of-move align-items-center'>
            <div className='number-of d-flex justify-content-center align-items-center'>
                Move
            </div>
            <div className='square number d-flex justify-content-center align-items-center'>
                <span>{props.count}</span>
            </div>
        </div>
    )
}

export default Counter;