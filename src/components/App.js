import React, { Fragment } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class App extends React.Component {
  state = {
    movies: [],
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
  async componentDidMount() {
    const response = await axios.get("http://localhost:3002/movies");
    this.setState({ movies: response.data })
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

  //AXIOS DELETE Movie
  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3002/movies/${movie.id}`)
    const newMovieList = this.state.movies.filter(
      m => m.id !== movie.id
    );

    // this.setState({movies:newMovieList}) when the state is empty in the first case
    this.setState(state => ({
      movies: newMovieList
    }))
  }

  //SEARCH Movie
  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  //AXIOS ADD Movie
  addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies/`, movie)

    this.setState(state => ({
      movies: state.movies.concat(movie)
    }))
  }

  render() {

    let filteredMovies = this.state.movies.filter(
      (movie) => {
        return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
      }
    ).sort((a,b)=>{return a.id < b.id ? 1 : -1});
    return (
      <Router>
        <div className='container'>
          <Switch>
            <Route exact path="/" render={() => (
              <Fragment>
                <div className='row'>
                  <div className='col-lg-12'>
                    <SearchBar searchMovieProp={this.searchMovie} />
                  </div>
                </div>

                <MovieList
                  movies={filteredMovies}
                  deleteMovieProp={this.deleteMovie}
                />
              </Fragment>
            )}>
            </Route>

            <Route path="/add" render={({ history }) => (

              <AddMovie
                  onAddMovie={(movie) => {
                  this.addMovie(movie)
                  history.push("/")
                }
                }
              />

            )}>
            </Route>

          </Switch>
        </div>
      </Router>
    )
  }
}



export default App;