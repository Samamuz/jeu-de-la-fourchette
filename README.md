# 🎮 Jeu du Nombre Mystère

Un jeu interactif de devinette de nombres avec une interface rétro inspirée du style NES, développé dans le cadre du cours IWEB.

## 📋 Description

Le Jeu du Nombre Mystère est une application web interactive où le joueur doit deviner un nombre secret entre 0 et 100. Le jeu propose plusieurs niveaux de difficulté, un système d'indices en temps réel, un historique des tentatives, et une ambiance sonore immersive.

## ✨ Fonctionnalités

### Jeu principal
- **4 niveaux de difficulté** :
  - Facile : 0-50, 20 tentatives
  - Normal : 0-100, 10 tentatives
  - Difficile : 0-100, 5 tentatives
  - Légendaire : 0-100, 1 tentative
- Système d'indices (trop grand / trop petit)
- Historique des tentatives avec défilement
- Validation par bouton ou touche Entrée
- Compteur de tentatives en temps réel

### Interface & Accessibilité
- Design responsive (mobile, tablette, desktop)
- Menu de navigation avec hamburger mobile
- Thème rétro inspiré de NES.css
- Accessibilité WCAG (navigation clavier, ARIA, skip-link)
- Animations fluides et feedback visuel

### Audio
- Musique de fond en boucle
- Effets sonores pour les réponses (correct/incorrect)
- Contrôles audio persistants (localStorage)
- Raccourcis clavier (M pour musique, S pour effets)
- Son spécial pour l'easter egg

### Pages supplémentaires
- **Manuel & FAQ** : Règles du jeu et questions fréquentes avec accordéon
- **À propos** : Présentation de l'auteur avec formulaire de contact
- Validation de formulaire en temps réel

### Easter Egg 🎉
- Découvrez ce qui se passe quand vous entrez le nombre 67...

## 📁 Structure du projet

```
PROJET/
├── index.html              # Page d'accueil avec le jeu
├── manuel.html             # Manuel et FAQ
├── apropos.html            # À propos et contact
├── README.md               # Documentation (ce fichier)
├── Plan                    # Plan du projet
│
└── assets/
    ├── css/
    │   └── style.css       # Styles personnalisés
    │
    ├── js/
    │   ├── app.js          # Logique principale du jeu
    │   ├── audio-manager.js # Gestionnaire audio
    │   ├── contact.js      # Validation formulaire
    │   ├── faq.js          # FAQ interactive
    │   └── nav.js          # Menu hamburger mobile
    │
    ├── audio/
    │   ├── background-music.mp3
    │   ├── correct.mp3
    │   ├── wrong.mp3
    │   └── easter-egg-67.mp3
    │
    └── img/
        ├── wallpaper.png   # Fond d'écran
        ├── photo.jpg       # Photo de l'auteur
        └── icons/          # Icônes diverses
```

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique et accessible
- **CSS3** : Variables CSS, flexbox, animations, media queries
- **JavaScript (ES6+)** : Classes, localStorage, Audio API
- **NES.css** : Framework CSS pour le style rétro (CDN)
- **Google Fonts** : Police "Press Start 2P"

## 🚀 Installation et utilisation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Connexion Internet (pour NES.css et Google Fonts)

### Lancement
1. Cloner ou télécharger le projet
2. Ouvrir `index.html` dans un navigateur
3. Commencer à jouer !

### Hébergement
Le projet est prêt à être hébergé sur n'importe quel serveur web statique :
- GitHub Pages
- Netlify
- Vercel
- Serveur Apache/Nginx

## 🎮 Comment jouer

1. Sélectionnez un niveau de difficulté
2. Entrez un nombre entre 0 et 100
3. Validez avec le bouton ou la touche Entrée
4. Suivez les indices pour trouver le nombre mystère
5. Consultez l'historique de vos tentatives
6. Recommencez autant de fois que vous voulez !

### Raccourcis clavier
- `Entrée` : Valider la proposition
- `M` : Toggle musique
- `S` : Toggle effets sonores
- `Échap` : Fermer le menu mobile

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans les variables CSS (`style.css`, lignes 3-21) :
```css
--accent-green: #00ff41;
--bg: #0a0e0f;
--text: #e8f5e9;
```

### Difficulté
Modifier les niveaux dans `app.js` (lignes 4-9) :
```javascript
const difficulties = {
  facile: { min: 0, max: 50, maxAttempts: 20 },
  // ...
};
```

### Audio
Remplacer les fichiers dans `assets/audio/` ou modifier les chemins dans `audio-manager.js` (lignes 8-13).

## 📱 Compatibilité

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile (iOS/Android)

## 🐛 Problèmes connus

- La musique peut ne pas démarrer automatiquement sur certains navigateurs (politique d'autoplay)
- Les effets audio nécessitent une interaction utilisateur initiale
- Le formulaire de contact est une simulation (pas d'envoi réel)

## 👤 Auteur

**Samuel Barman**
- Email : samuel.barman@eduvaud.ch
- Site : [site-simple.ch](https://site-simple.ch/)
- Projet : Cours IWEB 2026

## 📄 Licence

Ce projet est réalisé dans un cadre pédagogique pour le cours IWEB.

## 🙏 Crédits

- [NES.css](https://nostalgic-css.github.io/NES.css/) : Framework CSS rétro
- [Google Fonts](https://fonts.google.com/) : Police Press Start 2P
- Design et développement : Samuel Barman

---

**© 2026 Projet IWEB** - Fait avec ❤️ et beaucoup de café ☕
