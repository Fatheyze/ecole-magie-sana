# 🪄 L'école de magie de Sana

Une petite web-app (installable sur l'iPad) pour réviser **maths, français, sciences et culture générale** en CM1, avec des rappels de CE2.
Univers Poudlard (maisons, points, titres) et **Stitch** qui s'échappe toutes les 3 séances pour une mission bonus de calcul éclair.
Le parent suit le travail sur une page dédiée (`parent.html`).

## Contenu

Deux niveaux : **CM1** (par défaut, avec rappels de CE2) et **CM2** (pour l'an prochain). On bascule avec « Niveau : CM1 (changer) » en bas de l'accueil. Les points, le titre et la maison sont conservés ; les statistiques sont séparées par niveau. En CM2, le programme CM1 revient en « révision CM1 » avec des nombres plus grands.

| Matière | CM1 (rév. CE2) | CM2 en plus |
|---|---|---|
| 🔢 Arithmancie (maths) | tables, double/moitié, ×10/100/1 000, décomposer, demi-droite graduée, proportionnalité, périmètre, perpendiculaires, symétrie | décimaux (×÷10/100/1 000, demi-droite à pas décimaux), fractions, calcul posé/mental (×, division euclidienne, + et − de décimaux), conversions, aires, angles, parallèles, pourcentages, symétrie sur grille 10×7 |
| ✨ Sortilèges (français) | dictée, verbe, sujet, infinitif, présent (rév. CE2), imparfait, futur | COD, nature des mots, homophones (a/à, et/est, on/ont, son/sont, ces/ses…), passé composé (accord avec être), passé simple (3e personne), 5 verbes de plus |
| 🌿 Botanique & Cosmos | 20 questions | 20 questions de niveau CM2 |
| 📜 Histoire de la magie | 20 questions | 20 questions de niveau CM2 |

Les exercices de maths sont **générés au hasard** à partir des fiches automaths974. L'appli repère ce qui est fragile et le repropose plus souvent.

## Temps de travail
- Un chrono **actif** tourne pendant les séances : il s'arrête si l'écran est masqué ou si elle ne touche plus l'écran depuis 1 minute.
- Sana voit son temps dans la séance (⏱), l'objectif du jour (15 min, modifiable : `goalMin` dans `app.js`) et son total de la semaine.
- Toi, tu vois sur `parent.html` : temps aujourd'hui / 7 jours / total, temps moyen par question, temps par compétence, durée de chaque séance.

## Mise en route (≈ 20 min)

### 1. Mettre le projet sur GitHub et activer GitHub Pages
1. Crée un dépôt GitHub (ex. `sana-poudlard`) et envoie-y tous ces fichiers.
2. Dépôt → **Settings → Pages** → Source : *Deploy from a branch* → branche `main`, dossier `/ (root)`.
3. Après 1–2 minutes, l'appli est en ligne sur `https://TON-PSEUDO.github.io/sana-poudlard/`.

### 2. Brancher le suivi parent (Firebase, gratuit)
1. Va sur <https://console.firebase.google.com> → **Ajouter un projet** (sans Google Analytics).
2. **Build → Firestore Database** → *Créer une base* (mode production, région `eur3` ou `europe-west`).
3. **Build → Authentication** → *Commencer* → activer **E-mail/Mot de passe** → onglet *Users* → **Ajouter un utilisateur** (ton e-mail + un mot de passe : c'est ton accès parent).
4. **Firestore → Règles** : colle le contenu de `firestore.rules` puis *Publier* (à refaire si tu as déjà publié une ancienne version : les règles ont de nouveaux champs `level`).
   (Résultat : l'iPad peut seulement *ajouter* des séances ; seul le parent connecté peut les lire.)
5. **Paramètres du projet (⚙️) → Vos applications → `</>` Web** → enregistre l'app et copie la config dans `firebase-config.js` (`apiKey`, `authDomain`, `projectId`, `appId`).
6. **Authentication → Settings → Authorized domains** : ajoute `TON-PSEUDO.github.io`.
7. Commit + push. Ouvre `…/parent.html`, connecte-toi : tu vois dernière séance, minutes, réussite par compétence, séances récentes.

> La clé Firebase du fichier de config n'est pas un secret : ce sont les **règles** (étape 4) qui protègent les données.

### 3. Installer sur l'iPad
1. Ouvre l'adresse GitHub Pages dans **Safari** sur l'iPad (wifi de la maison).
2. Bouton Partager → **Sur l'écran d'accueil**. L'appli s'ouvre alors en plein écran et marche même hors connexion ; les séances sont envoyées dès que le wifi revient.

## Retour et reprise
- La flèche **←** (ou le geste « retour » de l'iPad) met la séance en pause et ramène à l'accueil.
- L'accueil propose alors **▶ Reprendre ma séance** : même question, mêmes cases coloriées, même nombre d'essais. Ça marche aussi si l'iPad se met en veille ou si l'appli est fermée.
- « Terminer cette séance » la clôture en gardant les points gagnés. Lancer une nouvelle séance clôture aussi l'ancienne.
- Le temps compté pour toi n'inclut pas les pauses.
- Dans la mission Stitch, ← annule et rend le ticket.

## Personnaliser
- **Stitch** : dépose une image `stitch.png` (fond transparent) à la racine, elle s'affichera dans la mission bonus à la place de l'émoji 👽.
- **Blasons des maisons** : dépose à la racine `crest-rouge.png` (Gryffondor), `crest-bleu.png` (Serdaigle), `crest-jaune.png` (Poufsouffle), `crest-vert.png` (Serpentard), carrés, fond transparent. Sans fichier, l'appli garde les emoji.
- **Questions** : ajoute des lignes dans `banks.js` (`SCIENCES`, `CULTURE`, `SENTENCES`, `VERBS`).
- **Nouveau type d'exercice** : ajoute une fonction dans `gen.js` + une entrée dans `SKILLS` et `GEN`.
- **Fréquence de Stitch** : dans `app.js`, cherche `S.sessions % 3`.

## Fichiers
`index.html`, `style.css`, `app.js` (écrans), `gen.js` (exercices), `banks.js` (questions), `sync.js` (envoi Firebase), `parent.html` (tableau de bord), `firestore.rules`, `sw.js` + `manifest.webmanifest` (installation / hors-ligne).

## Nouveautés (v3)

| Fonction | Comment ça marche |
|---|---|
| 🔁 **Révision espacée** | Une question ratée (2 essais) revient le lendemain, puis à J+3, J+7, J+14 tant qu'elle n'est pas réussie du premier coup. Elle remplace une question neuve (la séance garde sa longueur) et porte l'étiquette « 🔁 À revoir ». Maths : exercice neuf de la même compétence. |
| 🎁 **Récompenses réelles** | Dans l'espace parent → *Récompenses de Sana* : tu fixes les paliers (ex. 100 pts = une glace). Elle voit « prochaine récompense » à l'accueil, et un message quand elle en débloque une. Sans réglage en ligne, 4 récompenses par défaut. |
| 🏆 **Coupe des maisons + défi** | Classement hebdomadaire (remise à zéro le lundi) : +30 points si sa maison finit 1re. **Les 3 autres maisons sont simulées** (l'appli est mono-joueuse) : leur score progresse automatiquement, c'est un jeu. Défi de la semaine (4 jours, 60 bonnes réponses ou 60 min) : +50 points. |
| 📋 **Résumé hebdomadaire** | Dans l'espace parent : texte prêt à copier ou à envoyer par e-mail en un clic. Un e-mail *automatique* nécessiterait un petit serveur : non inclus. |
| 🔊 **Lecture à voix haute** | Bouton « Écouter » sur chaque question (voix française de l'iPad) ; option « Lecture auto » en bas de l'accueil. |
| ✍️ **Dictée** | Compétence « Dictée / orthographe » (français) : l'iPad lit le mot lentement, Sana l'écrit. Si aucune voix n'est disponible, elle voit la longueur du mot. |

⚠️ **À faire après mise à jour** : republie `firestore.rules` (Firestore → Règles → Publier), sinon le niveau, les récompenses et la révision ne remontent pas. Active aussi le son de l'iPad (interrupteur silencieux) pour la voix.

## Nouveautés (v4) — programme CM1 élargi

Le bouton **🆕 Nouveautés** (accueil) lance 10 questions piochées uniquement dans les sujets ajoutés ; les sujets peu essayés sortent en premier, et une pastille 🆕 s'affiche sur les questions tant que Sana n'a pas fait 5 essais du sujet. Les questions sont écrites pour cette appli (elles suivent les rubriques du programme CM1, sans copier de fiches).

- **Maths** : multiples et diviseurs, fractions (comprendre, comparer, égales), comparer les décimaux, arrondir, quotient et reste, durées, unités, égalités à trou, les chances, programmes de calcul, problèmes à étapes, figures et solides, cercle, diagrammes en barres.
- **Français** : types de phrases, phrase négative, déterminants, pronoms, accords (groupe nominal, verbe, participe passé avec être), famille de mots, mots invariables, verbes en -cer/-ger/-yer et -eler/-eter, COI, temps pour raconter, compréhension de textes, synonymes/contraires. COD, nature des mots et passé composé sont maintenant aussi en CM1.
- **Sciences** : 30 questions (mélanges, dissolution, Lune, météo, vivant, réseau alimentaire…).
- **Histoire de la magie** : histoire (Moyen Âge → 1789) et géographie, en plus de la culture générale.
- **Magie des langues (anglais)** : vocabulaire, phrases, repères du Royaume-Uni, et écoute d'un mot en anglais (voix de l'iPad).

Pas de nouvelle règle Firebase à publier pour cette version. Pour ajouter d'autres sujets : une fonction dans `gen.js`, une ligne dans `SKILLS` et `NEW_SKILLS`, les questions dans `banks2.js`.

## Version 5 — séances de 20 questions, sujets à la carte, récompenses plus longues

- **Chaque sujet est une activité** : touche une matière, puis choisis « Tout mélangé » ou un sujet précis (étoiles ★ de maîtrise : 1 étoile = 10 questions à 60 %, 2 = 30 à 75 %, 3 = 60 à 85 %, au premier essai).
- **20 questions par séance** (mission du jour : 4 par matière).
- **Récompenses = points ET jours de travail** (un jour compte à partir de 5 min de travail réel). Par défaut : 🍦 glace 300 pts + 2 j · 🍰 dessert du dimanche 600 + 4 j · 🏊 piscine 1 100 + 6 j · 🍔 Quick 1 700 + 8 j · 📚 livre 2 400 + 11 j · 🎬 cinéma 3 300 + 15 j · 🎲 jeu de société 4 500 + 19 j · 🍽️ petit resto avec papa 6 000 + 25 j · 🧱 boîte de LEGO 8 000 + 32 j. Tout se règle dans l'espace parent.
- **Défi de la semaine plus dur** (5 jours, 120 bonnes réponses ou 100 min) pour +100 points ; coupe : +50 points ; adversaires simulés plus forts ; titres plus espacés.
- **🏅 Trophées** : séries de jours, nombre de bonnes réponses, heures de travail, étoiles de sujets, défi, coupe, révisions menées au bout.
- Aucune nouvelle règle Firebase à publier.

## Tout tester avant de la donner à Sana
Sur l'accueil, touche 5 fois le titre « Bonjour Sana ! » : un panneau 🧪 propose « +500 points », « +1 jour de travail » et « Tout remettre à zéro ». Ça permet de voir chaque récompense se débloquer. **Avant de passer la tablette à Sana, fais « Tout remettre à zéro »** (sur la tablette elle-même, ou efface les données du site dans Safari).

## Habillage (v6) : château animé + grimoire
L'accueil est une scène de nuit dessinée en code (`castle.js`, aucune image à fournir, création originale) : lune, montagnes, lac avec reflets qui ondulent, château gothique aux fenêtres qui vacillent, brume, bougies flottantes, hiboux, étoile filante. Les 6 tours sont des boutons : Magie des langues, Sortilèges, Arithmancie, Histoire de la magie, Botanique & Cosmos et la Grande Salle (mission du jour). Les animations s'arrêtent si l'iPad est réglé sur « Réduire les animations ».

**Pour un rendu photo :** génère avec une IA une image de château de nuit, format portrait 3:4, nomme-la `chateau.jpg` et mets-la à côté de `index.html` : elle remplace le dessin (les boutons restent). Si les boutons ne tombent pas sur les tours, ajuste `SPOTS` en haut de `castle.js`. Tous les autres écrans sont des pages de parchemin sur un bureau de cuir. Polices : celles de l'iPad (Georgia), rien à télécharger.


## Musique d'accueil
`musique.mp3` : « Let the Mystery Unfold » (Geoff Harvey, fournie par toi comme libre de droits : garde la preuve de la licence et mentionne l'auteur si elle l'exige). Elle joue en boucle sur l'accueil et s'arrête dès que Sana entre dans une salle. Sur iPad, le son ne démarre qu'après un premier toucher de l'écran. Le bouton 🎵/🔇 de la scène la coupe pour de bon. Pour changer de musique, remplace le fichier en gardant le nom `musique.mp3`.

## Photo du château (`chateau.jpg`)
Si `chateau.jpg` est présent à côté de `index.html`, l'accueil l'utilise à la place du dessin (format paysage conseillé, ~1400×780). Par-dessus : fanions cliquables sur les tours, lueurs de fenêtres qui vacillent, brume, bougies, hibou, étoile filante. Pour utiliser une autre photo, remplace le fichier puis ajuste `PSPOTS` (positions des fanions) dans `castle.js`. Pour revenir au dessin, supprime simplement `chateau.jpg`.
Attention aux droits : une image tirée d'un film ou d'un parc à thème reste protégée. Pour un usage strictement familial c'est ton choix, mais un dépôt GitHub Pages public la rend accessible à tout le monde.
