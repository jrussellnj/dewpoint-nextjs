import styles from './Current.module.scss'

export default function Current({ data, dewPointColor, getDiscomfortLevel }) {

  const dpClass = getDiscomfortLevel(data.dew_point, 'us').dpClass
  console.log(dpClass)

  return (
    <div>
      <h1>Currently:</h1>

      <div>
        Dewpoint: <span className={styles[dpClass]}>{data.dew_point}&deg;</span> <br />
        Temp: {data.temp}&deg;
      </div>
    </div>
  )
}
