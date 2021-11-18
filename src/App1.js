import React, { Component } from 'react'
import axios from 'axios';
import MovieList from './components/MovieList';
import { Search } from './components/Search'
import './App.css';

export class App extends Component {
  state = {

    moviesArray: [],
    message: ""

  };

  fetchMovieData = async (movie) => {

    this.setState({
      message: ""
    })
    const result = await axios.get(`http://www.omdbapi.com/?s=${movie}&apikey=24537003&`);
    const randomMovies = result.data.Search
    if (randomMovies === undefined) {
      this.setState({
        message: "Movie Not Found"
      })
    } else {
      const moviesWithRating = await Promise.all(randomMovies.map(async (movie) => {
        const result = await axios.get(`http://omdbapi.com/?i=${movie.imdbID}&apikey=24537003&`);
        movie.rating = result.data.imdbRating;
        return movie;
      }));
      this.setState({
        moviesArray: moviesWithRating
      });
    };
  };

  async componentDidMount() {
    try {
      const franchiseArray = [
        "Superman",
        "Lord of the Rings",
        "Batman",
        "Pokemon",
        "Harry Potter",
        "Star Wars",
        "Avengers",
        "Terminator"
      ]
      // get random franchise
      const franchise = franchiseArray[Math.floor(Math.random() * franchiseArray.length)];

      // fetch movie data
      this.fetchMovieData(franchise);

    } catch (e) {
      console.log(e);
    }
  };


  render() {
    return (
      <div className="App">

        <Search fetchMovieData={this.fetchMovieData} message={this.state.message} />
        <br />
        <br />

        <div className="Movie__List">
          <MovieList movies={this.state.moviesArray} />
        </div>
      </div>
    )
  }
}

export default App


