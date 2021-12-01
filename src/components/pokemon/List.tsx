import React, { useState } from 'react'
import { usePokemon, usePokemonList } from './pokemon-api'
import Link from 'next/link'

export type ListProps = {
  page: number
}

export const List: React.FC<ListProps> = (props) => {
  const { page } = props
  const pokemonList = usePokemonList(page)
  const [selected, select] = useState('')
  return (
    <div>
      {pokemonList.results.map((item, idx) => (
        <div key={idx} style={{ margin: '1em 0' }}>
          {item.name === selected ? (
            <>
              <div
                style={{ backgroundColor: '#666', color: 'white' }}
                onClick={() => select(item.name)}
              >
                {item.name}
              </div>
              <React.Suspense fallback={<>....</>}>
                <Item name={item.name} />
              </React.Suspense>
            </>
          ) : (
            <div
              style={{
                cursor: 'pointer',
                backgroundColor: '#666',
                color: 'white',
              }}
              onClick={() => select(item.name)}
            >
              {item.name}
            </div>
          )}
        </div>
      ))}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {page > 1 ? (
          <Link href={`?page=${page - 1}`}>&lt;&lt; 前へ</Link>
        ) : null}
        &nbsp;&nbsp;&nbsp;
        {pokemonList.next ? (
          <Link href={`?page=${page + 1}`}>次へ&gt;&gt;</Link>
        ) : null}
      </div>
    </div>
  )
}

const Item: React.FC<{ name: string }> = (props) => {
  const pokemon = usePokemon(props.name)
  return pokemon ? (
    <div style={{ border: '1px solid gray' }}>
      <div>{pokemon.names[0].name}</div>
      <div>{pokemon.genera[0]?.genus}</div>
      <pre>{pokemon.flavor_text_entries[0].flavor_text}</pre>
    </div>
  ) : null
}
