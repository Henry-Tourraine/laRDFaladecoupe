
import icons from '../styles/icons.module.css';
import { useAppContext } from "./Context";
import voteStyle from '../styles/vote.module.css';
import { useEffect, useRef } from 'react/cjs/react.production.min';


const Popup = ({ props, display, offset }) => {
    let popup = useAppContext();
    console.log(display)


    let style = { display: display ? "block" : "none", position: "absolute", transform: "translate(-50%, -50%)", top: "calc(50% + " + offset + "px)", left: "50%", fontSize: "1.5em", background: "white", padding: "1em", color: "black", borderRadius: "2vw" }
    return (<div style={style} className="popup sing" >
        <div className={icons.close} onClick={() => {
            popup.setPopupContent(<div></div>)
            popup.setPopupDisplay(false);
            popup.setOffset(0)
        }}></div>
        {props.children}

    </div>)
}

export default Popup;