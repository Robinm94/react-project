import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";
import SearchIcon from "../Icons/Search";
import useMountTransition from "../../hooks/useMountTransition";
import axiosInstance from "../../services/axiosCreator";

function SearchBar() {
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  let hasTransitionedIn = useMountTransition(searchClicked, 400);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearchClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  async function fetchMoviesNames(searchInputValue) {
    if (searchInputValue.length === 0) {
      setSearchResults([]);
      return;
    }
    let allResults = [];
    let page = 1;
    let totalPages = 5;
    while (page <= totalPages) {
      const response = await axiosInstance
        .get(
          `/search/multi?query=${searchInputValue}&include_adult=false&sort_by=popularity.desc&page=${page}`,
        )
        .catch((error) => console.log(error.message));
      if (response?.data?.results.length > 0) {
        allResults = allResults.concat(response.data.results);
      }
      page++;
    }
    if (allResults.length > 0) {
      const results = allResults
        .filter((result) => {
          return result.original_language === "en";
        })
        .sort((a, b) => {
          return b.popularity - a.popularity;
        })
        .slice(0, 5)
        .map((result) => {
          return {
            id: result.id,
            title: result?.title || result?.name || result?.original_name,
            release_date: result?.release_date || result?.first_air_date,
            poster_path: result.poster_path,
            media_type: result.media_type,
          };
        });
      setSearchResults(results);
    }
  }

  function handleSearch(searchInputValue) {
    setSearchInput(searchInputValue);
    fetchMoviesNames(searchInputValue);
  }

  return (
    <div className="search">
      {hasTransitionedIn || searchClicked ? (
        <div
          ref={inputRef}
          className={`searchInput ${hasTransitionedIn && "in"} ${
            searchClicked && "expanded"
          }`}
        >
          <SearchIcon />
          <label
            htmlFor="searchInput"
            id="searchInput-label"
            className="visually-hidden"
          >
            Search
          </label>
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            placeholder="Enter show name"
            data-search-input="true"
            dir="ltr"
            data-uia="search-box-input"
            aria-labelledby="searchInput-label"
            maxLength="80"
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
            // style={"opacity: 1; transition-duration: 300ms;"}
            style={{ opacity: 1, transitionDuration: "300ms" }}
          ></input>
          <span
            role="button"
            tabIndex="0"
            aria-label="Clear input"
            onClick={() => {
              setSearchInput("");
              setSearchResults([]);
              document.getElementById("searchInput").focus();
            }}
            className={`icon-close ${searchInput.length == 0 ? "empty" : ""}`}
          ></span>
          <div
            key={"searchResults"}
            className={`searchResults ${searchResults.length > 0 ? "show" : ""}`}
          >
            {searchResults.map((result, index) => {
              return (
                <div key={result.media_type + "_" + result.id + "_" + index}>
                  <Link
                    to={`/${result.media_type === undefined ? "movie" : result.media_type.toLowerCase()}/${result.id}`}
                    className="searchResult__link"
                    onClick={() => {
                      setSearchResults([]);
                      setSearchInput("");
                      setSearchClicked(false);
                    }}
                  >
                    <div className="searchResult">
                      <img
                        className="searchResult__poster"
                        src={`https://image.tmdb.org/t/p/w45/${result.poster_path}`}
                        alt={`${result.title} poster`}
                      ></img>
                      <div className="searchResult__details">
                        <p className="searchResult__title">{result.title}</p>
                        <p className="searchResult__releaseDate">
                          {result.release_date}
                        </p>
                      </div>
                      <div className="searchResult__end" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <button
          aria-label="Search"
          className="search__button"
          onClick={() => setSearchClicked(true)}
        >
          <SearchIcon />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
