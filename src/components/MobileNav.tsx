import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { GoSettings } from 'react-icons/go';
import '../styles/components/MobileNav.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PokemonSelect from './Header/PokemonSelect';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { useAction } from '../hooks/useAction';
import { useScrollDown } from '../hooks/useScrollDown';

const navAnimation = {
  initial: { y: 0 },
  exit: { y: '150%' },
};

const buttonAnimation = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

function MobileNav() {
  const { defaultTypes } = useTypeSelector((state) => state.pokemons);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { fetchTypeSortedPokemons } = useAction();
  const { isScrollDown } = useScrollDown();

  const navigate = useNavigate();
  const typeButtonsHandler = (event: any) => {
    fetchTypeSortedPokemons(event.currentTarget.id);
    navigate('/');
  };

  const location = useLocation();
  useEffect(() => {
    setIsOpenMenu(false);
  }, [location, isScrollDown]);

  const navigationClickHandler = (e:any) => {
    if (e.target.closest('.mobile-nav__open-menu-button')) {
      return setIsOpenMenu(!isOpenMenu);
    }
    if (e.target.closest('.mobile-nav__item-container')) {
      return null;
    }
    if (e.target.closest('.mobile-nav ')) {
      return setIsOpenMenu(false);
    }
    return null;
  };

  return (
    <motion.div
      className={`mobile-nav ${isOpenMenu ? 'opened' : ''}`}
      initial="initial"
      exit="exit"
      animate={!isScrollDown || window.innerWidth < 768 ? 'initial' : 'exit'}
      transition={{ ease: 'linear' }}
      variants={navAnimation}
      onClick={navigationClickHandler}
    >
      <AnimatePresence>
        {
            isOpenMenu && (
            <>
              <motion.div
                className="mobile-nav__search-container mobile-nav__item-container"
                {...buttonAnimation}
              >
                <PokemonSelect />
              </motion.div>
              <motion.div
                className="mobile-nav__type-container mobile-nav__item-container"
                {...buttonAnimation}
              >
                {
                    defaultTypes.length ? defaultTypes.map((e: any) => (
                      <button
                        type="button"
                        className={`types__button ${e.name}`}
                        onClick={typeButtonsHandler}
                        key={e.name}
                        id={e.code}
                      >
                        {e.name}
                      </button>
                    )) : ''
                }
              </motion.div>
            </>
            )
        }
      </AnimatePresence>
      <button
        className={`mobile-nav__open-menu-button mobile-nav__button ${isOpenMenu ? 'opened' : ''}`}
        type="button"
        aria-hidden
      >
        <GoSettings />
      </button>
    </motion.div>
  );
}

export default MobileNav;
