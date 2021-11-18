import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Favorites() {

  const [data, setData] = useState([]);


  useEffect(() => {
    let jwtToken = window.localStorage.getItem("jwtToken");
    // set up jwtoken for post
    const config = {
      headers: { Authorization: `Bearer ${jwtToken}` }
    };

    axios.get("http://localhost:3001/api/movies/get-all-favorite-movies", config)
      .then(result => setData(result.data.payload)).catch(console.error)
  }, [])


  return (

    console.log(data),
    <>
      <div className="Movie__List">
        {data.map((movie, index) =>
          <Link to={`/fetch-movie/${movie.imdbLink.slice(22)}`} key={index}>
            <div className="image__container">
              <img className="image__img" src={movie.poster} alt="Movie Poster" />
              <div className="image__overlay">
                <span id="image__title">{movie.title}</span>
              </div>
            </div>
          </Link>
        )}
      </div>


    </>
  )
}
