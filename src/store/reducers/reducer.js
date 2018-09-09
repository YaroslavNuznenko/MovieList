import * as actionTypes from "../actions/actionTypes";

const initialState = {
    movies: [
        {
            id: 289732,
            title: "Бойцовский клуб",
            poster_path: "/hTjHSmQGiaUMyIx3Z25Q1iktCFD.jpg",
            genre_ids: [18],
            isVisible: true
        },
        {
            id: 694,
            title: "Сияние",
            poster_path: "/hwrXDwHe8KocDSwAiYAhlbpyiqr.jpg",
            genre_ids: [27, 53],
            isVisible: true
        },
        {
            id: 339403,
            title: "Малыш на драйве",
            poster_path: "/x4rymQoQELYB01WYe9ZFBTjKiES.jpg",
            genre_ids: [28, 80],
            isVisible: true
        },
        {
            id: 238,
            title: "Крестный отец",
            poster_path: "/gZUc6DbAirZGWJL1685jsOd90Sf.jpg",
            genre_ids: [18, 80],
            isVisible: true
        }
    ],
    movieApiKey: "d527d0f3c801ad4ad9e3f735b81e9c5d",
    movieApiLang: "ru-Ru",
    genres: []
};

const addMovie = (state, action) => {
    let updatedState = { movies: action.movies };

    return {
        ...state,
        ...updatedState
    };
};

const filterByGenre = (state, action) => {
    let updatedMovies = [...state.movies];
    updatedMovies.forEach(el => {
        el.isVisible = true;
        if(el.genre_ids.indexOf(action.genre_id)<0) el.isVisible = false

    });
    let updatedState =  {movies: [...updatedMovies]};
    return {
        ...state,
        ...updatedState
    };
};

const removeMovie = (state, action) => {
    let updatedMovies = state.movies.filter(m => {
        return m.id !== action.movieId;
    });
    let updatedState = {
        movies: updatedMovies
    };

    return {
        ...state,
        ...updatedState
    };
};
const moviesIsVisible = (state, action) =>{
    let updatedMovies = [...state.movies];
    updatedMovies.forEach(el=> el.isVisible=true)    

    let updatedState = {
        movies: updatedMovies
    };

    return {
        ...state,
        ...updatedState
    };
}


const setGenres = (state, action) => {
    let updatedState = {
        genres: action.genres
    };
    return {
        ...state,
        ...updatedState
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MOVIE:
            return addMovie(state, action);
        case actionTypes.REMOVE_MOVIE:
            return removeMovie(state, action);
        case actionTypes.SET_GENRES:
            return setGenres(state, action);
        case actionTypes.FILTER_BY_GENRE:
            return filterByGenre(state, action);
        case actionTypes.MOVIES_IS_VISIBLE:
            return moviesIsVisible(state, action);
        default:
            return state;
    }
    // return state;
};

export default reducer;
