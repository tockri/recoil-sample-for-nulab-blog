import React from 'react'
import { useRecoilValue } from 'recoil'
import { PokemonList, pokemonListSelector } from './pokemon-api'

export const List: React.FC = () => {
  const pokemonList = useRecoilValue<PokemonList>(pokemonListSelector)
  return (
    <ul>
      {pokemonList.results.map((item, idx) => (
        <li key={idx}>{item.name}</li>
      ))}
    </ul>
  )
}
