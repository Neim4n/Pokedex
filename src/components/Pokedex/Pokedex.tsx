import React, { useEffect } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useAction } from '../../hooks/useAction';
import PokemonCard from './PokemonCard';
import '../../styles/components/Pokedex.css';
import { useLoadPokemons } from '../../hooks/useLoadPokemons';

const ButtonAnimation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
  clicked: {
    y: 500,
    opacity: 0,
  },
};

function Pokedex() {
  const {
    defaultPokemons,
    currentPokemons,
    sortedPokemons,
    limit, offset, showMore, loading,
  } = useTypeSelector((state) => state.pokemons);

  const {
    fetchPokemonCards, increaseOffset, loadingOff, showMoreAction,
  } = useAction();

  useEffect(() => {
    showMoreAction(true);
  }, [sortedPokemons]);

  /* eslint-disable max-len */
  useEffect(() => {
    if (defaultPokemons.length) {
      fetchPokemonCards(limit, offset, currentPokemons, sortedPokemons.length ? sortedPokemons : defaultPokemons);
    }
  }, [defaultPokemons, offset, sortedPokemons]);

  const { isLoading, loadImagesHandler, newPokemons } = useLoadPokemons(currentPokemons, limit, loadingOff);

  return (
    <motion.div className="pokedex">
      <div className="pokedex__pokemon-card-list">
        <AnimatePresence>
          {
            currentPokemons.length ? currentPokemons.map((pokemon) => {
              const isHidden = newPokemons.some((e:any) => e.name === pokemon.name);
              return (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isHidden={isHidden ? isLoading : null}
                  loadImagesHandler={loadImagesHandler}
                />
              );
            }) : ''
        }
        </AnimatePresence>
      </div>
      <motion.button
        exit="hidden"
        animate={isLoading || loading ? 'clicked' : 'visible'}
        variants={ButtonAnimation}
        type="button"
        onClick={() => increaseOffset()}
        className="pokedex__load-button"
        disabled={!showMore}
      >
        <span className="button_text">Show more...</span>
        <MdCatchingPokemon />
      </motion.button>
    </motion.div>
  );
}

export default Pokedex;
