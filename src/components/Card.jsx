const Card = ({ data, unit, parameterName, icon }) => {
    return (
        <div className="card">
            <div className="icon-container">{icon}</div>
            <p className="smaller-text">{parameterName}</p>
            <p>{data} {unit}</p>
        </div>
    )
}

export default Card