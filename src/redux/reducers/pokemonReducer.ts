import { PokemonsActionTypes, PokemonsAction, PokemonsState } from '../types/pokemons';

const initialState: PokemonsState = {
  defaultPokemons: [],
  defaultTypes: [],
  sortedPokemons: [],
  currentPokemons: [],
  pokemonPage: {
    name: '', image: '', types: [], stats: [], moves: [], order: 0,
  },
  offset: 0,
  limit: 12,
  loading: true,
};

// eslint-disable-next-line default-param-last
export const pokemonReducer = (state = initialState, action: PokemonsAction): PokemonsState => {
  switch (action.type) {
    case PokemonsActionTypes.LOADING_ON:
      return {
        ...state,
        loading: true,
      };
    case PokemonsActionTypes.FETCH_POKEMONS:
      return {
        ...state,
        defaultPokemons: action.playload,
      };
    case PokemonsActionTypes.FETCH_POKEMON_PAGE:
      return {
        ...state,
        pokemonPage: action.playload,
        loading: false,
      };
    case PokemonsActionTypes.FETCH_TYPES:
      return {
        ...state,
        defaultTypes: action.playload,
      };
    case PokemonsActionTypes.FETCH__CURRENT_POKEMONS:
      return {
        ...state,
        currentPokemons: action.playload,
        loading: false,
      };
    case PokemonsActionTypes.INCREASE_OFFSET:
      return {
        ...state,
        offset: state.offset + state.limit,
      };
    case PokemonsActionTypes.NULL_CURRENT_POKEMONS:
      return {
        ...state,
        currentPokemons: [],
        sortedPokemons: [],
        offset: 0,
      };
    case PokemonsActionTypes.FETCH_SORTED_POKEMONS:
      return {
        ...state,
        sortedPokemons: action.playload,
        loading: false,
        currentPokemons: [],
        offset: 0,
      };
    default:
      return state;
  }
};
