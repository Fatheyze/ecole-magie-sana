// Banques v4 : contenu aligné sur les rubriques du programme CM1 (questions écrites pour cette appli)

// [phrase, type]
export const PHRASES = [
  ["Le hibou dort dans la tour.", "déclarative"], ["Les élèves rangent leurs livres.", "déclarative"], ["Nous mangeons à la cantine.", "déclarative"],
  ["Où as-tu mis ma baguette ?", "interrogative"], ["Est-ce que tu viens jouer ?", "interrogative"], ["Quand partons-nous ?", "interrogative"],
  ["Comme ce gâteau est bon !", "exclamative"], ["Quelle belle surprise !", "exclamative"], ["Que ce château est grand !", "exclamative"],
  ["Range ta chambre.", "impérative"], ["Écoute bien la leçon.", "impérative"], ["Ferme la porte, s'il te plaît.", "impérative"],
];

// [phrase affirmative, forme négative correcte, [deux erreurs]]
export const NEGATIONS = [
  ["Sana aime les épinards.", "Sana n'aime pas les épinards.", ["Sana aime pas les épinards.", "Sana n'aime les épinards pas."]],
  ["Le chat dort.", "Le chat ne dort pas.", ["Le chat dort pas.", "Le chat ne pas dort."]],
  ["Nous avons un dragon.", "Nous n'avons pas de dragon.", ["Nous n'avons pas un dragon.", "Nous avons pas de dragon."]],
  ["Il pleut souvent.", "Il ne pleut jamais.", ["Il pleut jamais.", "Il ne jamais pleut."]],
  ["Elle voit quelqu'un.", "Elle ne voit personne.", ["Elle voit ne personne.", "Elle ne voit quelqu'un."]],
  ["Tu manges encore.", "Tu ne manges plus.", ["Tu manges ne plus.", "Tu ne plus manges."]],
  ["Ils entendent un bruit.", "Ils n'entendent aucun bruit.", ["Ils entendent aucun bruit.", "Ils n'entendent bruit aucun."]],
  ["Je comprends tout.", "Je ne comprends rien.", ["Je comprends rien.", "Je ne rien comprends."]],
  ["Vous ouvrez la porte.", "Vous n'ouvrez pas la porte.", ["Vous ouvrez n'pas la porte.", "Vous ne ouvrez pas la porte."]],
];

// [phrase à trou, bonne réponse, [mauvaises réponses]]
export const DETERMINANTS = [
  ["___ hibou apporte le courrier.", "Le", ["La", "Les"]],
  ["___ élèves écoutent la maîtresse.", "Les", ["Le", "La"]],
  ["Elle porte ___ robe verte.", "une", ["un", "des"]],
  ["J'ai mangé ___ pomme.", "une", ["un", "des"]],
  ["Voici ___ amie Lola.", "mon", ["ma", "mes"]],
  ["___ livre est passionnant.", "Ce", ["Cette", "Ces"]],
  ["___ maison est très grande.", "Cette", ["Ce", "Ces"]],
  ["Les enfants rangent ___ cartables.", "leurs", ["leur", "lui"]],
  ["Nous avons ___ sorcier dans la classe.", "un", ["une", "des"]],
  ["Tu as perdu ___ clés ?", "tes", ["ta", "ton"]],
  ["Sana et Léa ont rangé ___ chambre.", "leur", ["leurs", "lui"]],
  ["___ étoiles brillent dans la nuit.", "Les", ["Le", "La"]],
];

// [phrase à trou, bon pronom, [mauvais pronoms]]
export const PRONOMS = [
  ["Hermine est en retard. ___ court vite.", "Elle", ["Il", "Ils"]],
  ["Mes frères jouent dehors. ___ rient fort.", "Ils", ["Il", "Elle"]],
  ["Sana et moi lisons. ___ aimons les histoires.", "Nous", ["Vous", "Elles"]],
  ["Le chien dort. ___ rêve de croquettes.", "Il", ["Elle", "Ils"]],
  ["Ma sœur et ma mère rentrent. ___ sont fatiguées.", "Elles", ["Ils", "Elle"]],
  ["Toi et ton frère, ___ êtes en avance.", "vous", ["nous", "ils"]],
  ["Tu as vu Léo ? Je ___ai croisé hier.", "l'", ["lui", "leur"]],
  ["Les élèves arrivent. Le professeur ___ accueille.", "les", ["leur", "lui"]],
  ["Mon voisin est gentil. Je ___ parle souvent.", "lui", ["le", "les"]],
  ["J'adore ces bonbons. J'___ achète toujours.", "en", ["y", "le"]],
];

