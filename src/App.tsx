import React, { useEffect } from 'react';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Pokedex from './components/Pokedex/Pokedex';
import './App.css';
import PokemonPage from './components/PokemonPage/PokemonPage';
import Header from './components/Header/Header';
import { useAction } from './hooks/useAction';
import Loader from './components/Loader';
import { useTypeSelector } from './hooks/useTypeSelector';
import ErrorPage from './components/ErrorPage';
import MobileNav from './components/MobileNav';

function App() {
  const { error } = useTypeSelector((state) => state.pokemons);
  const { fetchAllTypes, fetchAllPokemons } = useAction();

  useEffect(() => {
    fetchAllTypes();
    fetchAllPokemons();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${error ? '404' : ''}`);
  }, [error]);

  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <div className="main__container">
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<Pokedex />} />
              <Route path="/:pokemon" element={<PokemonPage />} />
              <Route path="/404" element={<ErrorPage />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
      <Loader />
      <MobileNav />
    </div>
  );
}

export default App;
