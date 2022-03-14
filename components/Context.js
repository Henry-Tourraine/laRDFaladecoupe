import { createContext, useContext, useState, useEffect, useRef } from 'react';
import Popup from './Popup';


const AppContext = createContext();

export function AppWrapper({ children }) {
    let [popupContent, setPopupContent] = useState(() => { return <div>HELLO WORLD<strong>BUDDY</strong></div> });

    let [popupDisplay, setPopupDisplay] = useState(false);
    let [offset, setOffset] = useState(0);
    let popupSet = { popupContent, setPopupContent, popupDisplay, setPopupDisplay, offset, setOffset };






    return (
        <AppContext.Provider value={popupSet}>
            {children}

            <Popup display={popupDisplay} offset={offset} {...popupContent} ></Popup>
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}