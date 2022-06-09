import { motion } from 'framer-motion';
import React from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { formatText } from '../../../modules/formatText';
import { IPokemonPage } from '../../../redux/types/pokemons';

type informationProps = {
    pokemon: IPokemonPage
}

const divAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

function EvolutionCard({ evolutionInfo }:any) {
  const { from, evolution } = evolutionInfo;
  return (
    <motion.div className="evolution__card" {...divAnimation}>
      <Link to={`/${from.name}`} className="card__from-pokemon card__pokemon">
        <div className={`pokemon__image-container ${from.types[0].type.name}`}>
          <img src={from.image} alt="" className="pokemon__image" />
        </div>
        <span className="pokemon__name">{from.name}</span>
      </Link>
      <span className="card__arrow">
        <HiOutlineArrowNarrowRight />
        <span className="arrow__info">
          {
              /* eslint-disable no-nested-ternary */
               evolution.evolution_details[0].min_level ? `Lvl ${evolution.evolution_details[0].min_level}`
                 : evolution.evolution_details[0].item?.name ? `${formatText(evolution.evolution_details[0].item?.name)}`
                   : evolution.evolution_details[0].held_item?.name ? `${formatText(evolution.evolution_details[0].held_item?.name)}` : ''
          }
        </span>
      </span>
      <Link to={`/${evolution.species.name}`} className="card__to-pokemon card__pokemon">
        <div className={`pokemon__image-container ${evolution.species.types[0].type.name}`}>
          <img src={evolution.species.image} alt="" className="pokemon__image" />
        </div>
        <span className="pokemon__name">{evolution.species.name}</span>
      </Link>
    </motion.div>
  );
}

function Evolution({ pokemon }: informationProps) {
  return (
    <div className="information__evolution">
      {pokemon.species.evolutionChain.map((e:any) => (<EvolutionCard evolutionInfo={e} key={`${e.from.name}_${e.evolution.species.name}`} />))}
    </div>
  );
}

export default Evolution;
