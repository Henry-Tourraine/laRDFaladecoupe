

const RenderArticle = (candidate, positivity, template_nb, path_) => {

    let template;
    if (!!positivity === false) {
        template = [
            {
                titre: <strong className="articleTitle">{candidate.fullname} est antisémite</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} est antisémite</h1><p>Suite aux provocations d'un passant, {candidate.fullname} est sorti{candidate.gender === 0 ? "e" : null} de {candidate.gender === 0 ? "elle" : "lui"}-même et a proféré des insultes à caractère racial.</p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} a agressé sexuellement ...</strong>,
                content: <div className="articleContent"><h1>Ce lundi, {candidate.fullname} a agressé sexuellement un lampadaire rue Philidor.</h1><p>Il semblerait que {candidate.gender === 1 ? "le candidat" : "la candidate"} avait, selon notre source, 12.4 g/l d'alcool dans le sang ! Ça joue le podium avec notre Gérard Depardieu national ! </p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} a fait un salut nazi !</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} aurait fait un salut nazi lors de son dernier meeting</h1><p> Ce mardi, {candidate.name.substring(0, 1).toUpperCase() + candidate.name.substring(1)} a chaleureusement salué son public en fin de meeting et s'oubliant un peu, a raidi son bras. Un geste qu'aucune caméra n'a manqué !  </p></div>
            },
            {
                titre: <strong className="articleTitle">La déclaration de patrimoine {["A", "E", "O"].includes(candidate.fullname.substring(0, 1)) ? "d'" : "de"} &nbsp;{candidate.fullname}</strong>,
                content: <div className="articleContent"><h1>{candidate} a oublié de déclarer près de la moitié de ses biens</h1><p>{candidate.gender === 1 ? "le candidat" : "la candidate"} qui a fait des tribunaux une seconde demeure se voit à nouveau pris dans un scandale.</p><p> Selon {candidate.gender === 1 ? "lui" : "elle"}, la faute reposerait sur son chat qui aurait (au conditionnel) une phobie administratif récente et aurait par conséquent baclé la déclaration. </p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} a fait partie des jeunesses FN !</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} qui est aujourd'hui {candidate.gender === 1 ? "un démocrate assumé" : "une démocrate assumée"} a, il n'y a pas si longtemps été {candidate.gender === 1 ? "inscrit" : "inscrite"} au FN</h1><p>Un coup dont la République et les droits de l'homme ne se remettront jamais !</p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} est raciste !</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} est tout simplement raciste</h1><p> {candidate.gender === 1 ? "Il" : "Elle"} a renvoyé un des journalistes avec lesquelles {candidate.gender === 1 ? "il" : "elle"} avait un entretien, à ses origines kirghizistanaises lorsque celui-ci lui demandait d'expliciter son programme électoral. Une honte, {candidate.gender === 1 ? "monsieur" : "madame"}, une honte !</p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} est {candidate.gender === 1 ? "laid" : "laide"} !</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} est {candidate.gender === 1 ? "laid" : "laide"} et ce n'est  pas une attaque basse que de le dire !</h1><p>Vendredi, Le célèbre chercheur Pierre Michard a tenu un colloque au cours duquel il a expliqué pourquoi il faut considérer scientifiquement {candidate.fullname} comme un affreux cageot</p><p>et pourquoi le drapeau français ne se remmetrait pas d'apparaître sur la même photo que sa trogne !</p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} est {candidate.gender === 1 ? "l'ami" : "l'amie"} du pédophile Jeffrez Epstein !</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} est {candidate.gender === 1 ? "l'ami" : "l'amie"} du pédophile Jeffrez Epstein !</h1><p> En effet, des photos ont leaké montrant {candidate.fullname} 5 mètres derrière Jeffrey Epstein lors d'une réception. La France n'en a pas fini avec ses scandales sexuels ! </p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} a magouillé ses comptes de campagnes!</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} a magouillé ses comptes de campagnes selon la dernière enquête de MediaPortes</h1><p>Il s'agirait de plus de 200 000 000€ qui auraient été distribués sans être déclarés, dépassant 191 000 000€ le montant réglementaire. Où va le monde ? Bientôt les dealers abandonneront leur activité car la politique est plus lucrative !  </p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} s'habille mal !</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} s'habille mal !</h1><p>Comme vous avez pu le voir lors de ses dernières apparitions télévisuelles, {candidate.fullname} portes des vêtements... et c'est déjà généreux de sa part d'avoir la délicatesse de cacher sa silhouette disgracieuse à nos yeux chastes !</p></div>
            },
        ]
        return template[template_nb];
    } else if (!!positivity === true) {
        template = [

            {
                titre: <strong className="articleTitle">{candidate.fullname} est {candidate.gender === 1 ? "merveilleux" : "merveilleuse"}</strong>,
                content: <div className="articleContent"><h1>  {candidate.fullname} est {candidate.gender === 1 ? "merveilleux" : "merveilleuse"}</h1><p>Chaque jour que nous passons en ta présence nous illumine, ô {candidate.fullname.split(' ')[1]} !</p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} va faire surgir la France !</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} va faire surgir la France !</h1><p>Nul doute que {candidate.fullname} est {candidate.gender === 1 ? "le candidat" : "la candidate"} qui empêchera la France de sombrer dans la décadence !</p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} est {candidate.gender === 1 ? "le plus sexy qui soit" : "la plus sexy qui soit"}</strong>,
                content: <div className="articleContent"><h1>  {candidate.fullname} est {candidate.gender === 1 ? "le plu sexy qui soit" : "la plus sexy qui soit"}</h1><p> Selon un sondage Ipsauce, 6 Français sur 4 ont déjà eu orgasme à la simple entente de son nom !</p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} est supérieurement {candidate.gender === 1 ? "intelligent" : "intelligente"}</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} est supérieurement {candidate.gender === 1 ? "intelligent" : "intelligente"}</h1><p> Il semblerait qu'on lui doive le nouveau protocole de stabilisation de la fusion nucléaire français en plus du dernier trenchcoat tendance que tous les hommes s'arrachent ! Votez {candidate.fullname} </p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} est {candidate.gender === 1 ? "le plus haut" : "la plus haute"} dans les sondages</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} est {candidate.gender === 1 ? "le plus haut" : "la plus haute"} dans les sondages</h1><p> En effet, {candidate.fullname} vient de dépasser tous les autres candidats dans un récent sondage Ipsauce ! </p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} est le mozart de la finance !</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} est le mozart de la finance !</h1><p>Avant d'être {candidate.gender === 1 ? "candidat" : "candidate"} à l'élection présidentielle, {candidate.fullname} a travaillé chez la banque Rotschild où aucun client ne lui résistait !</p></div>
            },
            {
                titre: <strong className="articleTitle">{candidate.fullname} est d'une générosité sans commune mesure</strong>,
                content: <div className="articleContent"><h1>{candidate.fullname} est d'une générosité sans commune mesure</h1><p> {candidate.gender === 1 ? "Il" : "Elle"} vient de faire un don de 100 000€ à l'hôpital St André où {candidate.gender === 1 ? "il" : "elle"} a pu faire de magnifiques photos avec des enfants myopathes !</p></div>
            }

        ]
        return template[template_nb];
    }
}

export default RenderArticle;