// Banques de questions (français, sciences, culture générale)

export const SENTENCES = [
  { t: "Le chat dort sur le canapé.", S: "Le chat", V: "dort", inf: "dormir", C: "sur le canapé" },
  { t: "Mes amis préparent une potion.", S: "Mes amis", V: "préparent", inf: "préparer", C: "une potion" },
  { t: "Sana lit un grand livre.", S: "Sana", V: "lit", inf: "lire", C: "un grand livre" },
  { t: "Le hibou apporte une lettre.", S: "Le hibou", V: "apporte", inf: "apporter", C: "une lettre" },
  { t: "Les enfants courent dans le jardin.", S: "Les enfants", V: "courent", inf: "courir", C: "dans le jardin" },
  { t: "Ma sœur dessine un dragon.", S: "Ma sœur", V: "dessine", inf: "dessiner", C: "un dragon" },
  { t: "Les étoiles brillent dans la nuit.", S: "Les étoiles", V: "brillent", inf: "briller", C: "dans la nuit" },
  { t: "Nous mangeons des bonbons.", S: "Nous", V: "mangeons", inf: "manger", C: "des bonbons" },
  { t: "Tu ouvres la porte du château.", S: "Tu", V: "ouvres", inf: "ouvrir", C: "la porte du château" },
  { t: "Le professeur écrit une formule au tableau.", S: "Le professeur", V: "écrit", inf: "écrire", C: "une formule au tableau" },
  { t: "Les sorciers volent sur leurs balais.", S: "Les sorciers", V: "volent", inf: "voler", C: "sur leurs balais" },
  { t: "Vous finissez vite votre devoir.", S: "Vous", V: "finissez", inf: "finir", C: "vite votre devoir" },
  { t: "Un petit dragon crache du feu.", S: "Un petit dragon", V: "crache", inf: "cracher", C: "du feu" },
  { t: "La directrice parle aux élèves.", S: "La directrice", V: "parle", inf: "parler", C: "aux élèves" },
  { t: "Mon frère construit une cabane.", S: "Mon frère", V: "construit", inf: "construire", C: "une cabane" },
  { t: "Les nuages cachent la lune.", S: "Les nuages", V: "cachent", inf: "cacher", C: "la lune" },
];

// [je, tu, il, nous, vous, ils]
export const VERBS = {
  "être": {
    present: ["suis", "es", "est", "sommes", "êtes", "sont"],
    imparfait: ["étais", "étais", "était", "étions", "étiez", "étaient"],
    futur: ["serai", "seras", "sera", "serons", "serez", "seront"], ce2: true },
  "avoir": {
    present: ["ai", "as", "a", "avons", "avez", "ont"],
    imparfait: ["avais", "avais", "avait", "avions", "aviez", "avaient"],
    futur: ["aurai", "auras", "aura", "aurons", "aurez", "auront"], ce2: true },
  "aller": {
    present: ["vais", "vas", "va", "allons", "allez", "vont"],
    imparfait: ["allais", "allais", "allait", "allions", "alliez", "allaient"],
    futur: ["irai", "iras", "ira", "irons", "irez", "iront"] },
  "faire": {
    present: ["fais", "fais", "fait", "faisons", "faites", "font"],
    imparfait: ["faisais", "faisais", "faisait", "faisions", "faisiez", "faisaient"],
    futur: ["ferai", "feras", "fera", "ferons", "ferez", "feront"] },
  "jouer": {
    present: ["joue", "joues", "joue", "jouons", "jouez", "jouent"],
    imparfait: ["jouais", "jouais", "jouait", "jouions", "jouiez", "jouaient"],
    futur: ["jouerai", "joueras", "jouera", "jouerons", "jouerez", "joueront"], ce2: true },
  "manger": {
    present: ["mange", "manges", "mange", "mangeons", "mangez", "mangent"],
    imparfait: ["mangeais", "mangeais", "mangeait", "mangions", "mangiez", "mangeaient"],
    futur: ["mangerai", "mangeras", "mangera", "mangerons", "mangerez", "mangeront"], ce2: true },
  "finir": {
    present: ["finis", "finis", "finit", "finissons", "finissez", "finissent"],
    imparfait: ["finissais", "finissais", "finissait", "finissions", "finissiez", "finissaient"],
    futur: ["finirai", "finiras", "finira", "finirons", "finirez", "finiront"] },
  "prendre": {
    present: ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
    imparfait: ["prenais", "prenais", "prenait", "prenions", "preniez", "prenaient"],
    futur: ["prendrai", "prendras", "prendra", "prendrons", "prendrez", "prendront"] },
};

