import Head from 'next/head';

import { useAppContext } from './Context';

//import Navbar from './Navbar';


const Layout = ({ children }) => {
    let popup = useAppContext();

    return (<>
        <Head>
            <title>La république démocratique de France à la découpe</title>
            <meta name="description" content="Petite simulation d'élections présidentielles françaises" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        {children}



    </>)
}


export default Layout;
