
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import Carousel, { candidates as names } from "../components/Carousel";

import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useRef, useEffect, useState, useMemo } from 'react'

import Presentation from '../components/Presentation';
import Journaux from '../components/Journaux';
import { useAppContext } from '../components/Context';
import { useInView } from 'react-intersection-observer';


import ABI from '../webthree/artifacts/contracts/Election.sol/Elections2022.json'

import { ethers } from 'ethers';
import CGU from '../components/CGU';

import dbConnect from "../utils/dbConnect"
import Article from "../models/Articles"
import Ipsauce from "../models/Ipsauces"



function President({ win, req }) {
  let router = useRouter();
  let [pres, setPres] = useState([99, 0])
  let address = process.env.address_contract;
  let [nbr, setNbr] = useState(0);
  let [token, setToken] = useState(0);
  let [message, setMessage] = useState('');
  let [withDrawAmount, setWithDrawAmount] = useState(0);
  let [withDrawAddress, setWithDrawAddress] = useState("moi");
  let temp1;
  let temp2;


  const getPresident = async (props) => {
    console.log(props);
    if (typeof window.ethereum !== "undefined") {

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, ABI.abi, signer);
      try {
        let temp = await contract.getPresident();

        setPres(prev => [...temp])

      } catch (e) {
        console.log("an error occured " + e);

      }

    }
  }

  async function howMany() {
    let nbr = 0;
    let tokenVal = 0;
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, ABI.abi, signer);

      try {
        let temp = await contract.howManyDoIget();
        setNbr(temp);
      } catch (e) {
        console.log(e)
      }
      try {
        let temp = await contract.TOKEN();
        setToken(temp);
      } catch (e) {
        console.log(e);
      }

    }

  }

  async function withDraw() {

    let tokenVal = 0;
    let tempAddress;
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, ABI.abi, signer);
      if (withDrawAddress === "moi") {
        tempAddress = signer.getAddress();
      } else {
        tempAddress = withDrawAddress;
      }


      try {
        let temp = await contract.withdrawToken(tempAddress, withDrawAmount);
        setTimeout(() => setMessage("Le virement a été exécuté"), 2000);
        howMany();
      } catch (e) {
        console.log(e)
      }


    }
    return [nbr, tokenVal];
  }
  useEffect(() => {

    getPresident()
    howMany()
    if (audio.current) {
      audio.current.volume = 0.05;
    }

  }, [])

  let audio = useRef();

  return (
    <div style={{ display: "flex", flexFlow: "wrap column", alignItems: "center", justifyContent: "center" }}>
      <audio autoPlay={true} ref={audio} loop={false}>
        <source src="/music/marseillaise.webm" type="audio/webm" volume={0.1} />
      </audio>
      {parseInt(pres[0].toString()) === 99 ? "Le président n'est pas encore élu" : "Le président est " + names[parseInt(pres[0].toString())].fullname + " avec " + pres[1].toString() + " votes"}
      <div style={{ height: "300px", width: "300px", position: 'relative' }}>
        {pres[0] != 99 && <Image src={router.pathname + "img/" + names[parseInt(pres[0].toString())].src} layout='fill'
          objectFit='contain' />}
      </div>
      {parseInt(pres[0].toString()) === 99 ? null : <div>
        <p>Vous avez {nbr.toString()} tokens soit {parseInt(nbr.toString()) * parseInt(token.toString()) / (10 ** 18)} MATIC</p>
        <label>Nombre de tokens à retirer:</label>
        <input className="final" placeholder="ex: 9" type="number" min={0} onChange={(e) => { if (e.target.value > parseInt(nbr.toString())) { e.target.value = parseInt(nbr.toString()) }; setWithDrawAmount(e.target.value) }} />
        <label>Adresse:</label>
        <input style={{ width: "30em" }} className="final" placeholder="ex: 0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc" type="text" onChange={(e) => { if (e.target.value == "moi" || (e.target.value.length == 42 && e.target.value.substring(0, 2) == "0x")) { setWithDrawAddress(e.target.value) } }} />
        <p style={{ fontSize: "0.8em" }}>Entrez &quot;moi&quot; pour envoyer la somme sur votre compte</p>
        {"Envoyer " + withDrawAmount + " tokens sur "}  {withDrawAddress == "moi" ? "mon adresse" : "l'adresse " + withDrawAddress}
        <button style={{ fontSize: "1.4em", margin: "1.2em" }} onClick={async () => { await withDraw() }} disabled={withDrawAmount < 1 ? true : false}>Envoyer</button></div>}
      {message}
    </div>
  )
};