// [question, bonne réponse, [mauvaises réponses]]
export const SCIENCES = [
  ["Combien de planètes compte le système solaire ?", "8", ["6", "7", "9"]],
  ["Quelle planète est la plus proche du Soleil ?", "Mercure", ["Vénus", "Mars", "Jupiter"]],
  ["À quelle température l'eau gèle-t-elle (au niveau de la mer) ?", "0 °C", ["10 °C", "100 °C", "-10 °C"]],
  ["Quel organe pompe le sang dans le corps ?", "Le cœur", ["Le foie", "Les poumons", "L'estomac"]],
  ["Quel gaz les plantes rejettent-elles grâce à la photosynthèse ?", "Le dioxygène", ["Le dioxyde de carbone", "L'azote", "L'hélium"]],
  ["Un animal qui mange uniquement des plantes est…", "herbivore", ["carnivore", "omnivore", "insectivore"]],
  ["Un animal qui mange de la viande est…", "carnivore", ["herbivore", "végétarien", "granivore"]],
  ["Comment s'appelle le passage de l'eau liquide à la vapeur ?", "L'évaporation", ["La condensation", "La solidification", "La fusion"]],
  ["Comment s'appelle le passage de la glace à l'eau liquide ?", "La fusion", ["L'évaporation", "La condensation", "La solidification"]],
  ["En combien de temps la Terre fait-elle le tour du Soleil ?", "1 an", ["1 jour", "1 mois", "10 ans"]],
  ["La Lune est…", "un satellite naturel de la Terre", ["une étoile", "une planète", "une comète"]],
  ["Lequel de ces animaux est un mammifère ?", "Le dauphin", ["Le requin", "La truite", "La grenouille"]],
  ["Quel sens utilise-t-on avec les oreilles ?", "L'ouïe", ["La vue", "L'odorat", "Le goût"]],
  ["Combien de pattes a un insecte ?", "6", ["4", "8", "10"]],
  ["Quel matériau conduit bien l'électricité ?", "Le cuivre", ["Le bois", "Le plastique", "Le verre"]],
  ["Pourquoi y a-t-il le jour et la nuit ?", "La Terre tourne sur elle-même", ["Le Soleil tourne autour de la Terre", "La Lune cache le Soleil", "Les nuages bougent"]],
  ["Quel est le plus grand organe du corps humain ?", "La peau", ["Le cœur", "Le cerveau", "L'intestin"]],
  ["Combien de dents a un adulte (avec les dents de sagesse) ?", "32", ["20", "28", "36"]],
  ["Quel est le nom de notre étoile ?", "Le Soleil", ["La Lune", "Sirius", "Mars"]],
  ["Que font les racines d'une plante ?", "Elles puisent l'eau et les sels minéraux", ["Elles fabriquent les fleurs", "Elles captent la lumière", "Elles font du bruit"]],
];

