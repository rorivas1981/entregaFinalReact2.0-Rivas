const Button = (props) => {
    return <button onClick={props.handleClick} style={{ color: 'orangered' }}>{props.label}

    </button>
}

export default Button
