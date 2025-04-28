import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Card from "../components/Card";
import Search from "../components/Search";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
      const results = response.data.results;

      const detailedPromises = results.map((pokemon) => axios.get(pokemon.url));
      const detailedResponses = await Promise.all(detailedPromises);

      const pokemonsData = detailedResponses.map((res) => ({
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.front_default,
        types: res.data.types.map((t) => t.type.name),
      }));

      setPokemons(pokemonsData);
      setFilteredPokemons(pokemonsData);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Pokémon. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  const allTypes = Array.from(
    new Set(pokemons.flatMap((pokemon) => pokemon.types))
  );

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <Header />
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        types={allTypes}
      />
      <div className="pokemon-grid">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="empty-state">No Pokémon found!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
