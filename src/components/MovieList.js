import React from 'react';

const MovieList=(props) => {

  // function handleClick(e){
  //   console.log(e.pageY);
  // }
   
    return (
      <div className='row'>

        {props.movies.map((movie) => (
          <div className='col-lg-4' key={movie.id}>
            <div className='card mb-4 shadow-sm'>
              <img src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`} className='card-img-top' alt='Sample Movie' />
              <div className='card-body'>
                <h5 className='card-title font-weight-bold'>{movie.title}</h5>
                <p className='card-text'>{movie.overview}</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <button type='button' onClick={(event) => props.deleteMovieProp(movie)} className='btn btn-md btn-outline-danger'>Delete</button>
                  <h2><span className='badge badge-info'>{movie.vote_average}</span></h2>
                </div>
              </div>
            </div>
          </div>
        )

        )}

      </div>
    )

}

export default MovieList;