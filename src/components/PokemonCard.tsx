import React from 'react';
import '../styles/components/PokemonCard.css';
import { Link } from 'react-router-dom';
import { IPokemon } from '../redux/types/pokemons';

type PokemonCardProps = {
  pokemon: IPokemon
  isHidden:boolean | null
  loadImagesHandler: (image: string)=> any
}

function PokemonCard({ pokemon, isHidden, loadImagesHandler }:PokemonCardProps) {
  function loadImageHandler() {
    if (isHidden) {
      loadImagesHandler(pokemon.image);
    }
  }

  return (
    <Link to={`/${pokemon.name.toLowerCase()}`} className={`pokedex__pokemon-card ${isHidden ? 'hidden' : 'visible'}`}>
      <div className="pokemon-card__image">
        <img src={pokemon.image} alt="pokemon" onLoad={loadImageHandler} />
      </div>
      <div className="pokemon-card__info">
        <span className="pokemon-card__order">{`№${String(pokemon.order).padStart(3, '0')}`}</span>
        <span className="pokemon-card__name">{pokemon.name}</span>
        <ul className="pokemon-card__types">
          {
              pokemon.types?.length ? pokemon.types?.map((item:any) => (
                <li key={item.type.name} className={`types__item ${item.type.name}`}>{item.type.name}</li>
              )) : ''
          }
        </ul>
      </div>
    </Link>
  );
}

export default React.memo(PokemonCard);
