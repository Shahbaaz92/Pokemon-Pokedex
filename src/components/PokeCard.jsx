import { useState, useEffect } from "react";

const PokeCard = ({ selectedPokemon }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //If loading, exit logic
    if (loading || !localStorage) {
      return;
    }
    //check if the selected pokemon info is available in the cache
    //1. define the cache
    let cache = {};
    if (localStorage.getItem("pokedex")) {
      cache = JSON.parse(localStorage.getItem("pokedex"));
    }
    //2.check if the selected pokemon is in the cache, otherwise fetch from the API
    if (selectedPokemon in cache) {
      //read from cache
      setData(cache[selectedPokemon]);
      return;
    }
    //3.We passed all the chache to no avail and now we need to fetch the data from the api
    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseUrl = "https://pokeapi.co/api/v2/";
        const suffix = "pokemon/" + selectedPokemon;
        const finalUrl = baseUrl + suffix;
        const res = await fetch(finalUrl);
        const pokemonData = await res.json();
        setData(pokemonData);

        cache[selectedPokemon] = pokemonData;
        localStorage.setItem("pokedex", JSON.stringify(cache));
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonData();
    //4. If we fetch from the api, make sure to save the information to the cache for next time
  }, [selectedPokemon]);
  return <div></div>;
};

export default PokeCard;
