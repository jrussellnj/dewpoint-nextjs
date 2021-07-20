import { server } from '../config';

import App from '../components/App.js'

function Home({ data }) {
  return (
    <App />
  )
}

export async function getServerSideProps({ req, res, params }) {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] === 'http') {
    console.log("fw to https")
    res.statusCode = 302
    res.setHeader('Location', `https://dewpoint.xyz`)
  }

  return { props: {} }
}

export default Home
