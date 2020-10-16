import React from 'react';

import MovieList from './MovieList';
import SearchBar from './SearchBar';
import axios from 'axios';
require('dotenv').config();


class App extends React.Component {
  state = {
    movies: [

    ],
    searchQuery: ""
  }

  //FETCH GET
  // async componentDidMount() {
  //   const baseURL = "http://localhost:3002/movies";
  //   const response = await fetch(baseURL);
  //   console.log(response);
  //   const data = await response.json();
  //   console.log(data);
  //   this.setState({ movies: data })
  // }

  //AXIOS GET
  async componentDidMount(){
    const response = await axios.get(`https://api.themoviedb.org/3/list/7061905?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    this.setState({movies:response.data.items})
  }

  //FETCH DELETE
  // deleteMovie =async (movie) => {
  //   const baseURL=`http://localhost:3002/movies/${movie.id}`
  //   await fetch(baseURL, {
  //     method:"DELETE"
  //   })
  //   const newMovieList = this.state.movies.filter(
  //     m => m.id !== movie.id
  //   );

  //   // this.setState({movies:newMovieList}) ilk state bos oldugu durumlarda
  //   this.setState(state => ({
  //     movies: newMovieList
  //   }))
  // }

  //AXIOS DELETE
  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3002/movies/${movie.id}`)
    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id
    );

    // this.setState({movies:newMovieList}) ilk state bos oldugu durumlarda
    this.setState(state => ({
      movies: newMovieList
    }))
  }

  searchMovie = (event) => {
    //console.log(event.target.value);
    this.setState({ searchQuery: event.target.value })
  }

  render() {

    let filteredMovies = this.state.movies.filter(
      (movie) => {      
        return movie.title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
      }
    )
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <SearchBar searchMovieProp={this.searchMovie} />
          </div>
        </div>

        <MovieList
          movies={filteredMovies}
          deleteMovieProp={this.deleteMovie} />
      </div>
    )
  }
}



export default App;