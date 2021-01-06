import React, { Component } from "react";
import MovieQuery from "../services/Movies";
import Billing from "../services/Billing";
import CardList from "./CardList";
import {Link} from 'react-router-dom';
import Cookies from "js-cookie";

class Movies extends Component {

  constructor(props){
    super(props);

    this.state = {
      movieList: [],
      params: null,
      movies: [],
      stage: 1,
      currentMovie: null,
      quantity: 1,
      addedToCart: false
    };
  }

  componentDidMount() {
    const { params } = this.props;
    console.log(params);
    this.setState({params: params});
    this.handleMoviePage(params);
  }

  selectedFilm = (movieId) => {
    console.log(movieId);
    this.setState({currentId: movieId});
    MovieQuery.get(movieId)
     .then(response => {
        console.log(response);
        this.setState({currentMovie: response.data.movie});
        this.setState({stage: 2})
      })
      .catch(error => console.log(error));
  };

  handleMoviePage = (params) => {
    console.log("handle Movie Page");
    var query = "?";
    console.log(params);
    if (params == null) {
      return;
    }
    if (params.searchMethod === "search") {
      if (params.title !== "") query += "title=" + params.title + "&";
      if (params.director !== "") query += "director=" + params.director + "&";
      if (params.year !== "") query += "year=" + params.year + "&";
      if (params.genre !== "") query += "genre=" + params.genre + "&";
    }
    query += "orderby=" + params.orderby + "&limit=" + params.limit + "&offset=" + params.offset * params.limit + "&direction=" + params.direction;
    console.log(query);
    if (params.searchMethod === "search") {
      MovieQuery.search(query)
        .then(response => {
          console.log(response);
          this.setState({movies: response.data.movies});
        })
        .catch(error => console.log(error));
    }else{
      MovieQuery.browse(params.keywords + query)
        .then(response => {
          console.log(response);
          this.setState({movies: response.data.movies});
        })
        .catch(error => console.log(error));
    }
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  insertCard = () => {
    console.log("in insertCard");
    console.log(this.state.quantity);
    console.log(this.state.currentId);
    var email = Cookies.get("email");
    console.log(email);
    var movieId = this.state.currentId;
    var quantity = this.state.quantity;
    Billing.cartInsert(email, movieId, quantity)
      .then(response => {
        console.log(response);
        this.setState({addedToCart: true});
      })
      .catch(error => console.log(error));
  };

  addedItems = () => {
    return (
      <div>
        <form>
          <input onChange={this.updateField} type="number" name="quantity" checked="1" value={this.state.quantity} min="1" max="10000" />
        </form>
        <button onClick={this.insertCard}>Add to Cart</button>
      </div>
    );
  };
  render() {
    if (this.state.stage === 1) {
      return (
        <div>
          <h1>Movies</h1>
          <CardList movies={this.state.movies} selectedFilm={this.selectedFilm}/>
        </div>
      );
    }else {
      var movie = this.state.currentMovie;
      console.log(this.state.currentMovie);
      let addToCart;
      if (this.state.addedToCart) {
        addToCart = <p>Successfully added to Cart!</p>
      }else {
        addToCart = <this.addedItems />
      }
      return (
        <div>
           <h1>{movie.title}</h1>
           <img src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt='cannot display'  className="imgDisplay"/>
           <p>{movie.year}</p>
           <p>{movie.director}</p>
           <p>rating: {movie.rating}</p>
           <p>Stars: {movie.people[0].name}</p>
           <p>Overview: {movie.overview}</p>

           Purchase Quantity:
           {addToCart}
        </div>
      );
    }
  }
}

export default Movies;
