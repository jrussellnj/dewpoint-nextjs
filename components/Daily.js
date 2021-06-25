import Day from './Day.js'

export default function Daily({ data, getDewPointColor }) {
  const week =
    <div>
      {data.map((x) => {
         return (
           <div>{x.dt} - {getDewPointColor(x.dew_point)}</div>
         )
      })}
    </div>

  return (
    <div>
      <h1>DAILZZ</h1>
      {week}
    </div>
  )
}
