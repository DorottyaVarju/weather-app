import './css/Card.css';

const Card = (props) => {
    return (
        <div className="info">
            <p className="names">{props.infoName}</p>
            <p>{props.info}&nbsp;{props.unit}</p>
            {props.unit === "F" ? <p className="celsius">{props.celsius}&nbsp;<sup>o</sup>C</p> : ""}
            <img src={props.image} className="images" height="60" />
        </div>
    )
}

export default Card;