export const CULTURE = [
  ["Quelle est la capitale de l'Italie ?", "Rome", ["Milan", "Venise", "Naples"]],
  ["Quelle est la capitale de l'Espagne ?", "Madrid", ["Barcelone", "Lisbonne", "Séville"]],
  ["Quel océan entoure La Réunion ?", "L'océan Indien", ["L'océan Atlantique", "L'océan Pacifique", "L'océan Arctique"]],
  ["Comment s'appelle le volcan actif de La Réunion ?", "Le Piton de la Fournaise", ["Le Vésuve", "L'Etna", "Le Mont Blanc"]],
  ["Quel fleuve traverse Paris ?", "La Seine", ["La Loire", "Le Rhône", "La Garonne"]],
  ["Qui a peint la Joconde ?", "Léonard de Vinci", ["Picasso", "Van Gogh", "Monet"]],
  ["Quel est le plus grand continent ?", "L'Asie", ["L'Afrique", "L'Europe", "L'Amérique du Sud"]],
  ["Quelle est la plus haute montagne du monde ?", "L'Everest", ["Le Mont Blanc", "Le Kilimandjaro", "Le Mont Fuji"]],
  ["Combien de jours compte une année bissextile ?", "366", ["365", "364", "360"]],
  ["Qui a écrit les livres Harry Potter ?", "J. K. Rowling", ["Roald Dahl", "Victor Hugo", "Jules Verne"]],
  ["Quelle langue parle-t-on au Brésil ?", "Le portugais", ["L'espagnol", "L'anglais", "Le français"]],
  ["Dans quel pays se trouve la tour de Pise ?", "L'Italie", ["La France", "L'Espagne", "La Grèce"]],
  ["En quelle année a eu lieu la Révolution française ?", "1789", ["1492", "1914", "1969"]],
  ["Quelle monnaie utilise-t-on en France ?", "L'euro", ["Le dollar", "La livre", "Le yen"]],
  ["Dans quel archipel se passe l'histoire de Lilo et Stitch ?", "Hawaï", ["Les Antilles", "Les Maldives", "Les Canaries"]],
  ["Quel est le plus long fleuve de France ?", "La Loire", ["La Seine", "Le Rhône", "La Dordogne"]],
  ["Quel animal terrestre est le plus grand ?", "L'éléphant d'Afrique", ["La girafe", "Le rhinocéros", "L'ours polaire"]],
  ["Quel instrument a des touches blanches et noires ?", "Le piano", ["La guitare", "La flûte", "Le violon"]],
  ["Quel est le drapeau de la France ?", "Bleu, blanc, rouge", ["Vert, blanc, rouge", "Bleu, jaune, rouge", "Noir, blanc, bleu"]],
  ["Combien y a-t-il de joueurs sur le terrain dans une équipe de football ?", "11", ["9", "10", "12"]],
];

// =====================  NIVEAU CM2  =====================

// Verbes supplémentaires (CM2) : [je, tu, il, nous, vous, ils]
export const EXTRA_VERBS = {
  "voir": {
    present: ["vois", "vois", "voit", "voyons", "voyez", "voient"],
    imparfait: ["voyais", "voyais", "voyait", "voyions", "voyiez", "voyaient"],
    futur: ["verrai", "verras", "verra", "verrons", "verrez", "verront"] },
  "dire": {
    present: ["dis", "dis", "dit", "disons", "dites", "disent"],
    imparfait: ["disais", "disais", "disait", "disions", "disiez", "disaient"],
    futur: ["dirai", "diras", "dira", "dirons", "direz", "diront"] },
  "pouvoir": {
    present: ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
    imparfait: ["pouvais", "pouvais", "pouvait", "pouvions", "pouviez", "pouvaient"],
    futur: ["pourrai", "pourras", "pourra", "pourrons", "pourrez", "pourront"] },
  "vouloir": {
    present: ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
    imparfait: ["voulais", "voulais", "voulait", "voulions", "vouliez", "voulaient"],
    futur: ["voudrai", "voudras", "voudra", "voudrons", "voudrez", "voudront"] },
  "venir": {
    present: ["viens", "viens", "vient", "venons", "venez", "viennent"],
    imparfait: ["venais", "venais", "venait", "venions", "veniez", "venaient"],
    futur: ["viendrai", "viendras", "viendra", "viendrons", "viendrez", "viendront"] },
};

