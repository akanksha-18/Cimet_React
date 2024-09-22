import React, { useState, useEffect } from 'react';
import './Pokemon.css'

const PokemonApp = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 20;

  useEffect(() => {
    fetchTypes();
    loadMorePokemons();
  }, []);

  const fetchTypes = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    const data = await response.json();
    localStorage.setItem("Pokemons", JSON.stringify(data));
  };

  const fetchPokemons = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const pokemonDetails = await Promise.all(
      data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
    );
    
    return pokemonDetails.filter(pokemon => {
      const matchesType = typeFilter ? pokemon.types.some(type => type.type.name === typeFilter) : true;
      const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  };

  const loadMorePokemons = async () => {
    const newPokemons = await fetchPokemons();
    setPokemons(prevPokemons => [...prevPokemons, ...newPokemons]);
    setOffset(prevOffset => prevOffset + limit);
  };

//   const handleTypeFilter = (e) => {
//     setTypeFilter(e.target.value);
//     setOffset(0);
//     setPokemons([]);
//     loadMorePokemons();
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setOffset(0);
//     setPokemons([]);
//     loadMorePokemons();
//   };
const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
    setOffset(0);
    setPokemons([]); 
  };
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setOffset(0);
    setPokemons([]); 
  };
  
  useEffect(() => {
    loadMorePokemons();
  }, [typeFilter, searchQuery]); // Re-fetch on filter or search change
  

  return (
    <div>
      <div className="controls">
        <select id="type-filter" onChange={handleTypeFilter} value={typeFilter}>
          <option value="">All Types</option>
          {['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'].map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
        <input 
          type="text" 
          id="search-input" 
          placeholder="Search Pokémon"
          onChange={handleSearch}
          value={searchQuery}
        />
      </div>
      <div className="container">
        {pokemons.map(pokemon => (
          <div key={pokemon.id} className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
                <h3>{pokemon.types.map(type => type.type.name).join(', ')}</h3>
              </div>
              <div className="flip-card-back">
                <h3>{pokemon.name}</h3>
                <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
                <p><strong>Height:</strong> {pokemon.height}</p>
                <p><strong>Weight:</strong> {pokemon.weight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button id="load-more-btn" onClick={loadMorePokemons}>Load More</button>
    </div>
  );
};

export default PokemonApp;