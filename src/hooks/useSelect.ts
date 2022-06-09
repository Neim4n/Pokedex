import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTypeSelector } from './useTypeSelector';
import { IFetchPokemonData } from '../redux/types/pokemons';

interface ISelectOption {
  value : string,
  label : string
}

export const useSelect = () => {
  const { defaultPokemons } = useTypeSelector((state) => state.pokemons);
  const navigate = useNavigate();
  const location = useLocation().pathname.slice(1);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState<ISelectOption | null>(null);
  const [defaultOptions, setDefaultOptions] = useState<any[]>([]);

  const handleChange = (e:any) => {
    setValue(e);
    navigate(`/${e.value}`);
  };

  useEffect(() => {
    if (!location || location === '404') {
      setValue(null);
    } else if ((!value && location) || (value && location !== value.value)) {
      setValue({ label: location[0].toUpperCase() + location.slice(1), value: location });
    }
  }, [location]);

  /* eslint-disable max-len */
  useEffect(() => {
    if (defaultPokemons) {
      setIsLoading(false);
      const defaultOptionsArray = defaultPokemons.slice(0, 10).map((e: IFetchPokemonData) => ({ label: e.name[0].toUpperCase() + e.name.slice(1), value: e.name }));
      setDefaultOptions(defaultOptionsArray);
    }
  }, [defaultPokemons]);

  const loadOptions = (inputValue: string, callback:any) => {
    callback(defaultPokemons
      .filter((e:IFetchPokemonData) => (inputValue.length <= 1 ? false : e.name.toLowerCase().includes(inputValue.toLowerCase())))
      .map((e: IFetchPokemonData) => ({ label: e.name[0].toUpperCase() + e.name.slice(1), value: e.name })));
  };
  /* eslint-disable max-len */

  return {
    isLoading, value, defaultOptions, loadOptions, handleChange,
  };
};
