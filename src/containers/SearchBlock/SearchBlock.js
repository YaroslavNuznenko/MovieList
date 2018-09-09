import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";

import * as actions from "../../store/actions/actions";
import Button from "../../components/UI/Button/Button";
import classes from "./SearchBlock.css";
import onClickOutside from "react-onclickoutside";

class SearchInput extends Component {
    state = {
        searchMovies: [],
        isMovieListActive: false,
        searchInputValue: '' 
    };

    onChangeHandler = event => {

        let value = event.target.value;

        if (value !== "") {
            let encodeValue = encodeURIComponent(value);
            let url =
                "search/movie?api_key=" +
                this.props.apiKey +
                "&language=" +
                this.props.apiLang +
                "&query=" +
                encodeValue +
                "&page=1&include_adult=false";
            axios
                .get(url)
                .then(res => {
                    let resultMovies = res.data.results;
                    console.log(resultMovies);

                    this.setState({ searchMovies: resultMovies });
                    this.setState({
                        isMovieListActive: resultMovies.length > 0
                    });
                })
                .catch(err => console.log(err));
        } else this.setState({ isMovieListActive: false });
        this.setState({searchInputValue: event.target.value})
    };



    addButtonClickHandler = movie => {
        this.props.onMovieAdded(this.props.movies, movie);
        this.props.moviesIsVisible();
        this.setState({searchInputValue: ''})
        this.setState({ isMovieListActive: false });
    };

    handleClickOutside = env => {
        this.setState({ isMovieListActive: false });
    };
    render() {
        let searchedListClasses = this.state.isMovieListActive
            ? [classes.SearchedList, classes.active]
            : [classes.SearchedList];
        let movies = this.state.searchMovies.map(m => (
            <li key={m.id} className={classes.SearchedListItem} onClick={() =>
                this.addButtonClickHandler({
                    id: m.id,
                    title: m.title,
                    poster_path: m.poster_path,
                    genre_ids: m.genre_ids,
                    isVisible: true
                })}>
                <p>{m.title}</p>
                <Button
                    type="Add"
                    clicked={() =>
                        this.addButtonClickHandler({
                            id: m.id,
                            title: m.title,
                            poster_path: m.poster_path,
                            genre_ids: m.genre_ids,
                            isVisible: true
                        })
                    }
                >
                   Добавить
                </Button>
                <span>{m.release_date.slice(0, 4)}</span>
            </li>
        ));

        return (
            <div className={classes.SearchBlock}>
                <input
                    onChange={event => this.onChangeHandler(event)}
                    className={classes.Input}
                    type="text"
                    value={this.state.searchInputValue}
                    placeholder="Введите название фильма"
                />
                <ul className={searchedListClasses.join(" ")}>{movies}</ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        apiKey: state.movieApiKey,
        apiLang: state.movieApiLang,
        movies: state.movies,
        genres: state.genres
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMovieAdded: (movies, newMovie) =>
            dispatch(actions.addMovie(movies, newMovie)),
        moviesIsVisible: ()=>dispatch(actions.moviesIsVisible())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(onClickOutside(SearchInput));