// [phrase à trou, bonne forme, [mauvaises formes]]
export const ACCORDS_GN = [
  ["Une ___ histoire me plaît.", "belle", ["beau", "belles"]],
  ["Des fleurs ___ poussent dans le jardin.", "rouges", ["rouge", "rougent"]],
  ["Un ___ chat dort sur le canapé.", "gros", ["grosse", "grosses"]],
  ["Les garçons sont ___.", "contents", ["content", "contente"]],
  ["Mes sœurs sont ___.", "gentilles", ["gentil", "gentille"]],
  ["Ces bonbons ___ sont délicieux.", "colorés", ["coloré", "colorée"]],
  ["Les ___ filles rient.", "petites", ["petit", "petite"]],
  ["Une robe ___ sèche au soleil.", "bleue", ["bleu", "bleus"]],
  ["Des livres ___ sont sur l'étagère.", "anciens", ["ancien", "ancienne"]],
  ["La ___ sorcière vole sur son balai.", "vieille", ["vieux", "vieilles"]],
];

// sujets éloignés du verbe
export const ACCORDS_VERBE = [
  ["Les enfants de ma classe ___ au ballon.", "jouent", ["joue", "jouons"]],
  ["Le chat de mes voisins ___ sur le toit.", "dort", ["dorment", "dors"]],
  ["Mes amis, qui habitent loin, ___ souvent me voir.", "viennent", ["vient", "venons"]],
  ["La clé des placards ___ perdue.", "est", ["sont", "es"]],
  ["Les livres que tu m'as prêtés ___ passionnants.", "sont", ["est", "es"]],
  ["Les élèves du fond de la classe ___ très attentifs.", "sont", ["est", "êtes"]],
  ["Le chien des voisins ___ chaque nuit.", "aboie", ["aboient", "aboies"]],
  ["Les fleurs du jardin de ma grand-mère ___ belles.", "sont", ["est", "sommes"]],
];

// participe passé avec être
export const PP_ETRE = [
  ["Les filles sont ___ au cinéma.", "allées", ["allé", "allée"]],
  ["Hermine est ___ à la bibliothèque.", "arrivée", ["arrivé", "arrivées"]],
  ["Mes frères sont ___ tôt ce matin.", "partis", ["parti", "partie"]],
  ["Elle est ___ de la chaise.", "tombée", ["tombé", "tombées"]],
  ["Les élèves sont ___ en classe.", "entrés", ["entré", "entrée"]],
  ["Mon père est ___ à la maison à midi.", "rentré", ["rentrée", "rentrés"]],
  ["Les sorcières sont ___ sur leurs balais.", "montées", ["monté", "montée"]],
];

// [question, bonne réponse, [mauvaises]]
export const FAMILLES = [
  ["Quel mot est de la famille de « dent » ?", "dentiste", ["danse", "dans", "lent"]],
  ["Quel mot est de la famille de « terre » ?", "terrain", ["tarte", "tirer", "tigre"]],
  ["Quel mot est de la famille de « lait » ?", "laitier", ["laid", "lac", "lent"]],
  ["Quel mot est de la famille de « jardin » ?", "jardinier", ["jargon", "jarret", "jaune"]],
  ["Quel mot est de la famille de « mer » ?", "marin", ["mère", "maire", "mur"]],
  ["Quel mot est de la famille de « fleur » ?", "fleuriste", ["fleuve", "flèche", "flamme"]],
  ["Quel mot est de la famille de « montagne » ?", "montagnard", ["montre", "monnaie", "moment"]],
  ["Quel mot est de la famille de « chant » ?", "chanteur", ["champ", "chance", "chat"]],
  ["Quel mot est de la famille de « peur » ?", "peureux", ["pleur", "pire", "pour"]],
  ["Quel mot est de la famille de « dessin » ?", "dessiner", ["dessous", "dessert", "desseins"]],
];

