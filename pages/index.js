import { server } from '../config';

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Forecast from '../components/Forecast.js'
import Current from '../components/Current.js'
import Daily from '../components/Daily.js'

function Home({ data }) {
  return (
    <div className="container">
      <Forecast
        city={'fake city name'}
        isFindingLocation={false}
        isLoadingWeather={false}
        locationFailed={false}
        units={'us'}
        weather={data}
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

export default Home
