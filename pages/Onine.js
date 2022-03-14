
import ABI from '../webthree/artifacts/contracts/Election.sol/Elections2022.json'

import { ethers } from 'ethers';
const Online = () => {



    async function on(props) {
        if (typeof window !== "undefined") {
            if (window.ethereum != 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                const signer = provider.getSigner();



                const contract = new ethers.ContractFactory(ABI.abi, ABI.bytecode, signer);
                let d = await contract.deploy();
                let c = await d.deployed();
                console.log("contract :", d, "deployed : ", c)
            }

        }


    }

    return (<div>
        <button onClick={() => {
            on()
        }}>Mise En ligne</button>

    </div>)

}

export const getStaticProps = async (props) => {
    console.log(props);
    let prop = {};






    return {
        props: prop,
        revalidate: 30
    }
}

export default Online;