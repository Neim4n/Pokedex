import React from 'react';
import '../../styles/components/PokemonCard.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IPokemonСard } from '../../redux/types/pokemons';

type PokemonCardProps = {
  pokemon: IPokemonСard
  isHidden:boolean | null
  loadImagesHandler: (image: string)=> any
}

const CardAnimation = {
  cardHidden: {
    y: 100,
    opacity: 0,
  },
  cardVisible: {
    y: 0,
    opacity: 1,
  },
  cardDeleted: {
    y: -100,
    opacity: 0,
    transition: { type: 'linear' },
  },
  orderHidden: { x: '99%' },
  orderVisible: {
    x: 0,
    transition: {
      type: 'tween',
    },
  },
};

function PokemonCard({ pokemon, isHidden, loadImagesHandler }:PokemonCardProps) {
  function loadImageHandler() {
    if (isHidden) {
      loadImagesHandler(pokemon.image);
    }
  }

  return (
    <motion.div
      initial="cardHidden"
      whileInView="cardVisible"
      exit="cardDeleted"
      viewport={{ once: true }}
      variants={CardAnimation}
      className={`pokedex__pokemon-card ${isHidden ? 'hidden' : 'visible'} ${pokemon.types![0].type.name}`}
    >
      <Link to={`/${pokemon.name.toLowerCase()}`} className="pokemon-card__link-container ">
        <span className="pokemon-card__order">
          {`#${String(pokemon.order).padStart(3, '0')}`}
        </span>
        <div className="pokemon-card__image">
          <img src={pokemon.image} alt="pokemon" onLoad={loadImageHandler} />
        </div>
        <div className="pokemon-card__info">
          <span className="pokemon-card__name">{pokemon.name}</span>
          <ul className="pokemon-card__types">
            {
              pokemon.types?.length ? pokemon.types?.map((item: any) => (
                <li key={item.type.name} className={`types__item ${item.type.name}`}>{item.type.name}</li>
              )) : ''
            }
          </ul>
        </div>
      </Link>
    </motion.div>
  );
}

export default PokemonCard;
