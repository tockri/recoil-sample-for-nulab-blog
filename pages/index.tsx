import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { List } from '../src/components/pokemon/List'
import React from 'react'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Pokemon List</h1>
        <React.Suspense fallback={<>Loading...</>}>
          <List />
        </React.Suspense>
      </main>
    </div>
  )
}

export default Home
