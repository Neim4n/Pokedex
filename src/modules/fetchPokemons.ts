import axios from 'axios';
import uniqid from 'uniqid';
import { IFetchPokemonData } from '../redux/types/pokemons';

async function getAllChain(chain : any, array:any[], from: any) {
  let newFrom = {};
  let newArray:any[] = [];
  if (from) {
    /* eslint-disable no-use-before-define */
    newFrom = await getPokemon(from.name.toLowerCase(), 'card');
    // eslint-disable-next-line no-param-reassign
    chain.species = await getPokemon(chain.species.name, 'card');
    const object = { from: newFrom, evolution: chain };
    array.push(object);
  }
  if (chain.evolves_to.length) {
    newArray = [...chain.evolves_to.map((e:any) => getAllChain(e, array, chain.species))];
  }
  return [...newArray];
}

const getSpecies = async (url:string) => {
  const species = await axios.get(url).then((res) => res.data);

  // About
  const about = species.flavor_text_entries.filter((e:any) => e.language.name === 'en')[0].flavor_text.replace('\f', ' ');

  // Evolution Chain
  const evolutionChain = await axios.get(species.evolution_chain.url)
    .then((res) => res.data)
    .then((data) => data.chain);
  const evolutionArray: any[] = [];
  await getAllChain(evolutionChain, evolutionArray, '');

  return {
    about,
    evolutionChain: evolutionArray,
  };
};

export function filterFetchResult(array:IFetchPokemonData[]) {
  return array.filter((e:IFetchPokemonData) => +e.url.split('/').slice(-2, -1) < 10000);
}

export async function getPokemon(pokemonName : string, informationType: string) {
  const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((res) => res.data);

  switch (informationType) {
    case 'card':
      return {
        name: pokemon.species.name,
        image: pokemon.sprites.other['official-artwork'].front_default,
        types: pokemon.types,
        order: pokemon.order,
        id: uniqid(),
      };
    case 'page':
      return {
        name: pokemon.species.name,
        image: pokemon.sprites.other['official-artwork'].front_default,
        types: pokemon.types,
        moves: pokemon.moves,
        stats: pokemon.stats,
        order: pokemon.order,
        species: await getSpecies(pokemon.species.url),
        weight: pokemon.weight,
        height: pokemon.height,
        abilities: pokemon.abilities,
      };
    default:
      return pokemon;
  }
}

export async function getPokemons(type : number | null) {
  let response;
  if (type) {
    response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    response = response.data.pokemon.map((e:any) => (e.pokemon));
    return filterFetchResult(response);
  }
  response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  return filterFetchResult(response.data.results);
}
