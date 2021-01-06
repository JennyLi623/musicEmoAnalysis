import React from 'react';
import Card from './card';
import "../css/cardlist.css";
const CardList = ({movies, selectedFilm}) =>{
  const cardComponent = movies.map((user, i) => {
    return <Card key={i} name={movies[i].title} description={movies[i].director} url={"https://image.tmdb.org/t/p/w500" + movies[i].poster_path} director={movies[i].director} year={movies[i].year} rating={movies[i].rating} id={movies[i].movie_id} selectedFilm={selectedFilm}/>
  });
  return (
    <div className="block">
      {cardComponent}
    </div>
  );
}

export default CardList;
