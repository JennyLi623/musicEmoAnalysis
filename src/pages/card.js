import React from "react";
import '../css/card.css';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';

import Movies from "../services/Movies";

const Card = (props) => {
  return (
    <div onClick={() => props.selectedFilm(props.id)}>
      <div className='te'>
        <img src={props.url} alt='cannot display'  className="imgDisplay"/>
        <h1>
          {props.name}
        </h1>
        <p>{props.director}</p>
        <p>{props.year}</p>
        <p>{props.rating}</p>
      </div>
    </div>
  );
}


export default Card;
