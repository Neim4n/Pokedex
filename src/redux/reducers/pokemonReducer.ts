import { PokemonsAction, PokemonsActionTypes, PokemonsState } from '../types/pokemons';

const initialState: PokemonsState = {
  defaultPokemons: [],
  defaultTypes: [],
  sortedPokemons: [],
  currentPokemons: [],
  pokemonPage: {
    name: '', image: '', types: [], order: 0, stats: [], moves: [], abilities: [], species: {}, height: 0, weight: 0,
  },
  offset: 0,
  limit: 12,
  showMore: true,
  loading: true,
  error: false,
};

// eslint-disable-next-line default-param-last
export const pokemonReducer = (state = initialState, action: PokemonsAction): PokemonsState => {
  switch (action.type) {
    case PokemonsActionTypes.LOADING_ON:
      return {
        ...state,
        loading: true,
      };
    case PokemonsActionTypes.LOADING_OFF:
      return {
        ...state,
        loading: false,
      };
    case PokemonsActionTypes.SHOW_MORE:
      return {
        ...state,
        showMore: action.playload,
      };
    case PokemonsActionTypes.INCREASE_OFFSET:
      return {
        ...state,
        offset: state.offset + state.limit,
      };
    case PokemonsActionTypes.FETCH_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
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
    case PokemonsActionTypes.FETCH_CURRENT_POKEMONS:
      return {
        ...state,
        currentPokemons: action.playload,
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
