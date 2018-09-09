
import * as actionTypes from './actionTypes'; 
import axios from '../../axios';


export const addMovie = (movies, newMovie)=>{
    let isUpdate = true; 
    movies.forEach((m, i) => {
        if(m.id === newMovie.id){
            isUpdate=false;
        } 
    });
    
    if(isUpdate) movies.unshift(newMovie)

    let updatedMovies =  [...movies];

    return {
        type: actionTypes.ADD_MOVIE,
        movies:  updatedMovies
    }
}

export const setGenres = ( genres ) => {
    let newGenres = {};
    genres.forEach(g=>{
        newGenres[g.id] = g.name;
    })

    return {
        type: actionTypes.SET_GENRES,
        genres: newGenres
    };
};

export const fetchGenresFailed = (genre) => {
    return {
        type: actionTypes.FETCH_GENRES_FAILED,
        genre: genre
    };
};

export const moviesIsVisible = () =>{
    return {
        type: actionTypes.MOVIES_IS_VISIBLE,
    };
}

export const initGenres = (apiLang, apiKey)=>{
    return dispatch => {
        axios.get( 'genre/movie/list?api_key='+ apiKey +'&language=' + apiLang )
            .then( response => {
               dispatch(setGenres(response.data.genres));
            } )
            .catch( error => {
                dispatch(fetchGenresFailed());
            } );
    };
}

export const filterByGenre = (genre_id)=>{
    return {
        type: actionTypes.FILTER_BY_GENRE,
        genre_id: genre_id
    }
}

export const removeMovie = (movieId)=>{
    return {
        type: actionTypes.REMOVE_MOVIE,
        movieId: movieId
    }
}