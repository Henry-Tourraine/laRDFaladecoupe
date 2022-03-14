
import Image from 'next/image';
import Menu from './menu.svg';
import { useAppContext } from './Context';
import Account from './Account';
import { useEffect, useState } from 'react';


const Navbar = () => {
    let popup = useAppContext();
    let [w, setW] = useState(0);


    function y() { setW(window.innerWidth) }
    useEffect(() => {
        window.addEventListener('resize', y);
        return () => { window.removeEventListener('resize', y); }
    }, [])

    return (
        <nav className="navbar" >
            {w > 800 ? <Image src="/logo.png" alt="logo" width={100} height={100} /> : null}
            <Menu className="navbarMenu" style={{ width: "1.8em", height: "1.8em", fill: "white", fontSize: "2em", background: "black", float: "right" }}
                onClick={() => { popup.setOffset(window.scrollY); popup.setPopupContent(() => <div><Account /></div>); popup.setPopupDisplay(true) }} />
        </nav >)
}

export default Navbar;


