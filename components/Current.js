import styles from './Current.module.css'

export default function Current({ data, dewPointColor }) {
  return (
    <div>
      <h1>Currently:</h1>

      <div>
        Dewpoint: <span className={styles[dewPointColor]}>{data.dew_point}&deg;</span> <br />
        Temp: {data.temp}&deg;
      </div>
    </div>
  )
}