// Passé composé : [infinitif, auxiliaire, participe passé]
export const PC_VERBS = [
  ["jouer", "avoir", "joué"], ["manger", "avoir", "mangé"], ["finir", "avoir", "fini"], ["prendre", "avoir", "pris"],
  ["voir", "avoir", "vu"], ["dire", "avoir", "dit"], ["faire", "avoir", "fait"],
  ["aller", "être", "allé"], ["venir", "être", "venu"], ["partir", "être", "parti"], ["arriver", "être", "arrivé"], ["tomber", "être", "tombé"],
];
// sujets : [texte, genre, nombre]
export const PC_SUBJECTS = [
  ["Sana", "f", 1], ["Mon frère", "m", 1], ["Le hibou", "m", 1], ["La directrice", "f", 1],
  ["Les sorcières", "f", 2], ["Mes amis", "m", 2], ["Elle", "f", 1], ["Il", "m", 1], ["Elles", "f", 2], ["Ils", "m", 2],
];

// Passé simple, 3e personne : [infinitif, singulier, pluriel]
export const PS_VERBS = [
  ["être", "fut", "furent"], ["avoir", "eut", "eurent"], ["aller", "alla", "allèrent"], ["faire", "fit", "firent"],
  ["prendre", "prit", "prirent"], ["finir", "finit", "finirent"], ["jouer", "joua", "jouèrent"], ["manger", "mangea", "mangèrent"],
  ["voir", "vit", "virent"], ["dire", "dit", "dirent"], ["pouvoir", "put", "purent"], ["venir", "vint", "vinrent"],
];

// Compléments d'objet direct
export const CODS = [
  { t: "Ma voisine arrose les fleurs chaque matin.", S: "Ma voisine", V: "arrose", inf: "arroser", COD: "les fleurs", CC: "chaque matin" },
  { t: "Les élèves écoutent attentivement la maîtresse.", S: "Les élèves", V: "écoutent", inf: "écouter", COD: "la maîtresse", CC: "attentivement" },
  { t: "Mon grand-père répare le vélo dans le garage.", S: "Mon grand-père", V: "répare", inf: "réparer", COD: "le vélo", CC: "dans le garage" },
  { t: "Les chats attrapent des souris dans la cave.", S: "Les chats", V: "attrapent", inf: "attraper", COD: "des souris", CC: "dans la cave" },
  { t: "Sana prépare un gâteau pour l'anniversaire de sa sœur.", S: "Sana", V: "prépare", inf: "préparer", COD: "un gâteau", CC: "pour l'anniversaire de sa sœur" },
  { t: "Le facteur distribue le courrier tous les jours.", S: "Le facteur", V: "distribue", inf: "distribuer", COD: "le courrier", CC: "tous les jours" },
  { t: "Nous admirons le coucher de soleil sur la plage.", S: "Nous", V: "admirons", inf: "admirer", COD: "le coucher de soleil", CC: "sur la plage" },
  { t: "Les pirates cherchent un trésor sur l'île.", S: "Les pirates", V: "cherchent", inf: "chercher", COD: "un trésor", CC: "sur l'île" },
  { t: "Tu lis un roman avant de dormir.", S: "Tu", V: "lis", inf: "lire", COD: "un roman", CC: "avant de dormir" },
  { t: "Le boulanger vend des croissants le dimanche.", S: "Le boulanger", V: "vend", inf: "vendre", COD: "des croissants", CC: "le dimanche" },
  { t: "Mes parents achètent du pain à la boulangerie.", S: "Mes parents", V: "achètent", inf: "acheter", COD: "du pain", CC: "à la boulangerie" },
  { t: "L'orage effraie les enfants pendant la nuit.", S: "L'orage", V: "effraie", inf: "effrayer", COD: "les enfants", CC: "pendant la nuit" },
];

