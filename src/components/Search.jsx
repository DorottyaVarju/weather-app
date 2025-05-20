const Search = ({ search, handleSearch }) => {
    return (
        <>
            Search for a city: <input value={search} onChange={handleSearch} />
        </>
    )
}

export default Search