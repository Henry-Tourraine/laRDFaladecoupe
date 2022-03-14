import Router from "next/router";
import { useEffect } from "react";

const Slug = () => {
    useEffect(() => {
        setTimeout(() => { Router.push("/") })
    })
    return (<div style={{ display: "flex", flexFlow: "wrap row", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>Vous vous êtes perdus</div>)
}
export default Slug;