
import Image from 'next/image';
import Menu from './menu.svg';
import { useAppContext } from './Context';
import Account from './Account';
import { useEffect, useState } from 'react';
import { checkWallet } from '../pages';


const Navbar = () => {
    let popup = useAppContext();
    let [w, setW] = useState(0);
    let [pos, setPos] = useState("sticky");


    function y() { setW(window.innerWidth) }
    function x() {
        console.log("srcollHeight ", window.scrollY)
        setPos(window.scrollY > 150 ? "relative" : "sticky");
    }
    useEffect(() => {
        y(window.innerWidth);
        window.addEventListener('resize', y);
        window.addEventListener('scroll', x);

        return () => { window.removeEventListener('resize', y); window.removeEventListener('scroll', x); }
    }, [])

    return (
        <nav className="navbar" style={{ background: "rgba(255,255,255,0.1)", position: pos, top: 0, zIndex: 999999 }}>

            {w > 800 ? <Image src="/logo.png" alt="logo" width={200} height={200} className="france" /> : null}
            <button style={{ outline: "none", border: "none", padding: "0.9em", fontSize: "1.2em" }} onClick={() => {
                checkWallet();
            }}>Connecte ton wallet</button>
            <Menu className="navbarMenu" style={{
                width: "1.8em", height: "1.8em", fill: "white", fontSize: "4em", background: "transparent", float: "right"
            }}
                onClick={() => { popup.setOffset(window.scrollY); popup.setPopupContent(() => <div><Account /></div>); popup.setPopupDisplay(true) }} />

        </nav >)
}

export default Navbar;


