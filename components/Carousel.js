import Image from "next/image";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { useAppContext } from "./Context";
import Bribe from "./Bribe";
import Vote from './Vote';




export let candidates = [{ name: "jadot", fullname: "Yannick Jadot", src: "jadot.png", gender: 1 },
{ name: "poutou", src: "poutou.png", fullname: "Philippe Poutou", gender: 1 },
{ name: "philippot", src: "philippot.png", fullname: "Florian Philippot", gender: 1 },
{ name: "meluch", src: "meluch.png", fullname: "Jean-Luc Mélechon", gender: 1 },
{ name: "taubira", src: "taubira.png", fullname: "Christiane Taubira", gender: 0 },
{ name: "lepen", src: "lepen.png", fullname: "Marine Lepen", gender: 0 },
{ name: "asselineau", src: "asselineau.png", fullname: "François Asselineau", gender: 1 },
{ name: "hidalgo", src: "hidalgo.png", fullname: "Anne Hidalgo", gender: 0 },
{ name: "pecresse", src: "pecresse.png", fullname: "Valérie Pécresse", gender: 0 },
{ name: "macron", src: "macron.png", fullname: "Emmanuel Macron", gender: 1 },
{ name: "zemmour", src: "zemmour.png", fullname: "Eric Zemmour", gender: 1 },
{ name: "blanc", src: "blanc.png", fullname: "Juste Leblanc", gender: 1 }
]


const Carousel = ({ sondage, percent }) => {
    let popup = useAppContext();
    let [rotated, setRotated] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);

    let images = [{ name: "jadot", src: "jadot.png" },
    { name: "philippot", src: "philippot.png" },
    { name: "poutou", src: "poutou.png" },
    { name: "meluch", src: "meluch.png" },
    { name: "taubira", src: "taubira.png" },
    { name: "lepen", src: "lepen.png" },
    { name: "asselineau", src: "asselineau.png" },
    { name: "hidalgo", src: "hidalgo.png" },
    { name: "pecresse", src: "pecresse.png" },
    { name: "macron", src: "macron.png" },
    { name: "zemmour", src: "zemmour.png" },
    { name: "blanc", src: "blanc.png" }

    ]
    let style = {
        image: {
            maxWidth: "4em",
            maxHeight: "4em",
            objectFit: "cover",
            margin: "200px"
        },
        imageWrapper: {
            display: "flex",
            flexFlow: "wrap row",
            justifyContent: "space-evenly",
            position: "relative"

        },
        back: {
            display: "flex",
            flexFlow: "wrap row",
            justifyContent: "center",
            alignItems: "center"
        },
        button: {
            fontSize: "1.05em",
            padding: "0.5em"
        }

    }
    const router = useRouter();

    function vote(e, index) {
        popup.setOffset(window.scrollY)
        popup.setPopupContent(() => <div><Vote ind={index} /></div>)
        popup.setPopupDisplay(true);
    }
    function support(index) {
        popup.setOffset(window.scrollY)
        popup.setPopupContent(() => <div><Bribe /></div>)
        popup.setPopupDisplay(true);
    }
    return (
        <div>
            <p style={{ fontSize: "2em" }}>Votez pour vos candidats favoris !</p>
            <div style={style.imageWrapper}>
                {

                    images.map((im, index) => <div className={rotated[index] ? "rotatedY carouselImage" : "nonRotated carouselImage"} key={index} onMouseEnter={() => {
                        if (popup.popupDisplay === false) {
                            setRotated(rotated.map((e, inde) => {
                                if (index !== inde) {
                                    return false
                                } else { return true }
                            }))
                        }
                    }} onMouseLeave={(e) => { console.log("before", rotated); setRotated(r => [...r.map(e => { return false })]); console.log("hello") }} ><div style={{ background: "white" }} className="imageFace"><Image src={router.pathname + "img/" + im.src} objectFit="contain" width={300} height="200"

                    />
                            <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                                {Math.floor(percent[index] * 10000) / 100}%</div>
                        </div>
                        <div className="imageBack" >
                            <button style={style.button} onClick={(e) => { vote(e, index) }}>Soutiens-moi !</button>
                            <button style={style.button} onClick={() => support(index)}>Aide-moi d&apos;une autre manière</button>
                        </div></div>)}
            </div>

        </div >
    )



}


export default Carousel;