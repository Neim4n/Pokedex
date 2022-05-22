import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