// Nature des mots : [phrase, mot, nature]
export const NATURES = [
  ["Le petit chat dort.", "petit", "adjectif"], ["Le petit chat dort.", "chat", "nom"],
  ["Le petit chat dort.", "Le", "déterminant"], ["Le petit chat dort.", "dort", "verbe"],
  ["Elle chante joliment.", "Elle", "pronom"], ["Elle chante joliment.", "joliment", "adverbe"],
  ["Nous allons chez ma tante.", "chez", "préposition"], ["Nous allons chez ma tante.", "ma", "déterminant"],
  ["Un grand dragon vole dans le ciel.", "grand", "adjectif"], ["Un grand dragon vole dans le ciel.", "dans", "préposition"],
  ["Un grand dragon vole dans le ciel.", "ciel", "nom"], ["Mes amis arrivent bientôt.", "bientôt", "adverbe"],
  ["Mes amis arrivent bientôt.", "Mes", "déterminant"], ["Tu écoutes la musique douce.", "douce", "adjectif"],
  ["Tu écoutes la musique douce.", "Tu", "pronom"], ["Les élèves travaillent sérieusement.", "sérieusement", "adverbe"],
  ["Les élèves travaillent sérieusement.", "travaillent", "verbe"],
];

// Homophones : [phrase (___ = trou), bonne réponse, [mauvaises réponses]]
export const HOMOPHONES = [
  ["Il ___ un chat noir.", "a", ["à", "as"]],
  ["Je vais ___ la piscine.", "à", ["a", "as"]],
  ["Tu ___ de la chance.", "as", ["a", "à"]],
  ["Léo ___ Sana jouent dehors.", "et", ["est", "es"]],
  ["Le ciel ___ bleu.", "est", ["et", "es"]],
  ["Ils ___ faim.", "ont", ["on", "en"]],
  ["___ mange à midi.", "On", ["Ont", "Un"]],
  ["Ils ___ partis hier.", "sont", ["son", "ont"]],
  ["Elle range ___ cahier.", "son", ["sont", "sa"]],
  ["Regarde ___ beaux oiseaux !", "ces", ["ses", "c'est"]],
  ["Léa met ___ chaussures.", "ses", ["ces", "s'est"]],
  ["Elle ___ lave les mains.", "se", ["ce", "ceux"]],
  ["___ livre est passionnant.", "Ce", ["Se", "Ceux"]],
  ["Veux-tu du thé ___ du café ?", "ou", ["où", "et"]],
  ["___ vas-tu ?", "Où", ["Ou", "Et"]],
];

