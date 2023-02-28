function Dice(props){
    const styles = {
        backgroundColor: props.isHeld === true ? "#16a085" : "",
        color: props.isHeld === true ? "#fff" : ""
    }
    return(
        <div style={styles} onClick={props.toggle} className="dice justify-content-center d-flex align-items-center">{props.value}</div>
    )
}

export default Dice;