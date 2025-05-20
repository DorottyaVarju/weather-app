const Card = ({data, unit, parameterName}) => {
    return (
        <div className="card">
            <p>{parameterName}</p>
            <p>{data} {unit}</p>
        </div>
    )
}

export default Card