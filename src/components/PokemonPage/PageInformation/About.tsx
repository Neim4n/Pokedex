import { motion } from 'framer-motion';
import React from 'react';
import { IPokemonPage } from '../../../redux/types/pokemons';
import { formatText } from '../../../modules/formatText';

type informationProps = {
    pokemon: IPokemonPage
    animation: {}
}

function About({ pokemon, animation }: informationProps) {
  return (
    <>
      <motion.div {...animation} className="information__about information__item">
        {pokemon.species.about}
      </motion.div>
      <motion.div className="information__basic information__item" {...animation}>
        <span className="basic-item">
          <span className="item__name">Weight</span>
          <span className="item__value">{`${(pokemon.weight / 10).toFixed(1)} kg`}</span>
        </span>
        <span className="basic-item">
          <span className="item__name">Height</span>
          <span className="item__value">{`${(pokemon.height / 10).toFixed(1)} m`}</span>
        </span>
        <span className="basic-item">
          <span className="item__name">Abilities</span>
          <span className="item__value">
            {pokemon.abilities.map(({ ability }) => formatText(ability.name)).join(', ')}
          </span>
        </span>
      </motion.div>
    </>
  );
}

export default About;