export const SCIENCES2 = [
  ["Quel est le rôle des globules rouges ?", "Transporter le dioxygène", ["Combattre les microbes", "Coaguler le sang", "Digérer les aliments"]],
  ["Quel gaz représente environ 78 % de l'air ?", "Le diazote", ["Le dioxygène", "Le dioxyde de carbone", "L'hélium"]],
  ["Comment s'appelle la force qui attire les objets vers le centre de la Terre ?", "La pesanteur (gravité)", ["Le magnétisme", "Le frottement", "La poussée d'Archimède"]],
  ["Quelle est la formule chimique de l'eau ?", "H₂O", ["CO₂", "O₂", "NaCl"]],
  ["Comment s'appelle le passage de la vapeur d'eau à l'eau liquide ?", "La condensation", ["La fusion", "La solidification", "L'ébullition"]],
  ["Quels organes filtrent le sang et fabriquent l'urine ?", "Les reins", ["Le foie", "Les poumons", "Le pancréas"]],
  ["Quelle est la plus grande planète du système solaire ?", "Jupiter", ["Saturne", "Neptune", "La Terre"]],
  ["Combien de temps la lumière du Soleil met-elle pour arriver sur Terre ?", "Environ 8 minutes", ["Environ 1 seconde", "Environ 1 heure", "Environ 1 jour"]],
  ["Que mesure un thermomètre ?", "La température", ["La masse", "La pression", "La vitesse"]],
  ["Pourquoi y a-t-il des saisons ?", "L'axe de la Terre est incliné", ["La Terre s'éloigne du Soleil l'hiver", "La Lune change de forme", "Le Soleil change de taille"]],
  ["Dans une chaîne alimentaire, qui sont les producteurs ?", "Les végétaux", ["Les carnivores", "Les décomposeurs", "Les herbivores"]],
  ["Quel organe de la plante capte surtout la lumière ?", "Les feuilles", ["Les racines", "La tige", "Les graines"]],
  ["Quel est le rôle des poumons ?", "Échanger les gaz avec l'air", ["Pomper le sang", "Digérer les aliments", "Produire la bile"]],
  ["Pour que la lampe brille, le circuit électrique doit être…", "fermé", ["ouvert", "coupé", "vide"]],
  ["Quelle unité sert à mesurer une masse ?", "Le kilogramme", ["Le litre", "Le mètre", "Le degré"]],
  ["Comment appelle-t-on un animal qui mange des plantes et de la viande ?", "Omnivore", ["Herbivore", "Carnivore", "Insectivore"]],
  ["Quel est le plus grand os du corps humain ?", "Le fémur", ["Le tibia", "L'humérus", "Le crâne"]],
  ["Que devient le sucre dans l'eau chaude ?", "Il se dissout", ["Il s'évapore", "Il se transforme en sel", "Il devient un gaz"]],
  ["Quelle énergie est renouvelable ?", "L'énergie solaire", ["Le charbon", "Le pétrole", "Le gaz naturel"]],
  ["Combien d'os environ possède un adulte ?", "206", ["106", "306", "406"]],
];

export const CULTURE2 = [
  ["Quelle est la capitale de l'Allemagne ?", "Berlin", ["Munich", "Hambourg", "Vienne"]],
  ["Qui fut le premier président de la Ve République ?", "Charles de Gaulle", ["Georges Pompidou", "François Mitterrand", "Jacques Chirac"]],
  ["En quelle année a commencé la Première Guerre mondiale ?", "1914", ["1939", "1918", "1870"]],
  ["Quel pays a offert la statue de la Liberté aux États-Unis ?", "La France", ["L'Angleterre", "L'Espagne", "L'Italie"]],
  ["Quel est le plus grand océan du monde ?", "L'océan Pacifique", ["L'océan Atlantique", "L'océan Indien", "L'océan Arctique"]],
  ["Quelle est la capitale du Canada ?", "Ottawa", ["Toronto", "Montréal", "Vancouver"]],
  ["Quel navigateur a atteint les Antilles en 1492 ?", "Christophe Colomb", ["Magellan", "Vasco de Gama", "Jacques Cartier"]],
  ["Dans quel pays se trouvent les pyramides de Gizeh ?", "L'Égypte", ["Le Mexique", "Le Pérou", "La Grèce"]],
  ["Qui a écrit « Les Misérables » ?", "Victor Hugo", ["Molière", "Émile Zola", "Jules Verne"]],
  ["Quelle est la plus grande île de l'océan Indien ?", "Madagascar", ["La Réunion", "Maurice", "Sri Lanka"]],
  ["Comment s'appelle l'hymne national français ?", "La Marseillaise", ["Le Chant des Partisans", "L'Internationale", "Le Chant du départ"]],
  ["Quelle est la devise de la République française ?", "Liberté, Égalité, Fraternité", ["Travail, Famille, Patrie", "Union, Force, Progrès", "Dieu et mon droit"]],
  ["Qui a peint « Les Tournesols » ?", "Van Gogh", ["Monet", "Renoir", "Cézanne"]],
  ["Quelle est la capitale du Japon ?", "Tokyo", ["Kyoto", "Osaka", "Séoul"]],
  ["En quelle année l'être humain a-t-il marché sur la Lune pour la première fois ?", "1969", ["1957", "1981", "1999"]],
  ["Quel est le plus long fleuve d'Afrique ?", "Le Nil", ["Le Congo", "Le Niger", "Le Zambèze"]],
  ["Quelle ville française est surnommée « la Ville rose » ?", "Toulouse", ["Marseille", "Bordeaux", "Lyon"]],
  ["Comment appelle-t-on les habitants de La Réunion ?", "Les Réunionnais", ["Les Mauriciens", "Les Malgaches", "Les Mahorais"]],
  ["Qui a mis au point le vaccin contre la rage en 1885 ?", "Louis Pasteur", ["Marie Curie", "Pierre Curie", "Claude Bernard"]],
  ["Quel pays est surnommé « le pays du Soleil-Levant » ?", "Le Japon", ["La Chine", "La Corée", "La Thaïlande"]],
];

