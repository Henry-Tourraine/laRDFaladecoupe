
import { candidates } from "./Carousel";
import RenderArticle from "../articles/RenderArticle";
import Menu from './menu.svg';
import { useAppContext } from "./Context";
import { useRef, useEffect } from 'react';


function prettifyDate(date) {
    return new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
const Journaux = (props) => {
    let popup = useAppContext();
    console.log("BLAAA", props.journaux)

    let journaux = [];
    try {

        console.log("HELP ", typeof props.journaux);
        if (props.journaux.length > 0) {
            journaux = props.journaux;
        } else {
            journaux = []
        }
    }
    catch (e) {
        journaux = []
    }

    let target = useRef();
    let target2 = useRef();

    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9
    }

    let callback = (entries, observer) => {
        entries.forEach(entry => {
            console.log(entry.target);

            entry.target.style.transform = "translate(0, 0)";

        });
    };

    useEffect(() => {
        let observer = new IntersectionObserver(callback, options);

        if (target.current) observer.observe(target.current);
        if (target2.current) observer.observe(target2.current);
        let [a, b] = [target, target2];
        return () => {
            if (target.current) observer.unobserve(target.current);
            if (target2.current) observer.unobserve(target2.current);
        }
    }, [])

    return (<div className="journauxWrapper" >
        {console.log("journaux", journaux)}

        <div ref={target} className="slideOut">
            <div className="journauxTitre"><p style={{ fontFamily: "Seagram", transition: "all 2s " }} >L &apos; univers</p></div>
            <div className="parution" style={journaux.filter(e => !!e.news === false).length > 0 ? { alignItems: "flex-start", flexFlow: "wrap column", padding: "0.1em", overflowY: "scroll" } : { padding: "0em", flexFlow: "wrap column", justifyContent: "center", alignItems: "center", overflowY: "hidden" }}>

                {journaux.filter(e => !!e.news === false).length > 0 && Array.isArray(journaux) ? journaux.filter(e => !!e.news === false).map((r, index) => {
                    let candidate = candidates[r.candidate];
                    console.log(r.candidate);
                    let article = RenderArticle(candidate, r.positivity, r.template, props.path);
                    return <div key={index} className="articleWrapper" >

                        {article.titre}
                        <hr />
                        <Menu className="journauxMenu" style={{ width: "1.5em", height: "1.5em", background: "inherit" }} />
                        <p style={{ background: "inherit", fontSize: "0.5em", float: "right" }}>{prettifyDate(r.createdAt)}</p>
                        <div className="lire" onClick={async (e) => {
                            console.log(r.candidate, e.target.getBoundingClientRect().height)
                            let res = await fetch(props.path + "api/candidates", { method: 'PUT', headers: { "content-type": "application/json" }, body: JSON.stringify({ id: r.candidate, positivity: !!r.positivity }) })
                            console.log(JSON.stringify(res));
                            let b = window.scrollY;
                            popup.setOffset(b)
                            popup.setPopupContent(() => <div>{article.content}</div>)
                            popup.setPopupDisplay(true)
                        }}>Lire</div>
                    </div>
                }) : <p>parution à venir </p>}


            </div>
        </div>
        <div className="slideOutRight" ref={target2}>
            <div className="journauxTitre"> <p style={{ fontFamily: "Bebas" }}>Le canard laqué</p></div>
            <div className="parution" style={journaux.filter(e => !!e.news === true).length > 0 ? { alignItems: "flex-start", flexFlow: "wrap column", padding: "0.1em", overflowY: "scroll" } : { padding: "0em", flexFlow: "wrap column", justifyContent: "center", alignItems: "center", overflowY: "hidden" }}>

                {journaux.filter(e => !!e.news === true).length > 0 && Array.isArray(journaux) ? journaux.filter(e => !!e.news === true).map((r, index) => {
                    let candidate = candidates[r.candidate];
                    let article = RenderArticle(candidate, r.positivity, r.template, props.path);
                    return <div key={index} className="articleWrapper" >

                        {article.titre}
                        <hr />
                        <Menu className="journauxMenu" style={{ width: "1.5em", height: "1.5em", background: "inherit" }} />
                        <p style={{ background: "inherit", fontSize: "0.5em", float: "right" }}>{prettifyDate(r.createdAt)}</p>
                        <div className="lire" onClick={async (e) => {

                            let res = await fetch(props.path + "api/candidates", { method: 'PUT', headers: { "content-type": "application/json" }, body: JSON.stringify({ id: r.candidate, positivity: !!r.positivity }) })
                            console.log(JSON.stringify(res));
                            let b = window.scrollY;
                            popup.setOffset(b)
                            popup.setPopupContent(() => <div>{article.content}</div>)
                            popup.setPopupDisplay(true)
                        }}>Lire</div>
                    </div>
                }) : <p>parution à venir </p>}
            </div>
        </div>
        {/*DOMParser.parseFromString(<h1>HEy</h1>, "text/html")*/}
    </div>)

}



export default Journaux;