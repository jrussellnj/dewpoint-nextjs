import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Current from '../components/Current.js'
import { server } from '../config';

function Home({ data }) {
  return (
    <div className={styles.container}>
      <Current
        data={data.current}
        dewPointColor={getDewPointColor(data.current.dew_point)}
      />
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(`${server}/api/get-weather-data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

// Get color by dewpoint value
const getDewPointColor = function(deg) {
  return deg < 60 ? 'blue' : 'red'
}

export default Home
