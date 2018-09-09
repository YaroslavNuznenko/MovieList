import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./MovieList.css";
import Button from "../../components/UI/Button/Button";
import GenreItem from "../../components/GenreItem/GenreItem";
import * as actions from "../../store/actions/actions";

class MovieList extends Component {


    render() {
        let movies = [];
        if (this.props.movies.length !== 0) {
            movies = this.props.movies.map(
                m =>
                    m.isVisible ? (
                        <div key={m.id} className={classes.Movie}>
                            <p>{m.title}</p>
                            <img
                                src={
                                    "https://image.tmdb.org/t/p/w500" +
                                    m.poster_path
                                }
                                alt=""
                            />
                            <Button
                                type="Remove"
                                clicked={() => this.props.onMovieRemoved(m.id)}
                            >
                                Удалить
                            </Button>
                            <ul>
                                {m.genre_ids.map(genre_id => (
                                    <GenreItem key={genre_id} >
                                        {this.props.genres[genre_id]}
                                    </GenreItem>
                                ))}
                            </ul>
                        </div>
                    ) : null
            );
        }
        movies = movies.filter(el=> el!==null);
        if(movies.length===0){
            movies = "Нет добавленных фильмов";
        }
        return <div className={classes.MovieList}>{movies}</div>;
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movies,
        genres: state.genres
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onMovieRemoved: movieId => dispatch(actions.removeMovie(movieId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieList);
