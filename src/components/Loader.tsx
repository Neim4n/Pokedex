import React from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import '../styles/components/Loader.css';
import { useTypeSelector } from '../hooks/useTypeSelector';

function Loader() {
  const { loading } = useTypeSelector((state) => state.pokemons);
  return (
    <div className={`loader ${loading ? 'loading' : ''}`}>
      <MdCatchingPokemon className="loader__image" />
    </div>
  );
}

export default Loader;
