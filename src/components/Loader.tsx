import React from 'react';
import { MdCatchingPokemon } from 'react-icons/md';
import '../styles/components/Loader.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useTypeSelector } from '../hooks/useTypeSelector';

const LoaderAnimation: any = {
  hidden: {
    scale: 0,
    x: '-50%',
    transition: {
      x: { duration: 0 },
      scale: { delay: 0.3 },
    },
  },
  visible: {
    scale: 1,
    rotate: 360,
    x: '-50%',
    transition: {
      scale: { duration: 0.02 },
      rotate: {
        repeat: Infinity, repeatType: 'loop', ease: 'linear', duration: 2,
      },
      x: { duration: 0 },
    },
  },
};

function Loader() {
  const { loading } = useTypeSelector((state) => state.pokemons);
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial="hidden"
        animate={loading ? 'visible' : 'hidden'}
        exit="hidden"
        variants={LoaderAnimation}
        className="loader"
      >
        <MdCatchingPokemon className="loader__image" />
      </motion.div>
    </AnimatePresence>
  );
}

export default Loader;
