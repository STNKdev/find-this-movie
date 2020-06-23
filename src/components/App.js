// import React, { useState, useEffect } from 'react';
import React, { useReducer, useEffect } from 'react';
import '../App.css';
import { Header } from './Header';
import { Search } from './Search';
import { Movie } from './Movie';
import { Loader } from './Loader';
import { initialState, reducer} from '../store/reducer';


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

export const App = () => {

  // const [loading, setLoading] = useState(true);
  // const [movies, setMovies] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
        .then(response => response.json())
        .then(jsonResponse => {
          // setMovies(jsonResponse.Search);
          // setLoading(false);
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        });
  }, []);

  const search = searchValue => {
    // setLoading(true);
    // setErrorMessage(null);

    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.Response === "True") {
            // setMovies(jsonResponse.Search);
            // setLoading(false);
            dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: jsonResponse.Search
            });
          } else {
            // setErrorMessage(jsonResponse.Error);
            // setLoading(false);
            dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: jsonResponse.Error
            });
          }
        });
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies = loading && !errorMessage ? (
      <Loader />
  ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
  ) : (
      <div className="movies">
        {movies.map((movie, index) => (
          <Movie key={`${index}-${movie.Title}`} movie={movie} />
        ))}
      </div>
  );

  return (
      <div className="App">
        <Header text="FIND THIS MOVIE" />
        <Search search={search} />
        <p className="App-intro">Жаль у кинопоиска нет API</p>
        {retrievedMovies}
      </div>
  );
};
