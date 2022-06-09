import { Dispatch } from 'redux';
import axios from 'axios';

import {
  IFetchPokemonData, PokemonsAction, PokemonsActionTypes,
} from '../types/pokemons';
import { filterFetchResult, getPokemon, getPokemons } from '../../modules/fetchPokemons';

/* eslint-disable max-len */

export const fetchAllPokemons = () => async (dispatch: Dispatch<PokemonsAction>) => {
  try {
    dispatch({ type: PokemonsActionTypes.LOADING_ON });
    const response = await getPokemons(null);
    dispatch({ type: PokemonsActionTypes.FETCH_POKEMONS, playload: response });
  } catch (e) {
    dispatch({ type: PokemonsActionTypes.FETCH_ERROR });
  }
};

export const fetchAllTypes = () => async (dispatch: Dispatch<PokemonsAction>) => {
  try {
    dispatch({ type: PokemonsActionTypes.LOADING_ON });
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    const types = filterFetchResult(response.data.results).map((e:IFetchPokemonData) => ({
      name: e.name,
      code: e.url.split('/').slice(-2, -1),
    }));
    dispatch({ type: PokemonsActionTypes.FETCH_TYPES, playload: types });
  } catch (e) {
    dispatch({ type: PokemonsActionTypes.FETCH_ERROR });
  }
};

export const fetchTypeSortedPokemons = (type:number | null) => async (dispatch: Dispatch<PokemonsAction>) => {
  try {
    dispatch({ type: PokemonsActionTypes.LOADING_ON });
    const response = await getPokemons(type);
    dispatch({ type: PokemonsActionTypes.FETCH_SORTED_POKEMONS, playload: response });
  } catch (e) {
    dispatch({ type: PokemonsActionTypes.FETCH_ERROR });
  }
};

export const fetchPokemonPage = (pokemonName:string) => async (dispatch: Dispatch<PokemonsAction>) => {
  try {
    dispatch({ type: PokemonsActionTypes.LOADING_ON });
    const response = await getPokemon(pokemonName, 'page');
    dispatch({ type: PokemonsActionTypes.FETCH_POKEMON_PAGE, playload: response });
  } catch (e) {
    dispatch({ type: PokemonsActionTypes.FETCH_ERROR });
  }
};

export const fetchPokemonCards = (limit:number, offset:number, currentPokemons: any[], pokemons: any[]) => async (dispatch: Dispatch<PokemonsAction>) => {
  try {
    dispatch({ type: PokemonsActionTypes.LOADING_ON });
    const newPokemons = await Promise.all(pokemons.slice(offset, offset + limit).map(async (e) => {
      const response = await getPokemon(e.name, 'card');
      return response;
    }));

    if (pokemons.length === newPokemons.length + currentPokemons.length) {
      dispatch({ type: PokemonsActionTypes.SHOW_MORE, playload: false });
    }

    dispatch({
      type: PokemonsActionTypes.FETCH_CURRENT_POKEMONS,
      playload: [...currentPokemons, ...newPokemons],
    });
  } catch (e) {
    dispatch({ type: PokemonsActionTypes.FETCH_ERROR });
  }
};

export const increaseOffset = () => ({ type: PokemonsActionTypes.INCREASE_OFFSET });

export const nullCurrentPokemons = () => ({ type: PokemonsActionTypes.NULL_CURRENT_POKEMONS });

export const loadingOn = () => ({ type: PokemonsActionTypes.LOADING_ON });

export const loadingOff = () => ({ type: PokemonsActionTypes.LOADING_OFF });

export const showMoreAction = (playload : boolean) => ({ type: PokemonsActionTypes.SHOW_MORE, playload });

/* eslint-disable max-len */
