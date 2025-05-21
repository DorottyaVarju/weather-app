const Search = ({ search, handleSearch }) => {
    return (
        <div>
            <p className="bigger-text">Search for a city:</p> <input className="bigger-text" value={search} onChange={handleSearch} autoFocus/>
        </div>
    )
}

export default Search