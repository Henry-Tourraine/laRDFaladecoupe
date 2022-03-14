import '../styles/globals.css'
import Layout from "../components/Layout";
import { AppWrapper } from '../components/Context';
import Navbar from '../components/Navbar';


function MyApp({ Component, pageProps }) {

  return (
    <AppWrapper>
      <Navbar></Navbar>
      <Layout>
        <Component {...pageProps} />

      </Layout>
    </AppWrapper>
  )
}

export default MyApp
