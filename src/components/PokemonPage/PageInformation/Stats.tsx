import { motion } from 'framer-motion';
import React from 'react';
import { IPokemonPage } from '../../../redux/types/pokemons';
import { formatText } from '../../../modules/formatText';

type informationProps = {
  pokemon: IPokemonPage
  animation: {}
}

function Stats({ pokemon, animation }: informationProps) {
  return (
    <motion.div {...animation} className="information__stats information__item">
      {
        pokemon.stats.map((item: any) => (
          <span className="stats-item" key={`${item.stat.name}_${item.base_stat}`}>
            <span className="item__name">
              {formatText(item.stat.name)}
            </span>
            <span className="item__value">{item.base_stat}</span>
            <span className="item__bar">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.base_stat * 100) / 225}%` }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </span>
          </span>
        ))
      }
    </motion.div>
  );
}

export default Stats;
