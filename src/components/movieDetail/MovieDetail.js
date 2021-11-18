import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './MovieDetail.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function MovieDetail() {
  const navigate = useNavigate();
  const { imdbID } = useParams();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [rated, setRated] = useState('');
  const [released, setReleased] = useState('');
  const [runtime, setRuntime] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [writer, setWriter] = useState('');
  const [actors, setActors] = useState('');
  const [plot, setPlot] = useState('');
  const [language, setLanguage] = useState('');
  const [country, setCountry] = useState('');
  const [awards, setAwards] = useState('');
  const [poster, setPoster] = useState('')
  const [url, setUrl] = useState('');
  // const [ratings, setRatings] = useState([]);
  const [type, setType] = useState('');
  const [boxOffice, setBoxOffice] = useState('');

  useEffect(() => {
    fetchMovieDetail()
  })

  async function fetchMovieDetail() {
    try {
      const payload = await axios.get(`http://www.omdbapi.com/?i=${imdbID.trim()}&apikey=ef773fae&`);

      setTitle(payload.data.Title);
      setYear(payload.data.Year);
      setRated(payload.data.Rated);
      setReleased(payload.data.Released);
      setRuntime(payload.data.Runtime);
      setGenre(payload.data.Genre);
      setDirector(payload.data.Director);
      setWriter(payload.data.Writer);
      setActors(payload.data.Actors);
      setPlot(payload.data.Plot);
      setLanguage(payload.data.Language);
      setCountry(payload.data.Country);
      setAwards(payload.data.Awards);
      setPoster(payload.data.Poster);
      setUrl(`http://imdb.com/title/${payload.data.imdbID}`)
      setType(payload.data.Type);
      setBoxOffice(payload.data.BoxOffice);


    } catch (e) {
      console.log(e.response.data);
    }
  };

  async function handleFavoriteClick(e) {
    try {
      let jwtToken = window.localStorage.getItem("jwtToken");
      // set up jwtoken for post
      const config = {
        headers: { Authorization: `Bearer ${jwtToken}` }
      };

      const payload = await axios.post("http://localhost:3001/api/movies/add-to-favorites", {
        title: title,
        poster: poster,
        imdbLink: url,
      }, config)

      toast.success(`${title} has been successfully added to Favorites`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const delay = ms => new Promise(res => setTimeout(res, ms));

      const delayNavigate = async () => {
        await delay(3200);
        navigate("/");
      };

      delayNavigate();

    } catch (e) {
      toast.error(e.response.data.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  };

  return (

    <>
      <div className="poster__and__data__container">
        <img id="poster" src={poster} alt="Movie Poster" />
        <div className="data__container">
          <h4>Title:</h4> {title}
          <h4>Year:</h4> {year}
          <h4>Rated:</h4> {rated}
          <h4>Released:</h4> {released}
          <h4>Runtime:</h4> {runtime}
          <h4>Genre:</h4> {genre}
          <h4>Director:</h4> {director}
          <h4>Writer:</h4> {writer}
          <h4>Actors:</h4> {actors}
          <h4>Plot:</h4> {plot}
          <h4>Language:</h4> {language}
          <h4>Country:</h4> {country}
          <h4>Awards:</h4> {awards}
          <h4>Box Office:</h4> {boxOffice}
        </div>
      </div>
      <button id="fave__button" onClick={handleFavoriteClick}>Add To Favorites</button>

    </>
  )
}

export default MovieDetail