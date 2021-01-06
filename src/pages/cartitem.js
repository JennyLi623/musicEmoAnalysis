import React, {Component} from "react";
import '../css/card.css';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';

import Movies from "../services/Movies";

class CartItem extends Component {
  state = {
    quantity: 0,
    total: 0,
  }

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    //this.setState(total: this.props.unit_price * this.state.total);
  };

  componentDidMount() {
    this.setState({quantity: this.props.quantity});
  }

  render() {
    var props = this.props;
    console.log(props);
    return (
      <div id={props.id}>
        <div className='te'>
          <img src={props.url} alt='cannot display'  className="imgDisplay"/>
          <h1>
            {props.name}
          </h1>
          <p>{props.director}</p>
          <p>Number Bought: {props.unit_price}</p>
          <form>
            <input onChange={this.updateField} type="number" name="quantity" value={this.state.quantity} min="1" max="10000" />
          </form>
          <button id={props.id} quantity={this.state.quantity} onClick={() => props.updateQuantity(props.id, this.state.quantity)}>Update Quantity</button>
          <p>Total Amount: {(this.state.quantity * props.unit_price).toFixed(2)}</p>
          <p id="movie_id">{props.id}</p>
          <button id={props.id} onClick={props.deleteQuantity}>Remove Item</button>
        </div>
      </div>
    );
  }
}


export default CartItem;
