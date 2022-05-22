import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import '../styles/components/PokemonPage.css';
import { useAction } from '../hooks/useAction';
import { useTypeSelector } from '../hooks/useTypeSelector';

function PokemonPage() {
  window.scrollTo(0, 0);
  const location = useLocation().pathname.slice(1);
  const { pokemonPage, loading } = useTypeSelector((state) => state.pokemons);
  const { fetchPokemonPage } = useAction();
  useEffect(() => {
    fetchPokemonPage(location);
  }, [location]);

  return (
    <div className="pokemon-page">
      <div className={`pokemon-page__container ${loading ? 'loading' : 'loaded'}`}>
        <img src={pokemonPage.image} alt="" className="pokemon-page__photo" />
        <span className="pokemon-page__title">
          <span className="pokemon-page__name">{pokemonPage.name}</span>
          <span className="pokemon-page__order">{`№${String(pokemonPage.order).padStart(3, '0')}`}</span>
        </span>
        <div className="pokemon-page__types">
          <span className="pokemon-page__types-title">Types:</span>
          <ul className="pokemon-page__types-list">
            {
              pokemonPage.types?.length ? pokemonPage.types?.map((item) => (
                <li key={item.type.name} className={`types__item ${item.type.name}`}>
                  {item.type.name}
                </li>
              )) : ''
            }
          </ul>
        </div>
        <div className="pokemon-page__stats">
          <span className="pokemon-page__stats-title">Stats:</span>
          <ul className="pokemon-page__stats-list">
            {
              pokemonPage.stats?.length ? pokemonPage.stats?.map((item) => (
                <li key={item.stat.name} className={`stats__item ${item.stat.name}`}>
                  <span className="item__name">{`${item.stat.name}:`}</span>
                  <span className="item__base-stat">{item.base_stat}</span>
                </li>
              )) : ''
            }
          </ul>
        </div>
        <div className="pokemon-page__moves">
          <span className="pokemon-page__moves-title">Moves:</span>
          <ul className="pokemon-page__moves-list">
            {
              pokemonPage.moves?.length ? pokemonPage.moves?.map((item) => (
                <li key={item.move.name} className={`moves__item ${item.move.name}`}>
                  <span className="item__name">{`${(item.move.name).replace('-', ' ')}`}</span>
                </li>
              )) : ''
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PokemonPage;
