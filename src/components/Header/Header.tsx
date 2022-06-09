import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAction } from '../../hooks/useAction';
import { useOpenTypes } from '../../hooks/useOpenTypes';
import PokemonSelect from './PokemonSelect';
import PokemonTypes from './PokemonTypes';
import '../../styles/components/Header.css';
import { useScrollDown } from '../../hooks/useScrollDown';

const headerAnimation = {
  initial: { y: 0 },
  exit: { y: '-150%' },
};

function Header() {
  const { nullCurrentPokemons } = useAction();
  const { isScrollDown } = useScrollDown();
  const { isOpen, headerClickHandler } = useOpenTypes(isScrollDown);

  return (
    <motion.header
      className="header"
      initial="initial"
      exit="exit"
      animate={isScrollDown ? 'initial' : 'exit'}
      transition={{ ease: 'linear' }}
      variants={headerAnimation}
    >
      <div className={`header__container ${isOpen ? 'open' : ''}`} aria-hidden onClick={headerClickHandler}>
        <div className="header__navigation">
          <Link to="/" className="header__logo" onClick={() => nullCurrentPokemons()}>PokeDex</Link>
          <PokemonSelect />
        </div>
        <PokemonTypes isOpen={isOpen} />
      </div>
    </motion.header>
  );
}

export default Header;
