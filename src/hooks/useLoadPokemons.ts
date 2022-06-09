import { useEffect, useState } from 'react';
import { IPokemonСard } from '../redux/types/pokemons';

export const useLoadPokemons = (currentPokemons: IPokemonСard[], limit:number, loadingOff: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const newPokemonsLength = currentPokemons.length % limit || limit;
  const newPokemons = currentPokemons.slice(-newPokemonsLength);
  let loadingComponents1: any[] = [];

  const loadImagesHandler = (image:string) :any => {
    loadingComponents1.push({ image, load: true });
    if (loadingComponents1.length === newPokemonsLength) {
      setIsLoading(false);
      loadingOff();
    }
  };

  useEffect(() => {
    loadingComponents1 = [];
    setIsLoading(true);
  }, [currentPokemons]);

  return { isLoading, loadImagesHandler, newPokemons };
};
