import Image from "next/image";
import { useState } from "react";

export default function Presentation() {
    const [ratio, setRatio] = useState(1 / 1);
    return (
        <div className="App" style={{ display: "flex", flexFlow: "wrap column", justifyContent: "center", marginBottom: "2em" }}>
            <div style={{ display: "flex", flexFlow: "wrap row", justifyContent: "space-evenly", alignItems: "center" }}>
                <div style={{ display: "flex", flexFlow: "wrap column", justifyContent: "center", alignItems: "center" }}>
                    <p className="presh2" >La République Démocratique de France à la découpe</p>

                    <p className="presh3" >Vous en prendrez bien une part</p></div>

                <Image src="/france.gif" width={400} height={400 / ratio} className="canvas" alt="france" layout="intrinsic" onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                    setRatio(naturalWidth / naturalHeight)
                } />

                { /*<Canvas className="canvas" orthographic camera={{ zoom: 200, position: [0, 0, 10] }}>
                    <Suspense fallback={<Loader />}>
                        <ambientLight intensity={.5} position={[2, 2, 2]} color={"#fff"} />
                        <directionalLight intensity={1.5} color={"#fff"} lookat={[0, 0, 0]} />

                        <OrbitControls />

                        <Model position={[0, 0, 0]} rotation={[0.5, -0.8, 0.2]} />

                   
                    </Suspense>
                </Canvas>*/}

            </div>
            <div><hr /></div>
        </div >
    );
}
