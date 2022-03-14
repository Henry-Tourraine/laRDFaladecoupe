import { useEffect, useState } from "react"
import { candidates } from "./Carousel";
import { assesseurs } from "./assesseurs";
import { useAppContext } from "./Context";
import ABI from '../webthree/artifacts/contracts/Election.sol/Elections2022.json'
import { useRouter } from "next/router";
import { ethers } from 'ethers';

let Address = process.env.address_contract;

export default function Bribe() {
    let popup = useAppContext();
    let [soudoyerOuCorromrpe, setS] = useState(0)
    let [journal, setJournal] = useState(false);
    let [faveur, setFaveur] = useState(0);
    let [subject, setSubject] = useState(0);
    let [value2, setValue2] = useState(1);
    let [consent, setConsent] = useState(false);

    let [faveur2, setFaveur2] = useState(0);
    let [subject2, setSubject2] = useState(0);

    let [judge, setJudge] = useState(1);
    let [message, setMessage] = useState("");
    let [message2, setMessage2] = useState("");
    let [successScreen, setSuccessScreen] = useState(false);
    let [consent2, setConsent2] = useState(false);

    let router = useRouter();
    useEffect(() => {

        console.log(journal);
    }, [journal])
    let style = {
        propositon: { display: "flex", flexFlow: "wrap row", padding: "0.5em", justifyContent: "center" }, button: {
            width: "fit-content",
            fontSize: "1.1em"
        },
        wrapper:
            { display: "flex", flexFlow: "wrap column", alignItems: "center", border: "solid black 1px", borderRadius: "2vw 2vw", width: "100%", margin: soudoyerOuCorromrpe === 0 ? "1em 0" : "0" }

    };



    function delay(func, arg) {
        func(arg);
        setTimeout(() => {
            func()
        }, 3000)
    }
    function pick(len) {
        return Math.floor(Math.random() * len);
    }

    async function Soudoyer() {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(Address, ABI.abi, signer);
            try {
                alert(pick(7))
                let temp = await contract.editArticle(faveur, subject, { value: ethers.utils.parseEther("3").toString() });
                let f = await fetch(router.pathname + "api/journaux", { method: "PUT", headers: { "Content-type": "application/json" }, body: JSON.stringify({ id: subject, positivity: faveur, template: faveur === true ? pick(6) : pick(9), news: journal }) })
                //console.log(await f.json());
                console.log(temp);

                delay(setMessage, "La rédaction a correctement été soudoyée")
            } catch (e) {
                delay(setMessage, "La rédaction a refusé essayez plus tard" + e)
            }
        }
    }
    async function Corrompre() {
        console.log(ethers.utils.parseEther(String(judge * 14 * value2)).toString())
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(Address, ABI.abi, signer);
            try {

                let temp = await contract.influence(judge, subject2, faveur2, { value: ethers.utils.parseEther(String(judge * 14 * value2)).toString() }).wait()
                console.log(temp)
                alert(JSON.stringify(temp));
                delay(setMessage2, "L'assesseur " + assesseurs[judge - 1].name + " a accepté votre offre");

            } catch (e) {
                delay(setMessage2, "L'assesseur " + assesseurs[judge - 1].name + " a accepté votre offre");
            }
        }

    }
    return (<div style={{ background: "inherit", color: "inherit", display: "flex", flexFlow: "wrap column", alignItems: "center" }} className="bribe">
        <div style={{ ...style.wrapper, padding: soudoyerOuCorromrpe === 1 ? "0.5em 0" : "0" }}>
            <div style={{ display: soudoyerOuCorromrpe === 1 ? "none" : "flex" }} className="otherActions" onClick={() => setS(1)}>SOUDOYER</div>
            <div style={{ display: "flex", flexFlow: "wrap column", alignItems: "center", display: soudoyerOuCorromrpe === 1 ? "flex" : "none", borderRadius: "3vw" }}>
                <div className="editWrapper" >


                    <div style={style.propositon}><p> &nbsp;Soudoyer la rédaction de  &nbsp;</p><select className="blue" onChange={(e) => setJournal(e.target.value)}><option value={false} selected>L&apos;Univers</option><option value={true}>Le canard Laquais</option></select></div>

                    <div style={style.propositon}> <p>&nbsp;pour écrire 1 article&nbsp;</p><select className="grey" onChange={(e) => setFaveur(e.target.value)} ><option value={0} selected>en défaveur</option><option value={1}>en faveur</option></select></div>

                    <div style={style.propositon}><p>&nbsp;de&nbsp;</p><select className="red" onChange={(e) => { setSubject(e.target.value) }}>{candidates.map((e, index) => { return <option key={index} value={index} selected={index === 0 ? true : false}>{e.fullname}</option> })}</select></div>



                    <div >
                        <p className="precision">{candidates[subject].fullname} {["perdra", "gagnera"][faveur]} 1 vote par personne qui clique sur l&apos;article.</p>
                        <p className="precision">Cela affectera les pourcentages visibles sur le site<br /> mais pas le nombre réel de voix.</p>
                    </div>

                </div>
                <input style={{ color: "blue", background: "blue" }} type="checkbox" onClick={e => { if (e.target.checked) { setConsent(true) } else { setConsent(false) } }} /><p style={{ fontSize: "0.8em" }}>Vous avez lu les CGU et les acceptez (en bas de page)</p>
                <p> {"Prix :" + 3 + " MATIC"}</p>
                <button style={style.button} className={consent ? "pulse" : null} onClick={() => Soudoyer()}>soudoyer</button>
                {message}
            </div>
        </div>
        OU
        < div style={{ ...style.wrapper, padding: soudoyerOuCorromrpe === 2 ? "0.5em 0" : "0" }
        }>
            <div style={{ display: soudoyerOuCorromrpe === 2 ? "none" : "flex" }} className="otherActions" onClick={() => setS(2)}>CORROMPRE</div>
            <div style={{ display: "flex", flexFlow: "wrap column", alignItems: "center", display: soudoyerOuCorromrpe === 2 ? "flex" : "none", borderRadius: "3vw" }}>
                <div className="editWrapper" >

                    <p>Corrompre l&apos;assesseur&nbsp;</p><p><select className="blue" onChange={(e) => { setJudge(e.target.value) }}>{assesseurs.map((e, index) => { return <option key={index} value={index + 1} selected={index === 0 ? true : false}>{e.name}</option> })}</select></p>

                    <p><select className="grey" onChange={(e) => setFaveur2(e.target.value)}><option value={0} selected>en défaveur</option><option value={1}>en faveur</option></select></p>

                    <p>de&nbsp;</p><p><select className="red" onChange={(e) => { setSubject2(e.target.value) }}>{candidates.map((e, index) => { return <option key={index} value={index} selected={index === 0 ? true : false}>{e.fullname}</option> })}</select></p>

                    <div style={{ display: "flex", flexFlow: "wrap column" }}>

                    </div>
                    <div className="pot">
                        <label style={{ margin: "1.5em" }}>Nbr de pots de vin: {value2}</label>

                        <div style={{ display: "flex", flexFlow: "wrap row", justifyContent: "space-evenly", minWidth: "80%", fontSize: "2em" }}>
                            <button onClick={(e) => { let temp = value2; setValue2(temp += 1) }} style={{ fontSize: "1.3em" }}>+</button>
                            <button onClick={(e) => { if (value2 >= 2) { let temp = value2; setValue2(temp -= 1) } }} style={{ fontSize: "1.3em" }}>-</button>
                        </div>
                    </div>
                    <div >
                        <p className="precision">{candidates[subject2].fullname} {["perdra", "gagnera"][faveur2]}&nbsp;{judge * judge * (value2)} voix </p>
                        <p className="precision">Cela affectera le compte réel de voix du candidat mais ne sera pas visible sur le site (prix en compte pour l'élection)</p>
                    </div>
                    <p>PRIX: {judge * (value2) * 14} MATIC</p>
                    <input style={{ color: "blue", background: "blue" }} type="checkbox" onClick={e => { if (e.target.checked) { setConsent2(true) } else { setConsent2(false) } }} /><p style={{ fontSize: "0.8em" }}>Vous avez lu les CGU et les acceptez (en bas de page)</p>

                </div>
                <button style={style.button} className={consent2 ? "pulse" : null} onClick={() => Corrompre()}>corrompre</button>
                {message2}
            </div>
        </div >
    </div >)
}