import React, { useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import './App.css';
import PokemonPage from './components/PokemonPage';
import Header from './components/Header';
import { useAction } from './hooks/useAction';
import Loader from './components/Loader';

function App() {
  const { fetchAllTypes, fetchAllPokemons } = useAction();
  useEffect(() => {
    fetchAllTypes();
    fetchAllPokemons();
  }, []);

  return (
    <HashRouter basename="/">
      <div className="wrapper">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/:pokemon" element={<PokemonPage />} />
          </Routes>
        </main>
        <Loader />
      </div>
    </HashRouter>
  );
}

export default App;
