
import Image from 'next/image';
import Menu from './menu.svg';
import { useAppContext } from './Context';
import Account from './Account';


const Navbar = () => {
    let popup = useAppContext();

    return (
        <nav className="navbar" >
            <Image src="/logo.png" alt="logo" width={100} height={100} />
            <Menu className="navbarMenu" style={{ width: "1.8em", height: "1.8em", fill: "white", fontSize: "2em", background: "black", float: "right" }}
                onClick={() => { popup.setOffset(window.scrollY); popup.setPopupContent(() => <div><Account /></div>); popup.setPopupDisplay(true) }} />
        </nav >)
}

export default Navbar;


