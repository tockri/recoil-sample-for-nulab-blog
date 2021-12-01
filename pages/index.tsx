import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { List } from '../src/components/pokemon/List'
import React from 'react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const page = router.query.page ? parseInt(router.query.page as string) : 1
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Pokemon List</h1>
        <React.Suspense fallback={<>Loading...</>}>
          <List page={page} />
        </React.Suspense>
      </main>
    </div>
  )
}

export default Home
