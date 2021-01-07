import React, { Component } from "react";
import Cookies from "js-cookie";
import Axios from "axios";

import NavBar from "./NavBar";
import Content from "./Content";
import Movies from "./services/Movies";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      // loggedIn: this.checkedLoggedIn()
      loggedIn: false,
      params: {},
      movies: [],
      name: "",
      exp_num: 0,
    };
    this.handleMovieSearch = this.handleMovieSearch.bind(this);

  }

  handleLogIn = (name, exp_num) => {

    this.setState({ loggedIn: true });
    this.setState({ name: name });
    this.setState({ exp_num: exp_num });
    console.log(this.state.loggedIn);
  };

  handleLogOut = () => {
    const { common } = Axios.defaults.headers;

    Cookies.remove("email");
    Cookies.remove("session_id");

    delete common["email"];
    delete common["session_id"];

    this.setState({ loggedIn: false });
  };

   handleMovieSearch = (params, offset) => {
    console.log(params);
    this.setState({params: params});
  };

  checkedLoggedIn() {
    console.log("email");
    console.log("session_id");
    return (
      //Cookies.get("email") !== undefined &&
      //Cookies.get("session_id") !== undefined
    true);
  }

  render() {
    return (
      <div className="app">
        <NavBar handleLogOut={this.handleLogOut} loggedIn={this.state.loggedIn} name={this.state.name} />
        <Content handleLogOut={this.handleLogOut} handleLogIn={this.handleLogIn} handleMovieSearch={this.handleMovieSearch} params={this.state.params} movieList={this.state.movies} loggedIn={this.state.loggedIn} expNum={this.state.exp_num}/>
      </div>
    );
  }
}

export default App;
