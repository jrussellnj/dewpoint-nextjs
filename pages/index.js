import { server } from '../config';

import App from '../components/App.js'

function Home({ data }) {
  return (
    <App />
  )
}

export async function getServerSideProps({ req, res, params }) {
  /*if (process.env.NODE_ENV == 'production' && I) {
    res.statusCode = 302
    res.setHeader('Location', `https://dewpoint.xyz`)
  }*/

  console.log("req.headers['x-forwarded-proto']", req.headers['x-forwarded-proto'])

  return { props: {} }
}

export default Home
