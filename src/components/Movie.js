import React from 'react';
import bgDefault from '../assets/bg_default.jpg';


export const Movie = ({ movie }) => {
  const poster = movie.Poster === "N/A"
      ? bgDefault
      : movie.Poster;

  return (
      <div className="movie">
        <h2>{movie.Title}</h2>
        <div>
          <img
              width="200"
              alt={`The movie titled: ${movie.Title}`}
              src={poster}
          />
        </div>
        <p>({movie.Year})</p>
      </div>
  );
};