// mots invariables : [bonne orthographe, [erreurs]]
export const INVARIABLES = [
  ["toujours", ["toujour", "toujourd"]], ["souvent", ["souvant", "suvent"]], ["beaucoup", ["beaucou", "bocoup"]],
  ["pendant", ["pandant", "pendent"]], ["cependant", ["cepandant", "sependant"]], ["autour", ["autor", "auttour"]],
  ["jamais", ["jamai", "jammais"]], ["parfois", ["parfoi", "parfoit"]], ["alors", ["alor", "allors"]],
  ["depuis", ["depui", "dépuis"]], ["pourtant", ["pourtan", "poutant"]], ["aujourd'hui", ["aujourdhui", "aujourd'huit"]],
  ["beaucoup", ["beaucoups", "beaucou"]], ["maintenant", ["maintenent", "maintenan"]],
];

// verbes en -cer, -ger, -yer : [pronom, infinitif, réponse, indice]
export const CERGER = [
  ["nous", "manger", "mangeons", "Devant « o », le g prend un e pour garder le son [j]."],
  ["nous", "nager", "nageons", "Devant « o », le g prend un e pour garder le son [j]."],
  ["nous", "voyager", "voyageons", "Devant « o », le g prend un e pour garder le son [j]."],
  ["nous", "commencer", "commençons", "Devant « o », le c prend une cédille : ç."],
  ["nous", "lancer", "lançons", "Devant « o », le c prend une cédille : ç."],
  ["nous", "placer", "plaçons", "Devant « o », le c prend une cédille : ç."],
  ["je", "nettoyer", "nettoie", "Devant un e muet, le y devient i."],
  ["tu", "envoyer", "envoies", "Devant un e muet, le y devient i."],
  ["ils", "essuyer", "essuient", "Devant un e muet, le y devient i."],
  ["nous", "nettoyer", "nettoyons", "Devant « ons », on garde le y."],
  ["il", "employer", "emploie", "Devant un e muet, le y devient i."],
  ["ils", "envoyer", "envoient", "Devant un e muet, le y devient i."],
];

// verbes en -eler, -eter : [pronom, infinitif, réponse, indice]
export const ELETER = [
  ["elle", "appeler", "appelle", "Devant un e muet, on double le l (appelle)."],
  ["nous", "appeler", "appelons", "Devant « ons », pas de changement : on garde un seul l."],
  ["il", "jeter", "jette", "Devant un e muet, on double le t (jette)."],
  ["nous", "jeter", "jetons", "Devant « ons », pas de changement : on garde un seul t."],
  ["tu", "acheter", "achètes", "Acheter : devant un e muet, e devient è."],
  ["il", "acheter", "achète", "Acheter : devant un e muet, e devient è."],
  ["nous", "acheter", "achetons", "Devant « ons », pas de changement."],
  ["ils", "jeter", "jettent", "Devant un e muet, on double le t (jettent)."],
  ["elle", "geler", "gèle", "Geler : devant un e muet, e devient è."],
  ["ils", "appeler", "appellent", "Devant un e muet, on double le l (appellent)."],
  ["je", "peler", "pèle", "Peler : devant un e muet, e devient è."],
  ["tu", "épeler", "épelles", "Devant un e muet, on double le l."],
];

// COI : [phrase, sujet, verbe, COI]
export const COIS = [
  ["Sana parle à sa mère.", "Sana", "parle", "à sa mère"],
  ["Le professeur répond aux élèves.", "Le professeur", "répond", "aux élèves"],
  ["Mon frère téléphone à son ami.", "Mon frère", "téléphone", "à son ami"],
  ["Tu penses à tes vacances.", "Tu", "penses", "à tes vacances"],
  ["Nous obéissons à la directrice.", "Nous", "obéissons", "à la directrice"],
  ["Ils jouent aux cartes.", "Ils", "jouent", "aux cartes"],
  ["Elle sourit à son voisin.", "Elle", "sourit", "à son voisin"],
  ["Je ressemble à mon père.", "Je", "ressemble", "à mon père"],
  ["Léa se souvient de son voyage.", "Léa", "se souvient", "de son voyage"],
  ["Les enfants s'occupent du chien.", "Les enfants", "s'occupent", "du chien"],
];

