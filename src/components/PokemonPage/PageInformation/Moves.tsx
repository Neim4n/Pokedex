import { motion } from 'framer-motion';
import React from 'react';
import { IPokemonPage } from '../../../redux/types/pokemons';
import { formatText } from '../../../modules/formatText';

type informationProps = {
    pokemon: IPokemonPage
    animation:{}
}

function Moves({ pokemon, animation }: informationProps) {
  return (
    <motion.div
      className="information__moves information__item"
      {...animation}
    >
      {
          pokemon.moves.map((item, index) => (
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.01 * index }}
              className="moves__item"
              key={`${item.move.name}`}
            >
              {formatText(item.move.name)}
            </motion.span>
          ))
      }
    </motion.div>
  );
}
export default Moves;
