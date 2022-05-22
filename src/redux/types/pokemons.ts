export interface IPokemon {
    name: string
    image: string
    types: any[] | null
    stats: any[]
    moves: any[]
    order: number
}

export interface PokemonsState {
    defaultPokemons: any[]
    defaultTypes : any[]
    sortedPokemons : any[]
    currentPokemons: IPokemon[]
    pokemonPage : IPokemon
    offset: number
    limit: number
    loading: boolean
}
export enum PokemonsActionTypes {
    LOADING_ON= 'LOADING_ON',
    FETCH_POKEMONS = 'FETCH_POKEMONS',
    FETCH_POKEMON_PAGE = 'FETCH_POKEMON_PAGE',
    FETCH_TYPES = 'FETCH_TYPES',
    FETCH_SORTED_POKEMONS = 'FETCH_SORTED_POKEMONS',
    FETCH__CURRENT_POKEMONS = 'FETCH__CURRENT_POKEMONS',
    INCREASE_OFFSET = 'INCREASE_OFFSET',
    NULL_CURRENT_POKEMONS = 'NULL_CURRENT_POKEMONS'
}

interface FetchPokemonsAction {
    type: PokemonsActionTypes.FETCH_POKEMONS
    playload : any[]
}
interface FetchTypesAction {
    type: PokemonsActionTypes.FETCH_TYPES
    playload : any[]
}

interface FetchCurrentPokemonsAction {
    type: PokemonsActionTypes.FETCH__CURRENT_POKEMONS
    playload : any[]
}
interface FetchSortedPokemonsAction {
    type: PokemonsActionTypes.FETCH_SORTED_POKEMONS
    playload : any[]
}

interface FetchPokemonPage {
    type: PokemonsActionTypes.FETCH_POKEMON_PAGE
    playload : IPokemon
}

interface IncreaseOffset {
    type: PokemonsActionTypes.INCREASE_OFFSET
}

interface NullOffset {
    type: PokemonsActionTypes.NULL_CURRENT_POKEMONS
}

interface Loading {
    type: PokemonsActionTypes.LOADING_ON
}

// eslint-disable-next-line max-len
export type PokemonsAction = Loading| FetchPokemonsAction | FetchTypesAction | FetchCurrentPokemonsAction | IncreaseOffset | FetchSortedPokemonsAction| FetchPokemonPage | NullOffset;