// Dictée de mots : [mot, indice]
export const DICTEE_CM1 = [
  ["maison", "On y habite."], ["jardin", "On y plante des fleurs."], ["bateau", "Il flotte sur la mer."], ["crayon", "On écrit avec."],
  ["lumière", "Elle éclaire."], ["fenêtre", "On l'ouvre pour aérer."], ["château", "Une grande demeure de roi."],
  ["éléphant", "Un grand animal gris avec une trompe."], ["oiseau", "Il vole et il chante."], ["bibliothèque", "On y emprunte des livres."],
  ["chocolat", "Une friandise brune."], ["souris", "Elle grignote le fromage."], ["magicien", "Il fait des tours de magie."],
  ["sorcière", "Elle prépare des potions."], ["balai", "On balaie avec."], ["étoile", "Elle brille la nuit."],
  ["montagne", "Une très haute colline."], ["écureuil", "Un petit animal roux qui mange des noisettes."], ["spectacle", "On va le voir au théâtre."],
  ["professeur", "Il enseigne à l'école."], ["gourmand", "Il adore manger."], ["aujourd'hui", "Le jour présent."],
  ["maintenant", "À cet instant."], ["beaucoup", "En grande quantité."], ["pendant", "Durant."], ["quelquefois", "Parfois."],
  ["voyage", "On le fait en train ou en avion."], ["difficile", "Le contraire de facile."], ["pareil", "Identique."],
];
export const DICTEE_CM2 = [
  ["bibliothécaire", "Il s'occupe d'une bibliothèque."], ["appartement", "Un logement dans un immeuble."],
  ["rhinocéros", "Animal d'Afrique avec une corne sur le nez."], ["rythme", "La cadence d'une musique."], ["orchestre", "Un grand groupe de musiciens."],
  ["exercice", "On en fait en classe pour s'entraîner."], ["ingénieur", "Il conçoit des machines et des ponts."],
  ["souvenir", "Ce dont on se rappelle."], ["aventure", "Une expérience palpitante."], ["architecte", "Il dessine les plans d'une maison."],
  ["catastrophe", "Un très grand malheur."], ["imaginaire", "Qui n'existe que dans la tête."], ["sympathique", "Agréable, gentil."],
  ["immédiatement", "Tout de suite."], ["désormais", "À partir de maintenant."], ["néanmoins", "Cependant."],
  ["accueillir", "Recevoir quelqu'un chez soi."], ["automne", "La saison des feuilles mortes."], ["mélange", "Plusieurs choses mises ensemble."],
  ["nécessaire", "Dont on a absolument besoin."], ["environnement", "Ce qui nous entoure : nature, air, eau."],
  ["longtemps", "Pendant une longue durée."], ["bienvenue", "On le dit à un invité qui arrive."], ["quotidien", "De tous les jours."],
  ["exceptionnel", "Hors du commun."], ["adresse", "Elle indique où l'on habite."],
];
