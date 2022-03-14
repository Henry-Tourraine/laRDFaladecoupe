import Image from "next/image";
import { useState } from "react";

export default function Presentation() {
    const [ratio, setRatio] = useState(1 / 1);
    return (
        <div className="App" style={{ display: "flex", flexFlow: "wrap column", justifyContent: "center", marginBottom: "2em" }}>
            <div style={{ display: "flex", flexFlow: "wrap row", justifyContent: "space-evenly", alignItems: "center" }}>
                <div style={{ display: "flex", flexFlow: "wrap column", justifyContent: "center", alignItems: "center" }}>
                    <p className="presh2" style={{ textAlign: "center" }}>La République Démocratique de France à la découpe</p>

                    <p className="presh3" >Vous en prendrez bien une part</p></div>

                <Image src="/france.gif" width={400} height={400 / ratio} className="canvas" alt="france" layout="intrinsic" onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                    setRatio(naturalWidth / naturalHeight)
                } />



            </div>
            <div><hr /></div>
        </div >
    );
}