// choix du temps pour raconter
export const TEMPS_RACONTER = [
  ["Ce soir-là, le ciel ___ plein d'étoiles.", "était", ["sera", "a brillé"]],
  ["Soudain, un hibou ___ par la fenêtre.", "est entré", ["entrait", "entrera"]],
  ["Il faisait nuit quand un bruit ___ dans le couloir.", "a résonné", ["résonnait", "résonnera"]],
  ["Hier, ___ mes devoirs avant le dîner.", "j'ai fini", ["je finissais", "je finirai"]],
  ["Quand j'étais petite, ___ souvent chez ma grand-mère.", "j'allais", ["je suis allée", "j'irai"]],
  ["Le château ___ calme, personne ne parlait.", "était", ["sera", "est devenu"]],
  ["Tout à coup, la porte ___.", "s'est ouverte", ["s'ouvrait", "s'ouvrira"]],
  ["Demain, nous ___ au parc.", "irons", ["allions", "sommes allés"]],
];

// lecture : [texte, question, bonne réponse, [mauvaises]]
export const LECTURES = [
  ["Tous les matins, Lina nourrit les hiboux de l'école avant d'aller en classe. Aujourd'hui, elle est arrivée en retard : l'un des oiseaux s'était échappé et elle l'a cherché dans tout le parc.",
    "Pourquoi Lina est-elle arrivée en retard ?", "Elle a cherché un hibou échappé.", ["Elle a oublié de nourrir les hiboux.", "Elle s'est perdue dans le château."]],
  ["Le ciel était noir. Au loin, un grondement a retenti, puis les premières gouttes ont frappé les vitres. Max a fermé les volets et allumé une bougie.",
    "Quel temps fait-il ?", "Il y a un orage.", ["Il neige.", "Il y a du soleil."]],
  ["Nina a mis son manteau, son écharpe et ses gants avant de sortir. Elle soufflait dans ses mains pour les réchauffer.",
    "Quelle saison est-ce probablement ?", "L'hiver", ["L'été", "Le printemps"]],
  ["Tom tenait fièrement sa coupe. Ses amis l'applaudissaient et criaient son nom.",
    "Comment se sent Tom ?", "Fier et content", ["Triste", "Effrayé"]],
  ["D'abord, Zoé a mélangé la farine et les œufs. Ensuite, elle a versé la pâte dans un moule. Enfin, elle a enfourné le gâteau.",
    "Que fait Zoé juste après avoir mélangé la farine et les œufs ?", "Elle verse la pâte dans un moule.", ["Elle enfourne le gâteau.", "Elle mange le gâteau."]],
  ["Bibliothèque du château. Ouverte du lundi au vendredi, de 9 h à 17 h. Fermée le week-end. Emprunt : 3 livres maximum pour 2 semaines.",
    "Combien de livres peut-on emprunter au maximum ?", "3", ["2", "5"]],
  ["Bibliothèque du château. Ouverte du lundi au vendredi, de 9 h à 17 h. Fermée le week-end. Emprunt : 3 livres maximum pour 2 semaines.",
    "Peut-on y aller le dimanche ?", "Non, elle est fermée le week-end.", ["Oui, de 9 h à 17 h.", "Oui, mais seulement le matin."]],
  ["Le petit dragon avait perdu sa maman dans la forêt. Il a marché longtemps, a demandé de l'aide à un hibou, puis il a retrouvé sa maman près de la rivière.",
    "Quel est le meilleur résumé ?", "Un petit dragon perdu retrouve sa maman grâce à un hibou.", ["Un dragon se promène dans la forêt.", "Un hibou vit près de la rivière."]],
  ["« La lune est une lanterne dans la nuit. »",
    "Que veut dire le poète ?", "La lune éclaire comme une lanterne.", ["La lune est un objet en métal.", "Le poète a perdu sa lanterne."]],
  ["Léo trouve un portefeuille dans la rue. Il court le rendre à la dame qui l'a perdu, même si personne ne l'a vu.",
    "Que montre ce choix de Léo ?", "Il est honnête.", ["Il est timide.", "Il est pressé."]],
  ["Dans la forêt, une fée minuscule vivait dans un chêne. Chaque soir, elle allumait une luciole pour éclairer sa maison.",
    "Quel élément est merveilleux (impossible dans la vraie vie) ?", "Une fée vit dans un chêne.", ["Il y a une forêt.", "Il y a un chêne."]],
  ["Rita a rangé sa chambre, fait son sac et mis son réveil à 7 h. Demain, c'est la rentrée.",
    "Pourquoi Rita se prépare-t-elle ?", "Parce que c'est la rentrée demain.", ["Parce qu'elle part en voyage.", "Parce que c'est son anniversaire."]],
];

