
import { useEffect, useState } from "react";
import { useAppContext } from "./Context";
import { candidates as images } from './Carousel';
import voteStyle from '../styles/vote.module.css';
import ABI from '../webthree/artifacts/contracts/Election.sol/Elections2022.json'

import { ethers } from 'ethers';
import { useRouter } from "next/router";

let Address = process.env.address_contract;

const Vote = ({ ind }) => {
    let [consent, setConsent] = useState(false);
    let popup = useAppContext();
    let [numberVotes, setNumberVotes] = useState(1);
    useEffect(() => { return setNumberVotes(1) }, [])
    let style = {
        wrapper: {
            display: "flex",
            flexFlow: "wrap column",
            justifyContent: "center",
            alignItems: "center"

        },
        h2: {
            textAlign: "center"
        },
        button: {
            fontSize: "2em",
            margin: "1em"
        },
        buttonWrapper: {
            display: "flex",
            flexFlow: "wrap row",
            justifyContent: "space-between"

        },
        plusMinus: {
            margin: "0.5em"

        }
    }

    function plus(i) {
        setNumberVotes(e => e + i)


    }
    let router = useRouter();
    async function avote() {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(Address, ABI.abi, signer);


            console.log("address : ", signer.address);
            try {
                let temp = await contract.Vote(ind, numberVotes, { value: ethers.utils.parseEther(String(numberVotes * 7)).toString() });
                let f = await fetch(router.pathname + "api/candidates", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ id: ind, numberVotes: numberVotes }) })
                console.log(await f.json());
                console.log("A voté: ", temp)
                popup.setPopupContent(<div ><p style={{ color: "black", background: "white" }}>Votre vote a bien été pris en compte</p></div>);
                setTimeout(() => {
                    popup.setPopupContent(<div></div>);
                    popup.setPopupDisplay(false);
                }, 2000)

            } catch (e) {
                console.log("le vote n'a pa seu lieu : ", e)
            }
        }
    }
    return (<div className="popup">

        <div style={style.wrapper}>
            <h2>Soutenez {images[ind].name}</h2>
            <p style={style.h2}>Dans le pays merveilleux de la république démocratique de France,
                vous pouvez bourrer les urnes !
            </p>
            <label>Combien de fois souhaitez-vous voter ?</label>
            <div>
                <input className={voteStyle.font} type="number" step="1" min="1" value={numberVotes} onChange={(e) => setNumberVotes(e.target.value)} />
                <div style={style.buttonWrapper}><button style={style.plusMinus} className={voteStyle.font} onClick={() => plus(1)}>+</button><button className={voteStyle.font} style={{ ...style.plusMinus, background: numberVotes <= 1 ? "lightblue" : null, color: numberVotes <= 1 ? "white" : null }} onClick={() => { if (numberVotes >= 2) plus(-1) }}>-</button></div>
            </div>
            <div style={{ display: "flex", flexFlow: "wrap row ", alignItems: "center" }}>
                <input style={{ color: "blue", background: "blue" }} type="checkbox" onClick={e => { if (e.target.checked) { setConsent(true) } else { setConsent(false) } }} /><p style={{ fontSize: "0.8em" }}>Vous avez lu les CGU et les acceptez (en bas de page)</p>
            </div>
            <button style={style.button} className={consent && numberVotes ? "pulse" : null} disabled={consent && numberVotes ? false : true} onClick={() => avote()}>Voter</button>
            <div>Prix: {numberVotes * 7} MATIC</div>
        </div>
    </div>)
}

export default Vote;