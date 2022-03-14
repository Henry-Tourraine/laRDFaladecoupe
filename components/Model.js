
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/model/gb.glb");
    console.log("NODE0", Object.keys(nodes))
    return (
        <group ref={group} {...props} dispose={null} scale={0.4}>
            <mesh

                geometry={nodes.Ch03.geometry}

            />

        </group>
    );
}

useGLTF.preload("/model/gb.glb");
