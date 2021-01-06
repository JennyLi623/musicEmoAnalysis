import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Faq from "./pages/Faq";

class Content extends Component {
  render() {
    const { handleLogOut, handleLogIn, handleRegister, handleMovieSearch, movieList, handleMoviePage, params, loggedIn } = this.props;
    console.log(params);
    if (loggedIn == false) {
      return (
        <div className="content">
          <Switch>
            <Route
              path="/register"
              component={props => <Register handleRegister={handleRegister} {...this.props} />}
            />
            <Route
              path="/login"
              component={props => <Login handleLogIn={handleLogIn} {...this.props} />}
            />
            <Route
              path="/faq"
              component={props => <Faq {...this.props} />}
            />
            <Route
              path="/"
              component={props => <Home handleMovieSearch={handleMovieSearch} {...this.props} />}
            />
          </Switch>
        </div>
      );
    };
    return (
      <div>
        <Switch>
          <Route
            path="/login"
            component={props => <Login handleLogIn={handleLogIn} {...this.props} />}
          />
          <Route
            path="/register"
            component={props => <Register handleRegister={handleRegister} {...this.props} />}
          />
          <Route
            path="/movies"
            component={props => <Movies handleMoviePage={handleMoviePage} movieList={movieList} params={params} />}
          />
          <Route
            path="/cart"
            component={props => <Cart />}
          />
          <Route
            path="/"
            component={props => <Home handleLogOut={handleLogOut} handleMovieSearch={handleMovieSearch} {...this.props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Content;
