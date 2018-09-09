import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./GenreList.css";
import * as actions from "../../store/actions/actions";
import GenreItem from "../../components/GenreItem/GenreItem";

class GenreList extends Component {
    componentDidMount() {
        this.props.onGenresInit(this.props.apiLang, this.props.apiKey);
    }

    visibleAllHandler = () => {
        this.props.moviesIsVisible();
    };

    render() {
        let genres = [
            <GenreItem
                key={"all"}
                type="All"
                clicked={() => this.visibleAllHandler()}
            >
                Все
            </GenreItem>
        ];
        for (let genre in this.props.genres) {
            genres.push(
                <GenreItem
                    key={genre}
                    type="Clicked"
                    clicked={() => this.props.genreClickHandler(+genre)}
                >
                    {this.props.genres[genre]}
                </GenreItem>
            );
        }
        return <ul className={classes.GenreList}>{genres}</ul>;
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movies,
        apiKey: state.movieApiKey,
        apiLang: state.movieApiLang,
        genres: state.genres
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onGenresInit: (apiLang, apiKey) =>
            dispatch(actions.initGenres(apiLang, apiKey)),
        genreClickHandler: genre_id =>
            dispatch(actions.filterByGenre(genre_id)),
        moviesIsVisible: () => dispatch(actions.moviesIsVisible())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenreList);
