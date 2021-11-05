import React, { Component } from 'react'
import axios from 'axios';
import MovieList from './components/MovieList';
import './App.css';

export class App extends Component {
  state = {

    moviesArray: []

  };

  fetchMovieData = async (movie) => {
    const result = await axios.get(`http://www.omdbapi.com/?s=${movie}&apikey=24537003&`);
    return result;
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

      // fetch random movie
      const result = await this.fetchMovieData(franchise);
      const randomMovies = result.data.Search
      console.log(randomMovies)


      const moviesWithRating = await Promise.all(randomMovies.map(async (movie) => {
        const result = await axios.get(`http://omdbapi.com/?i=${movie.imdbID}&apikey=24537003&`);

        movie.rating = result.data.imdbRating;
        return movie;
      }));

      console.log(moviesWithRating)
      this.setState({
        moviesArray: moviesWithRating
      })


    } catch (e) {
      console.log(e);
    }
  };


  render() {
    return (
      <div className="App">
        <div className="Movie__List">
          <MovieList movies={this.state.moviesArray} />
        </div>
      </div>
    )
  }
}

export default App