// synonymes / contraires : [mot, bonne réponse, [mauvaises]]
export const SYNONYMES = [
  ["gentil", "aimable", ["méchant", "bruyant"]], ["énorme", "gigantesque", ["minuscule", "léger"]], ["peur", "frayeur", ["joie", "colère"]],
  ["fatigué", "épuisé", ["reposé", "joyeux"]], ["bizarre", "étrange", ["normal", "joli"]], ["content", "heureux", ["triste", "fâché"]],
  ["rapide", "véloce", ["lent", "fatigué"]], ["maison", "demeure", ["jardin", "toit"]],
];
export const CONTRAIRES = [
  ["grand", "petit", ["haut", "gros"]], ["chaud", "froid", ["tiède", "brûlant"]], ["joyeux", "triste", ["gai", "content"]],
  ["ouvrir", "fermer", ["casser", "tirer"]], ["courageux", "peureux", ["fort", "gentil"]], ["lourd", "léger", ["gros", "épais"]],
  ["avant", "après", ["pendant", "hier"]], ["rapide", "lent", ["vite", "fort"]], ["monter", "descendre", ["sauter", "grimper"]],
];

// géométrie, solides
export const GEOM = [
  ["Quel quadrilatère a 4 côtés égaux et 4 angles droits ?", "Le carré", ["Le rectangle", "Le losange"]],
  ["Un rectangle a…", "4 angles droits", ["4 côtés égaux", "3 côtés"]],
  ["Un triangle qui a deux côtés de même longueur est…", "isocèle", ["équilatéral", "rectangle"]],
  ["Un triangle qui a trois côtés de même longueur est…", "équilatéral", ["isocèle", "rectangle"]],
  ["Un triangle qui a un angle droit est…", "rectangle", ["isocèle", "équilatéral"]],
  ["Combien de côtés a un pentagone ?", "5", ["6", "4"]],
  ["Combien de côtés a un hexagone ?", "6", ["5", "8"]],
  ["Combien de côtés a un octogone ?", "8", ["6", "10"]],
  ["Un losange a…", "4 côtés égaux", ["4 angles droits", "3 côtés"]],
  ["Combien de sommets a un triangle ?", "3", ["4", "2"]],
  ["Combien de faces a un cube ?", "6", ["8", "12"]],
  ["Combien d'arêtes a un cube ?", "12", ["6", "8"]],
  ["Combien de sommets a un cube ?", "8", ["6", "12"]],
  ["Combien de faces a un pavé droit (une boîte à chaussures) ?", "6", ["4", "8"]],
  ["À quoi sert un patron ?", "À fabriquer un solide en pliant", ["À mesurer un angle", "À tracer un cercle"]],
  ["Une pyramide à base carrée a combien de faces ?", "5", ["4", "6"]],
  ["Une boule est…", "un solide sans face plane", ["un solide à 6 faces", "un polygone"]],
];

