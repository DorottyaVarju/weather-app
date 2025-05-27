const Card = ({ data, unit, parameterName, icon, containerStyle, hasImg }) => {

    if (hasImg) {
        return (
            <div className="card" style={containerStyle}>
                <div className="card-overlay"></div>
                <div className="card-content">
                    <div className="icon-container">{icon}</div>
                    <p className="smaller-text">{parameterName}</p>
                    <p>{data} {unit}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="card">
            <div className="icon-container">{icon}</div>
            <p className="smaller-text">{parameterName}</p>
            <p>{data} {unit}</p>
        </div>
    )
}

export default Card