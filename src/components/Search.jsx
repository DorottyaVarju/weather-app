const Search = ({ search, handleSearch }) => {
    return (
        <div>
            <p>Search for a city:</p> <input value={search} onChange={handleSearch} autoFocus/>
        </div>
    )
}

export default Search