export const SCIENCES3 = [
  ["Avec quel instrument mesure-t-on une masse ?", "Une balance", ["Un thermomètre", "Une règle"]],
  ["1 kg = ?", "1 000 g", ["100 g", "10 000 g"]],
  ["Quand on mélange du sable et de l'eau, on obtient…", "un mélange hétérogène", ["un mélange homogène", "un corps pur"]],
  ["Comment séparer du sable mélangé à de l'eau ?", "En filtrant", ["En le congelant", "En le pesant"]],
  ["Quand le sucre disparaît dans l'eau, on dit qu'il…", "se dissout", ["fond", "s'évapore"]],
  ["Quand l'eau ne peut plus dissoudre de sel, elle est…", "saturée", ["gelée", "bouillante"]],
  ["Comment retrouver le sel d'une eau salée ?", "En faisant évaporer l'eau", ["En filtrant l'eau", "En ajoutant du sucre"]],
  ["Pour calculer une vitesse, il faut connaître…", "une distance et une durée", ["une masse et un volume", "une couleur et une forme"]],
  ["Quand un objet bloque la lumière, il se forme…", "une ombre", ["un reflet", "un arc-en-ciel"]],
  ["L'ombre d'un objet est la plus longue quand…", "le Soleil est bas dans le ciel", ["le Soleil est au plus haut", "il fait nuit noire"]],
  ["La Lune produit-elle sa propre lumière ?", "Non, elle reflète celle du Soleil", ["Oui, comme une étoile", "Oui, seulement la nuit"]],
  ["Combien de temps dure environ un cycle des phases de la Lune ?", "Environ 29 jours", ["Environ 1 jour", "Environ 1 an"]],
  ["Quand on ne voit pas du tout la Lune, c'est la…", "nouvelle Lune", ["pleine Lune", "Lune gibbeuse"]],
  ["Quel instrument mesure la température de l'air ?", "Le thermomètre", ["Le baromètre", "L'anémomètre"]],
  ["Quel instrument mesure la vitesse du vent ?", "L'anémomètre", ["Le thermomètre", "Le pluviomètre"]],
  ["Quel instrument mesure la quantité de pluie tombée ?", "Le pluviomètre", ["Le baromètre", "Le thermomètre"]],
  ["Un animal qui a une colonne vertébrale est un…", "vertébré", ["invertébré", "insecte"]],
  ["Lequel de ces animaux est un invertébré ?", "L'escargot", ["Le lézard", "Le moineau"]],
  ["Lequel de ces animaux est un oiseau ?", "Le moineau", ["La chauve-souris", "Le dauphin"]],
  ["Comment s'appelle la transformation d'une chenille en papillon ?", "La métamorphose", ["La digestion", "La fusion"]],
  ["Les animaux qui naissent d'un œuf sont…", "ovipares", ["vivipares", "herbivores"]],
  ["Un écosystème, c'est…", "un milieu et les êtres vivants qui y vivent", ["un animal et sa nourriture seulement", "une espèce de plante"]],
  ["De quoi une plante verte a-t-elle besoin pour fabriquer sa matière ?", "De lumière, d'eau et d'air", ["Seulement de terre", "De viande et d'eau"]],
  ["Dans un réseau alimentaire, la flèche va…", "de l'être mangé vers celui qui le mange", ["de celui qui mange vers l'être mangé", "du Soleil vers la Lune"]],
  ["Les végétaux verts sont les…", "producteurs", ["prédateurs", "décomposeurs"]],
  ["Qui mange l'herbe dans une prairie ?", "Le lapin", ["Le renard", "Le faucon"]],
  ["Quel organe commande les mouvements du corps ?", "Le cerveau", ["L'estomac", "Le rein"]],
  ["Pendant la puberté, le corps…", "se transforme", ["devient plus petit", "arrête de respirer"]],
  ["Un objet technique est fabriqué pour…", "répondre à un besoin", ["rester immobile", "se déplacer tout seul"]],
  ["Dans un programme pour robot, « avancer de 3 pas » est…", "une instruction", ["un animal", "une unité"]],
];

