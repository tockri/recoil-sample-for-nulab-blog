import {
  atomFamily,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { useEffect } from 'react'

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

export type Language = {
  readonly name: string
  readonly url: string
}

export type FlavorText = {
  readonly flavor_text: string
  readonly language: Language
}

export type Genust = {
  readonly genus: string
  readonly language: Language
}

export type Pokemon = {
  readonly id: number
  readonly name: string
  readonly evolution_chain: {
    readonly url: string
  }
  readonly flavor_text_entries: ReadonlyArray<FlavorText>
  readonly genera: ReadonlyArray<Genust>
  readonly names: ReadonlyArray<{
    readonly name: string
    readonly language: Language
  }>
}

const filterJa = <T extends { language: Language }>(
  entries: ReadonlyArray<T>
): ReadonlyArray<T> =>
  entries.filter(
    (i) => i.language.name === 'ja' || i.language.name === 'ja-Hrkt'
  )

const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`
  const result = await fetch(apiUrl).then(async (result) => {
    const pm = (await result.json()) as Pokemon
    return {
      ...pm,
      flavor_text_entries: filterJa(pm.flavor_text_entries),
      genera: filterJa(pm.genera),
      names: filterJa(pm.names),
    }
  })
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(result)
    }, 1000)
  })
}

const pokemonAtom = atomFamily<Pokemon | null, string>({
  key: 'components.pokemon.pokemonAtom',
  default: null,
})

const pokemonSelector = selectorFamily<Pokemon, string>({
  key: 'components.pokemon.pokemonSelector',
  get:
    (name) =>
    async ({ get }) => {
      return get(pokemonAtom(name)) || (await fetchPokemon(name))
    },
})

const fetchList = async (page: number): Promise<PokemonList> => {
  const offset = 10 * (page - 1)
  const apiUrl = `https://pokeapi.co/api/v2/pokemon-species/?limit=10&offset=${offset}`
  const result = await fetch(apiUrl).then(
    async (result) => (await result.json()) as PokemonList
  )
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(result)
    }, 1000)
  })
}

const pokemonListAtom = atomFamily<PokemonList | null, number>({
  key: 'components.pokemon.pokemonListAtom',
  default: null,
})

const pokemonListSelector = selectorFamily<PokemonList, number>({
  key: 'components.pokemon.pokemonListSelector',
  get:
    (page) =>
    async ({ get }) =>
      get(pokemonListAtom(page)) || (await fetchList(page)),
})

export const usePokemonList = (page: number): PokemonList => {
  const pokemonList = useRecoilValue(pokemonListSelector(page))
  const set = useSetRecoilState(pokemonListAtom(page))

  useEffect(() => {
    if (pokemonList) {
      set(pokemonList)
    }
  }, [pokemonList])

  return pokemonList
}

export const usePokemon = (name: string): Pokemon => {
  const pokemon = useRecoilValue(pokemonSelector(name))
  const set = useSetRecoilState(pokemonAtom(name))
  useEffect(() => {
    if (pokemon) {
      set(pokemon)
    }
  }, [name, pokemon])
  return pokemon
}
