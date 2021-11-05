import React from 'react';
import './MovieList.css';
import star from './MovieListImages/star.png';

const MovieList = (props) => {
  const subset = props.movies.slice(0, 8);

  return (
    <>
      {subset.map((movie, index) =>
        <div className="image__container" key={movie.imdbID}>
          <img className="image__img" src={movie.Poster} alt="Movie Poster" />
          <div className="image__overlay">
            <span id="image__title">{movie.Title}</span>
            <div id="rating__container">
              <img className="rating__star" src={star} alt="Star" />
              <span id="image__rating">{movie.rating}</span>
            </div>
          </div>
        </div>
      )};
    </>
  )

};

export default MovieList;

// poster divs:
// container div
// - image div (poster)
// - overlay container
// - text div (title)
// - text div (rating)

// {
//   "Title": "Superman Returns",
//   "Year": "2006",
//   "imdbID": "tt0348150",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
// },