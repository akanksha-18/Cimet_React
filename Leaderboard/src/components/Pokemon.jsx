import React, { useEffect, useState } from 'react';
import './Pokemons.css'; // Import your CSS file

const limit = 20;

function Pokemon() {
    const [types, setTypes] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [typeFilter, setTypeFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchTypes = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/type/');
            const data = await response.json();
            setTypes(data.results);
        };

        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchPokemons = async () => {
            const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
            const response = await fetch(url);
            const data = await response.json();
            const pokemonDetails = await Promise.all(
                data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
            );
            setPokemons(pokemonDetails);
        };

        fetchPokemons();
    }, [offset]);

    useEffect(() => {
        const fetchFilteredPokemons = async () => {
            const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
            const response = await fetch(url);
            const data = await response.json();
            const pokemonDetails = await Promise.all(
                data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
            );

            const filteredPokemons = pokemonDetails.filter(pokemon => {
                const matchesType = typeFilter ? pokemon.types.some(type => type.type.name === typeFilter) : true;
                const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesType && matchesSearch;
            });

            setPokemons(filteredPokemons);
        };

        fetchFilteredPokemons();
    }, [typeFilter, searchQuery]);

    const loadMorePokemons = () => {
        setOffset(offset + limit);
    };

    return (
        <div className="App">
            <h1>Pokémon Search</h1>
            <div className="filters">
                <select onChange={e => setTypeFilter(e.target.value)} defaultValue="">
                    <option value="">All Types</option>
                    {types.map(type => (
                        <option key={type.name} value={type.name}>
                            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="container">
                {pokemons.map(pokemon => (
                    <div className="flip-card" key={pokemon.id}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                    alt={pokemon.name}
                                />
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
            <button onClick={loadMorePokemons}>Load More</button>
        </div>
    );
}

export default Pokemon;
