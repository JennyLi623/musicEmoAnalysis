import React, { Component } from "react";
import MovieQuery from "../services/Movies";
import Billing from "../services/Billing";
import CartList from "./CartList";
import {Link} from 'react-router-dom';
import Cookies from "js-cookie";

class Cart extends Component {

  constructor(props){
    super(props);

    this.state = {
      cartList: [],
    };
  }

  componentDidMount() {
    this.handleCartList();
  }

  handleCartList = () => {
    console.log("handle Cart Page");
    var email = Cookies.get("email");
    console.log(email);
    Billing.cartRetrieve(email)
      .then(response => {
        console.log(response);
        if (response !== undefined && response.data.items != null) {
          this.setState({cartList: response.data.items});
        } else {
          this.setState({cartList: []});
        }
      })
      .catch(error => console.log(error));
    console.log(this.state.cartList);
  };

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  updateCart = (id, quantity) => {
    console.log(id);
    console.log(quantity);
    console.log("in updateCard");

    var email = Cookies.get("email");
    console.log(email);
    var movieId = id;
    var quantity = quantity;
    Billing.cartUpdate(email, id, quantity)
      .then(response => {
        console.log(response);
        this.handleCartList();
      })
      .catch(error => console.log(error));
  };

  deleteCart = (event) => {
    console.log("in deleteCard");
    console.log(event.target.id);
    var email = Cookies.get("email");
    console.log(email);
    var movieId = event.target.id;
    var quantity = this.state.quantity;
    Billing.cartDelete(email, movieId)
      .then(response => {
        console.log(response);
        this.handleCartList();
      })
      .catch(error => console.log(error));
  };

  clearCard = (event) => {
    console.log("in clearCard");
    var email = Cookies.get("email");
    console.log(email);
    Billing.cartClear(email)
      .then(response => {
        console.log(response);
        this.handleCartList();
      })
      .catch(error => console.log(error));
  };


  orderPlace = () => {
    console.log("in orderPlace");
    var email = Cookies.get("email");
    console.log(email);
    Billing.orderPlace(email)
      .then(response => {
        console.log(response);
        if(response.data) {
          window.open(response.data.approve_url, '_blank');
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    console.log(this.deleteCart);
    return (
        <div>
          <h1>My Cart</h1>
          <CartList movies={this.state.cartList} updateQuantity={this.updateCart}  deleteQuantity={this.deleteCart}/>
          <button onClick={this.clearCard}>Clear Cart</button><br /><br />
          <button onClick={this.orderPlace}>CHECK OUT</button>
        </div>
      );
  }
}

export default Cart;
