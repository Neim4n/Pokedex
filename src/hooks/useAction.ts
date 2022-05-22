import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PokemonsActions from '../redux/actions/pokemons';

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(PokemonsActions, dispatch);
};
