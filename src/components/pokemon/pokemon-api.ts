import { selector } from 'recoil'

export type PokemonListItem = {
  readonly name: string
  readonly url: string
}

export type PokemonList = {
  readonly count: number
  readonly next: string | null
  readonly prev: string | null
  readonly results: ReadonlyArray<PokemonListItem>
}

const fetchList = async (): Promise<PokemonList> => {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon-species'
  return await fetch(apiUrl).then(
    async (result) => (await result.json()) as PokemonList
  )
}

export const pokemonListSelector = selector<PokemonList>({
  key: 'components.pokemon.pokemonListSelector',
  get: async () => {
    return await fetchList()
  },
})
