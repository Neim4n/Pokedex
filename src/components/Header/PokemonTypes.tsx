import { AnimatePresence, motion } from 'framer-motion';
import { IoMdArrowDropdown } from 'react-icons/io';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useAction } from '../../hooks/useAction';

type PokemonTypesProps = {
    isOpen: boolean
}

function PokemonTypes({ isOpen }: PokemonTypesProps) {
  const { defaultTypes } = useTypeSelector((state) => state.pokemons);
  const { fetchTypeSortedPokemons } = useAction();

  const navigate = useNavigate();
  const typeButtonsHandler = (event: any) => {
    fetchTypeSortedPokemons(event.currentTarget.id);
    navigate('/');
  };

  return (
    <>
      <AnimatePresence>
        {
            isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ ease: 'anticipate' }}
              exit={{ height: 0 }}
              className="header__types"
            >
              <span className="types__title">type</span>
              <div className="types__container">
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
              </div>
            </motion.div>
            )
        }
      </AnimatePresence>
      <div className={`button__container ${isOpen ? 'open' : ''}`}>
        <button className="open-types-button" type="button" aria-label="Open types">
          <IoMdArrowDropdown />
        </button>
      </div>
    </>
  );
}

export default PokemonTypes;
