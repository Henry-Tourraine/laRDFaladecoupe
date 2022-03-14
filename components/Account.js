import { useState } from "react";
import { candidates } from "./Carousel";
import ABI from '../webthree/artifacts/contracts/Election.sol/Elections2022.json'
import { assesseurs } from "./assesseurs";
import { ethers } from 'ethers';

export default function Account() {

    let Address = process.env.address_contract;

    let [votes, setVotes] = useState([]);
    let [articles, setArticles] = useState([]);
    let [judge, setJudge] = useState([]);
    let [tokens, setTokens] = useState(0)

    const b = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(Address, ABI.abi, signer);
            try {
                candidates.map(async (e, index) => {
                    setVotes(prev => []);
                    let temp = await contract.GetVotesPerVoter(index);

                    setVotes(prev => [...prev, temp]);
                })
                console.log(votes);

            } catch (e) { console.log(e) }
            try {

                let temp = await contract.getWhoEdited();
                console.log("WHOEDITED", temp);
                setArticles(temp);
            } catch (e) { console.log(e) }
            try {
                setJudge([])
                let temp = await contract.getInfluence();
                setJudge(prev => [...prev, temp]);


            } catch (e) { console.log(e) }
            try {
                if (new Date().getTime() > new Date(1650837660000).getTime()) {
                    let temp = await contract.howManyDoIget();
                    setTokens(temp);
                }
            } catch (e) { console.log(e) }

        }

    };
    return (<div>
        <p style={{ textDecoration: "underline" }}>Votre compte :</p>
        <p >Nombres de votes: {votes.map((e, index) => { return <div key={index} className="light">{candidates[index].fullname} : {e.toString()}</div> })}</p>
        <p>Nombre d&apos;articles:<div style={{ maxHeight: "100px", overflowY: "scroll", boxShadow: "2px 2px 3px 3px rgba(50, 50, 50, 0.2)" }} className="light">{articles.map((e, index) => <div key={index} className="light">Un article {e[0] === true ? "en faveur" : "en défaveur"} de {candidates[e[2]].fullname} édité le {new Date(parseInt(e[1].toString()) * 1000).toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} </div>)}</div></p>
        <p>Nombre de corruption d&apos;assesseurs:{judge.map((e, index) => { return <div key={index} className='light'>{assesseurs[e[index][0].toNumber()].name} a reçu {e[index][1].toNumber() * e[index][0].toNumber()} tokens</div> })}</p>

        <hr />
        <p>Vos tokens: {new Date().getTime() > new Date(1650837660000).getTime() ? String(tokens) : "Attendez le 25 avril"}</p>
        <button onClick={() => b()}>Rafraîchir</button>
    </div>)
}