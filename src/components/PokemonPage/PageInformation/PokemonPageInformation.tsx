import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Moves from './Moves';
import Stats from './Stats';
import About from './About';
import Evolution from './Evolution';

const divAnimation = {
  initial: { y: 100, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
};

function PokemonPageInformation({ pokemonPage }: any) {
  const location = useLocation().pathname.slice(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const informationItems = ['About', 'Stats', 'Evolution', 'Moves'];
  const informationComponents = [
    <About pokemon={pokemonPage} animation={divAnimation} />,
    <Stats pokemon={pokemonPage} animation={divAnimation} />,
    <Evolution pokemon={pokemonPage} />,
    <Moves pokemon={pokemonPage} animation={divAnimation} />];

  useEffect(() => {
    setSelectedTab(0);
  }, [location]);

  return (
    <div className="pokemon-page__information">
      <div className="information__switcher">
        {
            informationItems.map((item, index) => (
              <button
                type="button"
                key={item}
                className={index === selectedTab ? 'selected' : ''}
                onClick={() => setSelectedTab(index)}
              >
                {item}
                {index === selectedTab ? (<motion.div className="underline" style={{ bottom: -1 }} layoutId="underline" />) : null}
              </button>
            ))
        }
      </div>
      <div className="information__content">{informationComponents[selectedTab]}</div>
    </div>
  );
}

export default PokemonPageInformation;
