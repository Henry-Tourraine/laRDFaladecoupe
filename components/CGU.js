import { useRouter } from "next/router";

const CGU = () => {
    let router = useRouter();
    return (<div style={{ fontSize: "2em", padding: "2em", color: "#555", overflowY: "scroll", maxHeight: "80vh" }}>
        <p style={{ textAlign: "center", marginBottom: 0, fontSize: "1.2em" }}>Conditions Générales d’Utilisation</p>
        <p style={{ textAlign: "center", fontSize: "0.5em", margin: "0" }}>En vigueur au 15/04/2022</p>

        <p>Ce document a pour but de définir le cadre dans lequel “l’Utilisateur” pourra se servir du site la-republique-democratique-de-france-a-la-decoupe.fr désigné par &quot;le site&quot;.
            Toute réclamation pourra être faite à l’adresse suivante: <a style={{ cursor: "pointer" }} onClick={() => { router.push("mailto:lardfaladecoupe@gmail.com") }}> lardfaladecoupe@gmail.com.</a></p>

        <p style={{ fontWeight: "bold", textDecoration: "underline" }}> Article 1: Accès au site</p>

        Le site propose une expérience satirique d’élections présidentielles à un public majeur.
        Pour y accéder l’Utilisateur a besoin d’une connexion internet et d’un crypto portefeuille (Metamask ou Phantom).

        <p style={{ fontWeight: "bold", textDecoration: "underline" }}>Article 2: Collecte de données</p>
        Le site ne collecte aucune donnée à caractère personnel et toutes données étant associées à l’Utilisateur le sont par le biais de l&apos;adresse de son portefeuille.
        Les données suivantes sont stockées dans une base de données:
        <br />-les &quot;articles&quot; édités par l’Utilisateur
        <br />-les intentions de votes pour chaque candidat

        Les données suivantes sont stockées dans la blockchain Polygon:
        <br />-Les votes effectués par l’Utilisateur
        <br />-Les &quot;corruptions d’assesseurs&quot; effectuées par l’Utilisateur
        <br />-Le “soudoiement des éditions de journaux” effectué par l’Utilisateur

        <p style={{ fontWeight: "bold", textDecoration: "underline" }}>Article 3: Propriété intellectuelle</p>
        Toute personne peut reprendre à son compte les visuels et le contrat intelligent utilisé par le site à condition qu’il ne le fasse pas de manière malicieuse dans le but de nuire au bon fonctionnement du site ou dans le but d’usurper l’identité du site.

        <p style={{ fontWeight: "bold", textDecoration: "underline" }}>Article 4: Responsabilité</p>
        L’éditeur du site s’engage à mener les élections jusqu’au bout et à rembourser l’Utilisateur le cas échéant. Il ne pourra pas être tenu responsable de pertes financières ou d’un dysfonctionnement du site  entraînés par le comportement malveillant d’une tierce personne.
        L&apos;Utilisateur ne pourra être remboursé que dans le cas  où il aurait voté pour le candidat élu et que pour une quelconque raison il ne puisse pas retirer ses &quot;tokens&quot;. Il ne le serait alors que du montant qu&apos;il aura gagné.

        <p style={{ fontWeight: "bold", textDecoration: "underline" }}>Article 5: Cookies</p>
        Le site n’utilise pas de cookies.

        <p style={{ fontWeight: "bold", textDecoration: "underline" }}>Article 6: But</p>
        Le site a un but satirique et ne saurait avoir de conséquence sur de réelles élections.
        Le personnel politique présenté sur le site ne reprend que d’apparence et de nom les candidats aux  élections présidentielles 2022 en France déclarés ou putatifs.
        Les articles de journaux sont générés automatiquement par le site et ne pourraient décrire la personnalité des candidats qu’ils visent que de manière purement fortuite.




    </div>)
}

export default CGU;