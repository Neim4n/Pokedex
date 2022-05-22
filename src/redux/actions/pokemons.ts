import { Dispatch } from 'redux';
import axios from 'axios';
import { IPokemon, PokemonsAction, PokemonsActionTypes } from '../types/pokemons';

function filterFetchResult(array:any[]) {
  return array.filter((e:any) => e.url.split('/').slice(-2, -1) < 10000);
}

export const fetchAllPokemons = () => async (dispatch: Dispatch<PokemonsAction>) => {
  try {
    dispatch({ type: PokemonsActionTypes.LOADING_ON });
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    dispatch({
      type: PokemonsActionTypes.FETCH_POKEMONS,
      playload: filterFetchResult(response.data.results),
    });
  } catch (e) {
    dispatch({ type: PokemonsActionTypes.FETCH_POKEMONS, playload: [] });
  }
};

export const fetchAllTypes = () => async (dispatch: Dispatch<PokemonsAction>) => {
  try {
    dispatch({ type: PokemonsActionTypes.LOADING_ON });
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    const types = filterFetchResult(response.data.results).map((e:any) => ({
      name: e.name,
      code: e.url.split('/').slice(-2, -1),
    }));
    dispatch({ type: PokemonsActionTypes.FETCH_TYPES, playload: types });
  } catch (e) {
    dispatch({ type: PokemonsActionTypes.FETCH_TYPES, playload: [] });
  }
};

// eslint-disable-next-line max-len
export const fetchTypeSortedPokemons = (type:number) => async (dispatch: Dispatch<PokemonsAction>) => {
  try {
    dispatch({ type: PokemonsActionTypes.LOADING_ON });
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    // eslint-disable-next-line max-len
    const sortedPokemons = response.data.pokemon.map((e:any) => ({ name: e.pokemon.name, url: e.pokemon.url }));
    dispatch({
      type: PokemonsActionTypes.FETCH_SORTED_POKEMONS,
      playload: filterFetchResult(sortedPokemons),
    });
  } catch (e) {
    dispatch({ type: PokemonsActionTypes.FETCH_SORTED_POKEMONS, playload: [] });
  }
};

const formatPokemonInformation = (data:any): IPokemon => ({
  name: data.name[0].toUpperCase() + data.name.slice(1),
  image: data.sprites.other['official-artwork'].front_default,
  types: data.types,
  moves: data.moves,
  stats: data.stats,
  order: data.order,
});

// eslint-disable-next-line max-len
export const fetchPokemonPage = (pokemonName:string) => async (dispatch: Dispatch<PokemonsAction>) => {
  try {
    dispatch({ type: PokemonsActionTypes.LOADING_ON });
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    // eslint-disable-next-line max-len
    dispatch({ type: PokemonsActionTypes.FETCH_POKEMON_PAGE, playload: formatPokemonInformation(response.data) });
  } catch (e) {
    dispatch({
      type: PokemonsActionTypes.FETCH_POKEMON_PAGE,
      playload: {
        name: '', image: '', types: [], stats: [], moves: [], order: 0,
      },
    });
  }
};

// eslint-disable-next-line max-len
export const fetchPokemonsInformation = (limit:number, offset:number, currentPokemons: any[], pokemons: any[]) => async (dispatch: Dispatch<PokemonsAction>) => {
  try {
    dispatch({ type: PokemonsActionTypes.LOADING_ON });
    const newPokemons = await Promise.all(pokemons.slice(offset, offset + limit).map(async (e) => {
      const response = await axios.get(e.url);
      return formatPokemonInformation(response.data);
    }));
    // eslint-disable-next-line max-len
    if (newPokemons.every((i:any) => currentPokemons.some((j) => j.name === i.name))) {
      throw new Error('Extra request');
    }

    dispatch({
      type: PokemonsActionTypes.FETCH__CURRENT_POKEMONS,
      playload: [...currentPokemons, ...newPokemons],
    });
  } catch (e) {
    dispatch({ type: PokemonsActionTypes.FETCH__CURRENT_POKEMONS, playload: [...currentPokemons] });
  }
};

export const increaseOffset = () => ({ type: PokemonsActionTypes.INCREASE_OFFSET });

export const nullCurrentPokemons = () => ({ type: PokemonsActionTypes.NULL_CURRENT_POKEMONS });

export const startLoading = () => ({ type: PokemonsActionTypes.LOADING_ON });
