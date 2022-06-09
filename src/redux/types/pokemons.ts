export interface IPokemonСard {
    name: string
    image: string
    types: any[] | null
    order: number
    id: string
}

export interface IPokemonPage {
    name: string
    image: string
    types: any[] | null
    order: number
    stats: any[]
    moves: any[]
    abilities : any[]
    species : any
    height : number
    weight : number
}

export interface IFetchPokemonData {
    name: string
    url : string
}

export interface PokemonsState {
    defaultPokemons: any[]
    defaultTypes : any[]
    sortedPokemons : any[]
    currentPokemons: IPokemonСard[]
    pokemonPage : IPokemonPage
    offset: number
    limit: number
    showMore: boolean
    loading: boolean
    error : boolean
}
export enum PokemonsActionTypes {
    LOADING_ON= 'LOADING_ON',
    LOADING_OFF='LOADING_OFF',
    SHOW_MORE='SHOW_MORE',
    FETCH_ERROR ='FETCH_ERROR',
    FETCH_POKEMONS = 'FETCH_POKEMONS',
    FETCH_POKEMON_PAGE = 'FETCH_POKEMON_PAGE',
    FETCH_TYPES = 'FETCH_TYPES',
    FETCH_SORTED_POKEMONS = 'FETCH_SORTED_POKEMONS',
    FETCH_CURRENT_POKEMONS = 'FETCH_CURRENT_POKEMONS',
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
    type: PokemonsActionTypes.FETCH_CURRENT_POKEMONS
    playload : any[]
}
interface FetchSortedPokemonsAction {
    type: PokemonsActionTypes.FETCH_SORTED_POKEMONS
    playload : any[]
}
interface FetchPokemonPage {
    type: PokemonsActionTypes.FETCH_POKEMON_PAGE
    playload : IPokemonPage
}
interface IncreaseOffset {
    type: PokemonsActionTypes.INCREASE_OFFSET
}
interface NullOffset {
    type: PokemonsActionTypes.NULL_CURRENT_POKEMONS
}
interface LoadingOn {
    type: PokemonsActionTypes.LOADING_ON
}
interface LoadingOff {
    type: PokemonsActionTypes.LOADING_OFF
}
interface ErrorFetch {
    type: PokemonsActionTypes.FETCH_ERROR
}

interface ShowMore {
    type: PokemonsActionTypes.SHOW_MORE
    playload : boolean
}

// eslint-disable-next-line max-len
export type PokemonsAction = LoadingOn | LoadingOff | ShowMore | ErrorFetch | FetchPokemonsAction | FetchTypesAction | FetchCurrentPokemonsAction | IncreaseOffset | FetchSortedPokemonsAction| FetchPokemonPage | NullOffset;
