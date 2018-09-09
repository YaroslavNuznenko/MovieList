import React, { Component } from "react";
import classes from "./App.css";

import SearchBlock from "./containers/SearchBlock/SearchBlock";
import MovieList from "./containers/MovieList/MovieList";
import GenreList  from "./containers/GenreList/GenreList";

class App extends Component {
    render() {
        return (
            <div className={classes.App}>
                <header className={classes.AppHeader}>
                    <h1 className={classes.AppTitle}>MovieList</h1>
                </header>
                <div className={classes.AppContainer}>
                    <SearchBlock />
                    <MovieList />
                    <GenreList />
                </div>
            </div>
        );
    }
}

export default App;