function Home({ journaux, percent }) {

  let popup = useAppContext();
  let [token, setToken] = useState("0");
  let router = useRouter();
  let c = () => { if (!!popup.popupDisplay === true) { window.scrollTo(0, popup.offset) } }

  console.log("PERCENT", percent)

  let Address = process.env.address_contract;


  let [ce, setC] = useState([]);
  const z = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(Address, ABI.abi, signer);
    setC([])
    names.map(async (e, index) => {
      try {
        let temp = await contract.GetVotesPerCandidate(index)
        setC(prev => [...prev, { name: e.name, votes: temp.toNumber() }])
        console.log(temp);


      } catch (e) { console.log(e) }
    })
  }



  let [questions,] = useState([{ question: <div>Qu&apos;est-ce que La République Démocratique de France à la découpe</div>, answer: <p>Habituellement l&#8217;électeur est appelé à voter pour les présidentielles une fois tous les 5 ans et a comme seul pouvoir son bulletin.<br /> La RDF à la découpe est un projet vous permettant de vivre une simulation d&apos;élections 2022 avec d&apos;autres leviers de pouvoir...</p> },
  { question: "Comment je participe ?", answer: <p>Tout d&apos;abord vous pouvez voter autant de fois que vous le désirez pour autant de candidats qu&#8217;il y en a sur ce trombinoscope.<br /> Vous pouvez ensuite tenter de déstabiliser ou favoriser des candidats en soudoyant les éditions de journaux l&apos;Univers et le Canard Laquais. <br /> Enfin vous pouvez également corrompre les assesseurs pour qu&apos;ils bourrent les urnes !</p> },
  { question: "Quel est l'intérêt ?", answer: <p>Dans la RDF, le président nouvellement élu redistribue généreusement l&apos;argent accumulé par tous les candidats durant la campagne à tous ses électeurs sous forme du token de la RDF.</p> },
  {
    question: "Et concrètement ?", answer: <div><p>Le site restera ouvert au vote jusqu&#8217;au 23 avril à 23h59, la journée du 24 sera réservée pour le dépouillage SEULS LES VOTES et LES BOURRAGES d&#8217;URNE COMPTERONT les autres actions du site sont destinés à influencer les sondages et par conséquent les nouveaux venus sur le site.<br /> Enfin le 25 avril vous pourrez venir retirer vos tokens de la RDF (en cliquant sur le menu en haut à droite) si un des candidats pour lesquels vous avez votés est élu. <br /> Exemple: </p><p style={{ fontSize: "0.8em" }}>Les fonds totaux des votes, de la corruption et du soudoiement s&apos;élèvent à 5000 MATIC.<br /> Mr Jadot est élu avec 20 électeurs. Le token de la RDF aura une valeur de 250 MATIC. <br />Si vous avez voté 3 fois pour Mr. Jadot vous pourrez retirer sur votre wallet, au maximum 3 tokens soit 750 MATIC soit actuellement 967,5 € .</p></div>
  },
  { question: "Je n'arrive pas à voter", answer: <p style={{ display: "flex", flexFlow: "wrap row" }}>Pour cela il vous faut un crypto wallet comme <Link href="https://metamask.io/" ><a style={{ maxWidth: "6em", padding: 0, margin: 0, width: "fit-content !important" }}>Metamask</a></Link> ou <Link href="https://phantom.app/"><a style={{ padding: 0, margin: 0, width: "fit-content", maxWidth: "6em" }}>Phantom</a></Link>, vous devez sélectionner la chaîne Polygon</p> },
  { question: "J'ai une question", answer: <p style={{ cursor: "pointer" }}>Vous pouvez nous contacter à lardfaladecoupe@gmail.com</p> }
  ])
  let [answerDisplay, setAnswerDisplay] = useState(questions.map(e => false))

  useEffect(() => {

    window.addEventListener("scroll", c)


    return () => window.removeEventListener("scroll", c)
  }, [popup])


  const { ref, inView, entry } = useInView({

    threshold: 0
  });





  useEffect(() => {
    console.log("Q", entry ? entry.target : null);
    if (entry) [...entry.target.children].forEach(e => { e.style.transform = "translate(0, 0)"; })
  }, [inView])


  return (

    < div className={styles.container} >
      <hr />
      {new Date().getTime() > new Date(1650751201000).getTime() ? <div><President req={async () => await window.ethereum.request({ method: 'eth_requestAccounts' })} win={async () => await window.ethereum} /></div> : <div>
        <Presentation />


        <Carousel percent={percent} />
        <Journaux journaux={journaux} path={router.pathname} />

        <div className={styles.footer} ref={ref}>
          {questions.map((e, index) => {
            return <div className={index % 2 === 0 ? "slideOutq" : "slideOutRightq"} style={{ display: "flex", flexFlow: "wrap column", fontSize: "1.5em", width: "100%" }} key={index}><div style={{ display: "flex", flexFlow: "wrap row", padding: "1em", border: "solid white 2px", width: "100%!important" }}>
              <div className="answer" onClick={() => { let t = answerDisplay.map(e => e); console.log("INDEX", t[index]); if (t[index] === true) { t[index] = false } else { t[index] = true }; console.log("ANSWER", answerDisplay); setAnswerDisplay(prev => t) }}>+</div><div style={{ margin: "0 0.5em" }}>{e.question}</div></div><div style={{ display: answerDisplay[index] === true ? "block" : "none", padding: "0.5em 0.5em" }}>{e.answer}</div></div>
          })}
        </div>
        <hr />
        <div style={{ display: new Date().getTime() > 1646606400000 && new Date().getTime() < 1646608400000 ? "flex" : "none", justifyContent: "center", flexFlow: "wrap column", alignItems: "center" }}>
          <p style={{ fontSize: "1em" }}>Oooops, les votes ont leaké !</p>
          <button style={{ maxWidth: "15em" }} onClick={() => { z() }}>Voir les votes effectifs</button>

          <ul style={{ display: "flex", justifyContent: "center", flexFlow: "wrap column" }}>{ce.map((e, index) => { return <li key={index}>{e.name + " : " + e.votes}</li> })}</ul>
        </div>

        <footer style={{ padding: "2em", display: "flex", flexFlow: "wrap row", justifyContent: "space-evenly", alignItems: "center" }}>
          <div style={{ maxWidth: "7em", maxHeight: "5em", position: "relative", minWidth: "4.5em", minHeight: "4em", cursor: "pointer" }}>
            <a href="https://www.facebook.com/Elections-2022-105192315464099">
              <Image src="/icons/facebook.webp" className='fb' alt="facebook" layout="fill" />

            </a>
          </div>
          <div style={{ cursor: "pointer", maxWidth: "5em", maxHeight: "5em", position: "relative", minWidth: "4em", minHeight: "4.5em" }} onClick={() => { router.push('mailto:lardfaladecoupe@gmail.com') }}>
            <Image src="/icons/email2.png" alt="facebook" layout="fill" className="email" /></div>
          <div style={{ display: "flex", flexFlow: "wrap row", justifyContent: "space-evenly", alignItems: "center" }}>
            <p style={{ color: "white", background: "transparent", position: "absolute", fontSize: "2em", fontWeight: "bold", transform: "scale(1.25, 2.1) ", cursor: "pointer" }} onClick={(e) => {
              popup.setPopupContent(<div><CGU /></div>);
              popup.setPopupDisplay(true);

              popup.setOffset(window.scrollY)
            }}>CGU</p>

          </div>

        </footer>



      </div >}

    </div >
  )
}

export async function checkWallet() {
  if (typeof window !== "undefined") {
    if (window.ethereum != 'undefined') {
      (async () => await window.ethereum.request({ method: 'eth_requestAccounts' }))()
    }

  }
}

export const getStaticProps = async (context) => {
  console.log("htosname ", context);
  let prop = {};

  dbConnect();

  await Article.find().then(e => prop.journaux = JSON.parse(JSON.stringify(e)));

  await Ipsauce.find().then(r => {
    prop.candidates = JSON.stringify(r);
    let candidates = r
    console.log("CANDIDATES :", candidates);
    let totalVotes = candidates.map(e => { return parseInt(e.vote) })
    console.log("TOTAL :", totalVotes)
    let min = Math.min(...totalVotes) < 0 ? Math.min(...totalVotes) * -1 : 0;
    console.log("MIN", min)

    candidates = totalVotes.map(e => { return e + min })
    totalVotes = totalVotes.map(e => { return e + min })

    console.log("CANDIDATES :", candidates)
    totalVotes = totalVotes.reduce((prev, current) => { return prev + current }, 0)
    console.log("TOTAL :", totalVotes)


    let percentPerCandidates = candidates.map(e => { return e / totalVotes });
    prop.percent = percentPerCandidates;
    console.log("PERCENT :", percentPerCandidates);


  });
  return {
    props: prop,
    revalidate: 15
  }


}
export default Home;