export const HISTOIRE = [
  ["Comment s'appelle la demeure fortifiée d'un seigneur au Moyen Âge ?", "Le château fort", ["La cathédrale", "Le palais"]],
  ["Au Moyen Âge, qui cultivait la terre du seigneur ?", "Les paysans", ["Les chevaliers", "Les rois"]],
  ["Quelle célèbre cathédrale gothique se trouve à Paris ?", "Notre-Dame", ["Le Louvre", "Versailles"]],
  ["Quel style d'architecture a des arcs en plein cintre et des murs épais ?", "L'art roman", ["L'art gothique", "L'art moderne"]],
  ["Les grandes verrières et les arcs brisés caractérisent l'art…", "gothique", ["roman", "antique"]],
  ["Quel roi est lié à la Renaissance et au château de Chambord ?", "François Ier", ["Louis XIV", "Henri IV"]],
  ["Quel roi a signé l'édit de Nantes en 1598 ?", "Henri IV", ["Louis XIV", "François Ier"]],
  ["L'édit de Nantes accordait…", "une certaine liberté aux protestants", ["la fin de la monarchie", "des terres aux paysans"]],
  ["Quel roi est surnommé le Roi-Soleil ?", "Louis XIV", ["Louis XVI", "Henri IV"]],
  ["Où Louis XIV a-t-il installé sa cour ?", "À Versailles", ["À Chambord", "À Lyon"]],
  ["Sous l'Ancien Régime, les trois ordres sont…", "le clergé, la noblesse et le tiers état", ["les rois, les reines et les princes", "les paysans, les ouvriers et les marchands"]],
  ["Quel navigateur a atteint les Amériques en 1492 ?", "Christophe Colomb", ["Vasco de Gama", "Jacques Cartier"]],
  ["Qu'est-ce que l'esclavage ?", "Une situation où une personne est considérée comme la propriété d'une autre", ["Un travail payé", "Un voyage en bateau"]],
  ["En quelle année l'esclavage a-t-il été aboli à La Réunion ?", "1848", ["1789", "1914"]],
  ["Quelle est la date de la fête nationale française ?", "Le 14 juillet", ["Le 11 novembre", "Le 1er mai"]],
  ["Quel lieu a été pris par le peuple de Paris le 14 juillet 1789 ?", "La Bastille", ["Le Louvre", "Versailles"]],
  ["La Déclaration des droits de l'homme et du citoyen date de…", "1789", ["1492", "1914"]],
  ["Quelle est la devise de la République française ?", "Liberté, Égalité, Fraternité", ["Travail, Famille, Patrie", "Dieu et mon droit"]],
  ["À quoi sert une frise chronologique ?", "À placer des événements dans l'ordre du temps", ["À mesurer des distances", "À dessiner une carte"]],
  ["Combien d'années y a-t-il dans un siècle ?", "100", ["10", "1 000"]],
  ["Qui était roi de France au début de la Révolution ?", "Louis XVI", ["Louis XIV", "Henri IV"]],
  ["Au Moyen Âge, que donnaient les paysans à leur seigneur ?", "Une partie de leurs récoltes et du travail", ["Des vacances", "Des lettres"]],
];

export const GEO = [
  ["Combien y a-t-il d'océans sur Terre ?", "5", ["3", "7"]],
  ["Sur une carte, la légende sert à…", "comprendre les symboles", ["donner la date", "mesurer le temps"]],
  ["Sur une carte, l'échelle sert à…", "calculer les distances réelles", ["connaître la météo", "savoir l'heure"]],
  ["Comment s'appelle la ligne qui partage la Terre en hémisphère nord et hémisphère sud ?", "L'équateur", ["Le méridien", "Le tropique"]],
  ["Quel continent compte le plus d'habitants ?", "L'Asie", ["L'Europe", "L'Afrique"]],
  ["Une eau potable est une eau…", "que l'on peut boire sans danger", ["salée", "gelée"]],
  ["Comment appelle-t-on les étapes qui mènent d'un aliment du champ à l'assiette ?", "La chaîne de production", ["Le réseau social", "La carte du monde"]],
  ["Sur un long trajet, quel moyen de transport émet le plus de CO₂ par passager ?", "L'avion", ["Le train", "Le vélo"]],
  ["Comment relie-t-on La Réunion au reste du monde ?", "Par avion et par bateau", ["Par le train", "Par le tramway"]],
  ["Internet est un réseau de…", "machines reliées entre elles", ["routes", "rivières"]],
  ["Les câbles qui relient les continents pour Internet passent…", "au fond des océans", ["sur les montagnes", "dans le ciel"]],
  ["La 5G sert à…", "échanger des données sans fil plus rapidement", ["voler", "fabriquer du courant"]],
  ["Quel est le plus grand océan du monde ?", "Le Pacifique", ["L'Atlantique", "L'océan Indien"]],
  ["Que désignent les « pratiques alimentaires » ?", "Ce que les gens mangent et comment", ["Les recettes magiques", "La météo"]],
];

