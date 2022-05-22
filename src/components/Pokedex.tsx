import React, { useEffect, useState } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { useAction } from '../hooks/useAction';
import PokemonCard from './PokemonCard';
import '../styles/components/Pokedex.css';

function Pokedex() {
  const {
    defaultPokemons, currentPokemons,
    sortedPokemons, limit, offset,
  } = useTypeSelector((state) => state.pokemons);

  const {
    fetchPokemonsInformation, increaseOffset, nullCurrentPokemons,
  } = useAction();

  useEffect(() => {
    nullCurrentPokemons();
  }, []);

  useEffect(() => {
    if (defaultPokemons.length) {
      // eslint-disable-next-line max-len
      fetchPokemonsInformation(limit, offset, currentPokemons, sortedPokemons.length ? sortedPokemons : defaultPokemons);
    }
  }, [defaultPokemons, offset, sortedPokemons]);

  const buttonHandler = () => {
    increaseOffset();
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const newPokemonsLength = currentPokemons.length % limit || limit;
  const newPokemons = currentPokemons.slice(-newPokemonsLength);
  let loadingComponents1: any[] = [];

  const loadImagesHandler = (image:string) :any => {
    loadingComponents1.push({ image, load: true });
    if (loadingComponents1.length === newPokemonsLength) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadingComponents1 = [];
    setIsLoading(true);
  }, [currentPokemons]);

  return (
    <div className="pokedex">
      <div className="pokedex__container">
        <div className="pokedex__pokemon-card-list">
          {
          currentPokemons.length ? currentPokemons.map((pokemon) => {
            const isHidden = newPokemons.some((e:any) => e.name === pokemon.name);
            return (
              <PokemonCard
                key={`${pokemon.order}_${pokemon.name}`}
                pokemon={pokemon}
                isHidden={isHidden ? isLoading : false}
                loadImagesHandler={loadImagesHandler}
              />
            );
          }) : ''
        }
        </div>
        <button type="button" onClick={buttonHandler} className={`pokedex__load-button ${isLoading ? 'hidden' : ''}`}>
          <span className="button_text">Show more...</span>
          <MdCatchingPokemon />
        </button>
      </div>
    </div>
  );
}

export default Pokedex;
