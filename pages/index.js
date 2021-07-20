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

  console.log("req.headers.host", req.headers.host)
  console.log("req.headers", req.headers)
  console.log("req.secure", req.secure)
  console.log("req.protocol", req.protocol)

  return { props: {} }
}

export default Home
