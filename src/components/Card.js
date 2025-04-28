import React from "react";

const Card = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>
      <p>Type: {pokemon.types.join(", ")}</p>
    </div>
  );
};

export default Card;
