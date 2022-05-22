import { combineReducers } from 'redux';
import { pokemonReducer } from './pokemonReducer';

export const rootReducer = combineReducers({
  pokemons: pokemonReducer,
});

export type RootState = ReturnType<typeof rootReducer>