export const ANGLAIS = [
  ["Comment dit-on « bonjour » en anglais ?", "Hello", ["Goodbye", "Thanks"]],
  ["« Merci » en anglais :", "Thank you", ["Please", "Sorry"]],
  ["« How are you? » — quelle est une bonne réponse ?", "I'm fine, thank you.", ["I'm ten.", "It's Monday."]],
  ["« My name ___ Sana. »", "is", ["are", "am"]],
  ["« I ___ ten years old. »", "am", ["is", "are"]],
  ["Que veut dire « red » ?", "rouge", ["bleu", "vert"]],
  ["« yellow » =", "jaune", ["orange", "marron"]],
  ["Comment dit-on 7 en anglais ?", "seven", ["eleven", "seventeen"]],
  ["Comment dit-on 13 en anglais ?", "thirteen", ["thirty", "three"]],
  ["« Monday » =", "lundi", ["mardi", "mercredi"]],
  ["« It's raining » veut dire…", "Il pleut", ["Il neige", "Il fait chaud"]],
  ["« sunny » =", "ensoleillé", ["nuageux", "venteux"]],
  ["« Open your book » veut dire…", "Ouvre ton livre", ["Ferme ton livre", "Lis ton livre"]],
  ["« Sit down » =", "Assieds-toi", ["Lève-toi", "Écoute"]],
  ["« Can you swim? » — quelle est la bonne réponse ?", "Yes, I can.", ["Yes, I do.", "Yes, I am."]],
  ["« I like pizza. » =", "J'aime la pizza.", ["Je mange une pizza.", "Je déteste la pizza."]],
  ["« I don't like spiders. » =", "Je n'aime pas les araignées.", ["J'aime les araignées.", "J'ai peur des araignées."]],
  ["Quelle est la capitale du Royaume-Uni ?", "London", ["Paris", "Dublin"]],
  ["Comment s'appelle le drapeau du Royaume-Uni ?", "L'Union Jack", ["Le Stars and Stripes", "La Maple Leaf"]],
  ["Comment épelle-t-on « cat » ?", "C – A – T", ["K – A – T", "C – O – T"]],
  ["« brother » =", "frère", ["sœur", "cousin"]],
  ["« It's half past three » =", "Il est trois heures et demie", ["Il est trois heures moins le quart", "Il est quatre heures"]],
  ["« under the table » =", "sous la table", ["sur la table", "derrière la table"]],
  ["« I am happy » =", "Je suis content", ["Je suis fatigué", "J'ai faim"]],
  ["« What's your name? » =", "Comment t'appelles-tu ?", ["Quel âge as-tu ?", "Où habites-tu ?"]],
  ["« She has a cat » =", "Elle a un chat", ["Il a un chat", "Elle est un chat"]],
  ["« tomorrow » =", "demain", ["hier", "aujourd'hui"]],
  ["« winter » =", "hiver", ["été", "automne"]],
];

// écoute : [anglais, français]
export const ANG_WORDS = [
  ["cat", "chat"], ["dog", "chien"], ["house", "maison"], ["apple", "pomme"], ["book", "livre"], ["school", "école"],
  ["red", "rouge"], ["blue", "bleu"], ["green", "vert"], ["Monday", "lundi"], ["Tuesday", "mardi"], ["water", "eau"],
  ["friend", "ami"], ["rain", "pluie"], ["sun", "soleil"], ["happy", "content"], ["sister", "sœur"], ["brother", "frère"],
  ["window", "fenêtre"], ["door", "porte"], ["bread", "pain"],
];
