import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import '../../styles/components/PokemonPage.css';
import { useAction } from '../../hooks/useAction';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import PokemonPageInformation from './PageInformation/PokemonPageInformation';

function PokemonPage() {
  const location = useLocation().pathname.slice(1);
  const { pokemonPage, loading } = useTypeSelector((state) => state.pokemons);
  const { fetchPokemonPage } = useAction();

  useEffect(() => {
    fetchPokemonPage(location);
    window.scroll(0, 0);
  }, [location]);

  return (
    <div className={`pokemon-page ${loading ? 'loading' : 'loaded'} ${pokemonPage.types?.length ? pokemonPage.types![0].type.name : ''}`}>
      <span className="pokemon-page__title">
        <span className="pokemon-page__order">{`#${String(pokemonPage.order).padStart(3, '0')}`}</span>
        <span className="pokemon-page__name">{pokemonPage.name}</span>
        <ul className="pokemon-page__types-list">
          {
              pokemonPage.types?.length ? pokemonPage.types?.map((item) => (
                <li key={item.type.name} className={`types__item ${item.type.name}`}>
                  {item.type.name}
                </li>
              )) : ''
          }
        </ul>
      </span>
      <div className="pokemon-page__picture">
        <img src={pokemonPage.image} alt="" className="pokemon-page__photo" />
      </div>
      <PokemonPageInformation pokemonPage={pokemonPage} />
    </div>
  );
}

export default PokemonPage;
